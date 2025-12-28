import { AlertItem, AlertHeaderData, AuditLogEntry, AlertDetailData } from './types';

export const MOCK_ALERTS_HEADER: AlertHeaderData = {
    totalAlertasAtivos: 18,
    alertasCriticos: 4,
    ultimoEvento: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    statusOperacionalGlobal: 'sob_atencao'
};

export const MOCK_ACTIVE_ALERTS: AlertItem[] = [
    {
        alertId: 'ALT-2024-001',
        status: 'novo',
        criticidade: 'critico',
        titulo: 'Falha na Cadeia de Frio',
        descricaoCurta: 'Temperatura da câmara fria 2 excedeu limite superior (>8°C)',
        moduloOrigem: 'quarentena',
        impacto: { operacional: 'alto', financeiroEstimado: 15000, riscoSla: true },
        tempoAbertoMin: 12,
        responsavelAtual: 'Automático',
        timestamp: '10:45'
    },
    {
        alertId: 'ALT-2024-002',
        status: 'em_tratamento',
        criticidade: 'alto',
        titulo: 'Gargalo no Recebimento',
        descricaoCurta: 'Fila de espera de caminhões > 2h',
        moduloOrigem: 'recebimento',
        impacto: { operacional: 'alto', financeiroEstimado: 2000, riscoSla: true },
        tempoAbertoMin: 45,
        responsavelAtual: 'Roberto M.',
        timestamp: '10:12'
    },
    {
        alertId: 'ALT-2024-003',
        status: 'escalonado',
        criticidade: 'medio',
        titulo: 'Ruptura de Estoque Iminente',
        descricaoCurta: 'SKU MED-CTX-500MG abaixo do ponto de reposição',
        moduloOrigem: 'estoque',
        impacto: { operacional: 'medio', financeiroEstimado: 0, riscoSla: false },
        tempoAbertoMin: 180,
        responsavelAtual: 'Gerente Logística',
        timestamp: '08:30'
    },
    {
        alertId: 'ALT-2024-004',
        status: 'novo',
        criticidade: 'baixo',
        titulo: 'Divergência de Inventário',
        descricaoCurta: 'Contagem cíclica RUA-A-12 difere do sistema sistemico',
        moduloOrigem: 'auditoria',
        impacto: { operacional: 'baixo', financeiroEstimado: 150, riscoSla: false },
        tempoAbertoMin: 15,
        responsavelAtual: 'Não Atribuído',
        timestamp: '10:55'
    },
    // Adding more items for "density" visualization
    { alertId: 'ALT-24-05', status: 'novo', criticidade: 'critico', titulo: 'Erro de Integração SAP', descricaoCurta: 'Falha no sync de pedidos', moduloOrigem: 'recebimento', impacto: { operacional: 'alto', financeiroEstimado: 0, riscoSla: true }, tempoAbertoMin: 5, responsavelAtual: 'SysAdmin', timestamp: '11:05' },
    { alertId: 'ALT-24-06', status: 'aguardando', criticidade: 'medio', titulo: 'Avaria reportada', descricaoCurta: 'Palete danificado na movimentação', moduloOrigem: 'estoque', impacto: { operacional: 'baixo', financeiroEstimado: 500, riscoSla: false }, tempoAbertoMin: 60, responsavelAtual: 'Qualidade', timestamp: '10:10' },
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
    { id: 'LOG-001', alertId: 'ALT-2024-002', acao: 'criado', usuario: 'Sistema', timestamp: '10:12', comentario: 'Alerta gerado automaticamente por regra de SLA.' },
    { id: 'LOG-002', alertId: 'ALT-2024-002', acao: 'atualizado', usuario: 'Roberto M.', timestamp: '10:15', comentario: 'Iniciada tratativa de desvio de fluxo.' },
    { id: 'LOG-003', alertId: 'ALT-2024-003', acao: 'escalonado', usuario: 'Sistema', timestamp: '09:00', comentario: 'Escalado automaticamente após 30min sem ação.' },
];

export const MOCK_ALERT_DETAIL: AlertDetailData = {
    ...MOCK_ACTIVE_ALERTS[0],
    descricaoCompleta: 'O sensor IoT #452 detectou uma elevação de temperatura na Câmara Fria 02. A temperatura atual é de 8.4°C, ultrapassando o limite superior de 8.0°C estabelecido para produtos termolábeis. Risco de perda de lote valorizado em R$ 15.000.',
    causaRaizSugerida: 'Provável falha no compressor ou porta aberta por tempo excessivo.',
    eventoOrigem: {
        tipo: 'IoT Sensor Trigger',
        idReferencia: 'IOT-TMP-CF2',
        timestamp: '10:45:00'
    },
    linhaDoTempo: [
        { evento: 'Alerta Criado', usuario: 'Sistema IoT', timestamp: '10:45' },
        { evento: 'Notificação Enviada', usuario: 'Sistema de Mensageria', timestamp: '10:45' },
    ]
};
