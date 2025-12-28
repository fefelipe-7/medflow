import React from 'react';
import { MOCK_SHIPMENTS } from '../../../constants';
import { StatusBadge } from '../../../components/StatusBadge';
import { Button } from '../../../components/Button';
import { AlertCircle, ClipboardCheck } from 'lucide-react';
import { ReceivingStatus } from '../../../types';

export const Conference = () => {
    const items = MOCK_SHIPMENTS.filter(s => s.status === ReceivingStatus.IN_CONFERENCE || s.status === ReceivingStatus.DIVERGENCE);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="border-b border-slate-900 pb-6">
                <h1 className="text-2xl font-bold text-slate-100">Conferência</h1>
                <p className="text-slate-500 mt-1">Confronto Físico x Fiscal. Identificação de avarias e divergências.</p>
            </div>

            <div className="space-y-4">
                {items.map(item => (
                    <div key={item.id} className="border border-slate-800 rounded-lg p-5 bg-slate-900/20">
                        <div className="flex justify-between mb-4">
                            <div>
                                <h3 className="font-bold text-slate-200">{item.id}</h3>
                                <p className="text-xs text-slate-500">Responsável: {item.assignedTo || 'Não atribuído'}</p>
                            </div>
                            <StatusBadge status={item.status} />
                        </div>

                        <div className="flex gap-2 mb-4">
                            <div className="flex-1 bg-slate-950 p-3 rounded text-center border border-slate-800">
                                <div className="text-xs text-slate-500">Esperado</div>
                                <div className="font-mono font-bold text-slate-300">{item.itemsCount}</div>
                            </div>
                            <div className="flex-1 bg-slate-950 p-3 rounded text-center border border-slate-800">
                                <div className="text-xs text-slate-500">Contado</div>
                                <div className="font-mono font-bold text-brand-400">--</div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" icon={AlertCircle}>Reportar Avaria</Button>
                            <Button size="sm" icon={ClipboardCheck}>Continuar Conferência</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
