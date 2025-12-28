export type AlertSeverity = 'informativo' | 'baixo' | 'medio' | 'alto' | 'critico';
export type AlertStatus = 'novo' | 'em_tratamento' | 'aguardando' | 'escalonado' | 'resolvido';
export type ModuleOrigin = 'recebimento' | 'estoque' | 'quarentena' | 'auditoria';
export type ImpactLevel = 'baixo' | 'medio' | 'alto';

export interface AlertImpact {
    operacional: ImpactLevel;
    financeiroEstimado: number;
    riscoSla: boolean;
}

export interface AlertItem {
    alertId: string;
    status: AlertStatus;
    criticidade: AlertSeverity;
    titulo: string;
    descricaoCurta: string;
    moduloOrigem: ModuleOrigin;
    impacto: AlertImpact;
    tempoAbertoMin: number;
    responsavelAtual: string;
    timestamp: string;
}

export interface AlertHeaderData {
    totalAlertasAtivos: number;
    alertasCriticos: number;
    ultimoEvento: string;
    statusOperacionalGlobal: 'estavel' | 'sob_atencao' | 'instavel';
}

export interface AuditLogEntry {
    id: string;
    alertId: string;
    acao: 'criado' | 'atualizado' | 'escalonado' | 'resolvido';
    usuario: string;
    timestamp: string;
    comentario: string;
}

export interface AlertDetailData extends AlertItem {
    descricaoCompleta: string;
    causaRaizSugerida: string;
    eventoOrigem: {
        tipo: string;
        idReferencia: string;
        timestamp: string;
    };
    linhaDoTempo: {
        evento: string;
        usuario: string;
        timestamp: string;
    }[];
}
