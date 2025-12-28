import React from 'react';
import { MOCK_AUDIT_LOGS } from '../constants';
import { AuditLog } from '../types';
import { FileText, ShieldCheck, Search, Gavel, CheckCircle2, UserCheck, FileKey } from 'lucide-react';
import { Button } from '../components/Button';

// --- SUBMODULES ---

const EventLogs = () => {
   return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         <div className="border-b border-slate-900 pb-6 flex justify-between items-end">
            <div>
               <h1 className="text-2xl font-bold text-slate-100">Trilha de Eventos</h1>
               <p className="text-slate-500 mt-1">Registro cronológico de todas as ações do sistema.</p>
            </div>
            <div className="flex gap-2">
               <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input type="text" placeholder="Buscar ID, Usuário..." className="pl-9 bg-slate-900 border border-slate-700 rounded-md h-9 text-sm text-slate-200 w-64 focus:outline-none focus:border-brand-500" />
               </div>
               <Button variant="outline" size="sm">Filtros Avançados</Button>
            </div>
         </div>

         <div className="border border-slate-800 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-slate-800">
               <thead className="bg-slate-900">
                  <tr>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Timestamp</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Ação</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Entidade</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Usuário</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Detalhes</th>
                  </tr>
               </thead>
               <tbody className="bg-slate-950 divide-y divide-slate-800/50">
                  {MOCK_AUDIT_LOGS.map((log: AuditLog) => (
                     <tr key={log.id} className="hover:bg-slate-900/40">
                        <td className="px-6 py-3 whitespace-nowrap text-xs text-slate-500 font-mono">{log.timestamp}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-slate-200">{log.action}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-xs text-brand-400 font-mono">{log.entity}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-400">{log.user}</td>
                        <td className="px-6 py-3 text-sm text-slate-500 max-w-xs truncate">{log.details}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

const DecisionHistory = () => {
   // Mock Decision Logs
   const decisions = [
      { id: 1, type: 'Liberação de Quarentena', target: 'Lote V24-001', approver: 'Ana Souza', role: 'Gerente Qualidade', date: '2024-05-20 14:00', status: 'approved' },
      { id: 2, type: 'Ajuste de Inventário', target: 'SKU MED-SYR-10ML', approver: 'Carlos Silva', role: 'Supervisor Op.', date: '2024-05-19 09:30', status: 'approved' },
      { id: 3, type: 'Recebimento com Divergência', target: 'NF-9921', approver: 'Roberto Mendes', role: 'Coord. Logística', date: '2024-05-18 16:45', status: 'conditional' },
   ];

   return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         <div className="border-b border-slate-900 pb-6">
            <h1 className="text-2xl font-bold text-slate-100">Histórico de Decisões</h1>
            <p className="text-slate-500 mt-1">Auditoria de aprovações manuais e decisões de negócio críticas.</p>
         </div>

         <div className="relative border-l border-slate-800 ml-3 space-y-8 py-2">
            {decisions.map(decision => (
               <div key={decision.id} className="relative pl-8">
                  <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-slate-950 ${
                     decision.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}></div>
                  
                  <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-5">
                     <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                           <Gavel className="h-4 w-4 text-slate-500" />
                           <h3 className="font-bold text-slate-200">{decision.type}</h3>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">{decision.date}</span>
                     </div>
                     
                     <div className="text-sm text-slate-400 mb-4">
                        Alvo: <span className="text-brand-400 font-mono">{decision.target}</span>
                     </div>

                     <div className="flex items-center gap-3 bg-slate-950/50 p-3 rounded border border-slate-800/50">
                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-300 font-bold">
                           {decision.approver.charAt(0)}
                        </div>
                        <div>
                           <div className="text-sm font-medium text-slate-200">{decision.approver}</div>
                           <div className="text-xs text-slate-500">{decision.role}</div>
                        </div>
                        <div className="ml-auto flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-950/30 px-2 py-1 rounded">
                           <FileKey className="h-3 w-3" /> Assinado Digitalmente
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

const ComplianceReports = () => {
   return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
         <div className="border-b border-slate-900 pb-6">
            <h1 className="text-2xl font-bold text-slate-100">Relatórios de Compliance</h1>
            <p className="text-slate-500 mt-1">Evidências consolidadas para auditoria externa.</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 border border-slate-800 rounded-lg bg-slate-900/20 hover:border-slate-700 cursor-pointer group">
               <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-slate-800 rounded text-brand-400 group-hover:text-brand-300"><FileText className="h-6 w-6" /></div>
                  <h3 className="font-bold text-slate-200">Rastreabilidade de Lote</h3>
               </div>
               <p className="text-sm text-slate-500">Relatório completo do ciclo de vida de um lote específico, da entrada à saída.</p>
            </div>
            
            <div className="p-6 border border-slate-800 rounded-lg bg-slate-900/20 hover:border-slate-700 cursor-pointer group">
               <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-slate-800 rounded text-brand-400 group-hover:text-brand-300"><ShieldCheck className="h-6 w-6" /></div>
                  <h3 className="font-bold text-slate-200">Log de Acessos e Permissões</h3>
               </div>
               <p className="text-sm text-slate-500">Histórico de logins, alterações de perfil e tentativas de acesso não autorizado.</p>
            </div>
         </div>
      </div>
   )
}

interface AuditProps { submodule?: string; }

export const Audit: React.FC<AuditProps> = ({ submodule = 'trilhas_eventos' }) => {
   switch (submodule) {
      case 'trilhas_eventos': return <EventLogs />;
      case 'historico_decisoes': return <DecisionHistory />;
      case 'relatorios_compliance': return <ComplianceReports />;
      default: return <EventLogs />;
   }
};