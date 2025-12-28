import React from 'react';
import { KPI } from './types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPIPanelProps {
    kpis: KPI[];
}

export const KPIPanel: React.FC<KPIPanelProps> = ({ kpis }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4">
            {kpis.map(kpi => (
                <div key={kpi.id} className="bg-slate-900/30 border border-slate-800 p-4 rounded-lg relative overflow-hidden group hover:border-slate-700 transition-colors">
                    <div className="text-xs text-slate-500 mb-1">{kpi.label}</div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-100">{kpi.value.toLocaleString()}</span>
                        {kpi.unit && <span className="text-sm text-slate-400 font-medium">{kpi.unit}</span>}
                    </div>

                    {kpi.trend && (
                        <div className={`absolute top-4 right-4 p-1.5 rounded-full bg-slate-950 border border-slate-800 ${kpi.trend === 'up' ? 'text-emerald-500' : kpi.trend === 'down' ? 'text-red-500' : 'text-slate-500'
                            }`}>
                            {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : kpi.trend === 'down' ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
