import { hasString, isDictionary } from '@salesforce/ts-types';
import { isNotBlank } from '@/utils/string';

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

export type ContentItemType = 'h1' | 'h2' | 'h3' | 'h4' | 'comment' | 'paragraph' | 'image' | 'gallery' | 'youtube';

export interface ContentItem {
    type: ContentItemType;
    content: string | GalleryImageItem[] | ImageContent;
    id: string;
}

export interface ImageContent {
    src: string;
}

export interface GalleryImageItem {
    type: 'image';
    title: string;
    src: string;
    link: string;
    id: string;
}

export function isGalleryImageItem(item: unknown): item is GalleryImageItem {
    return isDictionary(item) && item.type === 'image' && hasString(item, 'title') && hasString(item, 'src') && hasString(item, 'link');
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
                if (Array.isArray(cleanItem.content)) {
                    cleanItem.content.forEach((contentItem: Partial<GalleryImageItem>) => {
                        if (!preserveIds) {
                            delete contentItem.id;
                        }
                    });
                }
                return cleanItem;
            })
    };
}

export function isValidContentItem(item: Partial<ContentItem>): item is ContentItem {
    if (item?.type == null) {
        return false;
    } else if (['h1', 'h2', 'h3', 'paragraph', 'comment', 'image', 'youtube'].includes(item.type)) {
        return isNotBlank(item.content);
    } else if (item.type === 'gallery') {
        return (
            item.content != null &&
            Array.isArray(item.type) &&
            (item.content as GalleryImageItem[]).every((it) => {
                return it.type === 'image' && isNotBlank(it.title) && isNotBlank(it.src) && isNotBlank(it.link);
            })
        );
    }
    return false;
}
