import { useRef, useState } from 'react';
import { type Asset, assetUrl } from '../content';
import { ProjectImage } from './ProjectCard';
export function ProjectGallery({ images }: {
    images: Asset[];
}) {
    const dialog = useRef<HTMLDialogElement>(null);
    const [index, setIndex] = useState(0);
    const open = (i: number) => { setIndex(i); dialog.current?.showModal(); };
    return <><div className="gallery-grid">{images.map((im, i) => <figure key={im.src}><button className="gallery-button" onClick={() => open(i)} aria-label={`Enlarge: ${im.caption}`}><ProjectImage image={im}/><span aria-hidden="true">↗</span></button><figcaption><span className="mono">{String(i + 1).padStart(2, '0')}</span>{im.caption}</figcaption></figure>)}</div><dialog aria-label="Project image viewer" className="lightbox" ref={dialog} onClick={e => { if (e.target === dialog.current)
        dialog.current.close(); }}><button className="lightbox-close" onClick={() => dialog.current?.close()} aria-label="Close image">×</button><img src={assetUrl(images[index]?.src || '')} alt={images[index]?.alt}/><div className="lightbox-controls"><button onClick={() => setIndex((index + images.length - 1) % images.length)} aria-label="Previous image">←</button><p>{images[index]?.caption} · {index + 1}/{images.length}</p><button onClick={() => setIndex((index + 1) % images.length)} aria-label="Next image">→</button></div></dialog></>;
}
