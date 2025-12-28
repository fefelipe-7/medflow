import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../constants';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { 
  Search, ArrowRightLeft, Package, AlertTriangle, 
  Filter, Lock, MapPin, History, Info, LayoutGrid, Box
} from 'lucide-react';
import { InventoryStatus } from '../types';

// --- HELPERS ---

const InfoTooltip = ({ text }: { text: string }) => (
  <div className="group relative ml-auto">
    <Info className="h-4 w-4 text-slate-600 hover:text-slate-400 cursor-help transition-colors" />
    <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 translate-y-1 group-hover:translate-y-0">
      {text}
      <div className="absolute -bottom-1 right-1 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45"></div>
    </div>
  </div>
);

// --- SUBMODULES ---

const InventoryOverview = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex justify-between items-end border-b border-slate-900 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Visão Geral do Estoque</h1>
          <p className="text-slate-500 mt-1">Capacidade, ocupação e integridade dos armazéns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 mb-4">
               <Package className="h-5 w-5 text-brand-500" />
               <h3 className="font-bold text-slate-200">Ocupação Física</h3>
               <InfoTooltip text="Percentual de posições de paletes ocupadas em relação à capacidade total instalada. Valores acima de 85% indicam risco iminente de gargalos operacionais no recebimento." />
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
               <div className="h-full bg-brand-500 w-[75%]"></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
               <span>750 Usados</span>
               <span>1000 Total</span>
            </div>
         </div>
         
         <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 mb-4">
               <Lock className="h-5 w-5 text-red-500" />
               <h3 className="font-bold text-slate-200">Itens Bloqueados</h3>
               <InfoTooltip text="Quantidade de SKUs ou Lotes segregados fisicamente e logicamente (Avaria, Quarentena ou Vencidos). Estes itens ocupam espaço mas não geram receita. Requerem ação da Qualidade." />
            </div>
            <div className="text-3xl font-bold text-slate-100 mb-1">12</div>
            <div className="text-xs text-slate-500">Aguardando qualidade ou quarentena</div>
         </div>

         <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 mb-4">
               <MapPin className="h-5 w-5 text-emerald-500" />
               <h3 className="font-bold text-slate-200">Disponível para Venda</h3>
               <InfoTooltip text="Percentual do estoque total que está livre de bloqueios, reservas ou quarentena. Representa a capacidade real de atendimento de pedidos imediatos." />
            </div>
            <div className="text-3xl font-bold text-slate-100 mb-1">98.5%</div>
            <div className="text-xs text-slate-500">Do estoque total</div>
         </div>
      </div>
    </div>
  );
};

const PhysicalOccupancy = () => {
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
                     <span className={`text-lg font-bold ${
                        aisle.status === 'critical' ? 'text-red-500' : 
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
                           className={`h-full rounded-full ${
                              aisle.status === 'critical' ? 'bg-red-500' : 
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

const Movements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex justify-between items-end border-b border-slate-900 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Movimentações</h1>
          <p className="text-slate-500 mt-1">Transferências internas. Origem → Destino com justificativa.</p>
        </div>
        <Button icon={ArrowRightLeft} onClick={() => setIsModalOpen(true)}>Nova Movimentação</Button>
      </div>

      <div className="border border-slate-800 rounded-lg bg-slate-900/20">
         <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-900">
               <tr>
                  <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Item</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">De</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Para</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Responsável</th>
                  <th className="px-6 py-3 text-right text-xs text-slate-400 uppercase">Data</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
               {/* Mock movements based on inventory items for demo */}
               {MOCK_INVENTORY.slice(0, 3).map((item, idx) => (
                  <tr key={idx}>
                     <td className="px-6 py-4 text-sm text-slate-200">{item.sku}</td>
                     <td className="px-6 py-4 text-sm text-slate-400 font-mono">RECEBIMENTO</td>
                     <td className="px-6 py-4 text-sm text-slate-200 font-mono">{item.location}</td>
                     <td className="px-6 py-4 text-sm text-slate-400">Sistema</td>
                     <td className="px-6 py-4 text-sm text-slate-500 text-right">Hoje, 10:00</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nova Movimentação">
         <div className="p-4 text-slate-400">Formulário: Seleção de Lote, Origem e Destino...</div>
         <div className="flex justify-end p-4"><Button onClick={() => setIsModalOpen(false)}>Confirmar</Button></div>
      </Modal>
    </div>
  );
};

const BlockedItems = () => {
  const blocked = MOCK_INVENTORY.filter(i => i.status === InventoryStatus.BLOCKED || i.status === InventoryStatus.QUARANTINE || i.status === InventoryStatus.EXPIRED);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="border-b border-slate-900 pb-6">
        <h1 className="text-2xl font-bold text-slate-100">Itens Bloqueados</h1>
        <p className="text-slate-500 mt-1">Materiais segregados. Requer ação de desbloqueio ou descarte.</p>
      </div>

      <div className="space-y-3">
         {blocked.map(item => (
            <div key={item.id} className="p-4 bg-slate-900/40 border border-red-900/20 rounded-lg flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-900/20 rounded text-red-500"><AlertTriangle className="h-5 w-5" /></div>
                  <div>
                     <div className="text-sm font-bold text-slate-200">{item.name}</div>
                     <div className="text-xs text-slate-500 font-mono">Lote: {item.batch} • {item.location}</div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <StatusBadge status={item.status} />
                  <Button size="sm" variant="outline">Ver Detalhes</Button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

interface InventoryProps { submodule?: string; }

export const Inventory: React.FC<InventoryProps> = ({ submodule = 'visao_geral' }) => {
   switch (submodule) {
      case 'visao_geral': return <InventoryOverview />;
      case 'ocupacao_fisica': return <PhysicalOccupancy />;
      case 'movimentacoes': return <Movements />;
      case 'itens_bloqueados': return <BlockedItems />;
      default: return <InventoryOverview />;
   }
};