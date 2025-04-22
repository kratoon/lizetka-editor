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
import Tooltip from '@/components/Tooltip';

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
        const areCategoriesValid =
            blogPost.meta.categories != null &&
            blogPost.meta.categories.every((it) => it !== '' && /^[áčďéěíňóřšťúůýža-zA-Z0-9 ]*$/.test(it));
        if (!isValidTitle) {
            alert('Titulek není validní');
        } else if (!isValidDate) {
            alert('Datum článku není validní');
        } else if (!areCategoriesValid) {
            alert('Kategorie nejsou validní, pouze alfanumerický hodnoty jsou povoleny.');
        } else if (blogPost.content.filter((it) => it.type === 'comment' && it.content === 'more').length === 0) {
            alert('Chybí konec náhledu. Přidej konec náhledu, ideálně za první krátkou část článku.');
        } else if (blogPost.content.filter((it) => it.type === 'comment' && it.content === 'more').length > 1) {
            alert('Konec náhledu může být specifikován pouze jednou');
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
                <div className="flex flex-wrap border-b border-gray-300 pt-4 pb-4">
                    <div className="w-1/2 px-1 py-2">
                        <TextInput
                            label="Titulek"
                            helpText={<Tooltip text="Vynech diakritiku, je součástí URL." />}
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
                    <div className="w-1/2 px-1 py-2">
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
                    <div className="w-1/2 px-1 py-2">
                        <TextInput
                            label="Kategorie"
                            helpText={<Tooltip text="Heslovitě kategorie článku. Více hodnot možno oddělit čárkou." />}
                            defaultValue={(blogPost.meta.categories ?? []).join(',')}
                            maxLength={64}
                            onChangeAction={(value) =>
                                setBlogPost((prev) => {
                                    const newValue: BlogPost = { ...prev };
                                    newValue.meta.categories = value
                                        .toLowerCase()
                                        .split(',')
                                        .map((it) => it.trim())
                                        .filter((it) => it !== '');
                                    return newValue;
                                })
                            }
                        ></TextInput>
                    </div>
                    <div className="w-1/2 px-1 py-2">
                        <TextInput
                            label="Autor článku"
                            helpText={<Tooltip text="Odpovídá uživatelskému jménu na GitHub. Více hodnot možno oddělit čárkou." />}
                            defaultValue={(blogPost.meta.authors ?? []).join(',')}
                            maxLength={64}
                            onChangeAction={(value) =>
                                setBlogPost((prev) => {
                                    const newValue: BlogPost = { ...prev };
                                    newValue.meta.authors = value
                                        .split(',')
                                        .map((it) => it.trim())
                                        .filter((it) => it !== '');
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
