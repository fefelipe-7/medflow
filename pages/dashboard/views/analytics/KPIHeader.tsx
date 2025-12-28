import React from 'react';
import { KPIHeaderData } from './types';
import { BarChart2, ShieldCheck, AlertTriangle, Calendar } from 'lucide-react';

interface KPIHeaderProps {
    data: KPIHeaderData;
}

export const KPIHeader: React.FC<KPIHeaderProps> = ({ data }) => {
    const reliabilityColors = {
        confiavel: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
        parcial: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
        incompleto: 'bg-red-500/20 text-red-400 border-red-500/50',
    };

    return (
        <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <BarChart2 className="h-6 w-6 text-brand-400" />
                    Indicadores & KPIs
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Análise consolidada de desempenho operacional, tático e estratégico.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-950/30 rounded border border-slate-800 text-sm text-slate-400 w-full sm:w-auto">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>Período: <span className="text-slate-200 font-bold">{data.periodoAtivo}</span></span>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 sm:gap-0">
                    <div className="text-[10px] text-slate-500 uppercase font-bold sm:text-right">Atualizado em</div>
                    <div className="font-mono text-slate-300 text-sm">{data.dataAtualizacao}</div>
                </div>

                <div className={`px-3 py-2 rounded-full border flex items-center gap-2 text-xs font-bold uppercase tracking-wider w-full sm:w-auto justify-center ${reliabilityColors[data.confiabilidade]}`}>
                    {data.confiabilidade === 'confiavel' ? <ShieldCheck className="h-4 w-4 shrink-0" /> : <AlertTriangle className="h-4 w-4 shrink-0" />}
                    {data.confiabilidade}
                </div>
            </div>
        </div>
    );
};
