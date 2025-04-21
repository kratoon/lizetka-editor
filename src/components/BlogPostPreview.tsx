import { BlogPost, cleanBlogPost } from '@/app/BlogPost';
import { useEffect, useState } from 'react';

export interface Props {
    blogPost: BlogPost;
}
export default function BlogPostPreview({ blogPost }: Props) {
    const [jsonString, setJsonString] = useState<string>('{}');
    useEffect(() => {
        setJsonString(JSON.stringify(cleanBlogPost(blogPost), null, 4));
    }, [blogPost]);
    return <code className="whitespace-pre-wrap p-1 font-mono">{jsonString}</code>;
}
