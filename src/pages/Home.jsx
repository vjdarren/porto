import Cursor from '../components/Cursor'
import Nav from '../components/Nav'
import ProjectCard from '../components/ProjectCard'
import GridCard from '../components/GridCard'
import AboutSection from '../components/AboutSection'
import ExperienceSection from '../components/ExperienceSection'
import SkillsSection from '../components/SkillsSection'
import { useReveal, useDocumentMeta } from '../hooks'
import { ALL_PROJECTS, FEATURED, PROFILE } from '../data'
import { HOME_META } from '../seo'
import cvUrl from '../assets/Valentinus_CV.pdf'

/* Selected Work is chosen by slug, not by data shape: a full case study can
   sit in More Work and a grid project can be featured. */
const SELECTED = FEATURED.map((slug) => ALL_PROJECTS.find((p) => p.slug === slug))
const MORE = ALL_PROJECTS.filter((p) => !FEATURED.includes(p.slug))

export default function Home() {
  useReveal()
  useDocumentMeta(HOME_META)

  return (
    <>
      <Cursor />

      {/* Nav */}
      <Nav />

      {/* Hero */}
      <header className="hero grid12" id="top">
        <div className="tag rv">
          <span className="dot"></span>
          Computing graduate · Product &amp; Technology
        </div>
        <h1 className="rv d1">Valentinus<span className="pt">.</span></h1>
        <p className="sub rv d2">
          Bridging product thinking, technical delivery, and user experience.
        </p>
        <p className="lede rv d3">
          One portfolio, three lenses. I build products that read as{' '}
          <b>sound business logic</b> to a strategist,{' '}
          <b>low-friction experience</b> to a designer, and{' '}
          <b>scalable architecture</b> to an engineer, without ever asking you to switch modes.
        </p>
        <div className="meta rv d3">
          <div className="row">
            <span className="k">Discipline</span>
            <span className="v">Full-stack · AI integration</span>
          </div>
          <div className="row">
            <span className="k">Method</span>
            <span className="v">Agile · DSDM · User-centred</span>
          </div>
          <div className="row">
            <span className="k">Status</span>
            <span className="v">Open to UK graduate roles</span>
          </div>
        </div>
      </header>

      {/* Audience strip */}
      <section className="audience">
        <div className="grid12">
          <div className="col rv">
            <span className="who">For the Strategist</span>
            <span className="what">The logic &amp; the impact</span>
            <span className="desc">Problem framing, trade-offs, and measurable outcomes come first.</span>
          </div>
          <div className="col rv d1">
            <span className="who">For the UX Director</span>
            <span className="what">The friction removed</span>
            <span className="desc">How each decision lowers cognitive load and removes barriers to action.</span>
          </div>
          <div className="col rv d2">
            <span className="who">For the Engineer</span>
            <span className="what">The system beneath</span>
            <span className="desc">The stack, the data model, and the architecture powering it.</span>
          </div>
        </div>
      </section>

      {/* About + Education */}
      <AboutSection />

      {/* Experience */}
      <ExperienceSection />

      {/* Skills */}
      <SkillsSection />

      {/* Work section header */}
      <div className="sechead grid12" id="work">
        <span className="idx rv">[ 04 ]</span>
        <h2 className="ttl rv d1">Selected Work</h2>
        <span className="ct rv d1">{SELECTED.length} projects</span>
      </div>

      {/* Featured Project Grid */}
      <div className="proj-grid grid12">
        {SELECTED.map((p, i) => (
          <ProjectCard key={p.slug} p={p} num={String(i + 1).padStart(2, '0')} />
        ))}
      </div>

      {/* More Work : grid cards */}
      <div className="sechead grid12">
        <span className="idx rv">[ 05 ]</span>
        <h2 className="ttl rv d1">More Work</h2>
        <span className="ct rv d1">{MORE.length} projects</span>
      </div>
      <div className="more-proj-grid grid12">
        {MORE.map((p) => (
          <GridCard key={p.slug} p={p} />
        ))}
      </div>

      {/* Contact / Footer */}
      <footer className="contact grid12" id="contact">
        <div className="kick rv">Available for roles &amp; collaborations</div>
        <h2 className="rv d1">
          Let's build<br />
          something <em>legible</em><span className="pt">.</span>
        </h2>
        <div className="row2 rv d2">
          <a className="mail" href="mailto:darrensebastian@gmail.com" data-cur="link">
            darrensebastian@gmail.com
          </a>
          <div className="socials">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" data-cur="link">GitHub</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" data-cur="link">LinkedIn</a>
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" data-cur="link">Download CV</a>
          </div>
        </div>
        <div className="base">
          <span>© 2026 Valentinus · Architected from scratch</span>
          <span>One view · three lenses · zero friction</span>
        </div>
      </footer>
    </>
  )
}
