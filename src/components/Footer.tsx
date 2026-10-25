import {profile} from '../content/profile';import {SocialLinks} from './Navigation';
export function Footer(){return <footer><div className="container footer-inner"><span>© {new Date().getFullYear()} {profile.name}</span><SocialLinks/></div></footer>}
