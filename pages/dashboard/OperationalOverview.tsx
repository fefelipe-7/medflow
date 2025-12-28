import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../../components/Button';
import { Wand2, AlertTriangle, CheckCircle, Package, Truck } from 'lucide-react';
import { generateOperationalInsight } from '../../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { StatBlock } from '../../components/dashboard/StatBlock';

export const OperationalOverview: React.FC = () => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateInsight = async () => {
    setLoading(true);
    const result = await generateOperationalInsight();
    setInsight(result);
    setLoading(false);
  };

  const data = [
    { name: 'Seg', received: 4000, dispatched: 2400 },
    { name: 'Ter', received: 3000, dispatched: 1398 },
    { name: 'Qua', received: 2000, dispatched: 9800 },
    { name: 'Qui', received: 2780, dispatched: 3908 },
    { name: 'Sex', received: 1890, dispatched: 4800 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Visão Operacional</h1>
          <p className="text-slate-500 mt-1">Status consolidado dos módulos em tempo real.</p>
        </div>
        <Button onClick={handleGenerateInsight} disabled={loading} icon={Wand2} variant="secondary">
          {loading ? 'Analisando...' : 'Insight AI'}
        </Button>
      </div>

      {insight && (
        <div className="relative overflow-hidden bg-slate-900/30 border border-brand-500/20 rounded-lg p-6">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
          <div className="prose prose-invert prose-sm max-w-none text-slate-300">
            <ReactMarkdown>{insight}</ReactMarkdown>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatBlock title="Recebimento" value="Estável" change="12 ops/h" icon={Truck} trendPositive={true} />
        <StatBlock title="Estoque" value="92% Ocup." change="Crítico" icon={Package} trendPositive={false} />
        <StatBlock title="Quarentena" value="5 Pendências" change="+2" icon={AlertTriangle} trendPositive={false} />
        <StatBlock title="Expedição" value="Fluindo" change="98% SLA" icon={CheckCircle} trendPositive={true} />
      </div>

      <div className="bg-slate-900/50 border border-slate-800/60 rounded-lg p-4 h-80">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Tendência de Movimentação</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} cursor={{fill: '#1e293b'}} />
            <Bar dataKey="received" fill="#0ea5e9" radius={[2, 2, 0, 0]} />
            <Bar dataKey="dispatched" fill="#334155" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
