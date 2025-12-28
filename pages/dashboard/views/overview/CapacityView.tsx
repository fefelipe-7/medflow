import React from 'react';
import { CapacityData } from './types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface CapacityViewProps {
    data: CapacityData;
}

export const CapacityView: React.FC<CapacityViewProps> = ({ data }) => {
    const stackedData = [
        {
            name: 'Ocupação',
            Temporária: data.tempArea,
            Paletes: data.pallets,
            Quarentena: data.quarantine,
        },
    ];

    const gaugeData = [
        { name: 'Used', value: data.operationalCapacityUsed },
        { name: 'Remaining', value: 100 - data.operationalCapacityUsed },
    ];
    const gaugeColors = ['#0ea5e9', '#1e293b'];

    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-200 mb-4">Capacidade & Ocupação</h3>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
                {/* Stacked Bar - Detail */}
                <div className="flex flex-col">
                    <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">Distribuição Física</h4>
                    <div className="flex-1 min-h-[180px] md:min-h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stackedData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
                                <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" hide />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="Temporária" stackId="a" fill="#64748b" radius={[4, 0, 0, 4]} />
                                <Bar dataKey="Paletes" stackId="a" fill="#0ea5e9" />
                                <Bar dataKey="Quarentena" stackId="a" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-2 px-2">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-500"></div>Temp.</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-sky-500"></div>Paletes</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div>Quar.</div>
                    </div>
                </div>

                {/* Gauge - Operational */}
                <div className="flex flex-col items-center">
                    <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">Capacidade Operacional</h4>
                    <div className="relative w-full h-[140px] md:h-[120px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={gaugeData}
                                    cx="50%"
                                    cy="80%"
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {gaugeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={gaugeColors[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <div className="text-2xl font-bold text-slate-100">{data.operationalCapacityUsed}%</div>
                            <div className="text-[10px] text-slate-500">Utilizado</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
