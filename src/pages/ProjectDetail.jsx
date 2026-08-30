import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { PROJECTS, GRID_PROJECTS } from '../data'
import Project from '../components/Project'
import Cursor from '../components/Cursor'
import Nav from '../components/Nav'
import { PROJECT_LINKS } from '../navLinks'
import { useReveal } from '../hooks'
import Visuals from '../components/Visuals'

export default function ProjectDetail() {
  const { slug } = useParams()

  /* Search both arrays by slug field */
  const idx = PROJECTS.findIndex((p) => p.slug === slug)
  const project = PROJECTS[idx]
  const gridProject = !project
    ? GRID_PROJECTS.find((p) => p.slug === slug)
    : null

  useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  /* ── Not found ── */
  if (!project && !gridProject) {
    return (
      <>
        <Cursor />
        <Nav links={PROJECT_LINKS} brand="/" />
        <div className="not-found">
          Project not found.{' '}
          <Link to="/" data-cur="link">← Back to all work</Link>
        </div>
      </>
    )
  }

  /* ── Grid project : tier-aware detail views ── */
  if (gridProject) {
    const g = gridProject

    /* Shared nav */
    const nav = <Nav links={PROJECT_LINKS} brand="/" />

    /* Shared project header */
    const header = (
      <>
        <div className="top grid12">
          <span className="num rv">{g.year}</span>
          <h3 className="name rv d1">{g.name}</h3>
          <div className="kind rv d2">{g.subtitle}</div>
        </div>
        <div className="proj-ctx grid12 rv">
          <div className="ctx-item">
            <span className="ctx-k">Type</span>
            <span className="ctx-v">{g.typeTag}</span>
          </div>
          <div className="ctx-item">
            <span className="ctx-k">Year</span>
            <span className="ctx-v">{g.year}</span>
          </div>
        </div>
      </>
    )

    /* Shared bottom nav */
    const projNav = (
      <div className="proj-nav grid12">
        <div className="pn-prev">
          <Link to="/" data-cur="link">
            <span className="pn-label">←</span>
            <span className="pn-name">All Work</span>
          </Link>
        </div>
        <div className="pn-next"></div>
      </div>
    )

    /* ── Tier 2 : execution-focused ── */
    if (g.tier === 2) {
      return (
        <>
          <Cursor />
          {nav}
          <section className="project">
            {header}

            <div className="layer strategic grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> Problem</span>
                <h4>PROBLEM</h4>
              </div>
              <div className="lbody">
                <p className="lead rv d1">{g.problem}</p>
                {g.overview && <p className="overview-body rv d2">{g.overview}</p>}
              </div>
            </div>

            <div className="layer grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> My Role</span>
                <h4>{g.myRole.title}</h4>
              </div>
              <div className="lbody">
                <div className="role-resp rv d1">
                  <span className="role-label">Responsibilities</span>
                  <ul className="role-list">
                    {g.myRole.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
                {g.myRole.decisions && g.myRole.decisions.length > 0 && (
                  <div className="role-resp rv d2">
                    <span className="role-label">Key decisions</span>
                    <ul className="role-list">
                      {g.myRole.decisions.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="layer grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> What I Built</span>
                <h4>Deliverables shipped</h4>
              </div>
              <div className="lbody rv d1">
                <ul className="role-list">
                  {g.whatBuilt.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>

            {g.visuals && g.visuals.length > 0 && (
              <div className="layer visuals grid12">
                <div className="lhead rv">
                  <span className="step"><span className="b"></span> Visuals</span>
                  <h4>Screenshots</h4>
                </div>
                <div className="lbody">
                  <Visuals items={g.visuals} />
                </div>
              </div>
            )}

            <div className="layer grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> Outcome</span>
                <h4>Result</h4>
              </div>
              <div className="lbody">
                <div className="ref-card rv d1">
                  <span className="ref-label">Key result</span>
                  <p>{g.outcome}</p>
                </div>
              </div>
            </div>

            {g.manifestRows && g.manifestRows.length > 0 && (
              <div className="layer architecture grid12">
                <div className="lhead rv">
                  <span className="step"><span className="b"></span> Stack</span>
                  <h4>Technology Stack</h4>
                </div>
                <div className="lbody rv d1">
                  <div className="arctable">
                    <div className="arhead">
                      <span>./{g.name.toLowerCase()} · stack manifest</span>
                    </div>
                    {g.manifestRows.map((r, i) => (
                      <div className="arow" key={i}>
                        <span className="k">{r.k}</span>
                        <span className="v" dangerouslySetInnerHTML={{ __html: r.v }} />
                      </div>
                    ))}
                    {g.manifestLinks && g.manifestLinks.length > 0 && (
                      <div className="arclinks">
                        {g.manifestLinks.map((l) => (
                          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" data-cur="link">
                            {l.label}<span className="u"></span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
          {projNav}
        </>
      )
    }

    /* ── Tier 3 : research & analytical ── */
    if (g.tier === 3) {
      return (
        <>
          <Cursor />
          {nav}
          <section className="project">
            {header}

            <div className="layer strategic grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> Problem</span>
                <h4>What was being investigated</h4>
              </div>
              <div className="lbody">
                <p className="lead rv d1">{g.problem}</p>
              </div>
            </div>

            <div className="layer grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> Approach</span>
                <h4>Methodology &amp; tools</h4>
              </div>
              <div className="lbody">
                <p className="proc-desc rv d1">{g.approach}</p>
              </div>
            </div>

            <div className="layer grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> Findings</span>
                <h4>Results &amp; conclusions</h4>
              </div>
              <div className="lbody">
                <p className="proc-desc rv d1">{g.findings}</p>
              </div>
            </div>

            {g.visuals && g.visuals.length > 0 && (
              <div className="layer visuals grid12">
                <div className="lhead rv">
                  <span className="step"><span className="b"></span> Visuals</span>
                  <h4>Output &amp; results</h4>
                </div>
                <div className="lbody">
                  <Visuals items={g.visuals} />
                </div>
              </div>
            )}

            {g.methods && g.methods.length > 0 && (
              <div className="layer architecture grid12">
                <div className="lhead rv">
                  <span className="step"><span className="b"></span> Stack</span>
                  <h4>Methods &amp; Tools</h4>
                </div>
                <div className="lbody rv d1">
                  <div className="arctable">
                    <div className="arhead">
                      <span>./{g.name.toLowerCase()} · methods</span>
                    </div>
                    {g.methods.map((r, i) => (
                      <div className="arow" key={i}>
                        <span className="k">{r.k}</span>
                        <span className="v" dangerouslySetInnerHTML={{ __html: r.v }} />
                      </div>
                    ))}
                    {g.methodLinks && g.methodLinks.length > 0 && (
                      <div className="arclinks">
                        {g.methodLinks.map((l) => (
                          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" data-cur="link">
                            {l.label}<span className="u"></span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="layer grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> Reflection</span>
                <h4>What I'd do differently</h4>
              </div>
              <div className="lbody">
                <div className="ref-card rv d1">
                  <span className="ref-label">One thing I'd change</span>
                  <p>{g.reflection}</p>
                </div>
              </div>
            </div>
          </section>
          {projNav}
        </>
      )
    }

    /* ── Fallback : ungrouped compact view ── */
    return (
      <>
        <Cursor />
        {nav}
        <section className="project">
          {header}
          <div className="layer strategic grid12">
            <div className="lhead rv">
              <span className="step"><span className="b"></span> Overview</span>
              <h4>About this project</h4>
            </div>
            <div className="lbody">
              <p className="lead rv d1">{g.desc}</p>
            </div>
          </div>
          {g.stack && g.stack.length > 0 && (
            <div className="layer architecture grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> Stack</span>
                <h4>Technology Stack</h4>
              </div>
              <div className="lbody rv d1">
                <div className="arctable">
                  <div className="arhead">
                    <span>./{g.name.toLowerCase()} · stack manifest</span>
                  </div>
                  <div className="arow">
                    <span className="k">Stack</span>
                    <span className="v" dangerouslySetInnerHTML={{
                      __html: g.stack.map((s) => `<span class="tk">${s}</span>`).join(' · ')
                    }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        {projNav}
      </>
    )
  }

  /* ── Full case-study project ── */
  const prev = idx > 0 ? PROJECTS[idx - 1] : null
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null

  return (
    <>
      <Cursor />

      <Nav links={PROJECT_LINKS} brand="/" />

      <Project p={project} />

      <div className="proj-nav grid12">
        <div className="pn-prev">
          {prev && (
            <Link to={`/project/${prev.slug}`} data-cur="link">
              <span className="pn-label">← Previous</span>
              <span className="pn-name">{prev.name}</span>
            </Link>
          )}
        </div>
        <div className="pn-next">
          {next && (
            <Link to={`/project/${next.slug}`} data-cur="link">
              <span className="pn-label">Next →</span>
              <span className="pn-name">{next.name}</span>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
