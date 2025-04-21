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

export function createDefaultBlogPost(): BlogPost {
    function formatDate(date: Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const title = `Blata ${new Date().getFullYear()}`;
    return {
        meta: { date: formatDate(new Date()), title },
        content: [
            { type: 'h1' as ContentItemType, content: title },
            {
                type: 'paragraph' as ContentItemType,
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique in mi eu varius. Vestibulum pharetra tellus nec tincidunt suscipit. Fusce pretium justo purus, ac imperdiet ipsum mattis vitae. Aliquam erat volutpat. Aenean vitae elit lectus. Fusce nisi nibh, dapibus vitae libero ac, ultrices venenatis arcu. Integer facilisis, dolor in faucibus auctor, ligula ipsum luctus augue, eget eleifend velit magna imperdiet mi. Nulla nec dignissim metus.'
            },
            { type: 'comment' as ContentItemType, content: 'more' },
            {
                type: 'h2' as ContentItemType,
                content: 'Nástup'
            },
            { type: 'paragraph' as ContentItemType, content: 'Tenhle a další odstavce se zobrazí až po rozkliknutí článku.' },
            {
                type: 'paragraph' as ContentItemType,
                content:
                    'Curabitur imperdiet pellentesque lorem ut fermentum. Nunc pharetra nibh sed velit sagittis viverra. Nam sollicitudin ipsum eu consequat aliquet. Nulla orci dui, accumsan non odio a, faucibus ornare ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc commodo eros non felis dictum, blandit eleifend ligula auctor. Aliquam et blandit risus. Proin augue nibh, vestibulum vitae erat vitae, aliquam molestie sapien. Nam egestas id nisl a lobortis.'
            },
            {
                type: 'h2' as ContentItemType,
                content: 'Bojovka'
            },
            {
                type: 'paragraph' as ContentItemType,
                content:
                    'Fusce posuere risus sit amet turpis placerat feugiat. Suspendisse elementum lobortis justo nec efficitur. Cras commodo, metus at aliquam faucibus, mauris arcu dapibus massa, a aliquam lacus nulla non erat. Phasellus pharetra tellus ultricies lectus mattis facilisis. Praesent ut finibus neque. Donec dignissim urna quis maximus rhoncus. Nulla dui dui, molestie congue maximus ac, sagittis in mauris. Maecenas bibendum eu leo quis mollis. Integer tempus nibh est, congue placerat lectus luctus vel. Nam nisl tellus, accumsan ac nibh nec, mattis congue nibh. Donec id massa mauris. Pellentesque quis dui risus. Duis et venenatis magna, ullamcorper hendrerit purus.'
            },
            {
                type: 'h2' as ContentItemType,
                content: 'Večeře'
            },
            {
                type: 'paragraph' as ContentItemType,
                content:
                    'Sed accumsan imperdiet dolor non volutpat. Nunc nec diam libero. Nullam a gravida leo, pharetra gravida justo. Morbi sit amet lacinia nibh. Integer varius nisi sed dui pulvinar efficitur. Nunc sodales diam vitae lectus varius, et hendrerit nisl efficitur. In ac faucibus justo. Morbi sodales leo id mi mollis, sit amet aliquet nisl hendrerit.'
            }
        ].map((it) => ({ ...it, id: crypto.randomUUID() }))
    };
}
