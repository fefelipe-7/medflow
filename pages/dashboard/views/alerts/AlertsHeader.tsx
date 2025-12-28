import React from 'react';
import { AlertsHeaderData } from './types';
import { AlertTriangle, CheckCircle, Shield, Radio, Activity } from 'lucide-react';
import { Button } from '../../../../components/Button';

interface AlertsHeaderProps {
    data: AlertsHeaderData;
}

export const AlertsHeader: React.FC<AlertsHeaderProps> = ({ data }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-end bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg relative overflow-hidden">

            {/* Background Decorative Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="flex-1 z-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-slate-900 border border-slate-700 rounded-lg shadow-inner">
                        <Shield className="h-6 w-6 text-brand-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Centro de Alertas</h1>
                        <div className="flex items-center gap-2">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Monitoramento Ativo</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 z-10 w-full md:w-auto">
                {/* Metric Card: Critical */}
                <div className="bg-slate-900/50 border border-red-500/30 p-3 rounded-lg flex items-center gap-3 flex-1 md:flex-none shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                    <div className="bg-red-500/10 p-2 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-100 leading-none">{data.totalCriticos}</div>
                        <div className="text-[10px] text-red-400 font-bold uppercase">Críticos</div>
                    </div>
                </div>

                {/* Metric Card: SLA Risk */}
                <div className="bg-slate-900/50 border border-amber-500/30 p-3 rounded-lg flex items-center gap-3 flex-1 md:flex-none">
                    <div className="bg-amber-500/10 p-2 rounded-full">
                        <Activity className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-100 leading-none">{data.riscoSla}</div>
                        <div className="text-[10px] text-amber-400 font-bold uppercase">Risco SLA</div>
                    </div>
                </div>

                {/* Action Button */}
                <Button variant="outline" className="h-12 border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-300 ml-2 hidden sm:flex">
                    <Radio className="h-4 w-4 mr-2" />
                    Scan
                </Button>
            </div>
        </div>
    );
};
