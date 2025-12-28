export type StatusColor = 'green' | 'yellow' | 'red';
export type Trend = 'up' | 'down' | 'stable';
export type EventImpact = 'low' | 'medium' | 'high';
export type WorkItemType = 'nota' | 'volume' | 'tratativa' | 'auditoria';
export type Priority = 'baixa' | 'media' | 'alta' | 'critica';

export interface DashboardHeaderData {
    lastUpdated: string;
    currentShift: string;
    logisticUnit: string;
    overallStatus: 'normal' | 'attention' | 'critical';
}

export interface ReceivingMetrics {
    awaitingInvoices: number;
    inConference: number;
    avgConferenceTimeMin: number;
    slaBreached: boolean;
}

export interface StockMetrics {
    occupancyPercentage: number;
    missingItems: number;
    criticalItems: number;
}

export interface QuarantineMetrics {
    quarantineVolumes: number;
    avgRetentionTimeHours: number;
    pendingResolutions: number;
}

export interface CapacityData {
    tempArea: number; // percentage
    pallets: number; // percentage
    quarantine: number; // percentage
    operationalCapacityUsed: number; // percentage
}

export interface FlowStageData {
    stage: string;
    count: number;
    avgTimeMin?: number;
}

export interface WorkItem {
    id: string;
    type: WorkItemType;
    description: string;
    waitTimeMin: number;
    priority: Priority;
}

export interface Alert {
    id: number;
    type: string;
    severity: 'high' | 'medium' | 'critical';
    origin: string;
    description: string; // derived from type/origin for display
    timestamp: string;
}

export interface KPI {
    id: string;
    label: string;
    value: number;
    unit?: string;
    trend?: Trend;
}

export interface TimelineEvent {
    id: number;
    timestamp: string;
    event: string;
    origin: 'recebimento' | 'estoque' | 'quarentena' | 'auditoria';
    user: string;
    impact: EventImpact;
}
