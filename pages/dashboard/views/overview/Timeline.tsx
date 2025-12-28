import React from 'react';
import { TimelineEvent } from './types';

interface TimelineProps {
    events: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-5">
            <h3 className="text-lg font-bold text-slate-200 mb-6">Timeline Recente</h3>

            <div className="relative border-l border-slate-800 ml-3 space-y-6">
                {events.map((event) => (
                    <div key={event.id} className="relative pl-6">
                        <div className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 ${event.impact === 'high' ? 'bg-red-500' :
                                event.impact === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                            }`}></div>

                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-sm font-bold text-slate-300">{event.event}</div>
                                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                                    <span className="uppercase tracking-wide">{event.origin}</span>
                                    <span>•</span>
                                    <span>{event.user}</span>
                                </div>
                            </div>
                            <span className="text-xs font-mono text-slate-500">{event.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
