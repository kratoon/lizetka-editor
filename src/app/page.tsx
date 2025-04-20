'use client';

import { JSX, useEffect, useState } from 'react';
import AddCircle from '@mui/icons-material/AddCircle';
import Cancel from '@mui/icons-material/Cancel';
import Download from '@mui/icons-material/Download';
import BlogPostElement from '@/components/BlogPostElement';
import TextInput from '@/components/TextInput';
import { ContentItem, Meta } from '@/app/BlogPost';

export default function Home() {
    const [elements, setElements] = useState<JSX.Element[]>([]);
    const [meta, setMeta] = useState<Meta>({ date: formatDate(new Date()), title: `Blata ${new Date().getFullYear()}` });
    const [contentByKey, setContentByKey] = useState<Record<string, ContentItem | null>>({});
    const [config, setConfig] = useState<string>();
    const onAddClick = (key: string | null) => {
        setElements((prev) => {
            const newElement = (
                <BlogPostElement
                    key={crypto.randomUUID()}
                    onChangeAction={(contentItem) => {
                        setContentByKey((items) => ({ ...items, [newElement.key!]: contentItem }));
                    }}
                />
            );
            const array = [...prev];
            if (!key) {
                array.push(newElement);
            } else {
                const index = array.findIndex((item) => item.key === key);
                if (index !== -1) {
                    array.splice(index + 1, 0, newElement);
                } else {
                    array.push(newElement);
                }
            }
            return array;
        });
    };
    const onClearClick = (key: string) => {
        setElements((prev) => {
            setContentByKey((items) => {
                const result = { ...items };
                if (result.hasOwnProperty(key)) {
                    delete result[key];
                }
                return result;
            });
            return prev.filter((it) => it.key !== key);
        });
    };
    const onDownloadClick = () => {
        console.log(config);
    };
    useEffect(() => {
        setConfig(
            JSON.stringify(
                {
                    meta,
                    content: elements.map((it) => (it.key ? contentByKey[it.key] : null)).filter((it) => it != null)
                },
                null,
                4
            )
        );
    }, [meta, elements, contentByKey]);
    return (
        <div className="flex">
            <div className="w-1/2 p-4 bg-red">
                <div className="flex flex-col border-b border-gray-300 pt-4 pb-4">
                    <div className="w-md">
                        <TextInput
                            label="Titulek (součástí URL, vynech diakritiku)"
                            defaultValue={meta.title}
                            maxLength={64}
                            onChangeAction={(value) => setMeta((prev) => ({ ...prev, title: value }))}
                        ></TextInput>
                    </div>
                    <div className="w-md pt-4">
                        <TextInput
                            label="Datum článku (YYYY-MM-DD)"
                            defaultValue={meta.date}
                            maxLength={10}
                            onChangeAction={(value) => setMeta((prev) => ({ ...prev, date: value }))}
                        ></TextInput>
                    </div>
                </div>
                {elements.map((it) => (
                    <div key={it.key} className="flex border-b border-gray-300 pt-4 pb-4">
                        <a onClick={() => onClearClick(it.key!)} className="mt-1 mr-1 cursor-pointer text-red-600" title="Odebrat">
                            <Cancel />
                        </a>
                        <a onClick={() => onAddClick(it.key)} className="mt-1 mr-1 cursor-pointer text-green-900" title="Přidat">
                            <AddCircle />
                        </a>
                        <div>{it}</div>
                    </div>
                ))}
                <div className="flex w-full justify-end pt-10">
                    <a onClick={() => onAddClick(null)} className="cursor-pointer text-green-900 mr-8" title="Přidat">
                        <AddCircle style={{ transform: 'scale(1.5)' }} />
                    </a>
                    <a onClick={onDownloadClick} className="cursor-pointer mr-8" title="Stáhnout článek">
                        <Download style={{ transform: 'scale(1.5)' }} />
                    </a>
                </div>
            </div>
            <div className="w-1/2 p-4 bg-gray-100">
                <code className="whitespace-pre-wrap p-1 font-mono">{config}</code>
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
