import React from 'react';
import { QuarantineDashboard } from './views/QuarantineDashboard';
import { DecisionQueue } from './views/DecisionQueue';
import { QuarantineHistory } from './views/QuarantineHistory';

interface QuarantinePageProps {
    submodule?: string;
}

export const QuarantinePage: React.FC<QuarantinePageProps> = ({ submodule = 'visao_quarentena' }) => {
    switch (submodule) {
        case 'visao_quarentena': return <QuarantineDashboard />;
        case 'fila_decisao': return <DecisionQueue />;
        case 'historico_quarentena': return <QuarantineHistory />;
        default: return <QuarantineDashboard />;
    }
};
