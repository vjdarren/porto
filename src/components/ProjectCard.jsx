import { Link } from 'react-router-dom'

export default function ProjectCard({ p }) {
  const stat = p.strategic.stats[0]
  return (
    <Link
      to={`/project/${p.slug}`}
      className="pcard rv"
      data-cur="explore"
    >
      <span className="pnum">{p.num}</span>
      <h3 className="pname">{p.name}</h3>
      <p className="pkind">{p.kind}</p>
      {p.visuals?.[0]?.src && (
        <div className="pimg">
          <img src={p.visuals[0].src} alt={p.visuals[0].alt} loading="lazy" />
        </div>
      )}
      <div className="pstat">
        <span className="psn">{stat.n}</span>
        <span className="psc">{stat.c}</span>
      </div>
      <span className="plink">Case study ↗</span>
    </Link>
  )
}
