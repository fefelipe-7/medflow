export type KPITrend = 'up' | 'down' | 'neutral';
export type KPIDataSource = 'recebimento' | 'estoque' | 'quarentena' | 'auditoria';
export type ReliabilityStatus = 'confiavel' | 'parcial' | 'incompleto';
export type TimeGranularity = 'hora' | 'dia' | 'semana' | 'mes';

export interface KPIExecData {
    throughput: {
        value: number;
        variacao: number;
        status: 'positivo' | 'neutro' | 'negativo';
    };
    sla: {
        value: number;
        meta: number;
    };
    quarentena: {
        value: number;
        limite: number;
    };
}

export interface KPIHeaderData {
    periodoAtivo: string;
    dataAtualizacao: string;
    fontes: KPIDataSource[];
    confiabilidade: ReliabilityStatus;
}

export interface KPIMetric {
    id: string;
    nome: string;
    valor: number;
    unidade?: string;
    meta?: number;
    visual: 'line' | 'bar' | 'area' | 'gauge' | 'donut';
    trend?: {
        direction: KPITrend;
        percent: number;
    };
    data?: { name: string; value: number }[];
}

export interface KPIGroupData {
    operacionais: KPIMetric[];
    taticos: KPIMetric[];
    gerenciais: KPIMetric[];
}
