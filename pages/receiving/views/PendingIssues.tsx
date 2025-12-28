import React from 'react';
import { Button } from '../../../components/Button';
import { AlertOctagon, FileWarning } from 'lucide-react';

export const PendingIssues = () => {
    // Mock pending issues specifically for this view
    const issues = [
        { id: 'PEN-001', type: 'Divergência Fiscal', severity: 'high', description: 'NF não consta pedido de compra PO-992', age: '2h', entity: 'SHP-2024-003' },
        { id: 'PEN-002', type: 'Avaria no Transporte', severity: 'medium', description: 'Palete 04 tombado na doca 2', age: '30min', entity: 'SHP-2024-001' },
        { id: 'PEN-003', type: 'Documentação Pendente', severity: 'low', description: 'Certificado de esterilização ilegível', age: '1d', entity: 'SHP-2024-005' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="border-b border-slate-900 pb-6">
                <h1 className="text-2xl font-bold text-slate-100">Gestão de Pendências</h1>
                <p className="text-slate-500 mt-1">Exceções operacionais que bloqueiam o fluxo de entrada.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {issues.map(issue => (
                    <div key={issue.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-slate-900/30 border border-slate-800 rounded-lg group hover:border-slate-700 transition-colors">
                        <div className="flex items-start gap-4 mb-4 md:mb-0">
                            <div className={`p-2 rounded mt-1 ${issue.severity === 'high' ? 'bg-red-900/20 text-red-500' :
                                    issue.severity === 'medium' ? 'bg-amber-900/20 text-amber-500' : 'bg-blue-900/20 text-blue-500'
                                }`}>
                                <AlertOctagon className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-200 text-sm">{issue.type}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{issue.id}</span>
                                </div>
                                <p className="text-sm text-slate-400 mt-1 max-w-xl">{issue.description}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 font-mono">
                                    <span className="flex items-center gap-1"><FileWarning className="h-3 w-3" /> {issue.entity}</span>
                                    <span>•</span>
                                    <span>Aberto há: {issue.age}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <Button size="sm" variant="outline" className="flex-1 md:flex-none">Investigar</Button>
                            <Button size="sm" variant="secondary" className="flex-1 md:flex-none">Resolver</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
