import {projects,assetUrl} from '../content';
import {profile} from '../content/profile';
import {education} from '../content/education';
import {skills} from '../content/skills';
import {ExperienceCarousel} from '../components/ExperienceCarousel';
import {ProjectCard,ProjectImage} from '../components/ProjectCard';
export function Home(){return <><section className="hero container"><div className="portrait-frame"><ProjectImage image={profile.heroPhoto} eager/></div><div className="hero-copy"><h1>{profile.name}</h1><h2>{profile.discipline}</h2><p>{profile.intro}</p></div></section><ExperienceCarousel/><section className="selected-work container" id="selected-work"><h2>Featured Projects</h2><div className="featured-list">{projects.filter(p=>p.featured).map(p=><ProjectCard key={p.id} project={p} featured/>)}</div><div className="all-projects-cta"><a className="button primary" href={assetUrl('projects/')}>View All Projects</a></div></section><section className="home-details container"><div><h2>Education</h2><h3>{education.school}</h3><p>{education.degree}</p><p>{education.dates} · GPA {education.gpa}</p></div><div><h2>Technical Skills</h2>{skills.map(s=><div className="skill-group" key={s.title}><h3>{s.title}</h3><div className="tags">{s.items.map(i=><span key={i}>{i}</span>)}</div></div>)}</div></section></>}
