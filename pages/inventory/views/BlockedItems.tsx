import React from 'react';
import { MOCK_INVENTORY } from '../../../constants';
import { InventoryStatus } from '../../../types';
import { StatusBadge } from '../../../components/StatusBadge';
import { Button } from '../../../components/Button';
import { AlertTriangle } from 'lucide-react';

export const BlockedItems = () => {
    const blocked = MOCK_INVENTORY.filter(i => i.status === InventoryStatus.BLOCKED || i.status === InventoryStatus.QUARANTINE || i.status === InventoryStatus.EXPIRED);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="border-b border-slate-900 pb-6">
                <h1 className="text-2xl font-bold text-slate-100">Itens Bloqueados</h1>
                <p className="text-slate-500 mt-1">Materiais segregados. Requer ação de desbloqueio ou descarte.</p>
            </div>

            <div className="space-y-3">
                {blocked.map(item => (
                    <div key={item.id} className="p-4 bg-slate-900/40 border border-red-900/20 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-red-900/20 rounded text-red-500"><AlertTriangle className="h-5 w-5" /></div>
                            <div>
                                <div className="text-sm font-bold text-slate-200">{item.name}</div>
                                <div className="text-xs text-slate-500 font-mono">Lote: {item.batch} • {item.location}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <StatusBadge status={item.status} />
                            <Button size="sm" variant="outline">Ver Detalhes</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
