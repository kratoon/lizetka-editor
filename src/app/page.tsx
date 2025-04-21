'use client';

import { useState } from 'react';
import AddCircle from '@mui/icons-material/AddCircle';
import Cancel from '@mui/icons-material/Cancel';
import Download from '@mui/icons-material/Download';
import BlogPostElement from '@/components/BlogPostElement';
import TextInput from '@/components/TextInput';
import { BlogPost, cleanBlogPost, ContentItem } from '@/app/BlogPost';
import BlogPostPreview from '@/components/BlogPostPreview';

export default function Home() {
    const [blogPost, setBlogPost] = useState<BlogPost>({
        meta: { date: formatDate(new Date()), title: `Blata ${new Date().getFullYear()}` },
        content: []
    });
    const onAddClick = (id: string | null) => {
        setBlogPost((prevPost) => {
            const content = [...prevPost.content];
            const newItem: Partial<ContentItem> = { id: crypto.randomUUID(), type: 'paragraph' };
            if (id == null) {
                content.push(newItem);
            } else {
                const index = content.findIndex((it) => it.id === id)! + 1;
                content.splice(index, 0, newItem);
            }
            return {
                meta: prevPost.meta,
                content
            };
        });
    };
    const onClearClick = (id: string) => {
        setBlogPost((prevPost) => {
            return {
                meta: prevPost.meta,
                content: prevPost.content.filter((it) => it.id !== id)
            };
        });
    };
    const onDownloadClick = () => {
        console.log(cleanBlogPost(blogPost));
    };
    return (
        <div className="flex">
            <div className="w-1/2 p-4 overflow-y-scroll" style={{ height: '100vh' }}>
                <div className="flex flex-col border-b border-gray-300 pt-4 pb-4">
                    <div className="w-md">
                        <TextInput
                            label="Titulek (součástí URL, vynech diakritiku)"
                            defaultValue={blogPost.meta.title}
                            maxLength={64}
                            onChangeAction={(value) =>
                                setBlogPost((prev) => {
                                    const newValue: BlogPost = { ...prev };
                                    newValue.meta.title = value;
                                    return newValue;
                                })
                            }
                        ></TextInput>
                    </div>
                    <div className="w-md pt-4">
                        <TextInput
                            label="Datum článku (YYYY-MM-DD)"
                            defaultValue={blogPost.meta.date}
                            maxLength={10}
                            onChangeAction={(value) =>
                                setBlogPost((prev) => {
                                    const newValue: BlogPost = { ...prev };
                                    newValue.meta.date = value;
                                    return newValue;
                                })
                            }
                        ></TextInput>
                    </div>
                </div>
                {blogPost.content.map((item) => (
                    <div key={item.id} className="flex border-b border-gray-300 pt-4 pb-4">
                        <a onClick={() => onClearClick(item.id!)} className="mt-1 mr-1 cursor-pointer text-red-600" title="Odebrat">
                            <Cancel />
                        </a>
                        <a onClick={() => onAddClick(item.id!)} className="mt-1 mr-1 cursor-pointer text-green-900" title="Přidat">
                            <AddCircle />
                        </a>
                        <div>
                            <BlogPostElement
                                item={item}
                                onChangeAction={(newItem) => {
                                    setBlogPost((prevPost) => {
                                        return {
                                            meta: prevPost.meta,
                                            content: prevPost.content.map((it) => (it.id === item.id ? newItem : it))
                                        };
                                    });
                                }}
                            />
                        </div>
                    </div>
                ))}
                <div className="flex w-full justify-end pt-10">
                    <a onClick={() => onAddClick(null)} className="cursor-pointer p-2 text-green-900 mr-8" title="Přidat">
                        <AddCircle style={{ transform: 'scale(1.5)' }} />
                    </a>
                    <a onClick={onDownloadClick} className="cursor-pointer p-2 mr-8 border rounded-md bg-gray-100" title="Stáhnout článek">
                        <Download className="mr-2" style={{ transform: 'scale(1.5)' }} />
                        stáhnout
                    </a>
                </div>
            </div>
            <div className="w-1/2 p-4 bg-gray-100 overflow-y-scroll" style={{ height: '100vh' }}>
                <code className="whitespace-pre-wrap p-1 font-mono">
                    <BlogPostPreview blogPost={blogPost}></BlogPostPreview>
                </code>
            </div>
        </div>
    );
}

function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
