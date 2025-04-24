import { BlogPost, ContentItem } from '@/app/BlogPost';
import { newId } from '@/utils/string';
import postJson from './defaultBlogPost.json';

let defaultPost: BlogPost;

export function createDefaultBlogPost(): BlogPost {
    if (!defaultPost) {
        defaultPost = {
            meta: postJson.meta,
            content: postJson.content.map((it) => {
                const content = Array.isArray(it.content) ? it.content.map((a) => ({ ...a, id: newId() })) : it.content;
                return { ...it, id: newId(), content };
            }) as Partial<ContentItem>[]
        };
    }
    return defaultPost;
}
