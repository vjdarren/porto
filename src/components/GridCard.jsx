import { Link } from 'react-router-dom'

/* Full case studies keep year, type and summary under `context`. */
export default function GridCard({ p }) {
  return (
    <Link
      to={`/project/${p.slug}`}
      className="gcard rv"
      data-cur="explore"
    >
      <div className="gc-top">
        <span className="gc-year">{p.year ?? p.context.year}</span>
        <span className="gc-type">{p.typeTag ?? p.context.type}</span>
      </div>
      <h3 className="gc-name">{p.name}</h3>
      <p className="gc-sub">{p.subtitle}</p>
      <p className="gc-desc">{p.desc ?? p.context.desc}</p>
      {p.stack.length > 0 && (
        <div className="gc-stack">
          {p.stack.map((s, i) => (
            <span className="gc-tag" key={i}>{s}</span>
          ))}
        </div>
      )}
      <div className="gc-metric">{p.metric}</div>
    </Link>
  )
}
