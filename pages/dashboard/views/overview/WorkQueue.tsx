import React from 'react';
import { WorkItem } from './types';
import { Button } from '../../../../components/Button';
import { ArrowRight, Clock } from 'lucide-react';

interface WorkQueueProps {
    items: WorkItem[];
}

export const WorkQueue: React.FC<WorkQueueProps> = ({ items }) => {
    const priorityColors = {
        baixa: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        media: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        alta: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        critica: 'bg-red-500/10 text-red-400 border-red-500/20',
    };

    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-200 mb-6 flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-0">
                Fila de Trabalho
                <span className="text-xs font-normal text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 self-start md:self-auto">Priorizada por SLA</span>
            </h3>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {items.map(item => (
                    <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-slate-950/30 border border-slate-800/50 rounded-lg group hover:border-slate-700 transition-colors gap-3 md:gap-0">
                        <div className="flex items-start md:items-center gap-3">
                            <div className={`text-[10px] uppercase font-bold px-2 py-1 rounded border shrink-0 ${priorityColors[item.priority]}`}>
                                {item.priority}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-slate-300 line-clamp-1">{item.description}</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-slate-500 font-mono">{item.id}</span>
                                    <span className="text-xs text-slate-500 border-l border-slate-800 pl-2 flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {item.waitTimeMin}min
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button size="sm" variant="ghost" className="w-full md:w-auto opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-slate-800/50 md:bg-transparent" icon={ArrowRight}>
                            Abrir
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
