import React from 'react';
import { EventLogs } from './views/EventLogs';
import { DecisionHistory } from './views/DecisionHistory';
import { ComplianceReports } from './views/ComplianceReports';

interface AuditPageProps {
    submodule?: string;
}

export const AuditPage: React.FC<AuditPageProps> = ({ submodule = 'trilhas_eventos' }) => {
    switch (submodule) {
        case 'trilhas_eventos': return <EventLogs />;
        case 'historico_decisoes': return <DecisionHistory />;
        case 'relatorios_compliance': return <ComplianceReports />;
        default: return <EventLogs />;
    }
};
