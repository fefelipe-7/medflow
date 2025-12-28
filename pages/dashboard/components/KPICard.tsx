import React from 'react';
import { TrendingUp, Users } from 'lucide-react';

interface KPICardProps {
    title: string;
    value: string;
    target: string;
    owner: string;
    status: 'good' | 'warning' | 'bad';
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, target, owner, status }) => {
    const colors = { good: 'text-emerald-400', warning: 'text-amber-400', bad: 'text-red-400' };
    return (
        <div className="p-5 bg-slate-900/30 border border-slate-800 rounded-lg">
            <div className="flex justify-between mb-2">
                <h3 className="font-medium text-slate-300">{title}</h3>
                <TrendingUp className="h-4 w-4 text-slate-600" />
            </div>
            <div className={`text-3xl font-bold mb-1 ${colors[status]}`}>{value}</div>
            <div className="text-xs text-slate-500 mb-4">Meta: {target}</div>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/50 p-2 rounded">
                <Users className="h-3 w-3" />
                Dono: {owner}
            </div>
        </div>
    )
}
