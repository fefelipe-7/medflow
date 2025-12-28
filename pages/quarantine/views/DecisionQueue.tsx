import React, { useState } from 'react';
import { MOCK_QUARANTINE_LIST } from '../../../constants';
import { Button } from '../../../components/Button';
import { EmptyState } from '../../../components/EmptyState';
// Update import path to point to the new location or the re-export
import { QuarantineWorkflow } from '../../../components/quarantine/workflow';
import { useEventBus } from '../../../contexts/EventBusContext';
import { CheckSquare, AlertTriangle } from 'lucide-react';

export const DecisionQueue = () => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { publish } = useEventBus();

    const handleResolveClick = (item: any) => {
        setSelectedItem(item);
        setIsWorkflowOpen(true);
    };

    const handleWorkflowComplete = () => {
        setIsWorkflowOpen(false);
        publish('QUARANTINE_DECISION_MADE', { itemId: selectedItem?.id, decision: 'Released', timestamp: Date.now() });
    };

    // Mock function to simulate retry
    const handleRetry = () => {
        setIsLoading(true);
        setError(false);
        // Simulate API call delay
        setTimeout(() => setIsLoading(false), 1000);
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 border border-red-900/30 bg-red-950/10 rounded-lg animate-in fade-in">
                <div className="p-3 bg-red-900/20 rounded-full mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-200 mb-2">Erro ao carregar fila</h3>
                <p className="text-slate-400 mb-6 text-center max-w-sm text-sm">
                    Não foi possível sincronizar os dados da fila de decisão. Isso pode ocorrer devido a problemas de conexão.
                </p>
                <Button onClick={handleRetry} variant="secondary">
                    {isLoading ? 'Tentando...' : 'Tentar Novamente'}
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="border-b border-slate-900 pb-6">
                <h1 className="text-2xl font-bold text-slate-100">Fila de Decisão</h1>
                <p className="text-slate-500 mt-1">Itens ordenados por risco e tempo. Prioridade máxima para críticos.</p>
            </div>

            <div className="border border-slate-800 rounded-lg bg-slate-900/20">
                {MOCK_QUARANTINE_LIST.length === 0 ? (
                    <EmptyState icon={CheckSquare} title="Fila Vazia" description="Nenhum item aguardando decisão." />
                ) : (
                    <table className="min-w-full divide-y divide-slate-800">
                        <thead className="bg-slate-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Item</th>
                                <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Motivo</th>
                                <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Risco</th>
                                <th className="px-6 py-3 text-right text-xs text-slate-400 uppercase">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {MOCK_QUARANTINE_LIST.sort((a, b) => b.riskScore - a.riskScore).map((item) => (
                                <tr key={item.id} className="hover:bg-slate-900/40">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-200">{item.name}</div>
                                        <div className="text-xs text-slate-500">{item.supplier} • {item.daysInQuarantine}d</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-300">{item.reason}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-2 w-2 rounded-full ${item.riskScore > 70 ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                                            <span className="text-sm text-slate-400">{item.riskScore}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button size="sm" onClick={() => handleResolveClick(item)}>Decidir</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {selectedItem && (
                <QuarantineWorkflow
                    item={selectedItem}
                    isOpen={isWorkflowOpen}
                    onClose={() => setIsWorkflowOpen(false)}
                    onComplete={handleWorkflowComplete}
                />
            )}
        </div>
    )
}
