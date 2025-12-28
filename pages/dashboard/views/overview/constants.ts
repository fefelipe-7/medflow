import {
    DashboardHeaderData,
    ReceivingMetrics,
    StockMetrics,
    QuarantineMetrics,
    CapacityData,
    FlowStageData,
    WorkItem,
    Alert,
    KPI,
    TimelineEvent
} from './types';

export const MOCK_HEADER_DATA: DashboardHeaderData = {
    lastUpdated: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    currentShift: 'Turno A (06:00 - 14:00)',
    logisticUnit: 'CD - São Paulo',
    overallStatus: 'normal'
};

export const MOCK_RECEIVING_METRICS: ReceivingMetrics = {
    awaitingInvoices: 12,
    inConference: 5,
    avgConferenceTimeMin: 45,
    slaBreached: false
};

export const MOCK_STOCK_METRICS: StockMetrics = {
    occupancyPercentage: 88,
    missingItems: 3,
    criticalItems: 15
};

export const MOCK_QUARANTINE_METRICS: QuarantineMetrics = {
    quarantineVolumes: 42,
    avgRetentionTimeHours: 18,
    pendingResolutions: 8
};

export const MOCK_CAPACITY_DATA: CapacityData = {
    tempArea: 65,
    pallets: 88,
    quarantine: 40,
    operationalCapacityUsed: 75
};

export const MOCK_FLOW_STAGES: FlowStageData[] = [
    { stage: 'Chegada', count: 12, avgTimeMin: 15 },
    { stage: 'Conferência', count: 5, avgTimeMin: 45 },
    { stage: 'Quarentena', count: 42, avgTimeMin: 1080 }, // 18 hours
    { stage: 'Estoque', count: 15420 }
];

export const MOCK_WORK_QUEUE: WorkItem[] = [
    { id: 'TSK-001', type: 'nota', description: 'NF-9921 com divergência', waitTimeMin: 45, priority: 'alta' },
    { id: 'TSK-002', type: 'volume', description: 'Lote V24-001 vencendo', waitTimeMin: 120, priority: 'critica' },
    { id: 'TSK-003', type: 'tratativa', description: 'Aprovar laudo de qualidade', waitTimeMin: 15, priority: 'media' },
    { id: 'TSK-004', type: 'auditoria', description: 'Conferência cíclica A3', waitTimeMin: 300, priority: 'baixa' }
];

export const MOCK_ALERTS: Alert[] = [
    { id: 1, type: 'SLA', severity: 'high', origin: 'Recebimento', description: 'Tempo de pátio excedido > 2h', timestamp: '10:30' },
    { id: 2, type: 'Capacidade', severity: 'medium', origin: 'Estoque', description: 'Rua B, Nível 5 ocupação 98%', timestamp: '09:15' },
    { id: 3, type: 'Quarentena', severity: 'critical', origin: 'Quarentena', description: 'Produto termolábil fora da faixa', timestamp: '10:45' }
];

export const MOCK_KPIs: KPI[] = [
    { id: 'throughput_diario', label: 'Volume Processado', value: 3450, trend: 'up' },
    { id: 'tempo_medio_ciclo', label: 'Tempo Médio Ciclo', value: 35, unit: 'min', trend: 'stable' },
    { id: 'taxa_retrabalho', label: 'Taxa Retrabalho', value: 2.1, unit: '%', trend: 'down' }
];

export const MOCK_TIMELINE_EVENTS: TimelineEvent[] = [
    { id: 1, timestamp: '10:45', event: 'Bloqueio de Lote', origin: 'quarentena', user: 'Ana.S', impact: 'high' },
    { id: 2, timestamp: '10:30', event: 'Entrada Veículo', origin: 'recebimento', user: 'Portaria', impact: 'low' },
    { id: 3, timestamp: '10:15', event: 'Ajuste Inventário', origin: 'estoque', user: 'Carlos.M', impact: 'medium' },
];
