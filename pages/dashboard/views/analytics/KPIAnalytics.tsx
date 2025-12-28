import React from 'react';
import { KPIHeader } from './KPIHeader';
import { TimeSelector } from './TimeSelector';
import { ExecutiveSummary } from './ExecutiveSummary';
import { KPIGroup } from './KPIGroup';
import { KPIGovernance } from './KPIGovernance';

import { MOCK_KPI_HEADER, MOCK_KPI_EXEC, MOCK_KPI_GROUPS } from './constants';

export const KPIAnalytics = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 pb-8">
            <KPIHeader data={MOCK_KPI_HEADER} />

            <TimeSelector />

            <ExecutiveSummary data={MOCK_KPI_EXEC} />

            <div className="space-y-4">
                <KPIGroup
                    title="KPIs Operacionais"
                    description="Indicadores de execução diária e fluxo de trabalho."
                    kpis={MOCK_KPI_GROUPS.operacionais}
                />

                <KPIGroup
                    title="KPIs Táticos"
                    description="Métricas de eficiência, qualidade e tempos de ciclo."
                    kpis={MOCK_KPI_GROUPS.taticos}
                />

                <KPIGroup
                    title="KPIs Gerenciais"
                    description="Indicadores de impacto financeiro e nível de serviço."
                    kpis={MOCK_KPI_GROUPS.gerenciais}
                />
            </div>

            <KPIGovernance />
        </div>
    );
};
