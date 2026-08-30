import { useState } from 'react'

export default function Feature({ n, title, desc, ux, endpoints, note }) {
  /* Desktop reveals the X-ray on hover; touch has no hover, so the card also
     works as a toggle. The class only drives styling under (hover: none), so
     pointer users see exactly the behaviour they did before. */
  const [xray, setXray] = useState(false)
  const toggle = () => setXray((v) => !v)

  return (
    <div
      className={`feat${xray ? ' is-xray' : ''}`}
      data-cur="explore"
      role="button"
      tabIndex={0}
      aria-expanded={xray}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      }}
    >
      <span className="fnum">{n}</span>
      <h5>{title}</h5>
      <p>{desc}</p>
      <div className="ux">
        <span className="ar">◇</span> {ux}
      </div>

      <div className="xray">
        <div className="xtop">
          <span>Powering this feature</span>
          <span className="live">
            <span className="d"></span> Live
          </span>
        </div>
        <div className="rows">
          {endpoints.map((e, i) => (
            <div className="r" key={i}>
              <span className="m">{e.m}</span>
              <span className="p">{e.p}</span>
              <span className="c">{e.c}</span>
            </div>
          ))}
        </div>
        <div className="xnote" dangerouslySetInnerHTML={{ __html: note }} />
      </div>
    </div>
  )
}
