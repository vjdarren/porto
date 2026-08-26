import { SKILLS } from '../data'

export default function SkillsSection() {
  return (
    <section className="skills-sec">
      <div className="skills-block grid12">
        <div className="skills-label rv">
          <span className="step"><span className="b"></span> [ 03 ] Skills</span>
        </div>
        <div className="skills-cats rv d1">
          {SKILLS.map((s, i) => (
            <div className="skill-cat" key={i}>
              <span className="cat-name">{s.cat}</span>
              <div className="skill-tags">
                {s.items.map((item, j) => (
                  <span className="tk" key={j}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
