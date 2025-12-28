import React from 'react';
import { AlertDetailData } from './types';
import { ShieldAlert, Activity, FileText, UserCheck, ArrowUpRight, CheckCircle2, Siren } from 'lucide-react';
import { Button } from '../../../../components/Button';

interface AlertDetailProps {
    alert: AlertDetailData | null;
}

export const AlertDetail: React.FC<AlertDetailProps> = ({ alert }) => {
    if (!alert) {
        return (
            <div className="bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-xl p-8 h-full flex flex-col items-center justify-center text-slate-500 min-h-[400px]">
                <div className="p-6 bg-slate-900 rounded-full mb-4 shadow-xl">
                    <ShieldAlert className="h-12 w-12 text-slate-700" />
                </div>
                <h3 className="text-lg font-medium text-slate-400">Nenhum Alerta Selecionado</h3>
                <p className="text-xs text-slate-600 mt-2 text-center max-w-[200px]">
                    Selecione uma ocorrência na lista ao lado para visualizar o diagnóstico completo.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-0 h-full flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Heavy Header */}
            <div className="bg-slate-950 p-6 border-b border-slate-800 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-500 to-transparent"></div>
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-brand-400 bg-brand-950/30 border border-brand-900 px-2 py-0.5 rounded">
                        ID: {alert.alertId}
                    </span>
                    {alert.impacto.riscoSla && (
                        <div className="flex items-center gap-2 text-red-500 animate-pulse">
                            <Siren className="h-4 w-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Ação Imediata Necessária</span>
                        </div>
                    )}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{alert.titulo}</h2>
                <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-slate-700 pl-4">
                    {alert.descricaoCompleta}
                </p>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                {/* Diagnostic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Root Cause Card */}
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-3 flex items-center gap-2 tracking-wider">
                            <Activity className="h-3 w-3" /> Diagnóstico do Sistema
                        </h3>
                        <p className="text-sm text-slate-200 font-medium leading-relaxed">
                            {alert.causaRaizSugerida}
                        </p>
                    </div>

                    {/* Source Card */}
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-3 flex items-center gap-2 tracking-wider">
                            <FileText className="h-3 w-3" /> Metadados de Origem
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between border-b border-slate-800/50 pb-1">
                                <span className="text-xs text-slate-500">Tipo</span>
                                <span className="text-xs text-slate-300 font-mono">{alert.eventoOrigem.tipo}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800/50 pb-1">
                                <span className="text-xs text-slate-500">Referência</span>
                                <span className="text-xs text-slate-300 font-mono">{alert.eventoOrigem.idReferencia}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xs text-slate-500">Timestamp</span>
                                <span className="text-xs text-slate-300 font-mono">{alert.eventoOrigem.timestamp}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact Matrix */}
                <div>
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-wider">Matriz de Impacto</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-slate-800/20 border border-slate-700/50 p-3 rounded text-center">
                            <div className="text-[10px] text-slate-500 mb-1">Operacional</div>
                            <div className="text-slate-200 font-bold capitalize">{alert.impacto.operacional}</div>
                        </div>
                        <div className="bg-slate-800/20 border border-slate-700/50 p-3 rounded text-center">
                            <div className="text-[10px] text-slate-500 mb-1">Financeiro</div>
                            <div className="text-slate-200 font-bold">
                                {alert.impacto.financeiroEstimado > 0 ? `R$ ${alert.impacto.financeiroEstimado}` : '-'}
                            </div>
                        </div>
                        <div className={`p-3 rounded text-center border ${alert.impacto.riscoSla ? 'bg-red-950/20 border-red-900/50' : 'bg-emerald-950/20 border-emerald-900/50'}`}>
                            <div className="text-[10px] text-slate-500 mb-1">SLA</div>
                            <div className={`font-bold ${alert.impacto.riscoSla ? 'text-red-400' : 'text-emerald-400'}`}>
                                {alert.impacto.riscoSla ? 'EM RISCO' : 'ESTÁVEL'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Persistent Footer Actions */}
            <div className="bg-slate-950 p-4 border-t border-slate-800 flex gap-3">
                <Button className="flex-1 shadow-lg shadow-brand-500/10" icon={UserCheck}>Assumir</Button>
                <Button className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800" variant="outline" icon={ArrowUpRight}>Escalar</Button>
                <Button className="flex-1" variant="secondary" icon={CheckCircle2}>Resolver</Button>
            </div>
        </div>
    );
};
