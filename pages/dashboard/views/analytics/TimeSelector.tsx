import React from 'react';
import { Button } from '../../../../components/Button';

export const TimeSelector = () => {
    const presets = ['Hoje', 'Ontem', 'Última Semana', 'Último Mês', 'Personalizado'];

    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-2 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-slate-500 uppercase px-2">Período:</span>
            {presets.map((preset, index) => (
                <Button
                    key={preset}
                    size="sm"
                    variant={index === 2 ? 'primary' : 'ghost'} // Selecting "Última Semana" as mockup active state
                    className="text-xs"
                >
                    {preset}
                </Button>
            ))}

            <div className="h-4 w-px bg-slate-700 mx-2 hidden md:block"></div>

            <span className="text-xs font-bold text-slate-500 uppercase px-2 hidden md:inline">Granularidade:</span>
            <div className="hidden md:flex bg-slate-950/50 rounded-lg p-1 border border-slate-800">
                <button className="px-3 py-1 rounded text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors">Hora</button>
                <button className="px-3 py-1 rounded text-xs font-medium bg-slate-800 text-slate-100 shadow-sm border border-slate-700">Dia</button>
                <button className="px-3 py-1 rounded text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors">Semana</button>
                <button className="px-3 py-1 rounded text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors">Mês</button>
            </div>
        </div>
    );
};
