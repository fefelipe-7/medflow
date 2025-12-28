import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface RiskFactorProps {
    label: string;
    value: string;
    impact: 'none' | 'low' | 'medium' | 'high' | 'critical';
}

export const RiskFactor: React.FC<RiskFactorProps> = ({ label, value, impact }) => {
    const color = impact === 'critical' ? 'text-red-400' : impact === 'high' ? 'text-orange-400' : impact === 'medium' ? 'text-amber-400' : 'text-slate-500';
    return (
        <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded border border-slate-800/50">
            <span className="text-sm text-slate-400">{label}</span>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-200">{value}</span>
                {impact !== 'none' && <AlertTriangle className={`h-3 w-3 ${color}`} />}
            </div>
        </div>
    );
};
