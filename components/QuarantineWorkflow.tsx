import React, { useState } from 'react';
import { QuarantineItem } from '../types';
import { Button } from './Button';
import { 
  CheckCircle2, AlertTriangle, FileText, Activity, 
  ThermometerSnowflake, ShieldAlert, X, ChevronRight, 
  Microscope, FileCheck, BrainCircuit, Gavel 
} from 'lucide-react';

interface WorkflowProps {
  item: QuarantineItem;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type Step = 'context' | 'inspection' | 'analysis' | 'decision';

export const QuarantineWorkflow: React.FC<WorkflowProps> = ({ item, isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState<Step>('context');
  const [formData, setFormData] = useState({
    pkgIntegrity: 'intact',
    labelingOk: true,
    visualContamination: false,
    inspectionNotes: '',
    invoiceOk: true,
    certificateOk: false,
    recommendation: '',
    finalDecision: ''
  });

  if (!isOpen) return null;

  // Calculate simulated risk score based on inputs
  const calculateRisk = () => {
    let score = item.riskScore; // Base score
    if (formData.visualContamination) score += 40;
    if (!formData.invoiceOk) score += 30;
    if (formData.pkgIntegrity === 'damaged') score += 20;
    return Math.min(score, 100);
  };

  const currentRisk = calculateRisk();

  const steps = [
    { id: 'context', label: 'Contexto', icon: FileText },
    { id: 'inspection', label: 'Inspeção', icon: Microscope },
    { id: 'analysis', label: 'Análise & Risco', icon: BrainCircuit },
    { id: 'decision', label: 'Decisão', icon: Gavel },
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as Step);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl h-[90vh] bg-slate-900 border border-slate-800 rounded-xl shadow-2xl flex overflow-hidden">
        
        {/* Sidebar Stepper */}
        <div className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-100">Fluxo de Decisão</h2>
              <p className="text-xs text-slate-500 mt-1">ID: {item.id}</p>
            </div>
            <div className="space-y-2">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isPast = steps.findIndex(s => s.id === currentStep) > idx;

                return (
                  <div key={step.id} className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-brand-900/20 text-brand-400 border border-brand-900/30' : 
                    isPast ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <div className={`mr-3 ${isActive ? 'text-brand-500' : isPast ? 'text-slate-500' : 'text-slate-700'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">{step.label}</span>
                    {isPast && <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-500" />}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
             <div className="text-xs text-slate-500 uppercase font-bold mb-2">Item em Análise</div>
             <div className="text-sm font-medium text-slate-200 truncate">{item.name}</div>
             <div className="text-xs text-slate-500 font-mono mt-1">Lote: {item.batch}</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900">
             <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-amber-500" />
                <span className="font-mono text-amber-500 text-sm font-medium">Fluxo de Quarentena Ativo</span>
             </div>
             <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
               <X className="h-6 w-6" />
             </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-8">
            
            {currentStep === 'context' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold text-slate-100">Contexto do Material</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Dados Principais</h4>
                    <div className="space-y-3">
                      <DetailRow label="Fornecedor" value={item.supplier} />
                      <DetailRow label="Data de Entrada" value={item.entryDate} />
                      <DetailRow label="Dias em Quarentena" value={`${item.daysInQuarantine} dias`} />
                      <DetailRow label="Motivo" value={item.reason} highlight />
                    </div>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Rastreabilidade</h4>
                    <div className="relative pl-4 border-l border-slate-800 space-y-6">
                      <TimelineItem date="2024-05-10 08:00" title="Recebimento Físico" user="João Silva" />
                      <TimelineItem date="2024-05-10 09:30" title="Bloqueio Automático" user="Sistema" />
                      <TimelineItem date="2024-05-10 10:00" title="Entrada em Quarentena" user="Maria Qualidade" active />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'inspection' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
                 <h3 className="text-2xl font-bold text-slate-100">Inspeção Física & Documental</h3>
                 <div className="space-y-6">
                    <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 space-y-6">
                       <h4 className="text-sm font-semibold text-slate-300 flex items-center">
                         <Activity className="h-4 w-4 mr-2 text-brand-500" />
                         Condições Físicas
                       </h4>
                       <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-2">Integridade da Embalagem</label>
                            <select 
                              className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-slate-200 text-sm focus:border-brand-500 focus:outline-none"
                              value={formData.pkgIntegrity}
                              onChange={(e) => setFormData({...formData, pkgIntegrity: e.target.value})}
                            >
                              <option value="intact">Íntegra</option>
                              <option value="damaged">Avariada / Amassada</option>
                              <option value="violated">Violada</option>
                            </select>
                          </div>
                          <div className="flex items-center space-x-3 pt-6">
                             <input 
                               type="checkbox" 
                               id="visualContam"
                               className="rounded border-slate-700 bg-slate-900 text-brand-600 focus:ring-brand-500"
                               checked={formData.visualContamination}
                               onChange={(e) => setFormData({...formData, visualContamination: e.target.checked})}
                             />
                             <label htmlFor="visualContam" className="text-sm text-slate-300">Sinais Visuais de Contaminação</label>
                          </div>
                       </div>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 space-y-6">
                       <h4 className="text-sm font-semibold text-slate-300 flex items-center">
                         <FileCheck className="h-4 w-4 mr-2 text-brand-500" />
                         Conformidade Documental
                       </h4>
                       <div className="space-y-3">
                          <CheckboxField 
                            label="Nota Fiscal confere com físico" 
                            checked={formData.invoiceOk} 
                            onChange={(v) => setFormData({...formData, invoiceOk: v})}
                          />
                          <CheckboxField 
                            label="Certificado de Análise (Laudo) Disponível" 
                            checked={formData.certificateOk} 
                            onChange={(v) => setFormData({...formData, certificateOk: v})}
                          />
                       </div>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 space-y-4">
                       <h4 className="text-sm font-semibold text-slate-300 flex items-center">
                         <FileText className="h-4 w-4 mr-2 text-brand-500" />
                         Observações da Inspeção
                       </h4>
                       <textarea
                         className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-200 text-sm focus:border-brand-500 focus:outline-none min-h-[100px]"
                         placeholder="Descreva detalhes adicionais, avarias específicas ou observações sobre a documentação..."
                         value={formData.inspectionNotes}
                         onChange={(e) => setFormData({...formData, inspectionNotes: e.target.value})}
                       />
                       <p className="text-xs text-slate-500">Permite múltiplas linhas.</p>
                    </div>
                 </div>
               </div>
            )}

            {currentStep === 'analysis' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold text-slate-100">Avaliação de Risco Computada</h3>
                
                <div className="flex gap-8 items-start">
                   {/* Score Display */}
                   <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 flex flex-col items-center justify-center w-64 text-center">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Score de Risco</div>
                      <div className={`text-6xl font-black mb-2 ${currentRisk > 60 ? 'text-red-500' : currentRisk > 30 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {currentRisk}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        currentRisk > 60 ? 'bg-red-950/50 text-red-400' : currentRisk > 30 ? 'bg-amber-950/50 text-amber-400' : 'bg-emerald-950/50 text-emerald-400'
                      }`}>
                         {currentRisk > 60 ? 'Risco Crítico' : currentRisk > 30 ? 'Risco Médio' : 'Risco Baixo'}
                      </div>
                   </div>

                   {/* Factors */}
                   <div className="flex-1 bg-slate-950 p-6 rounded-xl border border-slate-800">
                      <h4 className="text-sm font-semibold text-slate-300 mb-4">Fatores de Composição</h4>
                      <div className="space-y-4">
                         <RiskFactor label="Tempo em Quarentena" value={`${item.daysInQuarantine} dias`} impact="low" />
                         <RiskFactor label="Integridade da Embalagem" value={formData.pkgIntegrity === 'intact' ? 'Ok' : 'Problema'} impact={formData.pkgIntegrity === 'intact' ? 'none' : 'medium'} />
                         <RiskFactor label="Contaminação Visual" value={formData.visualContamination ? 'Detectada' : 'Não Detectada'} impact={formData.visualContamination ? 'critical' : 'none'} />
                         <RiskFactor label="Documentação" value={!formData.invoiceOk ? 'Divergente' : 'Ok'} impact={!formData.invoiceOk ? 'high' : 'none'} />
                      </div>
                   </div>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 mt-4">
                  <label className="block text-xs font-medium text-slate-400 mb-2 uppercase">Parecer Técnico (Qualidade)</label>
                  <textarea 
                    className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-slate-200 text-sm focus:border-brand-500 focus:outline-none h-24"
                    placeholder="Justifique a recomendação baseada nos dados acima..."
                  ></textarea>
                </div>
              </div>
            )}

            {currentStep === 'decision' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto text-center pt-8">
                 <Gavel className="h-16 w-16 text-brand-500 mx-auto mb-4" />
                 <h3 className="text-2xl font-bold text-slate-100">Decisão Final</h3>
                 <p className="text-slate-400">
                   Com base na análise de risco (Score: {currentRisk}) e no parecer técnico, selecione a destinação final deste material.
                 </p>
                 
                 <div className="grid grid-cols-3 gap-4 mt-8">
                    <button 
                      onClick={onComplete}
                      className="group p-4 bg-slate-950 border border-slate-800 rounded-lg hover:border-emerald-500 hover:bg-emerald-950/10 transition-all"
                    >
                       <div className="h-10 w-10 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500 group-hover:text-white text-emerald-500 transition-colors">
                         <CheckCircle2 className="h-6 w-6" />
                       </div>
                       <div className="font-bold text-slate-200 group-hover:text-emerald-400">Liberar</div>
                       <div className="text-xs text-slate-500 mt-1">Mover para Estoque</div>
                    </button>

                    <button 
                      onClick={onComplete}
                      className="group p-4 bg-slate-950 border border-slate-800 rounded-lg hover:border-red-500 hover:bg-red-950/10 transition-all"
                    >
                       <div className="h-10 w-10 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-500 group-hover:text-white text-red-500 transition-colors">
                         <X className="h-6 w-6" />
                       </div>
                       <div className="font-bold text-slate-200 group-hover:text-red-400">Descartar</div>
                       <div className="text-xs text-slate-500 mt-1">Gerar Ordem de Descarte</div>
                    </button>

                    <button 
                      onClick={onComplete}
                      className="group p-4 bg-slate-950 border border-slate-800 rounded-lg hover:border-amber-500 hover:bg-amber-950/10 transition-all"
                    >
                       <div className="h-10 w-10 bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-500 group-hover:text-white text-amber-500 transition-colors">
                         <ShieldAlert className="h-6 w-6" />
                       </div>
                       <div className="font-bold text-slate-200 group-hover:text-amber-400">Manter Bloqueio</div>
                       <div className="text-xs text-slate-500 mt-1">Solicitar Reavaliação</div>
                    </button>
                 </div>
              </div>
            )}

          </div>

          {/* Footer Navigation */}
          <div className="h-20 border-t border-slate-800 bg-slate-950 p-6 flex justify-between items-center">
             <Button variant="ghost" onClick={onClose}>Cancelar Workflow</Button>
             
             {currentStep !== 'decision' && (
               <Button onClick={handleNext} className="w-32">
                 Próximo <ChevronRight className="ml-2 h-4 w-4" />
               </Button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Subcomponents for Cleanliness ---

const DetailRow = ({ label, value, highlight }: any) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-900 last:border-0">
    <span className="text-sm text-slate-500">{label}</span>
    <span className={`text-sm font-medium ${highlight ? 'text-amber-400' : 'text-slate-200'}`}>{value}</span>
  </div>
);

const TimelineItem = ({ date, title, user, active }: any) => (
  <div className="mb-4 last:mb-0 relative">
    <div className={`absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 ${active ? 'bg-brand-500 border-brand-500' : 'bg-slate-900 border-slate-600'}`}></div>
    <div className={`text-sm font-medium ${active ? 'text-brand-400' : 'text-slate-300'}`}>{title}</div>
    <div className="text-xs text-slate-500 mt-0.5">{date} • {user}</div>
  </div>
);

const CheckboxField = ({ label, checked, onChange }: any) => (
  <div 
    className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-all ${checked ? 'bg-brand-900/10 border-brand-900/50' : 'bg-slate-900 border-slate-700'}`}
    onClick={() => onChange(!checked)}
  >
    <span className={`text-sm ${checked ? 'text-brand-300' : 'text-slate-400'}`}>{label}</span>
    <div className={`h-5 w-5 rounded border flex items-center justify-center ${checked ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-600'}`}>
       {checked && <CheckCircle2 className="h-3.5 w-3.5" />}
    </div>
  </div>
);

const RiskFactor = ({ label, value, impact }: any) => {
  const color = impact === 'critical' ? 'text-red-400' : impact === 'high' ? 'text-orange-400' : impact === 'medium' ? 'text-amber-400' : 'text-slate-500';
  return (
    <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded border border-slate-800/50">
       <span className="text-sm text-slate-400">{label}</span>
       <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-200">{value}</span>
          {impact !== 'none' && <AlertTriangle className={`h-3 w-3 ${color}`} />}
       </div>
    </div>
  );
};