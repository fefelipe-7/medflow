import React from 'react';
import { AlertItem } from './types';
import { AlertTriangle, AlertCircle, Info, ChevronRight, Clock } from 'lucide-react';

interface ActiveAlertsListProps {
    alerts: AlertItem[];
    onSelectAlert: (alert: AlertItem) => void;
    selectedAlertId?: string;
}

export const ActiveAlertsList: React.FC<ActiveAlertsListProps> = ({ alerts, onSelectAlert, selectedAlertId }) => {

    const getSeverityStyles = (level: string) => {
        switch (level) {
            case 'critico': return 'border-l-red-500 shadow-[inset_4px_0_0_0_#ef4444] bg-red-950/10 hover:bg-red-950/20';
            case 'alto': return 'border-l-orange-500 shadow-[inset_4px_0_0_0_#f97316] bg-orange-950/10 hover:bg-orange-950/20';
            case 'medio': return 'border-l-amber-500 shadow-[inset_4px_0_0_0_#f59e0b] bg-amber-950/10 hover:bg-amber-950/20';
            default: return 'border-l-blue-500 shadow-[inset_4px_0_0_0_#3b82f6] bg-blue-950/10 hover:bg-blue-950/20';
        }
    };

    const getIcon = (level: string) => {
        switch (level) {
            case 'critico': return <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />;
            case 'alto': return <AlertCircle className="h-5 w-5 text-orange-500" />;
            default: return <Info className="h-5 w-5 text-blue-500" />;
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full shadow-xl">
            <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Feed de Ocorrências</h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-mono">
                    {alerts.length} ATIVOS
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {alerts.map((alert) => (
                    <div
                        key={alert.alertId}
                        onClick={() => onSelectAlert(alert)}
                        className={`
                group relative p-4 rounded-lg border border-slate-800 cursor-pointer transition-all duration-200
                ${getSeverityStyles(alert.severidade)}
                ${selectedAlertId === alert.alertId ? 'ring-1 ring-white/20 bg-slate-800/80' : ''}
            `}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                {getIcon(alert.severidade)}
                                <span className="text-xs font-mono text-slate-500">{alert.alertId}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-950/50 px-2 py-0.5 rounded">
                                <Clock className="h-3 w-3" />
                                {alert.tempoAtivo}
                            </div>
                        </div>

                        <h4 className="text-sm font-bold text-slate-200 mb-1 group-hover:text-white transition-colors">
                            {alert.titulo}
                        </h4>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {alert.descricaoCurta}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex gap-2">
                                <span className="text-[10px] uppercase font-bold text-slate-600 border border-slate-800 px-1.5 rounded bg-slate-950">
                                    {alert.area}
                                </span>
                                {alert.slaCritico && (
                                    <span className="text-[10px] uppercase font-bold text-red-400 border border-red-900/30 px-1.5 rounded bg-red-950/30 flex items-center gap-1">
                                        SLA
                                    </span>
                                )}
                            </div>
                            <ChevronRight className={`h-4 w-4 text-slate-600 transition-transform ${selectedAlertId === alert.alertId ? 'translate-x-1 text-brand-400' : 'group-hover:translate-x-1'}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
