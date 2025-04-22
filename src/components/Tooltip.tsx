import { Tooltip } from '@material-tailwind/react';

interface Props {
    text: string;
}

export default function CustomTooltip({ text }: Props) {
    return (
        <Tooltip
            content={
                <div className="w-80  pl-2">
                    <div>{text}</div>
                </div>
            }
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
                strokeWidth={2}
                className="h-5 w-5 cursor-pointer text-blue-gray-500"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
            </svg>
        </Tooltip>
    );
}
