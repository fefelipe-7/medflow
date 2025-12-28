import React from 'react';
import { Info } from 'lucide-react';

export const InfoTooltip = ({ text }: { text: string }) => (
    <div className="group relative ml-auto">
        <Info className="h-4 w-4 text-slate-600 hover:text-slate-400 cursor-help transition-colors" />
        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 translate-y-1 group-hover:translate-y-0">
            {text}
            <div className="absolute -bottom-1 right-1 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45"></div>
        </div>
    </div>
);
