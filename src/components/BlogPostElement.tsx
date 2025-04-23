'use client';

import Select, { Option } from '@/components/Select';
import { ContentItem, ContentItemType, GalleryImageItem } from '@/app/BlogPost';
import { useEffect, useState } from 'react';
import TextInput from '@/components/TextInput';
import ButtonUploadImage from '@/components/ButtonUploadImage';
import { classNames } from '@/utils/css';
import AddCircle from '@mui/icons-material/AddCircle';
import Cancel from '@mui/icons-material/Cancel';
import Tooltip from '@/components/Tooltip';
import { newId } from '@/utils/string';

interface Props {
    onChangeAction: (content: Partial<ContentItem>) => void;
    item: Partial<ContentItem>;
}

const headings: string[] = ['h1', 'h2', 'h3', 'h4'];

const elementTypeOptions: Option[] = [
    { value: 'h1', label: 'Nadpis 1' },
    { value: 'h2', label: 'Nadpis 2' },
    { value: 'h3', label: 'Nadpis 3' },
    { value: 'paragraph', label: 'Odstavec' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'image', label: 'Obrázek' },
    { value: 'gallery', label: 'Galerie' },
    // { value: 'video', label: 'Video' },
    { value: 'end-of-excerpt', label: 'Konec náhledu' }
];

export default function BlogPostElement({ onChangeAction, item }: Props) {
    const [elementType, setElementType] = useState<Option>(elementTypeOptions.find((it) => it.value === 'paragraph')!);
    useEffect(() => {
        if (item.type) {
            const elementType: Option =
                item.type === 'comment' && item.content === 'more'
                    ? elementTypeOptions.find((it) => it.value === 'end-of-excerpt')!
                    : elementTypeOptions.find((it) => it.value === item.type)!;
            setElementType(elementType);
        }
    }, [item.type, item.content]);
    const onSelectChange = (option: Option) => {
        const type = option?.value;
        if (!type) {
            return;
        }
        const newType: ContentItemType =
            (
                {
                    h1: 'h1',
                    h2: 'h2',
                    h3: 'h3',
                    paragraph: 'paragraph',
                    image: 'image',
                    gallery: 'gallery',
                    youtube: 'youtube',
                    'end-of-excerpt': 'comment'
                } as Record<string, ContentItemType>
            )[`${type}`] ?? 'paragraph';
        const newItem: Partial<ContentItem> = { id: item.id, type: newType };
        if (item) {
            if (type === 'end-of-excerpt') {
                newItem.content = 'more';
            }
            if (item.type != null && headings.includes(item.type) && headings.includes(newType)) {
                newItem.content = item.content;
            }
            if (newType === 'gallery') {
                newItem.content = addGalleryImageItem(newItem);
            }
        }
        setElementType(option);
        onChangeAction(newItem);
    };
    const addGalleryImageItem = (currentItem: Partial<ContentItem>) => {
        const content: GalleryImageItem[] = Array.isArray(currentItem.content) ? currentItem.content : [];
        content.push({ id: newId(), type: 'image', src: '', title: '', link: '' });
        return content;
    };
    return (
        <div className={classNames('flex flex-wrap gap-1 w-full', item.type === 'image' ? 'justify-between' : null)}>
            <div className="w-[9rem]">
                <Select options={elementTypeOptions} onChangeAction={onSelectChange} selected={elementType} />
            </div>
            {item.type != null && [...headings, 'youtube'].includes(item.type) ? (
                <div className="grow">
                    <TextInput
                        defaultValue={item?.content as string}
                        maxLength={128}
                        onChangeAction={(value) => onChangeAction({ ...item, content: value })}
                    ></TextInput>
                </div>
            ) : null}
            {item.type === 'paragraph' ? (
                <div className="grow">
                    <TextInput
                        defaultValue={item?.content as string}
                        onChangeAction={(value) => onChangeAction({ ...item, content: value })}
                    ></TextInput>
                </div>
            ) : null}
            {item.type === 'image' ? (
                <div>
                    <ButtonUploadImage id={item.id!} onUploadAction={(value) => onChangeAction({ ...item, content: value ?? '' })} />
                </div>
            ) : null}
            {item.type === 'gallery' ? (
                <div className="flex flex-wrap">
                    <Gallery onChangeAction={onChangeAction} item={item} />
                    <div className="w-full float-right">
                        <a
                            onClick={() => {
                                const content = addGalleryImageItem(item);
                                onChangeAction({ ...item, content });
                            }}
                            className="cursor-pointer hover:text-green-900 text-green-800 mr-8"
                            title="Přidat obrázek do galerie"
                        >
                            <AddCircle />
                        </a>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function Gallery({ item, onChangeAction }: { item: Partial<ContentItem>; onChangeAction: (content: Partial<ContentItem>) => void }) {
    const content: GalleryImageItem[] = Array.isArray(item.content) ? item.content : [];
    return content.map((it) => {
        return (
            <div key={it.id} className="flex">
                <div className="">
                    <TextInput
                        label="Titulek"
                        defaultValue={it.title}
                        onChangeAction={(value) => {
                            onChangeAction({
                                ...item,
                                content: content.map((curr) => (curr.id === it.id ? { ...curr, title: value } : curr))
                            });
                        }}
                        helpText={<Tooltip text="Nadpis pro obázek/galerii na adrese odkazu" />}
                    ></TextInput>
                </div>
                <div className="pl-2">
                    <TextInput
                        label="Odkaz"
                        defaultValue={it.link}
                        onChangeAction={(value) => {
                            onChangeAction({
                                ...item,
                                content: content.map((curr) => (curr.id === it.id ? { ...curr, link: value } : curr))
                            });
                        }}
                        helpText={<Tooltip text="URL do Zonerama" />}
                    ></TextInput>
                </div>
                <div className="pl-2 pt-6">
                    <ButtonUploadImage
                        id={it.id!}
                        onUploadAction={(value) => {
                            onChangeAction({
                                ...item,
                                content: content.map((curr) => (curr.id === it.id ? { ...curr, src: value ?? '' } : curr))
                            });
                        }}
                    />
                </div>
                <div className="pl-2 pt-7">
                    <a
                        onClick={() => {
                            onChangeAction({ ...item, content: content.filter((curr) => curr.id != it.id) });
                        }}
                        className="cursor-pointer hover:text-red-600 text-red-500"
                        title="Odebrat"
                    >
                        <Cancel />
                    </a>
                </div>
            </div>
        );
    });
}
