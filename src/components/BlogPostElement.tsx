'use client';

import Select, { Option } from '@/components/Select';
import { ContentItem, ContentItemType } from '@/app/BlogPost';
import { useState } from 'react';
import TextInput from '@/components/TextInput';

interface Props {
    onChangeAction: (content: ContentItem | null) => void;
}

const elementTypeOptions = [
    { value: 'h1', label: 'Nadpis 1' },
    { value: 'h2', label: 'Nadpis 2' },
    { value: 'h3', label: 'Nadpis 3' },
    { value: 'paragraph', label: 'Odstavec' },
    // { value: 'image', label: 'Obrázek' },
    // { value: 'video', label: 'Video' },
    // { value: 'gallery', label: 'Galerie' },
    { value: 'end-of-excerpt', label: 'Konec náhledu' }
];

function isValid(item: Partial<ContentItem>): item is ContentItem {
    if (item == null || item.type == null) {
        return false;
    } else if (['h1', 'h2', 'h3', 'paragraph', 'comment'].includes(item.type)) {
        return item.content != null && item.content != '';
    }
    return true;
}

export default function BlogPostElement({ onChangeAction }: Props) {
    const [type, setType] = useState<ContentItemType>('h1');
    const [item, setItem] = useState<Partial<ContentItem>>({ type: 'h1' });
    const onSelectChange = (option: Option | undefined) => {
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
                    'end-of-excerpt': 'comment'
                } as Record<string, ContentItemType>
            )[`${type}`] ?? 'paragraph';
        setType(newType);
        const newItem: Partial<ContentItem> = { type: newType };
        if (item) {
            if (type === 'end-of-excerpt') {
                newItem.content = 'more';
            }
        }
        setItem(newItem);
        onChangeAction(isValid(newItem) ? newItem : null);
    };
    return (
        <div className="flex flex-wrap gap-1 w-full">
            <div className="w-3xs">
                <Select options={elementTypeOptions} onChangeAction={onSelectChange} />
            </div>
            {type === 'h1' ? (
                <div className="w-md">
                    <TextInput
                        defaultValue={item?.content as string}
                        maxLength={128}
                        onChangeAction={(value) => {
                            const newItem = { type, content: value };
                            setItem(newItem);
                            onChangeAction(isValid(newItem) ? newItem : null);
                        }}
                    ></TextInput>
                </div>
            ) : null}
            {type === 'h2' ? (
                <div className="w-md">
                    <TextInput
                        defaultValue={item?.content as string}
                        maxLength={128}
                        onChangeAction={(value) => {
                            const newItem = { type, content: value };
                            setItem(newItem);
                            onChangeAction(isValid(newItem) ? newItem : null);
                        }}
                    ></TextInput>
                </div>
            ) : null}
            {type === 'h3' ? (
                <div className="w-md">
                    <TextInput
                        defaultValue={item?.content as string}
                        maxLength={128}
                        onChangeAction={(value) => {
                            const newItem = { type, content: value };
                            setItem(newItem);
                            onChangeAction(isValid(newItem) ? newItem : null);
                        }}
                    ></TextInput>
                </div>
            ) : null}
            {type === 'paragraph' ? (
                <div className="w-md">
                    <TextInput
                        defaultValue={item?.content as string}
                        maxLength={128}
                        onChangeAction={(value) => {
                            const newItem = { type, content: value };
                            setItem(newItem);
                            onChangeAction(isValid(newItem) ? newItem : null);
                        }}
                    ></TextInput>
                </div>
            ) : null}
        </div>
    );
}
