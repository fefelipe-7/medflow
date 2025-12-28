import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';

export const ComplianceReports = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="border-b border-slate-900 pb-6">
                <h1 className="text-2xl font-bold text-slate-100">Relatórios de Compliance</h1>
                <p className="text-slate-500 mt-1">Evidências consolidadas para auditoria externa.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 border border-slate-800 rounded-lg bg-slate-900/20 hover:border-slate-700 cursor-pointer group">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-slate-800 rounded text-brand-400 group-hover:text-brand-300"><FileText className="h-6 w-6" /></div>
                        <h3 className="font-bold text-slate-200">Rastreabilidade de Lote</h3>
                    </div>
                    <p className="text-sm text-slate-500">Relatório completo do ciclo de vida de um lote específico, da entrada à saída.</p>
                </div>

                <div className="p-6 border border-slate-800 rounded-lg bg-slate-900/20 hover:border-slate-700 cursor-pointer group">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-slate-800 rounded text-brand-400 group-hover:text-brand-300"><ShieldCheck className="h-6 w-6" /></div>
                        <h3 className="font-bold text-slate-200">Log de Acessos e Permissões</h3>
                    </div>
                    <p className="text-sm text-slate-500">Histórico de logins, alterações de perfil e tentativas de acesso não autorizado.</p>
                </div>
            </div>
        </div>
    )
}
