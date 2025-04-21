import { BlogPost, cleanBlogPost } from '@/app/BlogPost';
import { useEffect, useState } from 'react';
import Switch from '@/components/Switch';

export interface Props {
    blogPost: BlogPost;
}
export default function BlogPostPreview({ blogPost }: Props) {
    const [isPreview, setIsPreview] = useState<boolean>(true);
    const [jsonString, setJsonString] = useState<string>('{}');
    useEffect(() => {
        setJsonString(JSON.stringify(cleanBlogPost(blogPost), null, 4));
    }, [blogPost]);
    return (
        <div>
            <div className="pt-1 pb-1 float-right">
                <Switch
                    disabledLabel="Config"
                    enabledLabel="Náhled"
                    enabled={isPreview}
                    onChange={(newIsPreview) => setIsPreview(newIsPreview)}
                ></Switch>
            </div>
            <code className="whitespace-pre-wrap p-1 font-mono">{jsonString}</code>
        </div>
    );
}
