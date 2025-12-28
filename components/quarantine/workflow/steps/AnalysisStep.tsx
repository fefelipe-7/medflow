import React from 'react';
import { QuarantineItem } from '../../../../types';
import { RiskFactor } from '../components/RiskFactor';

interface AnalysisStepProps {
    item: QuarantineItem;
    formData: any;
    currentRisk: number;
}

export const AnalysisStep: React.FC<AnalysisStepProps> = ({ item, formData, currentRisk }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-bold text-slate-100">Avaliação de Risco Computada</h3>

            <div className="flex gap-8 items-start">
                {/* Score Display */}
                <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 flex flex-col items-center justify-center w-64 text-center">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Score de Risco</div>
                    <div className={`text-6xl font-black mb-2 ${currentRisk > 60 ? 'text-red-500' : currentRisk > 30 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {currentRisk}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${currentRisk > 60 ? 'bg-red-950/50 text-red-400' : currentRisk > 30 ? 'bg-amber-950/50 text-amber-400' : 'bg-emerald-950/50 text-emerald-400'
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
    );
};
