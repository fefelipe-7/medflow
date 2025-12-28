import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface CheckboxFieldProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, checked, onChange }) => (
    <div
        className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-all ${checked ? 'bg-brand-900/10 border-brand-900/50' : 'bg-slate-900 border-slate-700'}`}
        onClick={() => onChange(!checked)}
    >
        <span className={`text-sm ${checked ? 'text-brand-300' : 'text-slate-400'}`}>{label}</span>
        <div className={`h-5 w-5 rounded border flex items-center justify-center ${checked ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-600'}`}>
            {checked && <CheckCircle2 className="h-3.5 w-3.5" />}
        </div>
    </div>
);
