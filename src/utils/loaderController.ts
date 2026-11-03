/**
 * Zenmind "ZM" Logo Loader Controller
 * State Machine: IDLE -> FILLING -> CYCLE_COMPLETE -> (not ready: back to FILLING) | (ready: HOLD -> EXITING -> DONE)
 * Exit allowed ONLY when: cycleCompletedAtLeastOnce && isPageReady && currentCycleComplete
 */

export const LOADER_CONFIG = {
  fast: 1500,
  medium: 2200,
  slow: 3200,
  holdMs: 200,
  fadeMs: 400,
  hintAfterMs: 8000,
  maxWaitMs: 25000,
  reducedMotionMs: 800,
  routeChangeDurationMs: 1000,
  SHOW_LOADER_ON_ROUTE_CHANGE: false,
} as const;

export type LoaderState =
  | 'IDLE'
  | 'FILLING'
  | 'CYCLE_COMPLETE'
  | 'HOLD'
  | 'EXITING'
  | 'DONE';

class LoaderController {
  private state: LoaderState = 'IDLE';
  private cycleCount = 0;
  private cycleCompletedAtLeastOnce = false;
  private isPageReady = false;
  private currentDuration: number = LOADER_CONFIG.fast;
  private isReducedMotion = false;
  private isInitialized = false;

  private hintTimer: number | null = null;
  private maxWaitTimer: number | null = null;
  private holdTimer: number | null = null;
  private fadeTimer: number | null = null;

  private loaderElement: HTMLElement | null = null;
  private hintElement: HTMLElement | null = null;
  private fillElements: NodeListOf<HTMLElement> | null = null;
  private animationEndHandler: ((event: AnimationEvent) => void) | null = null;

  private reactSettledResolver: (() => void) | null = null;
  private reactSettledPromise: Promise<void>;

  constructor() {
    this.reactSettledPromise = new Promise<void>((resolve) => {
      this.reactSettledResolver = resolve;
    });
  }

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    this.loaderElement = document.getElementById('page-loader');
    this.hintElement = document.getElementById('page-loader-hint');
    this.fillElements = this.loaderElement
      ? this.loaderElement.querySelectorAll<HTMLElement>('.page-loader-fill')
      : null;

    this.isReducedMotion =
      !!window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect initial connection speed
    this.currentDuration = this.detectConnectionDuration();

    // Lock body scrolling immediately
    document.documentElement.classList.add('is-loading-locked');
    document.body?.classList.add('is-loading-locked');

    if (this.loaderElement) {
      this.loaderElement.setAttribute('role', 'status');
      this.loaderElement.setAttribute('aria-live', 'polite');
      this.loaderElement.setAttribute('aria-busy', 'true');
      this.loaderElement.classList.remove('is-exiting', 'is-done');
      this.loaderElement.style.setProperty(
        '--loader-duration',
        `${this.currentDuration}ms`
      );
    }

    // Bind animationend listener to the active fill element
    this.bindAnimationListeners();

    // Setup Safety Net timers
    this.setupSafetyNet();

    // Listen to network changes (online/offline)
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);

    // Handle bfcache back/forward navigation
    window.addEventListener('pageshow', this.handlePageShow);

    // Start evaluation of Page Ready criteria
    this.evaluatePageReady();

    // Enter FILLING state for cycle 1
    this.startFillCycle();
  }

  public notifyReactRendered() {
    if (this.reactSettledResolver) {
      this.reactSettledResolver();
      this.reactSettledResolver = null;
    }
  }

  public getState(): LoaderState {
    return this.state;
  }

  public getIsPageReady(): boolean {
    return this.isPageReady;
  }

  public triggerRouteChangeLoader() {
    if (!LOADER_CONFIG.SHOW_LOADER_ON_ROUTE_CHANGE) return;
    this.startLoaderSequence({
      duration: LOADER_CONFIG.routeChangeDurationMs,
      isRouteChange: true,
    });
  }

  private detectConnectionDuration(): number {
    if (this.isReducedMotion) {
      return LOADER_CONFIG.reducedMotionMs;
    }

    const nav = navigator as any;
    const conn = nav?.connection || nav?.mozConnection || nav?.webkitConnection;

    if (conn) {
      if (conn.saveData) {
        return LOADER_CONFIG.slow;
      }
      const type = conn.effectiveType;
      if (type === '2g' || type === 'slow-2g') {
        return LOADER_CONFIG.slow;
      }
      if (type === '3g') {
        return LOADER_CONFIG.medium;
      }
      if (type === '4g') {
        if (typeof conn.rtt === 'number' && conn.rtt >= 600) return LOADER_CONFIG.slow;
        if (typeof conn.downlink === 'number' && conn.downlink < 1) return LOADER_CONFIG.slow;
        if (typeof conn.rtt === 'number' && conn.rtt >= 300) return LOADER_CONFIG.medium;
        if (typeof conn.downlink === 'number' && conn.downlink < 2.5) return LOADER_CONFIG.medium;
        return LOADER_CONFIG.fast;
      }
    }

    // Default for Safari / Firefox or standard connection
    return LOADER_CONFIG.fast;
  }

  private bindAnimationListeners() {
    if (!this.fillElements || this.fillElements.length === 0) return;

    this.animationEndHandler = (event: AnimationEvent) => {
      // Ensure we only listen to our logo fill or pulse animation
      if (
        event.animationName === 'logo-color-fill' ||
        event.animationName === 'logo-reduced-pulse'
      ) {
        this.onCycleAnimationEnd();
      }
    };

    this.fillElements.forEach((el) => {
      el.addEventListener('animationend', this.animationEndHandler!);
    });
  }

  private startFillCycle() {
    this.state = 'FILLING';

    if (!this.loaderElement) return;

    this.loaderElement.style.setProperty(
      '--loader-duration',
      `${this.currentDuration}ms`
    );

    if (this.fillElements) {
      this.fillElements.forEach((el) => {
        el.classList.remove('is-filling');
        // Force reflow to guarantee clean animation restart with no jump/flash
        void el.offsetWidth;
        el.classList.add('is-filling');
      });
    }
  }

  private onCycleAnimationEnd() {
    this.state = 'CYCLE_COMPLETE';
    this.cycleCount++;
    this.cycleCompletedAtLeastOnce = true;

    // Check exit criteria:
    // Exit is allowed ONLY when cycleCompletedAtLeastOnce && isPageReady && currentCycleComplete
    if (this.cycleCompletedAtLeastOnce && this.isPageReady) {
      this.enterHoldState();
    } else {
      // Real-condition measurement:
      // If the page is still not ready when the first cycle ends,
      // treat the network as slow and use the slow duration for later cycles.
      if (!this.isReducedMotion) {
        this.currentDuration = LOADER_CONFIG.slow;
      }

      // If offline, ensure hint is showing
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        this.showHint('Still loading, please check your connection.');
      }

      // Loop: restart another full cycle
      this.startFillCycle();
    }
  }

  private enterHoldState() {
    this.state = 'HOLD';

    if (this.holdTimer) window.clearTimeout(this.holdTimer);

    this.holdTimer = window.setTimeout(() => {
      this.enterExitingState();
    }, LOADER_CONFIG.holdMs);
  }

  private enterExitingState() {
    this.state = 'EXITING';

    if (this.loaderElement) {
      this.loaderElement.classList.add('is-exiting');
    }

    if (this.fadeTimer) window.clearTimeout(this.fadeTimer);

    this.fadeTimer = window.setTimeout(() => {
      this.enterDoneState();
    }, LOADER_CONFIG.fadeMs);
  }

  private enterDoneState() {
    this.state = 'DONE';

    if (this.loaderElement) {
      this.loaderElement.classList.add('is-done');
      this.loaderElement.classList.remove('is-exiting');
      this.loaderElement.setAttribute('aria-busy', 'false');
    }

    // Unlock body scrolling
    document.documentElement.classList.remove('is-loading-locked');
    document.body?.classList.remove('is-loading-locked');

    // Clean up safety timers
    this.clearSafetyTimers();
  }

  private evaluatePageReady() {
    // 5. WHAT "PAGE READY" MEANS (all must be true):
    // a. window load event has fired (or document.readyState === 'complete')
    const windowLoadPromise = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve(), { once: true });
      }
    });

    // b. document.fonts.ready has resolved
    const fontsReadyPromise =
      typeof document !== 'undefined' && (document as any).fonts?.ready
        ? (document as any).fonts.ready.catch(() => {})
        : Promise.resolve();

    // c. Above-the-fold hero image(s) are loaded and decoded (img.decode())
    const heroImagesPromise = new Promise<void>((resolve) => {
      const decodeHeroImages = () => {
        const heroImages = Array.from(
          document.querySelectorAll<HTMLImageElement>(
            '.hero-art img, .hero img, .service-hero img, [data-hero-image]'
          )
        );

        if (heroImages.length === 0) {
          resolve();
          return;
        }

        // Target currently visible images (respecting dark/light theme display)
        const visibleHeroImages = heroImages.filter((img) => {
          const style = window.getComputedStyle(img);
          return style.display !== 'none' && style.visibility !== 'hidden';
        });

        const targets =
          visibleHeroImages.length > 0 ? visibleHeroImages : heroImages.slice(0, 2);

        const decodePromises = targets.map((img) => {
          if (img.complete && img.naturalWidth > 0) {
            return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
          }
          return new Promise<void>((imgResolve) => {
            const onFinish = () => {
              if (img.decode) {
                img.decode().then(() => imgResolve(), () => imgResolve());
              } else {
                imgResolve();
              }
            };
            img.addEventListener('load', onFinish, { once: true });
            img.addEventListener('error', () => imgResolve(), { once: true });
          });
        });

        Promise.all(decodePromises).then(() => resolve());
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', decodeHeroImages, {
          once: true,
        });
      } else {
        decodeHeroImages();
      }
    });

    // d. For SPA/React: the first route has rendered
    const reactPromise = this.reactSettledPromise;

    // Combine all in Promise.all
    Promise.all([
      windowLoadPromise,
      fontsReadyPromise,
      heroImagesPromise,
      reactPromise,
    ]).then(() => {
      this.isPageReady = true;

      // If we are currently sitting at CYCLE_COMPLETE, proceed to exit
      if (this.state === 'CYCLE_COMPLETE') {
        this.enterHoldState();
      }
    });
  }

  private setupSafetyNet() {
    this.clearSafetyTimers();

    // Check offline immediately
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      this.showHint('Still loading, please check your connection.');
    }

    // 8s hint timer
    this.hintTimer = window.setTimeout(() => {
      if (!this.isPageReady || this.state !== 'DONE') {
        this.showHint('Still loading, please check your connection.');
      }
    }, LOADER_CONFIG.hintAfterMs);

    // 25s max safety timer: force page ready, finish current cycle and reveal
    this.maxWaitTimer = window.setTimeout(() => {
      if (!this.isPageReady) {
        this.isPageReady = true;
        if (this.state === 'CYCLE_COMPLETE') {
          this.enterHoldState();
        }
      }
    }, LOADER_CONFIG.maxWaitMs);
  }

  private showHint(message: string) {
    if (this.hintElement) {
      this.hintElement.textContent = message;
      this.hintElement.classList.add('is-visible');
    }
  }

  private hideHint() {
    if (this.hintElement) {
      this.hintElement.textContent = '';
      this.hintElement.classList.remove('is-visible');
    }
  }

  private handleOnline = () => {
    // If connection came back online, hide hint unless still taking long
    if (this.isPageReady) {
      this.hideHint();
    }
  };

  private handleOffline = () => {
    this.showHint('Still loading, please check your connection.');
  };

  private handlePageShow = (event: PageTransitionEvent) => {
    // 1. ALWAYS SHOWN on back/forward cache restoration
    if (event.persisted) {
      this.startLoaderSequence({
        duration: this.detectConnectionDuration(),
        isBfcache: true,
      });
    }
  };

  private startLoaderSequence(options?: {
    duration?: number;
    isBfcache?: boolean;
    isRouteChange?: boolean;
  }) {
    this.state = 'IDLE';
    this.cycleCount = 0;
    this.cycleCompletedAtLeastOnce = false;
    this.currentDuration = options?.duration || this.detectConnectionDuration();

    // For bfcache or route change, re-evaluate ready
    this.isPageReady = !options?.isRouteChange;

    document.documentElement.classList.add('is-loading-locked');
    document.body?.classList.add('is-loading-locked');

    if (this.loaderElement) {
      this.loaderElement.classList.remove('is-done', 'is-exiting');
      this.loaderElement.setAttribute('aria-busy', 'true');
    }

    this.hideHint();
    this.setupSafetyNet();

    if (options?.isRouteChange) {
      // Re-resolve route ready when React route settles
      this.reactSettledPromise = new Promise<void>((res) => {
        requestAnimationFrame(() => res());
      });
      this.evaluatePageReady();
    }

    this.startFillCycle();
  }

  private clearSafetyTimers() {
    if (this.hintTimer) {
      window.clearTimeout(this.hintTimer);
      this.hintTimer = null;
    }
    if (this.maxWaitTimer) {
      window.clearTimeout(this.maxWaitTimer);
      this.maxWaitTimer = null;
    }
    if (this.holdTimer) {
      window.clearTimeout(this.holdTimer);
      this.holdTimer = null;
    }
    if (this.fadeTimer) {
      window.clearTimeout(this.fadeTimer);
      this.fadeTimer = null;
    }
  }
}

// Global singleton instance
export const loaderController = new LoaderController();
