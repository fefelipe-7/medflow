import React from 'react';
import { Shield, FileJson, Database } from 'lucide-react';
import { Button } from '../../../../components/Button';

export const KPIGovernance = () => {
    return (
        <div className="border-t border-slate-800 pt-8 mt-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4" /> Governança de Dados
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/30 p-6 rounded-lg border border-slate-800 border-dashed">
                <div>
                    <h4 className="text-slate-300 font-medium mb-2">Definição e Origem</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <li className="flex items-center gap-2 max-w-md">
                            <Database className="h-3 w-3 text-slate-600" />
                            Os dados operacionais são extraídos em tempo real das tabelas de transação (logística).
                        </li>
                        <li className="flex items-center gap-2 max-w-md">
                            <Database className="h-3 w-3 text-slate-600" />
                            Dados financeiros (custos) são sincronizados via ETL noturno (D-1).
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-slate-300 font-medium mb-2">Exportação e Auditoria</h4>
                    <div className="flex gap-4">
                        <Button variant="outline" size="sm" icon={FileJson}>Exportar Definições JSON</Button>
                        <Button variant="ghost" size="sm">Ver Logs de Alteração</Button>
                    </div>
                    <p className="text-xs text-slate-600 mt-3">
                        Última revisão de fórmulas: 12/12/2024 por Admin.
                    </p>
                </div>
            </div>
        </div>
    );
};
