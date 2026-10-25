import {useLayoutEffect,useRef,type ReactNode} from 'react';
import gsap from 'gsap';
export function AutoCarousel({items,label,kind='experience'}:{items:ReactNode[];label:string;kind?:'experience'|'photos'}){
 const viewport=useRef<HTMLDivElement>(null),track=useRef<HTMLDivElement>(null);
 const motion=useRef({phase:0,speed:1,target:1});
 const count=items.length;
 useLayoutEffect(()=>{
  if(!viewport.current||!track.current||!count)return;
  const container=viewport.current,rail=track.current,cards=Array.from(rail.children) as HTMLElement[];
  const media=matchMedia('(prefers-reduced-motion: reduce)');let visible=true,width=container.clientWidth;
  const resize=new ResizeObserver(()=>{width=container.clientWidth});resize.observe(container);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting});observer.observe(container);
  const render=(_time:number,delta:number)=>{
   const state=motion.current;state.speed+=(state.target-state.speed)*Math.min(delta/500,1);
   if(!media.matches&&visible&&!document.hidden&&count>1)state.phase+=Math.min(delta,64)/6500*state.speed;
   state.phase=((state.phase%count)+count)%count;
   const cardWidth=cards[0].offsetWidth,step=cardWidth+24,center=count+state.phase;
   gsap.set(rail,{x:(width-cardWidth)/2-center*step});
   cards.forEach((card,i)=>{const distance=Math.min(Math.abs(i-center),1);gsap.set(card,{scale:1-distance*.14,opacity:1-distance*.58});card.setAttribute('aria-hidden',String(i!==Math.round(center)))});
  };
  gsap.ticker.add(render);
  return()=>{gsap.ticker.remove(render);resize.disconnect();observer.disconnect()};
 },[count]);
 const advance=(direction:number)=>{motion.current.phase=Math.round(motion.current.phase)+direction};
 return <div className={`auto-carousel ${kind}`} role="region" aria-roledescription="carousel" aria-label={label}><div className="auto-viewport" ref={viewport} onPointerOver={e=>{if(e.target instanceof HTMLImageElement)motion.current.target=.18}} onPointerOut={e=>{if(e.target instanceof HTMLImageElement)motion.current.target=1}}><div className="auto-track" ref={track}>{[...items,...items,...items].map((content,i)=><div className="auto-slide" key={i} aria-hidden={i!==count}>{content}</div>)}</div></div><div className="carousel-controls"><button onClick={()=>advance(-1)} aria-label={`Previous ${kind==='photos'?'photo':'experience'}`}>←</button><button onClick={()=>advance(1)} aria-label={`Next ${kind==='photos'?'photo':'experience'}`}>→</button></div></div>
}
