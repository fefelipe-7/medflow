import React from 'react';
import { DashboardHeaderData } from './types';
import { Clock, Warehouse, Activity } from 'lucide-react';

interface SummaryHeaderProps {
    data: DashboardHeaderData;
}

export const SummaryHeader: React.FC<SummaryHeaderProps> = ({ data }) => {
    const statusColors = {
        normal: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
        attention: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
        critical: 'bg-red-500/20 text-red-400 border-red-500/50',
    };

    const statusLabels = {
        normal: 'Operação Normal',
        attention: 'Atenção Necessária',
        critical: 'Estado Crítico',
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/30 p-4 rounded-lg border border-slate-800">
            <div>
                <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    Visão Operacional <span className="text-xs font-normal text-slate-500 border border-slate-700 rounded px-2 py-0.5">Tempo Real</span>
                </h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                        <Warehouse className="h-4 w-4 text-slate-500" />
                        {data.logisticUnit}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-slate-500" />
                        {data.currentShift}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                    <div className="text-xs text-slate-500">Última atualização</div>
                    <div className="font-mono text-slate-300">{data.lastUpdated}</div>
                </div>
                <div className={`px-4 py-2 rounded-full border flex items-center gap-2 font-medium ${statusColors[data.overallStatus]}`}>
                    <Activity className="h-4 w-4" />
                    {statusLabels[data.overallStatus]}
                </div>
            </div>
        </div>
    );
};
