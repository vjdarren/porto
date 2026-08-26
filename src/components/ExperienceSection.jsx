import { EXPERIENCE } from '../data'

export default function ExperienceSection() {
  return (
    <section className="exp-sec" id="experience">
      <div className="sechead grid12">
        <span className="idx rv">[ 02 ]</span>
        <span className="ttl rv d1">Experience</span>
        <span className="ct rv d1">{EXPERIENCE.length} roles</span>
      </div>

      {EXPERIENCE.map((e, i) => (
        <div className="exp-item grid12" key={i}>
          <div className="exp-left rv">
            <h4 className="exp-role">{e.role}</h4>
            <span className="exp-org">{e.org}</span>
            <span className="exp-dates">{e.dates}</span>
          </div>
          <ul className="exp-bullets rv d1">
            {e.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
