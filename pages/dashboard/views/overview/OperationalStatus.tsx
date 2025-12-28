import React from 'react';
import { ReceivingMetrics, StockMetrics, QuarantineMetrics } from './types';
import { Truck, Package, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../../../../components/Button';

interface OperationalStatusProps {
    receiving: ReceivingMetrics;
    stock: StockMetrics;
    quarantine: QuarantineMetrics;
}

export const OperationalStatus: React.FC<OperationalStatusProps> = ({ receiving, stock, quarantine }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Receiving Card */}
            <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-950/30 rounded-lg text-blue-400"><Truck className="h-5 w-5" /></div>
                    <span className={`text-xs px-2 py-1 rounded-full ${receiving.slaBreached ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                        {receiving.slaBreached ? 'SLA Estourado' : 'No Prazo'}
                    </span>
                </div>
                <div>
                    <h3 className="text-slate-400 text-sm font-medium">Recebimento</h3>
                    <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Aguardando NF</span>
                            <span className="text-slate-200 font-mono">{receiving.awaitingInvoices}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Em Conferência</span>
                            <span className="text-slate-200 font-mono">{receiving.inConference}</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: '60%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stock Card */}
            <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-950/30 rounded-lg text-purple-400"><Package className="h-5 w-5" /></div>
                    <span className={`text-xs px-2 py-1 rounded-full ${stock.occupancyPercentage > 90 ? 'bg-red-500/20 text-red-500' : stock.occupancyPercentage > 80 ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                        {stock.occupancyPercentage}% Ocupado
                    </span>
                </div>
                <div>
                    <h3 className="text-slate-400 text-sm font-medium">Estoque</h3>
                    <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Itens Críticos</span>
                            <span className="text-amber-400 font-mono font-bold text-xs bg-amber-950/30 px-1.5 rounded">{stock.criticalItems}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Ruptura (Falta)</span>
                            <span className="text-red-400 font-mono font-bold text-xs bg-red-950/30 px-1.5 rounded">{stock.missingItems}</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className={`h-full rounded-full ${stock.occupancyPercentage > 90 ? 'bg-red-500' : 'bg-purple-500'}`} style={{ width: `${stock.occupancyPercentage}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quarantine Card */}
            <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-amber-950/30 rounded-lg text-amber-400"><AlertTriangle className="h-5 w-5" /></div>
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400">
                        {quarantine.avgRetentionTimeHours}h Médio
                    </span>
                </div>
                <div>
                    <h3 className="text-slate-400 text-sm font-medium">Quarentena</h3>
                    <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Volumes Retidos</span>
                            <span className="text-slate-200 font-mono">{quarantine.quarantineVolumes}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Pendências</span>
                            <span className="text-slate-200 font-mono">{quarantine.pendingResolutions}</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full" style={{ width: '30%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
