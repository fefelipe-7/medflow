import React from 'react';
import { KPICard } from '../../components/dashboard/KPICard';

export const KPIIndicators: React.FC = () => {
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
