import React from 'react';
import { Button } from '../../../components/Button';
import { LayoutGrid } from 'lucide-react';

export const PhysicalOccupancy = () => {
    // Aisle Mock Data
    const aisles = [
        { id: 'A', label: 'Corredor A', usage: 92, type: 'Refrigerado', status: 'critical' },
        { id: 'B', label: 'Corredor B', usage: 45, type: 'Seco', status: 'normal' },
        { id: 'C', label: 'Corredor C', usage: 60, type: 'Seco', status: 'normal' },
        { id: 'D', label: 'Corredor D', usage: 78, type: 'Inflamáveis', status: 'warning' },
        { id: 'E', label: 'Corredor E', usage: 15, type: 'Psicotrópicos', status: 'normal' },
        { id: 'Q', label: 'Quarentena', usage: 85, type: 'Segregado', status: 'warning' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="border-b border-slate-900 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Mapa de Ocupação</h1>
                    <p className="text-slate-500 mt-1">Visualização da capacidade por setor e corredor.</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mr-4">
                        <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Normal
                        <div className="w-3 h-3 bg-amber-500 rounded-sm"></div> Atenção
                        <div className="w-3 h-3 bg-red-500 rounded-sm"></div> Crítico
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aisles.map(aisle => (
                    <div key={aisle.id} className="p-5 bg-slate-900/30 border border-slate-800 rounded-lg hover:border-slate-600 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-slate-950 border border-slate-800 rounded flex items-center justify-center font-bold text-slate-400 group-hover:text-brand-400 group-hover:border-brand-500/50 transition-colors">
                                    {aisle.id}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-200">{aisle.label}</h3>
                                    <span className="text-xs text-slate-500">{aisle.type}</span>
                                </div>
                            </div>
                            <span className={`text-lg font-bold ${aisle.status === 'critical' ? 'text-red-500' :
                                aisle.status === 'warning' ? 'text-amber-500' : 'text-emerald-500'
                                }`}>
                                {aisle.usage}%
                            </span>
                        </div>

                        {/* Visual Bar Representation */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>Disponível</span>
                                <span>{100 - aisle.usage}%</span>
                            </div>
                            <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${aisle.status === 'critical' ? 'bg-red-500' :
                                        aisle.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                                        }`}
                                    style={{ width: `${aisle.usage}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between items-center">
                            <span className="text-xs text-slate-500">240 posições totais</span>
                            <Button size="sm" variant="ghost" icon={LayoutGrid}>Ver Mapa</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
