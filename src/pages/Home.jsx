import Cursor from '../components/Cursor'
import ProjectCard from '../components/ProjectCard'
import GridCard from '../components/GridCard'
import AboutSection from '../components/AboutSection'
import ExperienceSection from '../components/ExperienceSection'
import SkillsSection from '../components/SkillsSection'
import { useReveal } from '../hooks'
import { PROJECTS, GRID_PROJECTS } from '../data'
import cvUrl from '../assets/Valentinus_CV.pdf'

export default function Home() {
  useReveal()

  return (
    <>
      <Cursor />

      {/* Nav */}
      <nav className="nav">
        <a className="mark" href="#top" data-cur="link">
          Valentinus<span className="pt">.</span>
        </a>
        <div className="right">
          <a href="#about" data-cur="link">About</a>
          <a href="#work" data-cur="link">Work</a>
          <a href="#contact" data-cur="link">Contact</a>
          <a href="https://github.com/vjdarren" target="_blank" rel="noopener noreferrer" data-cur="link">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/valentinusjavierdarrensebastian/" target="_blank" rel="noopener noreferrer" data-cur="link">LinkedIn ↗</a>
          <a href={cvUrl} target="_blank" rel="noopener noreferrer" data-cur="link">CV ↗</a>
        </div>
      </nav>

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
            <span className="v">Open to roles in 2026</span>
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
        <span className="ttl rv d1">Selected Work</span>
        <span className="ct rv d1">{PROJECTS.length} projects</span>
      </div>

      {/* Featured Project Grid */}
      <div className="proj-grid grid12">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.num} p={p} />
        ))}
      </div>

      {/* More Work : grid cards */}
      <div className="sechead grid12">
        <span className="idx rv">[ 05 ]</span>
        <span className="ttl rv d1">More Work</span>
        <span className="ct rv d1">{GRID_PROJECTS.length} projects</span>
      </div>
      <div className="more-proj-grid grid12">
        {GRID_PROJECTS.map((p) => (
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
            <a href="https://github.com/vjdarren" target="_blank" rel="noopener noreferrer" data-cur="link">GitHub</a>
            <a href="https://www.linkedin.com/in/valentinusjavierdarrensebastian/" target="_blank" rel="noopener noreferrer" data-cur="link">LinkedIn</a>
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
