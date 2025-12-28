import React, { useState } from 'react';
import { MOCK_QUARANTINE_LIST } from '../constants';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { QuarantineWorkflow } from '../components/QuarantineWorkflow';
import { useEventBus } from '../contexts/EventBusContext';
import { ShieldAlert, AlertTriangle, CheckSquare, Clock, Activity, ChevronRight, History, CheckCircle2, XCircle, Search, Filter } from 'lucide-react';

const RiskCell = ({ count, riskLevel }: { count: number, riskLevel: 'low' | 'med' | 'high' | 'crit' }) => {
  const bg = {
    low: 'bg-emerald-900/20', med: 'bg-amber-900/20', high: 'bg-orange-900/20', crit: 'bg-red-900/20'
  };
  const text = {
    low: 'text-emerald-500', med: 'text-amber-500', high: 'text-orange-500', crit: 'text-red-500'
  };
  return (
    <div className={`w-full h-16 rounded border border-slate-800/50 flex flex-col items-center justify-center ${bg[riskLevel]}`}>
       <span className={`text-lg font-bold ${text[riskLevel]}`}>{count}</span>
    </div>
  );
};

// --- SUBMODULES ---

const QuarantineDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
       <div className="border-b border-slate-900 pb-6">
          <h1 className="text-2xl font-bold text-slate-100">Visão da Quarentena</h1>
          <p className="text-slate-500 mt-1">Monitoramento de riscos e tempos de análise.</p>
       </div>

       <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
             <div className="text-xs text-slate-500 uppercase font-bold">Total em Análise</div>
             <div className="text-2xl font-bold text-slate-100 mt-1">{MOCK_QUARANTINE_LIST.length}</div>
          </div>
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
             <div className="text-xs text-slate-500 uppercase font-bold">Tempo Médio</div>
             <div className="text-2xl font-bold text-slate-100 mt-1">4.5 dias</div>
          </div>
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
             <div className="text-xs text-slate-500 uppercase font-bold">Críticos</div>
             <div className="text-2xl font-bold text-red-500 mt-1">2</div>
          </div>
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
             <div className="text-xs text-slate-500 uppercase font-bold">Capacidade</div>
             <div className="text-2xl font-bold text-amber-500 mt-1">85%</div>
          </div>
       </div>

       <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
          <h3 className="font-bold text-slate-200 mb-4">Matriz de Risco</h3>
          <div className="grid grid-cols-3 gap-2">
             <RiskCell count={1} riskLevel="crit" />
             <RiskCell count={2} riskLevel="high" />
             <RiskCell count={1} riskLevel="med" />
             <RiskCell count={0} riskLevel="high" />
             <RiskCell count={4} riskLevel="med" />
             <RiskCell count={8} riskLevel="low" />
             <RiskCell count={0} riskLevel="med" />
             <RiskCell count={2} riskLevel="low" />
             <RiskCell count={10} riskLevel="low" />
          </div>
          <div className="grid grid-cols-3 text-center text-xs text-slate-500 mt-2">
             <span>0-3 dias</span>
             <span>4-7 dias</span>
             <span>8+ dias</span>
          </div>
       </div>
    </div>
  )
}

const DecisionQueue = () => {
   const [selectedItem, setSelectedItem] = useState<any>(null);
   const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
   const [error, setError] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const { publish } = useEventBus();
 
   const handleResolveClick = (item: any) => {
     setSelectedItem(item);
     setIsWorkflowOpen(true);
   };
 
   const handleWorkflowComplete = () => {
     setIsWorkflowOpen(false);
     publish('QUARANTINE_DECISION_MADE', { itemId: selectedItem?.id, decision: 'Released', timestamp: Date.now() });
   };

   // Mock function to simulate retry
   const handleRetry = () => {
       setIsLoading(true);
       setError(false);
       // Simulate API call delay
       setTimeout(() => setIsLoading(false), 1000);
   };

   if (error) {
       return (
           <div className="flex flex-col items-center justify-center p-12 border border-red-900/30 bg-red-950/10 rounded-lg animate-in fade-in">
               <div className="p-3 bg-red-900/20 rounded-full mb-4">
                   <AlertTriangle className="h-8 w-8 text-red-500" />
               </div>
               <h3 className="text-lg font-bold text-slate-200 mb-2">Erro ao carregar fila</h3>
               <p className="text-slate-400 mb-6 text-center max-w-sm text-sm">
                   Não foi possível sincronizar os dados da fila de decisão. Isso pode ocorrer devido a problemas de conexão.
               </p>
               <Button onClick={handleRetry} variant="secondary">
                   {isLoading ? 'Tentando...' : 'Tentar Novamente'}
               </Button>
           </div>
       )
   }

   return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         <div className="border-b border-slate-900 pb-6">
            <h1 className="text-2xl font-bold text-slate-100">Fila de Decisão</h1>
            <p className="text-slate-500 mt-1">Itens ordenados por risco e tempo. Prioridade máxima para críticos.</p>
         </div>

         <div className="border border-slate-800 rounded-lg bg-slate-900/20">
            {MOCK_QUARANTINE_LIST.length === 0 ? (
               <EmptyState icon={CheckSquare} title="Fila Vazia" description="Nenhum item aguardando decisão." />
            ) : (
               <table className="min-w-full divide-y divide-slate-800">
                  <thead className="bg-slate-900">
                     <tr>
                        <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Item</th>
                        <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Motivo</th>
                        <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Risco</th>
                        <th className="px-6 py-3 text-right text-xs text-slate-400 uppercase">Ação</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                     {MOCK_QUARANTINE_LIST.sort((a,b) => b.riskScore - a.riskScore).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-900/40">
                           <td className="px-6 py-4">
                              <div className="font-medium text-slate-200">{item.name}</div>
                              <div className="text-xs text-slate-500">{item.supplier} • {item.daysInQuarantine}d</div>
                           </td>
                           <td className="px-6 py-4 text-sm text-slate-300">{item.reason}</td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                 <div className={`h-2 w-2 rounded-full ${item.riskScore > 70 ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                                 <span className="text-sm text-slate-400">{item.riskScore}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <Button size="sm" onClick={() => handleResolveClick(item)}>Decidir</Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            )}
         </div>

         {selectedItem && (
            <QuarantineWorkflow 
               item={selectedItem} 
               isOpen={isWorkflowOpen} 
               onClose={() => setIsWorkflowOpen(false)} 
               onComplete={handleWorkflowComplete}
            />
         )}
      </div>
   )
}

const QuarantineHistory = () => {
   // Mock History Data
   const history = [
      { id: 'HIST-102', item: 'Vacina Influenza', batch: 'V24-001', decision: 'Liberado', user: 'Ana Qualidade', date: '2024-05-20', reason: 'Laudo deferido' },
      { id: 'HIST-101', item: 'Seringa 10ml', batch: 'B99-11', decision: 'Descartado', user: 'Carlos Silva', date: '2024-05-18', reason: 'Avaria irreversível' },
      { id: 'HIST-099', item: 'Gaze Estéril', batch: 'GZ-221', decision: 'Liberado', user: 'Ana Qualidade', date: '2024-05-15', reason: 'Reinspeção aprovada' },
   ];

   return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         <div className="border-b border-slate-900 pb-6 flex justify-between items-end">
            <div>
               <h1 className="text-2xl font-bold text-slate-100">Histórico de Decisões</h1>
               <p className="text-slate-500 mt-1">Registro imutável de liberações e descartes.</p>
            </div>
            <div className="flex gap-2">
               <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input type="text" placeholder="Buscar lote, item..." className="pl-9 bg-slate-900 border border-slate-700 rounded-md h-9 text-sm text-slate-200 w-64 focus:outline-none focus:border-brand-500" />
               </div>
               <Button variant="outline" size="sm" icon={Filter}>Filtros</Button>
            </div>
         </div>
         
         <div className="border border-slate-800 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-slate-800">
               <thead className="bg-slate-900">
                  <tr>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Item / Lote</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Decisão</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Motivo</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Responsável</th>
                     <th className="px-6 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Data</th>
                  </tr>
               </thead>
               <tbody className="bg-slate-950 divide-y divide-slate-800/50">
                  {history.map((log) => (
                     <tr key={log.id} className="hover:bg-slate-900/40">
                        <td className="px-6 py-4">
                           <div className="text-sm font-medium text-slate-200">{log.item}</div>
                           <div className="text-xs text-slate-500 font-mono">{log.batch}</div>
                        </td>
                        <td className="px-6 py-4">
                           {log.decision === 'Liberado' ? (
                              <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                                 <CheckCircle2 className="h-4 w-4" /> Liberado
                              </div>
                           ) : (
                              <div className="flex items-center gap-1.5 text-red-400 text-sm font-medium">
                                 <XCircle className="h-4 w-4" /> Descartado
                              </div>
                           )}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">{log.reason}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{log.user}</td>
                        <td className="px-6 py-4 text-sm text-slate-500 text-right">{log.date}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}

interface QuarantineProps { submodule?: string; }

export const Quarantine: React.FC<QuarantineProps> = ({ submodule = 'visao_quarentena' }) => {
   switch (submodule) {
      case 'visao_quarentena': return <QuarantineDashboard />;
      case 'fila_decisao': return <DecisionQueue />;
      case 'historico_quarentena': return <QuarantineHistory />;
      default: return <QuarantineDashboard />;
   }
};