import React from 'react';
import { PreRegistration } from './views/PreRegistration';
import { ArrivalRegistration } from './views/ArrivalRegistration';
import { Conference } from './views/Conference';
import { PendingIssues } from './views/PendingIssues';

interface ReceivingPageProps {
    submodule?: string;
}

export const ReceivingPage: React.FC<ReceivingPageProps> = ({ submodule = 'pre_registro' }) => {
    switch (submodule) {
        case 'pre_registro': return <PreRegistration />;
        case 'registro_chegada': return <ArrivalRegistration />;
        case 'conferencia': return <Conference />;
        case 'pendencias': return <PendingIssues />;
        default: return <PreRegistration />;
    }
};
