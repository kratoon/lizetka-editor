import { BlogPost, cleanBlogPost, GalleryItem } from '@/app/BlogPost';
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
                        {it.type === 'h1' ? <h1 className="text-4xl mb-5 font-bold">{it.content as string}</h1> : null}
                        {it.type === 'h2' ? <h2 className="text-3xl mb-5 font-semibold">{it.content as string}</h2> : null}
                        {it.type === 'h3' ? <h3 className="text-2xl mb-5 font-medium">{it.content as string}</h3> : null}
                        {it.type === 'h4' ? <h4 className="text-xl mb-5 font-medium">{it.content as string}</h4> : null}
                        {it.type === 'paragraph' ? <p className="mb-5">{it.content as string}</p> : null}
                        {it.type === 'youtube' ? <YoutubePreview youtubeId={it.content as string} /> : null}
                        {it.type === 'comment' ? <EndOfExcerpt /> : null}
                        {it.type === 'image' ? <ImagePreview image={it.content as string}></ImagePreview> : null}
                        {it.type === 'gallery' ? <GalleryPreview items={it.content as GalleryItem[]} /> : null}
                    </div>
                );
            })}
        </div>
    );
}

function GalleryPreview({ items }: { items: GalleryItem[] }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {items.map((it) => (
                <div
                    key={it.link + it.title}
                    onClick={() => {
                        window.location.href = it.link;
                    }}
                >
                    {it.title}
                    <img src={it.src} className="h-40 w-full max-w-full rounded-lg object-cover object-center" alt={it.title} />
                </div>
            ))}
        </div>
    );
}

function ImagePreview({ image }: { image: string }) {
    return <img src={image} alt="image" className="mt-4 mb-4" />;
}

function YoutubePreview({ youtubeId }: { youtubeId: string }) {
    return (
        <iframe
            className="w-full h-[20rem] mt-4 mb-4"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        ></iframe>
    );
}

function EndOfExcerpt() {
    return (
        <div className="relative mb-5 mt-10 mb-10">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="bg-gray-100 px-2 text-sm text-gray-500">konec náhledu</span>
            </div>
        </div>
    );
}
