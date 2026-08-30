import cvUrl from './assets/Valentinus_CV.pdf'

/* Arrows live outside `label` so they can be set in the mono face: the display
   and serif families carry no arrow glyphs at all. See `.nav .ext` in index.css. */
const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/vjdarren', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/valentinusjavierdarrensebastian/', external: true },
  { label: 'CV', href: cvUrl, external: true },
]

export const HOME_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
  ...SOCIALS,
]

export const PROJECT_LINKS = [
  { label: 'All Work', to: '/', lead: '←' },
  ...SOCIALS,
]
