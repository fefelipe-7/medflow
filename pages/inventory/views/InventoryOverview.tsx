import React from 'react';
import { Package, Lock, MapPin } from 'lucide-react';
import { InfoTooltip } from '../components/InfoTooltip';

export const InventoryOverview = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-between items-end border-b border-slate-900 pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Visão Geral do Estoque</h1>
                    <p className="text-slate-500 mt-1">Capacidade, ocupação e integridade dos armazéns.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                        <Package className="h-5 w-5 text-brand-500" />
                        <h3 className="font-bold text-slate-200">Ocupação Física</h3>
                        <InfoTooltip text="Percentual de posições de paletes ocupadas em relação à capacidade total instalada. Valores acima de 85% indicam risco iminente de gargalos operacionais no recebimento." />
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-brand-500 w-[75%]"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                        <span>750 Usados</span>
                        <span>1000 Total</span>
                    </div>
                </div>

                <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                        <Lock className="h-5 w-5 text-red-500" />
                        <h3 className="font-bold text-slate-200">Itens Bloqueados</h3>
                        <InfoTooltip text="Quantidade de SKUs ou Lotes segregados fisicamente e logicamente (Avaria, Quarentena ou Vencidos). Estes itens ocupam espaço mas não geram receita. Requer ação da Qualidade." />
                    </div>
                    <div className="text-3xl font-bold text-slate-100 mb-1">12</div>
                    <div className="text-xs text-slate-500">Aguardando qualidade ou quarentena</div>
                </div>

                <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-5 w-5 text-emerald-500" />
                        <h3 className="font-bold text-slate-200">Disponível para Venda</h3>
                        <InfoTooltip text="Percentual do estoque total que está livre de bloqueios, reservas ou quarentena. Representa a capacidade real de atendimento de pedidos imediatos." />
                    </div>
                    <div className="text-3xl font-bold text-slate-100 mb-1">98.5%</div>
                    <div className="text-xs text-slate-500">Do estoque total</div>
                </div>
            </div>
        </div>
    );
};
