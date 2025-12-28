import React from 'react';
import { OperationalOverview } from './views/OperationalOverview';
import { GlobalAlerts } from './views/GlobalAlerts';
import { KPIIndicators } from './views/KPIIndicators';

interface DashboardPageProps {
    submodule?: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ submodule = 'overview_operacional' }) => {
    switch (submodule) {
        case 'overview_operacional': return <OperationalOverview />;
        case 'alertas_globais': return <GlobalAlerts />;
        case 'indicadores_kpi': return <KPIIndicators />;
        default: return <OperationalOverview />;
    }
};
