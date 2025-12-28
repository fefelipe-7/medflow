import React, { useState } from 'react';
import { MODULE_REGISTRY } from '../moduleRegistry';
import { ModuleId } from '../types';
import { Activity, ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeModule: ModuleId;
  activeSubmodule: string;
  onNavigate: (module: ModuleId, submodule: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, activeSubmodule, onNavigate }) => {
  // Local state to track expanded modules (visual only, independent of routing)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [activeModule]: true
  });

  const toggleExpand = (moduleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleModuleClick = (moduleId: ModuleId, defaultSubmodule: string) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: true }));
    onNavigate(moduleId, defaultSubmodule);
  };

  return (
    <div className="flex flex-col w-64 bg-slate-950 h-full border-r border-slate-900 flex-shrink-0 z-20">
      <div className="flex items-center h-16 px-6">
        <div className="flex items-center gap-2 text-slate-100 font-semibold tracking-tight">
           <Activity className="h-5 w-5 text-brand-500" />
           Medflow
        </div>
      </div>
      
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 mb-3 text-[10px] font-bold uppercase text-slate-600 tracking-widest">
          Módulos
        </div>
        
        {MODULE_REGISTRY.map((module) => {
          const isActive = activeModule === module.id;
          const isExpanded = expandedModules[module.id];
          const Icon = module.icon;
          
          return (
            <div key={module.id} className="mb-1">
              {/* Module Header */}
              <button
                onClick={() => handleModuleClick(module.id, module.submodules[0]?.id)}
                className={`group w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                  isActive 
                    ? 'bg-slate-900 text-brand-400 font-medium shadow-sm border border-slate-800/50' 
                    : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center">
                  <Icon className={`mr-3 h-4 w-4 transition-colors ${isActive ? 'text-brand-500' : 'text-slate-600 group-hover:text-slate-400'}`} />
                  {module.label}
                </div>
                {module.submodules.length > 0 && (
                   <div 
                     role="button"
                     onClick={(e) => toggleExpand(module.id, e)}
                     className={`p-1 rounded hover:bg-slate-800 ${isActive ? 'text-brand-600' : 'text-slate-600'}`}
                   >
                      {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                   </div>
                )}
              </button>

              {/* Submodules List */}
              {isExpanded && module.submodules.length > 0 && (
                <div className="mt-1 ml-4 pl-3 border-l border-slate-800 space-y-0.5">
                  {module.submodules.map((sub) => {
                    const isSubActive = isActive && activeSubmodule === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => onNavigate(module.id, sub.id)}
                        className={`w-full flex items-center px-3 py-1.5 text-xs rounded-md transition-colors ${
                          isSubActive
                            ? 'text-brand-300 bg-brand-900/10 font-medium'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
                        }`}
                      >
                        {sub.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-900">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-900/50 transition-colors cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 border border-slate-700">
            US
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-200 leading-none">Usuário Demo</span>
            <span className="text-xs text-slate-500 mt-1">Supervisor</span>
          </div>
        </div>
      </div>
    </div>
  );
};