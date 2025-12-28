import React from 'react';
import { FlowStageData } from './types';
import { ArrowRight, Clock } from 'lucide-react';

interface FlowMapProps {
    stages: FlowStageData[];
}

export const FlowMap: React.FC<FlowMapProps> = ({ stages }) => {
    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-5">
            <h3 className="text-lg font-bold text-slate-200 mb-6">Fluxo Operacional</h3>

            <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 transform -translate-y-1/2"></div>

                {stages.map((stage, index) => (
                    <div key={index} className="flex flex-col items-center relative group w-full md:w-auto">
                        <div className="bg-slate-900 border-2 border-slate-700 group-hover:border-brand-500 transition-colors w-16 h-16 rounded-full flex items-center justify-center z-10 mb-3 shadow-xl">
                            <span className="text-xl font-bold text-slate-200">{stage.count}</span>
                        </div>

                        <div className="text-center">
                            <div className="text-sm font-bold text-slate-300">{stage.stage}</div>
                            {stage.avgTimeMin && (
                                <div className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-1 bg-slate-950/50 px-2 py-0.5 rounded-full border border-slate-800/50">
                                    <Clock className="h-3 w-3" />
                                    {stage.avgTimeMin > 60
                                        ? `${(stage.avgTimeMin / 60).toFixed(1)}h`
                                        : `${stage.avgTimeMin}min`
                                    }
                                </div>
                            )}
                        </div>

                        {/* Arrow for Mobile */}
                        {index < stages.length - 1 && (
                            <div className="md:hidden mt-4 text-slate-600">
                                <ArrowRight className="h-5 w-5 rotate-90" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
