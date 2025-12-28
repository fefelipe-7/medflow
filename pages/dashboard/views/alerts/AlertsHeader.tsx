import React from 'react';
import { AlertHeaderData } from './types';
import { Activity, BellDot, RefreshCw } from 'lucide-react';
import { Button } from '../../../../components/Button';

interface AlertsHeaderProps {
    data: AlertHeaderData;
}

export const AlertsHeader: React.FC<AlertsHeaderProps> = ({ data }) => {
    const statusColors = {
        estavel: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
        sob_atencao: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
        instavel: 'bg-red-500/20 text-red-400 border-red-500/50',
    };

    const statusLabels = {
        estavel: 'Estável',
        sob_atencao: 'Sob Atenção',
        instavel: 'Instável',
    };

    return (
        <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <BellDot className="h-6 w-6 text-brand-400" />
                    Alertas Globais
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Monitoramento centralizado de eventos e exceções operacionais.
                </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex-1 md:flex-none text-center p-3 bg-slate-950/30 rounded border border-slate-800">
                    <div className="text-slate-400 text-xs uppercase font-bold">Total Ativos</div>
                    <div className="text-2xl font-bold text-slate-100">{data.totalAlertasAtivos}</div>
                </div>
                <div className="flex-1 md:flex-none text-center p-3 bg-slate-950/30 rounded border border-slate-800">
                    <div className="text-red-400 text-xs uppercase font-bold">Críticos</div>
                    <div className="text-2xl font-bold text-red-500">{data.alertasCriticos}</div>
                </div>
                <div className={`px-4 py-3 rounded border flex flex-col items-center justify-center font-bold text-sm ${statusColors[data.statusOperacionalGlobal]}`}>
                    <Activity className="h-4 w-4 mb-1" />
                    {statusLabels[data.statusOperacionalGlobal]}
                </div>
            </div>
        </div>
    );
};
