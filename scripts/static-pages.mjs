import fs from 'node:fs';
import path from 'node:path';
const dir = 'src/content/projects';
const projects = fs.readdirSync(dir).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'))).sort((a,b)=>a.order-b.order);
const template=fs.readFileSync('dist/index.html','utf8');
const base=(process.env.VITE_BASE_PATH||'/').replace(/\/?$/,'/');
const origin=(process.env.SITE_URL||'').replace(/\/$/,'');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const routes=[{route:'',title:'Kalen Pare — Mechatronics Engineering',description:'Explore Kalen Pare’s engineering portfolio: robotic tooling, compact actuators, and mechanical design.'},{route:'projects/',title:'Projects — Kalen Pare',description:'Seven engineering projects spanning robotics, actuation, manufacturing, and mechanical design.'},{route:'about/',title:'About — Kalen Pare',description:'About Kalen Pare, mechatronics engineering student at the University of Alberta.'},{route:'experience/',title:'Experience — Kalen Pare',description:'Kalen Pare’s engineering résumé and experience.'},...projects.map(p=>({route:`projects/${p.slug}/`,title:`${p.title} — Kalen Pare`,description:p.summary,image:p.hero?.src}))];
for (const r of routes){
 let html=template.replace(/<title>.*?<\/title>/,`<title>${esc(r.title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/?>/,`<meta name="description" content="${esc(r.description)}"/>`).replace(/<meta property="og:title" content="[^"]*"\s*\/?>/,`<meta property="og:title" content="${esc(r.title)}"/>`).replace(/<meta property="og:description" content="[^"]*"\s*\/?>/,`<meta property="og:description" content="${esc(r.description)}"/>`);
 if(origin){const url=origin+'/'+r.route;html=html.replace('</head>',`<link rel="canonical" href="${esc(url)}"/><meta property="og:url" content="${esc(url)}"/>${r.image?`<meta property="og:image" content="${esc(origin+'/'+r.image)}"/>`:''}</head>`);}
 const out=path.join('dist',r.route);fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'index.html'),html);
}
fs.writeFileSync('dist/404.html',template.replace('<title>Kalen Pare — Mechatronics Engineering</title>','<title>Page not found — Kalen Pare</title>'));
fs.writeFileSync('dist/.nojekyll','');
if(origin){fs.writeFileSync('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(r=>`<url><loc>${esc(origin+'/'+r.route)}</loc></url>`).join('')+'</urlset>');fs.writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);}
console.log(`Generated ${routes.length} static routes (base ${base}). ${origin?'Sitemap and canonical metadata generated.':'Set SITE_URL for sitemap and canonical metadata.'}`);
