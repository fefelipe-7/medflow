import React from 'react';

interface StatBlockProps {
    title: string;
    value: string;
    change: string;
    icon: React.ComponentType<any>;
    trendPositive: boolean;
}

export const StatBlock: React.FC<StatBlockProps> = ({ title, value, change, icon: Icon, trendPositive }) => (
    <div className="bg-slate-900/50 border border-slate-800/60 rounded-lg p-5">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-950 rounded-md text-slate-400"><Icon className="h-4 w-4" /></div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${trendPositive ? 'bg-emerald-950/30 text-emerald-400' : 'bg-red-950/30 text-red-400'}`}>{change}</div>
        </div>
        <h4 className="text-sm text-slate-500 font-medium">{title}</h4>
        <span className="text-2xl font-semibold text-slate-100">{value}</span>
    </div>
);
