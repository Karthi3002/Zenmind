import { Code2, Compass, Layers3, PenTool, Smartphone, Sparkles } from 'lucide-react'

export type Service = {
  title: string
  short: string
  intro: string
  introEmphasis: string
  heroImage: string
  heroImageLight: string
  slug: string
  icon: typeof Code2
  offerings: string[]
  color: string
}

export const services: Service[] = [
  { title: 'Website development', short: 'Fast, responsive, SEO-ready websites that turn visitors into customers.', intro: 'Websites that look sharp, load fast, and convert.', introEmphasis: 'load fast, and convert.', heroImage: 'service-website-development.svg', heroImageLight: 'service-website-development-light.svg', slug: 'website-development', icon: Code2, color: 'mint', offerings: ['Corporate and portfolio websites', 'E-commerce and online stores', 'CMS-powered sites you can manage yourself', 'Landing pages and marketing sites', 'Performance optimisation and SEO setup', 'Maintenance and support'] },
  { title: 'App development', short: 'Scalable applications tailored to your workflows, products, and goals.', intro: 'Custom software built around the way you work.', introEmphasis: 'the way you work.', heroImage: 'service-app-development.svg', heroImageLight: 'service-app-development-light.svg', slug: 'app-development', icon: Layers3, color: 'blue', offerings: ['SaaS platforms and MVPs', 'Admin dashboards and internal tools', 'Custom business workflows', 'API design and third-party integrations', 'Cloud deployment and scaling'] },
  { title: 'Mobile app development', short: 'Native-quality iOS and Android apps people love to use.', intro: 'Apps your users will keep on their home screen.', introEmphasis: 'their home screen.', heroImage: 'service-mobile-app-development.svg', heroImageLight: 'service-mobile-app-development-light.svg', slug: 'mobile-app-development', icon: Smartphone, color: 'lilac', offerings: ['Native and cross-platform development', 'Consumer and business apps', 'Push notifications, payments, and maps', 'App Store and Play Store launch support', 'Ongoing updates and maintenance'] },
  { title: 'AI agents', short: 'Intelligent agents that automate tasks and support customers around the clock.', intro: 'Put intelligence to work for your business.', introEmphasis: 'your business.', heroImage: 'service-ai-agents.svg', heroImageLight: 'service-ai-agents-light.svg', slug: 'ai-agents', icon: Sparkles, color: 'lime', offerings: ['Customer support and sales chat agents', 'Workflow and process automation', 'Document and data processing agents', 'Custom assistants trained on your business knowledge', 'Integration with your existing tools and systems'] },
  { title: 'UI/UX design', short: 'Research-driven interfaces that are intuitive, accessible, and a pleasure to use.', intro: 'Design that people understand at first glance.', introEmphasis: 'at first glance.', heroImage: 'service-ui-ux-design.svg', heroImageLight: 'service-ui-ux-design-light.svg', slug: 'ui-ux-design', icon: Compass, color: 'peach', offerings: ['User research and journey mapping', 'Wireframes and interactive prototypes', 'Visual design systems', 'Usability testing', 'Web and mobile interface design'] },
  { title: 'Graphic design', short: 'Distinctive brand identities and visuals that make your business memorable.', intro: 'Visuals that tell your story.', introEmphasis: 'your story.', heroImage: 'service-graphic-design.svg', heroImageLight: 'service-graphic-design-light.svg', slug: 'graphic-design', icon: PenTool, color: 'rose', offerings: ['Logo and brand identity', 'Social media creatives', 'Brochures, decks, and print material', 'Marketing and ad creatives', 'Brand guidelines'] },
]
