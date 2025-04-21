import { BlogPost, cleanBlogPost } from '@/app/BlogPost';
import { useState } from 'react';
import Switch from '@/components/Switch';

export interface Props {
    blogPost: BlogPost;
}

export default function BlogPostPreview({ blogPost }: Props) {
    const [isPreview, setIsPreview] = useState<boolean>(true);
    return (
        <div className="flex flex-wrap">
            <div className="w-full">
                <div className="pt-1 pb-1 float-right">
                    <Switch
                        disabledLabel="Config"
                        enabledLabel="Náhled"
                        enabled={isPreview}
                        onChange={(newIsPreview) => setIsPreview(newIsPreview)}
                    ></Switch>
                </div>
            </div>
            {isPreview ? <Preview blogPost={blogPost}></Preview> : <Config blogPost={blogPost} />}
        </div>
    );
}

function Config({ blogPost }: { blogPost: BlogPost }) {
    return <code className="whitespace-pre-wrap p-1 font-mono">{JSON.stringify(cleanBlogPost(blogPost), null, 4)}</code>;
}

function Preview({ blogPost }: { blogPost: BlogPost }) {
    return (
        <div className="flex flex-wrap p-1 w-full">
            {cleanBlogPost(blogPost, true).content.map((it) => {
                return (
                    <div key={it.id} className="w-full">
                        {it.type === 'h1' ? <h1 className="text-4xl font-bold">{it.content as string}</h1> : null}
                        {it.type === 'h2' ? <h2 className="text-3xl font-semibold">{it.content as string}</h2> : null}
                        {it.type === 'h3' ? <h3 className="text-2xl font-medium">{it.content as string}</h3> : null}
                        {it.type === 'h4' ? <h4 className="text-xl font-medium">{it.content as string}</h4> : null}
                        {it.type === 'paragraph' ? <p className="mb-5">{it.content as string}</p> : null}
                        {it.type === 'comment' ? <EndOfExcerpt /> : null}
                    </div>
                );
            })}
        </div>
    );
}

function EndOfExcerpt() {
    return (
        <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="bg-gray-100 px-2 text-sm text-gray-500">konec náhledu</span>
            </div>
        </div>
    );
}
