import React from 'react';
import { InventoryOverview } from './views/InventoryOverview';
import { PhysicalOccupancy } from './views/PhysicalOccupancy';
import { Movements } from './views/Movements';
import { BlockedItems } from './views/BlockedItems';

interface InventoryPageProps {
    submodule?: string;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({ submodule = 'visao_geral' }) => {
    switch (submodule) {
        case 'visao_geral': return <InventoryOverview />;
        case 'ocupacao_fisica': return <PhysicalOccupancy />;
        case 'movimentacoes': return <Movements />;
        case 'itens_bloqueados': return <BlockedItems />;
        default: return <InventoryOverview />;
    }
};
