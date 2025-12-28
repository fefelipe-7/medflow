import React from 'react';
import { MOCK_SHIPMENTS } from '../../../constants';
import { Button } from '../../../components/Button';
import { Truck, FileText } from 'lucide-react';
import { ReceivingStatus } from '../../../types';

export const ArrivalRegistration = () => {
    const items = MOCK_SHIPMENTS.filter(s => s.status === ReceivingStatus.PRE_REGISTERED || s.status === ReceivingStatus.AWAITING_ARRIVAL);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="border-b border-slate-900 pb-6">
                <h1 className="text-2xl font-bold text-slate-100">Registro de Chegada</h1>
                <p className="text-slate-500 mt-1">Check-in físico do transportador. Inicia o tempo de pátio.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {items.map(item => (
                    <div key={item.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-800 rounded-full"><Truck className="h-5 w-5 text-slate-400" /></div>
                            <div>
                                <div className="text-sm font-bold text-slate-200">{item.provider}</div>
                                <div className="text-xs text-slate-500">NF: {item.invoiceNumber} • {item.itemsCount} Volumes</div>
                            </div>
                        </div>
                        <Button size="sm" icon={FileText}>Registrar Chegada</Button>
                    </div>
                ))}
                {items.length === 0 && <div className="text-center text-slate-500 py-8">Nenhum veículo aguardando registro.</div>}
            </div>
        </div>
    );
};
