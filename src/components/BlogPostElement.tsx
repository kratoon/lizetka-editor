'use client';

import Select, { Option } from '@/components/Select';
import { ContentItem, ContentItemType } from '@/app/BlogPost';
import { useEffect, useState } from 'react';
import TextInput from '@/components/TextInput';
import ButtonUploadImage from '@/components/ButtonUploadImage';
import { classNames } from '@/utils/css';

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
    { value: 'image', label: 'Obrázek' },
    // { value: 'video', label: 'Video' },
    // { value: 'gallery', label: 'Galerie' },
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
        }
        setElementType(option);
        onChangeAction(newItem);
    };
    return (
        <div className={classNames('flex flex-wrap gap-1 w-full', item.type === 'image' ? 'justify-between' : null)}>
            <div className="w-[9rem]">
                <Select options={elementTypeOptions} onChangeAction={onSelectChange} selected={elementType} />
            </div>
            {item.type != null && headings.includes(item.type) ? (
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
                <div className="">
                    <ButtonUploadImage onUpload={(value) => onChangeAction({ ...item, content: value ?? '' })} />
                </div>
            ) : null}
        </div>
    );
}
