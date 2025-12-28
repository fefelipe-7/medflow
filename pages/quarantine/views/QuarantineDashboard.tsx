import React from 'react';
import { MOCK_QUARANTINE_LIST } from '../../../constants';
import { RiskCell } from '../components/RiskCell';

export const QuarantineDashboard = () => {
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
