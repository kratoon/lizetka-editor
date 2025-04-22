'use client';

import { useState } from 'react';
import AddCircle from '@mui/icons-material/AddCircle';
import Cancel from '@mui/icons-material/Cancel';
import BlogPostElement from '@/components/BlogPostElement';
import TextInput from '@/components/TextInput';
import { BlogPost, cleanBlogPost, ContentItem } from '@/app/BlogPost';
import BlogPostPreview from '@/components/BlogPostPreview';
import { downloadFile } from '@/utils/fileDownload';
import ButtonDownload from '@/components/ButtonDownload';
import { createDefaultBlogPost } from '@/utils/defaultBlogPost';

export default function Home() {
    const [blogPost, setBlogPost] = useState<BlogPost>(createDefaultBlogPost());
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
        const isValidDate = blogPost.meta.date != null && blogPost.meta.date !== '' && /^\d{4}-\d{2}-\d{2}$/.test(blogPost.meta.date);
        const isValidTitle = blogPost.meta.title != null && blogPost.meta.title !== '' && /^[a-zA-Z0-9 ]*$/.test(blogPost.meta.title);
        if (!isValidTitle) {
            alert('Titulek není validní');
        } else if (!isValidDate) {
            alert('Datum článku není validní');
        } else {
            downloadFile(JSON.stringify(cleanBlogPost(blogPost), null, 4), `${blogPost.meta.title.toLowerCase().replace(/\s/, '-')}.json`);
        }
    };
    return (
        <div className="flex">
            <div className="w-1/2 p-4 overflow-y-scroll" style={{ height: '100vh' }}>
                <div className="flex w-full justify-end items-center">
                    <span className="mr-2">
                        <ButtonDownload onClick={onDownloadClick} />
                    </span>
                </div>
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
                        <a
                            onClick={() => onClearClick(item.id!)}
                            className="mt-1 mr-1 cursor-pointer hover:text-red-600 text-red-500"
                            title="Odebrat"
                        >
                            <Cancel />
                        </a>
                        <a
                            onClick={() => onAddClick(item.id!)}
                            className="mt-1 mr-1 cursor-pointer hover:text-green-900 text-green-800"
                            title="Přidat"
                        >
                            <AddCircle />
                        </a>
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
                ))}
                <div className="flex w-full justify-end pt-10 items-center">
                    <a onClick={() => onAddClick(null)} className="cursor-pointer hover:text-green-900 text-green-800 mr-8" title="Přidat">
                        <AddCircle style={{ transform: 'scale(1.5)' }} />
                    </a>
                    <span className="mr-2">
                        <ButtonDownload onClick={onDownloadClick} />
                    </span>
                </div>
            </div>
            <div className="w-1/2 pl-4 pr-4 pb-4 bg-gray-100 overflow-y-scroll" style={{ height: '100vh' }}>
                <BlogPostPreview blogPost={blogPost}></BlogPostPreview>
            </div>
        </div>
    );
}
