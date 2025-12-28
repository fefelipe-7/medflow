import React from 'react';
import { Button } from '../../components/Button';
import { Siren } from 'lucide-react';

export const GlobalAlerts: React.FC = () => {
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
