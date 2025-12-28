import React from 'react';
import { Gavel, CheckCircle2, ShieldAlert, X } from 'lucide-react';

interface DecisionStepProps {
    currentRisk: number;
    onComplete: () => void;
}

export const DecisionStep: React.FC<DecisionStepProps> = ({ currentRisk, onComplete }) => {
    return (
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
    );
};
