import { PROFILE, EDUCATION } from '../data'
import profilePic from '../assets/darrenfinal.webp'

export default function AboutSection() {
  return (
    <section className="about-sec" id="about">
      {/* Section header */}
      <div className="sechead grid12">
        <span className="idx rv">[ 01 ]</span>
        <span className="ttl rv d1">About</span>
      </div>

      {/* Bio + meta */}
      <div className="about-body grid12">
        <div className="lhead rv">
          <img src={profilePic} alt="Profile" className="about-pfp" />
          <span className="step"><span className="b"></span> Identity</span>
        </div>
        <div className="lbody">
          <p className="about-name rv">{PROFILE.name}</p>
          <p className="about-bio rv d1">{PROFILE.bio}</p>
          <div className="about-meta rv d2">
            <div className="row">
              <span className="k">Location</span>
              <span className="v">{PROFILE.location}</span>
            </div>
            <div className="row">
              <span className="k">Availability</span>
              <span className="v">{PROFILE.availability}</span>
            </div>
            <div className="row">
              <span className="k">Languages</span>
              <span className="v">{PROFILE.languages}</span>
            </div>
            <div className="row">
              <span className="k">Outside work</span>
              <span className="v">{PROFILE.context}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="about-body grid12">
        <div className="lhead rv">
          <span className="step"><span className="b"></span> Education</span>
        </div>
        <div className="lbody">
          <div className="edu-list rv d1">
            {EDUCATION.map((e, i) => (
              <div className="edu-item" key={i}>
                <div className="edu-main">
                  <span className="edu-degree">{e.degree}</span>
                  <span className="edu-dist">{e.distinction}</span>
                </div>
                <div className="edu-sub">
                  <span className="edu-inst">{e.institution}</span>
                  <span className="edu-year">{e.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
