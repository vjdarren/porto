import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { PROJECTS, GRID_PROJECTS } from '../data'
import Project from '../components/Project'
import Cursor from '../components/Cursor'
import Nav from '../components/Nav'
import NotFound from './NotFound'
import { PROJECT_LINKS } from '../navLinks'
import { useReveal, useDocumentMeta } from '../hooks'
import { projectMeta, notFoundMeta } from '../seo'
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

  /* Hooks run before the not-found return, so the call is unconditional. React
     flushes child effects before the parent's, so NotFound's own title would be
     overwritten by this one : own the miss case here rather than fight it. */
  const found = project || gridProject
  useDocumentMeta(found ? projectMeta(found) : notFoundMeta('Project'))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  /* ── Not found ── */
  if (!found) return <NotFound what="Project" />

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
          <h1 className="name rv d1">{g.name}</h1>
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
                <h2>PROBLEM</h2>
              </div>
              <div className="lbody">
                <p className="lead rv d1">{g.problem}</p>
                {g.overview && <p className="overview-body rv d2">{g.overview}</p>}
              </div>
            </div>

            <div className="layer grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> My Role</span>
                <h2>{g.myRole.title}</h2>
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

            {g.whatBuilt && g.whatBuilt.length > 0 && (
              <div className="layer grid12">
                <div className="lhead rv">
                  <span className="step"><span className="b"></span> What I Built</span>
                  <h2>Deliverables shipped</h2>
                </div>
                <div className="lbody rv d1">
                  <ul className="role-list">
                    {g.whatBuilt.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {g.visuals && g.visuals.length > 0 && (
              <div className="layer visuals grid12">
                <div className="lhead rv">
                  <span className="step"><span className="b"></span> Visuals</span>
                  <h2>Screenshots</h2>
                </div>
                <div className="lbody">
                  <Visuals items={g.visuals} />
                </div>
              </div>
            )}

            <div className="layer grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> Outcome</span>
                <h2>Result</h2>
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
                  <h2>Technology Stack</h2>
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
                <h2>What was being investigated</h2>
              </div>
              <div className="lbody">
                <p className="lead rv d1">{g.problem}</p>
              </div>
            </div>

            <div className="layer grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> Approach</span>
                <h2>Methodology &amp; tools</h2>
              </div>
              <div className="lbody">
                <p className="proc-desc rv d1">{g.approach}</p>
              </div>
            </div>

            <div className="layer grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> Findings</span>
                <h2>Results &amp; conclusions</h2>
              </div>
              <div className="lbody">
                <p className="proc-desc rv d1">{g.findings}</p>
              </div>
            </div>

            {g.visuals && g.visuals.length > 0 && (
              <div className="layer visuals grid12">
                <div className="lhead rv">
                  <span className="step"><span className="b"></span> Visuals</span>
                  <h2>Output &amp; results</h2>
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
                  <h2>Methods &amp; Tools</h2>
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
                <h2>What I'd do differently</h2>
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
              <h2>About this project</h2>
            </div>
            <div className="lbody">
              <p className="lead rv d1">{g.desc}</p>
            </div>
          </div>
          {g.stack && g.stack.length > 0 && (
            <div className="layer architecture grid12">
              <div className="lhead rv">
                <span className="step"><span className="b"></span> Stack</span>
                <h2>Technology Stack</h2>
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
