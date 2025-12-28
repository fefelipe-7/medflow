import React, { useState } from 'react';
import { MOCK_SHIPMENTS } from '../constants';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Plus, FileText, Truck, ClipboardCheck, AlertCircle, AlertOctagon, ArrowRight, FileWarning } from 'lucide-react';
import { ReceivingStatus } from '../types';

// --- SUBMODULES ---

const PreRegistration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const items = MOCK_SHIPMENTS.filter(s => s.status === ReceivingStatus.PRE_REGISTERED);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex justify-between items-end border-b border-slate-900 pb-6">
         <div>
            <h1 className="text-2xl font-bold text-slate-100">Pré-registro</h1>
            <p className="text-slate-500 mt-1">Materiais esperados. Validação de origem e documentação.</p>
         </div>
         <Button icon={Plus} onClick={() => setIsModalOpen(true)}>Novo Aviso de Chegada</Button>
      </div>

      <div className="border border-slate-800 rounded-lg bg-slate-900/20">
         <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-900">
               <tr>
                  <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Documento</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Origem</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Previsão</th>
                  <th className="px-6 py-3 text-right text-xs text-slate-400 uppercase">Ação</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
               {items.map(item => (
                  <tr key={item.id}>
                     <td className="px-6 py-4 text-sm text-slate-200">{item.invoiceNumber}</td>
                     <td className="px-6 py-4 text-sm text-slate-400">{item.provider}</td>
                     <td className="px-6 py-4 text-sm text-slate-400">{item.expectedDate}</td>
                     <td className="px-6 py-4 text-right">
                        <Button size="sm" variant="secondary">Editar</Button>
                     </td>
                  </tr>
               ))}
               {items.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-slate-500">Nenhum pré-registro ativo.</td></tr>}
            </tbody>
         </table>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Pré-registro">
         <div className="p-4 text-slate-400">Formulário de cadastro de NF e Fornecedor...</div>
         <div className="flex justify-end p-4"><Button onClick={() => setIsModalOpen(false)}>Salvar</Button></div>
      </Modal>
    </div>
  );
};

const ArrivalRegistration = () => {
  const items = MOCK_SHIPMENTS.filter(s => s.status === ReceivingStatus.PRE_REGISTERED || s.status === ReceivingStatus.AWAITING_ARRIVAL);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="border-b border-slate-900 pb-6">
         <h1 className="text-2xl font-bold text-slate-100">Registro de Chegada</h1>
         <p className="text-slate-500 mt-1">Check-in físico do transportador. Inicia o tempo de pátio.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
         {items.map(item => (
            <div key={item.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-lg flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-800 rounded-full"><Truck className="h-5 w-5 text-slate-400" /></div>
                  <div>
                     <div className="text-sm font-bold text-slate-200">{item.provider}</div>
                     <div className="text-xs text-slate-500">NF: {item.invoiceNumber} • {item.itemsCount} Volumes</div>
                  </div>
               </div>
               <Button size="sm" icon={FileText}>Registrar Chegada</Button>
            </div>
         ))}
         {items.length === 0 && <div className="text-center text-slate-500 py-8">Nenhum veículo aguardando registro.</div>}
      </div>
    </div>
  );
};

const Conference = () => {
  const items = MOCK_SHIPMENTS.filter(s => s.status === ReceivingStatus.IN_CONFERENCE || s.status === ReceivingStatus.DIVERGENCE);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="border-b border-slate-900 pb-6">
         <h1 className="text-2xl font-bold text-slate-100">Conferência</h1>
         <p className="text-slate-500 mt-1">Confronto Físico x Fiscal. Identificação de avarias e divergências.</p>
      </div>

      <div className="space-y-4">
         {items.map(item => (
            <div key={item.id} className="border border-slate-800 rounded-lg p-5 bg-slate-900/20">
               <div className="flex justify-between mb-4">
                  <div>
                     <h3 className="font-bold text-slate-200">{item.id}</h3>
                     <p className="text-xs text-slate-500">Responsável: {item.assignedTo || 'Não atribuído'}</p>
                  </div>
                  <StatusBadge status={item.status} />
               </div>
               
               <div className="flex gap-2 mb-4">
                  <div className="flex-1 bg-slate-950 p-3 rounded text-center border border-slate-800">
                     <div className="text-xs text-slate-500">Esperado</div>
                     <div className="font-mono font-bold text-slate-300">{item.itemsCount}</div>
                  </div>
                  <div className="flex-1 bg-slate-950 p-3 rounded text-center border border-slate-800">
                     <div className="text-xs text-slate-500">Contado</div>
                     <div className="font-mono font-bold text-brand-400">--</div>
                  </div>
               </div>

               <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" icon={AlertCircle}>Reportar Avaria</Button>
                  <Button size="sm" icon={ClipboardCheck}>Continuar Conferência</Button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

const PendingIssues = () => {
   // Mock pending issues specifically for this view
   const issues = [
      { id: 'PEN-001', type: 'Divergência Fiscal', severity: 'high', description: 'NF não consta pedido de compra PO-992', age: '2h', entity: 'SHP-2024-003' },
      { id: 'PEN-002', type: 'Avaria no Transporte', severity: 'medium', description: 'Palete 04 tombado na doca 2', age: '30min', entity: 'SHP-2024-001' },
      { id: 'PEN-003', type: 'Documentação Pendente', severity: 'low', description: 'Certificado de esterilização ilegível', age: '1d', entity: 'SHP-2024-005' },
   ];

   return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         <div className="border-b border-slate-900 pb-6">
            <h1 className="text-2xl font-bold text-slate-100">Gestão de Pendências</h1>
            <p className="text-slate-500 mt-1">Exceções operacionais que bloqueiam o fluxo de entrada.</p>
         </div>

         <div className="grid grid-cols-1 gap-4">
            {issues.map(issue => (
               <div key={issue.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-slate-900/30 border border-slate-800 rounded-lg group hover:border-slate-700 transition-colors">
                  <div className="flex items-start gap-4 mb-4 md:mb-0">
                     <div className={`p-2 rounded mt-1 ${
                        issue.severity === 'high' ? 'bg-red-900/20 text-red-500' : 
                        issue.severity === 'medium' ? 'bg-amber-900/20 text-amber-500' : 'bg-blue-900/20 text-blue-500'
                     }`}>
                        <AlertOctagon className="h-5 w-5" />
                     </div>
                     <div>
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-slate-200 text-sm">{issue.type}</span>
                           <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{issue.id}</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1 max-w-xl">{issue.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 font-mono">
                           <span className="flex items-center gap-1"><FileWarning className="h-3 w-3" /> {issue.entity}</span>
                           <span>•</span>
                           <span>Aberto há: {issue.age}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                     <Button size="sm" variant="outline" className="flex-1 md:flex-none">Investigar</Button>
                     <Button size="sm" variant="secondary" className="flex-1 md:flex-none">Resolver</Button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

interface ReceivingProps { submodule?: string; }

export const Receiving: React.FC<ReceivingProps> = ({ submodule = 'pre_registro' }) => {
   switch (submodule) {
      case 'pre_registro': return <PreRegistration />;
      case 'registro_chegada': return <ArrivalRegistration />;
      case 'conferencia': return <Conference />;
      case 'pendencias': return <PendingIssues />;
      default: return <PreRegistration />;
   }
};