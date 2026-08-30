import cvUrl from './assets/Valentinus_CV.pdf'

const SOCIALS = [
  { label: 'GitHub ↗', href: 'https://github.com/vjdarren', external: true },
  { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/valentinusjavierdarrensebastian/', external: true },
  { label: 'CV ↗', href: cvUrl, external: true },
]

export const HOME_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
  ...SOCIALS,
]

export const PROJECT_LINKS = [
  { label: '← All Work', to: '/' },
  ...SOCIALS,
]
