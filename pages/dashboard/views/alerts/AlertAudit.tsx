import React from 'react';
import { AuditLogEntry } from './types';

interface AlertAuditProps {
    logs: AuditLogEntry[];
}

export const AlertAudit: React.FC<AlertAuditProps> = ({ logs }) => {
    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 h-full">
            <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Histórico & Auditoria</h3>

            <div className="relative border-l border-slate-800 ml-2 space-y-6">
                {logs.map((log) => (
                    <div key={log.id} className="relative pl-6 group">
                        <div className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 transition-colors ${log.acao === 'criado' ? 'bg-blue-500 group-hover:bg-blue-400' :
                                log.acao === 'resolvido' ? 'bg-emerald-500 group-hover:bg-emerald-400' :
                                    log.acao === 'escalonado' ? 'bg-amber-500 group-hover:bg-amber-400' : 'bg-slate-500'
                            }`}></div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-bold text-slate-200 capitalize">{log.acao}</span>
                                <span className="text-xs font-mono text-slate-500">{log.timestamp}</span>
                            </div>
                            <div className="text-xs text-slate-400">
                                por <span className="text-brand-400">{log.usuario}</span>
                            </div>
                            <p className="text-xs text-slate-500 italic mt-1 bg-slate-950/20 p-2 rounded border border-slate-800/50">
                                "{log.comentario}"
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
