import React from 'react';
import { KPIMetric } from './types';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar, Tooltip } from 'recharts';
import { Info } from 'lucide-react';

interface KPIGroupProps {
    title: string;
    description: string;
    kpis: KPIMetric[];
}

export const KPIGroup: React.FC<KPIGroupProps> = ({ title, description, kpis }) => {
    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-5">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-200">{title}</h3>
                <p className="text-xs text-slate-500">{description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {kpis.map(kpi => (
                    <div key={kpi.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg flex flex-col h-48 md:h-40">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm text-slate-400 font-medium truncate pr-2" title={kpi.nome}>{kpi.nome}</span>
                            <Info className="h-3 w-3 text-slate-600 shrink-0" />
                        </div>

                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-2xl font-bold text-slate-100">{kpi.valor.toLocaleString()}</span>
                            <span className="text-xs text-slate-500 font-medium">{kpi.unidade}</span>
                        </div>

                        {/* Mini Chart Area */}
                        <div className="flex-1 w-full min-h-0 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                {kpi.visual === 'line' ? (
                                    <LineChart data={kpi.data}>
                                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', fontSize: '10px' }} cursor={false} />
                                    </LineChart>
                                ) : kpi.visual === 'area' ? (
                                    <AreaChart data={kpi.data}>
                                        <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', fontSize: '10px' }} cursor={false} />
                                    </AreaChart>
                                ) : kpi.visual === 'bar' ? (
                                    <BarChart data={kpi.data}>
                                        <Bar dataKey="value" fill="#10b981" radius={[2, 2, 0, 0]} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', fontSize: '10px' }} cursor={{ fill: 'transparent' }} />
                                    </BarChart>
                                ) : (
                                    // Fallback/Gauge placeholder
                                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-600 bg-slate-950/20 rounded">
                                        Visualização Gauge
                                    </div>
                                )}
                            </ResponsiveContainer>
                        </div>

                        {kpi.meta && (
                            <div className="mt-2 text-[10px] text-slate-500 text-right">
                                Meta: {kpi.meta}{kpi.unidade}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
