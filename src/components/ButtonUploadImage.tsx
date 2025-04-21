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
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer">
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <input type="file" name="image" accept="image/png,image/jpeg,image/jpg" className="cursor-pointer" onChange={onImageChange} />
        </button>
    );
}
