import React from 'react';
import { MOCK_AUDIT_LOGS } from '../../../constants';
import { AuditLog } from '../../../types';
import { Search } from 'lucide-react';
import { Button } from '../../../components/Button';

export const EventLogs = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="border-b border-slate-900 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Trilha de Eventos</h1>
                    <p className="text-slate-500 mt-1">Registro cronológico de todas as ações do sistema.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <input type="text" placeholder="Buscar ID, Usuário..." className="pl-9 bg-slate-900 border border-slate-700 rounded-md h-9 text-sm text-slate-200 w-64 focus:outline-none focus:border-brand-500" />
                    </div>
                    <Button variant="outline" size="sm">Filtros Avançados</Button>
                </div>
            </div>

            <div className="border border-slate-800 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-slate-800">
                    <thead className="bg-slate-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Timestamp</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Ação</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Entidade</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Usuário</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Detalhes</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-950 divide-y divide-slate-800/50">
                        {MOCK_AUDIT_LOGS.map((log: AuditLog) => (
                            <tr key={log.id} className="hover:bg-slate-900/40">
                                <td className="px-6 py-3 whitespace-nowrap text-xs text-slate-500 font-mono">{log.timestamp}</td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-slate-200">{log.action}</td>
                                <td className="px-6 py-3 whitespace-nowrap text-xs text-brand-400 font-mono">{log.entity}</td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-400">{log.user}</td>
                                <td className="px-6 py-3 text-sm text-slate-500 max-w-xs truncate">{log.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
