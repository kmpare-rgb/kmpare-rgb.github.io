import {profile} from '../content/profile';
import {SocialLinks} from './Navigation';

export function Footer(){return <footer>
  <div className="container footer-inner"><span>© 2026 {profile.name}. All rights reserved.</span><SocialLinks/></div>
  <p className="container" style={{marginTop:16,fontSize:12,lineHeight:1.7,color:'#4f6274'}}>
    Original project descriptions, photographs, and technical illustrations owned by Kalen Pare are provided for portfolio viewing and recruitment evaluation. Other reuse requires prior written permission, except as permitted by law. Employer, third-party, and collaboratively owned materials remain subject to their respective owners’ rights. No ownership of those materials is claimed.
  </p>
</footer>}
