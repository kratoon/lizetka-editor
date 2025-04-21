import { classNames } from '@/utils/css';

interface Props {
    disabledLabel: string;
    enabledLabel: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}

export default function Switch({ disabledLabel, enabledLabel, enabled, onChange }: Props) {
    return (
        <div className="flex gap-1 rounded-full bg-gray-950/5 p-1" role="tablist">
            <button
                className={classNames(
                    'group flex items-center rounded-full px-4 text-sm/7 font-medium cursor-pointer',
                    enabled ? '' : 'bg-white ring ring-gray-950/5'
                )}
                role="tab"
                type="button"
                tabIndex={enabled ? -1 : 0}
                onClick={() => onChange(!enabled)}
            >
                {disabledLabel}
            </button>
            <button
                className={classNames(
                    'group flex items-center rounded-full px-4 text-sm/7 font-medium cursor-pointer',
                    enabled ? 'bg-white ring ring-gray-950/5' : ''
                )}
                role="tab"
                type="button"
                tabIndex={enabled ? 0 : -1}
                onClick={() => onChange(!enabled)}
            >
                {enabledLabel}
            </button>
        </div>
    );
}
