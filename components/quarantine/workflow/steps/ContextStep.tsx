import React from 'react';
import { QuarantineItem } from '../../../../types';
import { DetailRow } from '../components/DetailRow';
import { TimelineItem } from '../components/TimelineItem';

interface ContextStepProps {
    item: QuarantineItem;
}

export const ContextStep: React.FC<ContextStepProps> = ({ item }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-slate-100">Contexto do Material</h3>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Dados Principais</h4>
                    <div className="space-y-3">
                        <DetailRow label="Fornecedor" value={item.supplier} />
                        <DetailRow label="Data de Entrada" value={item.entryDate} />
                        <DetailRow label="Dias em Quarentena" value={`${item.daysInQuarantine} dias`} />
                        <DetailRow label="Motivo" value={item.reason} highlight />
                    </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Rastreabilidade</h4>
                    <div className="relative pl-4 border-l border-slate-800 space-y-6">
                        <TimelineItem date="2024-05-10 08:00" title="Recebimento Físico" user="João Silva" />
                        <TimelineItem date="2024-05-10 09:30" title="Bloqueio Automático" user="Sistema" />
                        <TimelineItem date="2024-05-10 10:00" title="Entrada em Quarentena" user="Maria Qualidade" active />
                    </div>
                </div>
            </div>
        </div>
    );
};
