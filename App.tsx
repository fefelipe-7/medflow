import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Receiving } from './pages/Receiving';
import { Inventory } from './pages/Inventory';
import { Quarantine } from './pages/Quarantine';
import { Audit } from './pages/Audit';
import { ModuleId } from './types';
import { EventBusProvider } from './contexts/EventBusContext'; 

// Module Loader: Decides what to render based on ID
const ModuleLoader = ({ id, submodule }: { id: ModuleId, submodule: string }) => {
  switch (id) {
    case 'dashboard': return <Dashboard submodule={submodule} />;
    case 'receiving': return <Receiving submodule={submodule} />;
    case 'inventory': return <Inventory submodule={submodule} />;
    case 'quarantine': return <Quarantine submodule={submodule} />;
    case 'audit': return <Audit submodule={submodule} />;
    default: return <div className="p-8 text-center text-slate-500">Módulo não encontrado: {id}</div>;
  }
};

export default function App() {
  // State tracks both Module AND Submodule
  const [activeModule, setActiveModule] = useState<ModuleId>('dashboard');
  const [activeSubmodule, setActiveSubmodule] = useState<string>('overview_operacional');

  const handleNavigate = (module: ModuleId, submodule: string) => {
    setActiveModule(module);
    setActiveSubmodule(submodule);
  };

  return (
    <EventBusProvider>
      <div className="flex h-screen bg-slate-950 text-slate-200 selection:bg-brand-500/30 font-sans">
        <Sidebar 
          activeModule={activeModule} 
          activeSubmodule={activeSubmodule}
          onNavigate={handleNavigate} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden relative bg-slate-950">
          <main className="flex-1 overflow-y-auto p-8 lg:p-12 scroll-smooth">
            <ModuleLoader id={activeModule} submodule={activeSubmodule} />
          </main>
        </div>
      </div>
    </EventBusProvider>
  );
}