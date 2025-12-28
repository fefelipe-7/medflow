import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Button } from '../components/Button';
import { Wand2, AlertTriangle, CheckCircle, Package, Truck, ArrowUpRight, Siren, TrendingUp, Users } from 'lucide-react';
import { generateOperationalInsight } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

// --- SUBMODULE COMPONENTS ---

const OperationalOverview = () => {
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

const GlobalAlerts = () => {
  const alerts = [
    { id: 1, priority: 'Alta', area: 'Estoque A1', issue: 'Capacidade > 95%', timeOpen: '2h 15m', action: 'Bloquear Entrada' },
    { id: 2, priority: 'Alta', area: 'Quarentena', issue: 'Lote Vencido', timeOpen: '4h 30m', action: 'Descartar' },
    { id: 3, priority: 'Média', area: 'Recebimento', issue: 'Divergência NF-9921', timeOpen: '10m', action: 'Reconferir' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="border-b border-slate-900 pb-6">
        <h1 className="text-2xl font-bold text-slate-100">Alertas Globais</h1>
        <p className="text-slate-500 mt-1">Lista priorizada de bloqueios e riscos operacionais.</p>
      </div>

      <div className="space-y-3">
        {alerts.map(alert => (
          <div key={alert.id} className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${alert.priority === 'Alta' ? 'bg-red-900/30 text-red-500' : 'bg-amber-900/30 text-amber-500'}`}>
                <Siren className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-200">{alert.area}: {alert.issue}</div>
                <div className="text-xs text-slate-500 flex gap-2 mt-1">
                  <span>Aberto há: {alert.timeOpen}</span>
                  <span>•</span>
                  <span className="uppercase tracking-wider">{alert.priority}</span>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline">{alert.action}</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const KPIIndicators = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="border-b border-slate-900 pb-6">
        <h1 className="text-2xl font-bold text-slate-100">Indicadores KPI</h1>
        <p className="text-slate-500 mt-1">Métricas de performance e qualidade.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <KPICard title="Giro de Estoque" value="4.2x" target="5.0x" owner="Gerente Logística" status="warning" />
         <KPICard title="Acuracidade Inventário" value="99.8%" target="99.5%" owner="Coord. Estoque" status="good" />
         <KPICard title="Tempo Médio Recebimento" value="45min" target="60min" owner="Superv. Recebimento" status="good" />
         <KPICard title="Devoluções" value="3.5%" target="2.0%" owner="Qualidade" status="bad" />
      </div>
    </div>
  );
};

// --- HELPERS ---

const StatBlock = ({ title, value, change, icon: Icon, trendPositive }: any) => (
  <div className="bg-slate-900/50 border border-slate-800/60 rounded-lg p-5">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-950 rounded-md text-slate-400"><Icon className="h-4 w-4" /></div>
      <div className={`text-xs font-medium px-2 py-1 rounded-full ${trendPositive ? 'bg-emerald-950/30 text-emerald-400' : 'bg-red-950/30 text-red-400'}`}>{change}</div>
    </div>
    <h4 className="text-sm text-slate-500 font-medium">{title}</h4>
    <span className="text-2xl font-semibold text-slate-100">{value}</span>
  </div>
);

const KPICard = ({ title, value, target, owner, status }: any) => {
  const colors = { good: 'text-emerald-400', warning: 'text-amber-400', bad: 'text-red-400' };
  return (
    <div className="p-5 bg-slate-900/30 border border-slate-800 rounded-lg">
       <div className="flex justify-between mb-2">
          <h3 className="font-medium text-slate-300">{title}</h3>
          <TrendingUp className="h-4 w-4 text-slate-600" />
       </div>
       <div className={`text-3xl font-bold mb-1 ${colors[status as keyof typeof colors]}`}>{value}</div>
       <div className="text-xs text-slate-500 mb-4">Meta: {target}</div>
       <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950/50 p-2 rounded">
          <Users className="h-3 w-3" />
          Dono: {owner}
       </div>
    </div>
  )
}

interface DashboardProps { submodule?: string; }

export const Dashboard: React.FC<DashboardProps> = ({ submodule = 'overview_operacional' }) => {
  switch (submodule) {
    case 'overview_operacional': return <OperationalOverview />;
    case 'alertas_globais': return <GlobalAlerts />;
    case 'indicadores_kpi': return <KPIIndicators />;
    default: return <OperationalOverview />;
  }
};