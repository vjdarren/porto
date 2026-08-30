import Feature from './Feature'
import Visuals from './Visuals'

export default function Project({ p }) {
  const a = p.architecture
  return (
    <section className="project">
      {/* Project header */}
      <div className="top grid12">
        <span className="num rv">{p.num}</span>
        <h3 className="name rv d1">{p.name}</h3>
        <div className="kind rv d2">{p.kind}</div>
      </div>

      {/* Context bar */}
      <div className="proj-ctx grid12 rv">
        <div className="ctx-item">
          <span className="ctx-k">Project</span>
          <span className="ctx-v">{p.context.desc}</span>
        </div>
        <div className="ctx-item">
          <span className="ctx-k">Type</span>
          <span className="ctx-v">{p.context.type}</span>
        </div>
        <div className="ctx-item">
          <span className="ctx-k">Year</span>
          <span className="ctx-v">{p.context.year}</span>
        </div>
        <div className="ctx-item">
          <span className="ctx-k">Team</span>
          <span className="ctx-v">{p.context.team}</span>
        </div>
      </div>

      {/* My Role */}
      <div className="proj-role grid12">
        <div className="lhead rv">
          <span className="step"><span className="b"></span> My Role</span>
          <h4>{p.role.title}</h4>
        </div>
        <div className="lbody">
          <div className="role-resp rv d1">
            <span className="role-label">Responsibilities</span>
            <ul className="role-list">
              {p.role.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="role-resp rv d2">
            <span className="role-label">Key decisions</span>
            <ul className="role-list">
              {p.role.decisions.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3-Layer anatomy */}
      <div className="anatomy">

        {/* Layer 1 : Strategic Impact */}
        <div className="layer strategic grid12">
          <div className="lhead rv">
            <span className="step"><span className="b"></span> Layer 01</span>
            <h4>Strategic Impact</h4>
            <span className="for">/ for the strategist</span>
          </div>
          <div className="lbody">
            <p className="lead rv d1" dangerouslySetInnerHTML={{ __html: p.strategic.lead }} />
            <div className="stats rv d2">
              {p.strategic.stats.map((s, i) => (
                <div className="s" key={i}>
                  <div className="n">{s.n}</div>
                  <div className="c">{s.c}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Layer 2.5 : Process */}
        <div className="layer process grid12">
          <div className="lhead rv">
            <span className="step"><span className="b"></span> Layer 02</span>
            <h4>Process</h4>
            <span className="for">/ how it was built</span>
          </div>
          <div className="lbody">
            <div className="proc-steps">
              {p.process.map((step, i) => (
                <div className={`proc-step rv d${i}`} key={i}>
                  <span className="proc-n">{step.n}</span>
                  <div className="proc-body">
                    <span className="proc-title">{step.title}</span>
                    <p className="proc-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Layer 3 : Interface & Friction (was Layer 02) */}
        <div className="layer interface grid12">
          <div className="lhead rv">
            <span className="step"><span className="b"></span> Layer 03</span>
            <h4>Interface &amp; Friction</h4>
            <span className="for">/ for the UX director</span>
          </div>
          <div className="lbody">
            <span className="xhint rv">
              <span className="pulse"></span>
              <span>
                <span className="on-hover">Hover</span>
                <span className="on-touch">Tap</span>
                {' '}a feature to X-ray the system beneath
              </span>
            </span>
            <p className="intro rv" dangerouslySetInnerHTML={{ __html: p.interface.intro }} />
            <div className="features">
              {p.interface.features.map((f, i) => (
                <div className={`rv d${i + 1}`} key={i}>
                  <Feature {...f} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Layer 3.5 : Visuals */}
        <div className="layer visuals grid12">
          <div className="lhead rv">
            <span className="step"><span className="b"></span> Layer 04</span>
            <h4>Visuals</h4>
            <span className="for">/ screens &amp; frames</span>
          </div>
          <div className="lbody">
            <Visuals items={p.visuals} />
          </div>
        </div>

        {/* Layer 5 : System Architecture (was Layer 03) */}
        <div className="layer architecture grid12">
          <div className="lhead rv">
            <span className="step"><span className="b"></span> Layer 05</span>
            <h4>System Architecture</h4>
            <span className="for">/ for the engineering lead</span>
          </div>
          <div className="lbody rv d1">
            <div className="arctable">
              <div className="arhead">
                <span>./{p.name.toLowerCase()} · stack manifest</span>
                <span className="live">BUILD {a.build}</span>
              </div>
              {a.rows.map((r, i) => (
                <div className="arow" key={i}>
                  <span className="k">{r.k}</span>
                  <span className="v" dangerouslySetInnerHTML={{ __html: r.v }} />
                </div>
              ))}
              <div className="arclinks">
                {a.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" data-cur="link">
                    {l.label}<span className="u"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Reflection */}
      <div className="proj-reflect grid12">
        <div className="ref-card rv">
          <span className="ref-label">What worked</span>
          <p>{p.reflection.worked}</p>
        </div>
        <div className="ref-card rv d1">
          <span className="ref-label">What I'd do differently</span>
          <p>{p.reflection.differently}</p>
        </div>
        <div className="ref-card rv d2">
          <span className="ref-label">What's next</span>
          <p>{p.reflection.next}</p>
        </div>
      </div>
    </section>
  )
}
