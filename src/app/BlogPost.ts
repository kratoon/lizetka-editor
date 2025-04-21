export interface BlogPost {
    meta: Meta;
    content: Partial<ContentItem>[];
}

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
    id: string;
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

export function cleanBlogPost(blogPost: BlogPost, preserveIds: boolean = false) {
    return {
        meta: blogPost.meta,
        content: blogPost.content
            .filter((it) => isValidContentItem(it))
            .map((it: Partial<ContentItem>) => {
                const cleanItem = { ...it };
                if (!preserveIds) {
                    delete cleanItem.id;
                }
                return cleanItem;
            })
    };
}

export function isValidContentItem(item: Partial<ContentItem>): item is ContentItem {
    if (item == null || item.type == null) {
        return false;
    } else if (['h1', 'h2', 'h3', 'paragraph', 'comment'].includes(item.type)) {
        return item.content != null && item.content != '';
    }
    return true;
}
