import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { AlertItem } from './types';

interface SeverityOverviewProps {
    alerts: AlertItem[];
}

export const SeverityOverview: React.FC<SeverityOverviewProps> = ({ alerts }) => {
    const severityCounts = {
        critico: alerts.filter(a => a.criticidade === 'critico').length,
        alto: alerts.filter(a => a.criticidade === 'alto').length,
        medio: alerts.filter(a => a.criticidade === 'medio').length,
        baixo: alerts.filter(a => a.criticidade === 'baixo').length,
        informativo: alerts.filter(a => a.criticidade === 'informativo').length,
    };

    const donutData = [
        { name: 'Crítico', value: severityCounts.critico, color: '#ef4444' },
        { name: 'Alto', value: severityCounts.alto, color: '#f97316' },
        { name: 'Médio', value: severityCounts.medio, color: '#fbbf24' },
        { name: 'Baixo', value: severityCounts.baixo, color: '#3b82f6' },
    ];

    const moduleCounts = {
        recebimento: alerts.filter(a => a.moduloOrigem === 'recebimento').length,
        estoque: alerts.filter(a => a.moduloOrigem === 'estoque').length,
        quarentena: alerts.filter(a => a.moduloOrigem === 'quarentena').length,
        auditoria: alerts.filter(a => a.moduloOrigem === 'auditoria').length,
    };

    const barData = [
        { name: 'Receb.', count: moduleCounts.recebimento },
        { name: 'Estoque', count: moduleCounts.estoque },
        { name: 'Quar.', count: moduleCounts.quarentena },
        { name: 'Audit.', count: moduleCounts.auditoria },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-4">
                <h3 className="text-sm font-bold text-slate-300 mb-2 uppercase">Por Severidade</h3>
                <div className="h-32 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={donutData}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={50}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {donutData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="ml-4 space-y-1">
                        {donutData.map(d => (
                            <div key={d.name} className="flex items-center gap-2 text-xs text-slate-400">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                                <span>{d.name}: {d.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-4">
                <h3 className="text-sm font-bold text-slate-300 mb-2 uppercase">Por Módulo</h3>
                <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={60} tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                            <Bar dataKey="count" fill="#475569" radius={[0, 4, 4, 0]} barSize={16}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.count > 5 ? '#ef4444' : '#475569'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
