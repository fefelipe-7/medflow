import React from 'react';
import { Button } from '../../../components/Button';
import { CheckCircle2, XCircle, Search, Filter } from 'lucide-react';

export const QuarantineHistory = () => {
    // Mock History Data
    const history = [
        { id: 'HIST-102', item: 'Vacina Influenza', batch: 'V24-001', decision: 'Liberado', user: 'Ana Qualidade', date: '2024-05-20', reason: 'Laudo deferido' },
        { id: 'HIST-101', item: 'Seringa 10ml', batch: 'B99-11', decision: 'Descartado', user: 'Carlos Silva', date: '2024-05-18', reason: 'Avaria irreversível' },
        { id: 'HIST-099', item: 'Gaze Estéril', batch: 'GZ-221', decision: 'Liberado', user: 'Ana Qualidade', date: '2024-05-15', reason: 'Reinspeção aprovada' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="border-b border-slate-900 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Histórico de Decisões</h1>
                    <p className="text-slate-500 mt-1">Registro imutável de liberações e descartes.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <input type="text" placeholder="Buscar lote, item..." className="pl-9 bg-slate-900 border border-slate-700 rounded-md h-9 text-sm text-slate-200 w-64 focus:outline-none focus:border-brand-500" />
                    </div>
                    <Button variant="outline" size="sm" icon={Filter}>Filtros</Button>
                </div>
            </div>

            <div className="border border-slate-800 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-slate-800">
                    <thead className="bg-slate-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Item / Lote</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Decisão</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Motivo</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Responsável</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Data</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-950 divide-y divide-slate-800/50">
                        {history.map((log) => (
                            <tr key={log.id} className="hover:bg-slate-900/40">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-slate-200">{log.item}</div>
                                    <div className="text-xs text-slate-500 font-mono">{log.batch}</div>
                                </td>
                                <td className="px-6 py-4">
                                    {log.decision === 'Liberado' ? (
                                        <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                                            <CheckCircle2 className="h-4 w-4" /> Liberado
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-red-400 text-sm font-medium">
                                            <XCircle className="h-4 w-4" /> Descartado
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-400">{log.reason}</td>
                                <td className="px-6 py-4 text-sm text-slate-300">{log.user}</td>
                                <td className="px-6 py-4 text-sm text-slate-500 text-right">{log.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
