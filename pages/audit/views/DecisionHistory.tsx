import React from 'react';
import { Gavel, FileKey } from 'lucide-react';

export const DecisionHistory = () => {
    // Mock Decision Logs
    const decisions = [
        { id: 1, type: 'Liberação de Quarentena', target: 'Lote V24-001', approver: 'Ana Souza', role: 'Gerente Qualidade', date: '2024-05-20 14:00', status: 'approved' },
        { id: 2, type: 'Ajuste de Inventário', target: 'SKU MED-SYR-10ML', approver: 'Carlos Silva', role: 'Supervisor Op.', date: '2024-05-19 09:30', status: 'approved' },
        { id: 3, type: 'Recebimento com Divergência', target: 'NF-9921', approver: 'Roberto Mendes', role: 'Coord. Logística', date: '2024-05-18 16:45', status: 'conditional' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="border-b border-slate-900 pb-6">
                <h1 className="text-2xl font-bold text-slate-100">Histórico de Decisões</h1>
                <p className="text-slate-500 mt-1">Auditoria de aprovações manuais e decisões de negócio críticas.</p>
            </div>

            <div className="relative border-l border-slate-800 ml-3 space-y-8 py-2">
                {decisions.map(decision => (
                    <div key={decision.id} className="relative pl-8">
                        <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-slate-950 ${decision.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}></div>

                        <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <Gavel className="h-4 w-4 text-slate-500" />
                                    <h3 className="font-bold text-slate-200">{decision.type}</h3>
                                </div>
                                <span className="text-xs text-slate-500 font-mono">{decision.date}</span>
                            </div>

                            <div className="text-sm text-slate-400 mb-4">
                                Alvo: <span className="text-brand-400 font-mono">{decision.target}</span>
                            </div>

                            <div className="flex items-center gap-3 bg-slate-950/50 p-3 rounded border border-slate-800/50">
                                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-300 font-bold">
                                    {decision.approver.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-200">{decision.approver}</div>
                                    <div className="text-xs text-slate-500">{decision.role}</div>
                                </div>
                                <div className="ml-auto flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-950/30 px-2 py-1 rounded">
                                    <FileKey className="h-3 w-3" /> Assinado Digitalmente
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
