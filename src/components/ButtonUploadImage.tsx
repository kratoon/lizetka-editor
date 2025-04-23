'use client';

import { ChangeEvent } from 'react';

export default function ButtonUploadImage({ onUploadAction, id }: { onUploadAction: (image: string | null) => void; id: string }) {
    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            onUploadAction(null);
            return;
        }
        const file = e.target.files[0];
        if (!file) {
            onUploadAction(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target) {
                onUploadAction(event.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    };
    return (
        <div>
            <input id={id} type="file" name="image" accept="image/png,image/jpeg,image/jpg" className="hidden" onChange={onImageChange} />
            <label
                htmlFor={id}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1.5 px-4 rounded inline-flex items-center cursor-pointer"
            >
                <svg className="fill-current h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <div>nahrát</div>
            </label>
        </div>
    );
}
