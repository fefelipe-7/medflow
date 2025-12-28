import React from 'react';

interface RiskCellProps {
    count: number;
    riskLevel: 'low' | 'med' | 'high' | 'crit';
}

export const RiskCell: React.FC<RiskCellProps> = ({ count, riskLevel }) => {
    const bg = {
        low: 'bg-emerald-900/20', med: 'bg-amber-900/20', high: 'bg-orange-900/20', crit: 'bg-red-900/20'
    };
    const text = {
        low: 'text-emerald-500', med: 'text-amber-500', high: 'text-orange-500', crit: 'text-red-500'
    };
    return (
        <div className={`w-full h-16 rounded border border-slate-800/50 flex flex-col items-center justify-center ${bg[riskLevel]}`}>
            <span className={`text-lg font-bold ${text[riskLevel]}`}>{count}</span>
        </div>
    );
};
