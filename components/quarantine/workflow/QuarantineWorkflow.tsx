import React from 'react';
import {
    CheckCircle2, AlertTriangle, FileText, Activity,
    ThermometerSnowflake, ShieldAlert, X, ChevronRight,
    Microscope, FileCheck, BrainCircuit, Gavel
} from 'lucide-react';

import { QuarantineItem } from '../../../types';
import { Button } from '../../Button';
import { useQuarantineWorkflow, Step } from './hooks/useQuarantineWorkflow';

// Steps
import { ContextStep } from './steps/ContextStep';
import { InspectionStep } from './steps/InspectionStep';
import { AnalysisStep } from './steps/AnalysisStep';
import { DecisionStep } from './steps/DecisionStep';

interface WorkflowProps {
    item: QuarantineItem;
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export const QuarantineWorkflow: React.FC<WorkflowProps> = ({ item, isOpen, onClose, onComplete }) => {
    const {
        currentStep,
        setCurrentStep,
        formData,
        setFormData,
        calculateRisk,
        handleNext,
        stepsArray
    } = useQuarantineWorkflow(item, onComplete);

    if (!isOpen) return null;

    const currentRisk = calculateRisk();

    const stepsIcons: Record<string, any> = {
        'context': FileText,
        'inspection': Microscope,
        'analysis': BrainCircuit,
        'decision': Gavel
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
                            {stepsArray.map((step, idx) => {
                                const Icon = stepsIcons[step.id];
                                const isActive = currentStep === step.id;
                                const isPast = stepsArray.findIndex(s => s.id === currentStep) > idx;

                                return (
                                    <div key={step.id} className={`flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-brand-900/20 text-brand-400 border border-brand-900/30' :
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

                        {currentStep === 'context' && <ContextStep item={item} />}

                        {currentStep === 'inspection' && <InspectionStep formData={formData} setFormData={setFormData} />}

                        {currentStep === 'analysis' && <AnalysisStep item={item} formData={formData} currentRisk={currentRisk} />}

                        {currentStep === 'decision' && <DecisionStep currentRisk={currentRisk} onComplete={onComplete} />}

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
