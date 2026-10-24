export const projects = [
  { name: 'Northstar Journal', type: 'Digital product', category: 'Websites', year: '2025', image: 'photo-1498050108023-c5249f4df085', className: 'project-wide' },
  { name: 'Form & Field', type: 'Brand and e-commerce', category: 'Branding', year: '2025', image: 'photo-1490481651871-ab68de25d43d', className: '' },
  { name: 'Openhouse', type: 'Property platform', category: 'Applications', year: '2024', image: 'photo-1600210492486-724fe5c67fb0', className: '' },
  { name: 'Goodwell Care', type: 'Care companion app', category: 'Mobile', year: '2024', image: 'photo-1576091160399-112ba8d25d1d', className: 'project-wide' },
  { name: 'Morrow Studio', type: 'Digital experience', category: 'Websites', year: '2024', image: 'photo-1497366216548-37526070297c', className: '' },
  { name: 'Clarity, on call', type: 'Knowledge assistant', category: 'AI', year: '2024', image: 'photo-1484480974693-6ca0a78fb36b', className: '' },
]

export type Project = (typeof projects)[number]
