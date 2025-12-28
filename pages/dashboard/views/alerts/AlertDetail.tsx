import React from 'react';
import { AlertDetailData } from './types';
import { ShieldAlert, Activity, FileText, UserCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../../components/Button';

interface AlertDetailProps {
    alert: AlertDetailData | null;
}

export const AlertDetail: React.FC<AlertDetailProps> = ({ alert }) => {
    if (!alert) {
        return (
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-8 h-full flex flex-col items-center justify-center text-slate-500 min-h-[300px]">
                <ShieldAlert className="h-12 w-12 mb-4 opacity-20" />
                <p>Selecione um alerta para ver os detalhes</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-6 h-full flex flex-col animate-in fade-in slide-in-from-right-4">
            {/* Header */}
            <div className="border-b border-slate-800 pb-4 mb-4">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <h2 className="text-xl font-bold text-slate-100">{alert.titulo}</h2>
                    <span className="text-xs font-mono text-slate-500 mt-1 md:mt-0">{alert.alertId}</span>
                </div>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed">{alert.descricaoCompleta}</p>
            </div>

            {/* Root Cause & Origin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-950/30 p-4 rounded border border-slate-800">
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                        <Activity className="h-3 w-3" /> Causa Raiz Sugerida
                    </h3>
                    <p className="text-sm text-slate-300">{alert.causaRaizSugerida}</p>
                </div>
                <div className="bg-slate-950/30 p-4 rounded border border-slate-800">
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                        <FileText className="h-3 w-3" /> Evento de Origem
                    </h3>
                    <div className="text-sm text-slate-300 flex flex-col gap-1">
                        <span>Tipo: {alert.eventoOrigem.tipo}</span>
                        <span className="text-xs text-slate-500 font-mono">Ref: {alert.eventoOrigem.idReferencia}</span>
                        <span className="text-xs text-slate-500">{alert.eventoOrigem.timestamp}</span>
                    </div>
                </div>
            </div>

            {/* Impact Assessment */}
            <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-300 mb-3">Impacto Avaliado</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="p-3 bg-slate-800/50 rounded border border-slate-700 text-center flex flex-row sm:flex-col justify-between sm:justify-center items-center">
                        <div className="text-[10px] text-slate-500 uppercase">Operacional</div>
                        <div className="font-bold text-slate-200 capitalize">{alert.impacto.operacional}</div>
                    </div>
                    <div className="p-3 bg-slate-800/50 rounded border border-slate-700 text-center flex flex-row sm:flex-col justify-between sm:justify-center items-center">
                        <div className="text-[10px] text-slate-500 uppercase">Perda Est.</div>
                        <div className="font-bold text-slate-200">
                            {alert.impacto.financeiroEstimado > 0
                                ? `R$ ${alert.impacto.financeiroEstimado.toLocaleString()}`
                                : 'N/A'}
                        </div>
                    </div>
                    <div className={`p-3 rounded border text-center flex flex-row sm:flex-col justify-between sm:justify-center items-center ${alert.impacto.riscoSla ? 'bg-red-900/20 border-red-900/40' : 'bg-slate-800/50 border-slate-700'}`}>
                        <div className="text-[10px] text-slate-500 uppercase">Risco SLA</div>
                        <div className={`font-bold ${alert.impacto.riscoSla ? 'text-red-400' : 'text-slate-200'}`}>
                            {alert.impacto.riscoSla ? 'SIM' : 'NÃO'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-auto pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 w-full" icon={UserCheck}>Assumir Tratativa</Button>
                <Button className="flex-1 w-full" variant="outline" icon={ArrowUpRight}>Escalar</Button>
                <Button className="flex-1 w-full" variant="secondary" icon={CheckCircle2}>Resolver</Button>
            </div>
        </div>
    );
};
