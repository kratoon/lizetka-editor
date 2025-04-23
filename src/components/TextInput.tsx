import SearchIcon from '@mui/icons-material/Search';
import { classNames } from '@/utils/css';
import { ExclamationCircleIcon, UserIcon } from '@heroicons/react/20/solid';
import { ReactElement } from 'react';

interface Props {
    label?: string;
    icon?: 'search' | 'user';
    defaultValue?: string | null;
    type?: string;
    onChangeAction?: (value: string) => void;
    error?: string | null;
    maxLength?: number;
    helpText?: ReactElement;
}

export default function TextInput({ label, icon, defaultValue, type, onChangeAction, error, maxLength, helpText }: Props) {
    return (
        <div>
            <div className="flex">
                {label ? (
                    <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
                        {label}
                    </label>
                ) : null}
                {helpText ? <span className="pl-2 pt-1">{helpText}</span> : null}
            </div>
            <div className="relative rounded-md shadow-sm">
                <input
                    onChange={(event) => onChangeAction && onChangeAction(event.target.value)}
                    defaultValue={defaultValue ?? ''}
                    type={type ?? 'text'}
                    name="search"
                    id="search"
                    maxLength={maxLength}
                    className={classNames(
                        'block w-full rounded-md border-0 py-1.5 pl-2 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                        error
                            ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                            : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-orange-600'
                    )}
                />
                {error ? (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                ) : null}
                {icon ? (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {icon === 'search' ? <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : null}
                        {icon === 'user' ? <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : null}
                    </div>
                ) : null}
            </div>
            {error ? (
                <p className="mt-2 text-sm text-red-600" id="search">
                    {error}
                </p>
            ) : null}
        </div>
    );
}
