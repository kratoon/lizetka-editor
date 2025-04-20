export interface Meta {
    date: string;
    title: string;
    authors?: string[];
    categories?: string[];
}

export type ContentItemType = 'h1' | 'h2' | 'h3' | 'h4' | 'comment' | 'paragraph' | 'image' | 'gallery';

export interface ContentItem {
    type: ContentItemType;
    content: string | GalleryItem[] | ImageContent;
}

export interface ImageContent {
    src: string;
}

export type GalleryItem = GalleryImageItem | GalleryVideoItem;

export interface GalleryImageItem {
    type: 'image';
    title: string;
    src: string;
    link: string;
}

export interface GalleryVideoItem {
    type: 'video';
    title: string;
    src: string;
    poster: string;
    link: string;
}
