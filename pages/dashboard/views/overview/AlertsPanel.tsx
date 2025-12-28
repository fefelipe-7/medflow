import React from 'react';
import { Alert } from './types';
import { Siren, AlertCircle, Info } from 'lucide-react';
import { Button } from '../../../../components/Button';

interface AlertsPanelProps {
    alerts: Alert[];
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                    Alertas e Exceções <span className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full ml-1">{alerts.length}</span>
                </h3>
                <Button size="sm" variant="ghost">Ver Todos</Button>
            </div>

            <div className="space-y-3">
                {alerts.map(alert => (
                    <div key={alert.id} className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex gap-3 hover:border-slate-700 transition-colors">
                        <div className={`mt-1 p-1.5 rounded-full shrink-0 ${alert.severity === 'critical' ? 'bg-red-500/20 text-red-500' :
                                alert.severity === 'high' ? 'bg-amber-500/20 text-amber-500' :
                                    'bg-blue-500/20 text-blue-500'
                            }`}>
                            {alert.severity === 'critical' ? <Siren className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-bold text-slate-300">{alert.type}</span>
                                <span className="text-xs text-slate-500">{alert.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1 truncate">{alert.description}</p>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 border border-slate-800 px-1.5 rounded">{alert.origin}</span>
                                <button className="text-xs text-brand-400 hover:text-brand-300 transition-colors ml-auto">Resolver</button>
                            </div>
                        </div>
                    </div>
                ))}
                {alerts.length === 0 && (
                    <div className="text-center py-8 text-slate-500 text-sm">Nenhum alerta ativo.</div>
                )}
            </div>
        </div>
    );
};
