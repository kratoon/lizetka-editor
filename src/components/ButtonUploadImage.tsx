import { ChangeEvent } from 'react';

export default function ButtonUploadImage({ onUpload }: { onUpload: (image: string | null) => void }) {
    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            onUpload(null);
            return;
        }
        const file = e.target.files[0];
        if (!file) {
            onUpload(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target) {
                onUpload(event.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    };
    return (
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded inline-flex items-center cursor-pointer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
            </svg>
            <input type="file" name="image" accept="image/png,image/jpeg,image/jpg" className="hidden" onChange={onImageChange} />
            <div className="pl-2">nahrát soubor</div>
        </button>
    );
}
