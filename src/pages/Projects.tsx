import {projects} from '../content';import {ProjectCard} from '../components/ProjectCard';
export function Projects(){return <div className="container page-content"><h1>Projects</h1><div className="projects-grid">{projects.map(p=><ProjectCard key={p.id} project={p}/>)}</div></div>}
