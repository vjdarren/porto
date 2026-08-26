export default function Feature({ n, title, desc, ux, endpoints, note }) {
  return (
    <div className="feat" data-cur="explore">
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
