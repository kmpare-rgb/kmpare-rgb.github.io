export type Asset = {
    src: string;
    small?: string;
    alt: string;
    caption: string;
    width?: number;
    height?: number;
};
export type Project = {
    id: string;
    slug: string;
    title: string;
    summary: string;
    description: string;
    category: string;
    tools: string[];
    order: number;
    featured: boolean;
    hero: Asset | null;
    gallery: Asset[];
    objectives: string[];
    contributions: string[];
    process: {
        title: string;
        body: string;
    }[];
    results: string[];
    lessons: string[];
    metrics: string[][];
    status: string;
    sources: string[];
    placeholder?: boolean;
    missing?: string[];
    modules?: {
        title: string;
        body: string;
    }[];
};
const modules = import.meta.glob('./projects/*.json', { eager: true, import: 'default' });
export const projects = Object.values(modules).map(p => p as Project).sort((a, b) => a.order - b.order);
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
export const projectUrl = (p: Project) => assetUrl(`projects/${p.slug}/`);
