import React from 'react';
import { AlertItem } from './types';
import { Siren, AlertCircle, Info, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../../../../components/Button';

interface ActiveAlertsListProps {
    alerts: AlertItem[];
    onSelectAlert: (alert: AlertItem) => void;
    selectedAlertId?: string;
}

export const ActiveAlertsList: React.FC<ActiveAlertsListProps> = ({ alerts, onSelectAlert, selectedAlertId }) => {
    const getSeverityIcon = (level: string) => {
        switch (level) {
            case 'critico': return <Siren className="h-4 w-4" />;
            case 'alto': return <AlertCircle className="h-4 w-4" />;
            default: return <Info className="h-4 w-4" />;
        }
    };

    const getSeverityColor = (level: string) => {
        switch (level) {
            case 'critico': return 'text-red-500 bg-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)] animate-pulse';
            case 'alto': return 'text-orange-500 bg-orange-500/20';
            case 'medio': return 'text-amber-500 bg-amber-500/20';
            default: return 'text-slate-400 bg-slate-500/20';
        }
    };

    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-200">Painel de Alertas</h3>
                <div className="flex gap-2">
                    <Button size="sm" variant="ghost">Ordenar por Risco</Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {alerts.map(alert => (
                    <div
                        key={alert.alertId}
                        className={`p-4 rounded-lg border transition-all cursor-pointer hover:border-brand-500/50 ${selectedAlertId === alert.alertId
                                ? 'bg-slate-800/80 border-brand-500'
                                : 'bg-slate-900/50 border-slate-700/50'
                            }`}
                        onClick={() => onSelectAlert(alert)}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${getSeverityColor(alert.criticidade)}`}>
                                    {getSeverityIcon(alert.criticidade)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-200">{alert.titulo}</h4>
                                    <span className="text-[10px] uppercase font-bold text-slate-500 border border-slate-600 px-1.5 rounded">{alert.moduloOrigem}</span>
                                </div>
                            </div>
                            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {alert.tempoAbertoMin}min
                            </span>
                        </div>

                        <p className="text-xs text-slate-400 mb-3 ml-12">{alert.descricaoCurta}</p>

                        <div className="flex justify-between items-center ml-12 text-xs">
                            <div className="flex gap-2 text-slate-500">
                                <span>Rp: {alert.responsavelAtual}</span>
                                {alert.impacto.riscoSla && <span className="text-red-400 font-bold">• Risco SLA</span>}
                            </div>
                            {selectedAlertId === alert.alertId && (
                                <div className="text-brand-400 flex items-center gap-1 font-medium text-[10px] animate-in slide-in-from-left-2">
                                    VER DETALHES <ArrowRight className="h-3 w-3" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
