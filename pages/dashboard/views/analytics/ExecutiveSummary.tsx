import React from 'react';
import { KPIExecData } from './types';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';

interface ExecutiveSummaryProps {
    data: KPIExecData;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Throughput Card */}
            <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 hover:border-brand-500/30 transition-colors">
                <div className="text-sm text-slate-400 mb-2">Volume Processado</div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-100">{data.throughput.value.toLocaleString()}</span>
                    <span className={`text-sm font-medium flex items-center ${data.throughput.status === 'positivo' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {data.throughput.status === 'positivo' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {data.throughput.variacao}%
                    </span>
                </div>
                <div className="text-xs text-slate-500 mt-2">vs. período anterior</div>
            </div>

            {/* SLA Card */}
            <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 hover:border-brand-500/30 transition-colors">
                <div className="text-sm text-slate-400 mb-2">Cumprimento SLA</div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-100">{data.sla.value}%</span>
                    <span className="text-xs font-medium text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 flex items-center">
                        <Target className="h-3 w-3 mr-1" /> Meta: {data.sla.meta}%
                    </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className={`h-full rounded-full ${data.sla.value >= data.sla.meta ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${data.sla.value}%` }}></div>
                </div>
            </div>

            {/* Quarantine Index Card - Full width on medium only, fits on last col on large */}
            <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 hover:border-brand-500/30 transition-colors md:col-span-2 lg:col-span-1">
                <div className="text-sm text-slate-400 mb-2">Índice de Quarentena</div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-100">{data.quarentena.value}%</span>
                    <span className="text-xs font-medium text-slate-500">do total recebido</span>
                </div>
                <div className="text-xs text-slate-500 mt-2 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${data.quarentena.value > data.quarentena.limite ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                    Limite Aceitável: {data.quarentena.limite}%
                </div>
            </div>
        </div>
    );
};
