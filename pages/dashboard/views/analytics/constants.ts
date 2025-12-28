import { KPIExecData, KPIHeaderData, KPIGroupData } from './types';

export const MOCK_KPI_HEADER: KPIHeaderData = {
    periodoAtivo: 'Últimos 30 dias',
    dataAtualizacao: new Date().toLocaleTimeString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
    fontes: ['recebimento', 'estoque', 'quarentena', 'auditoria'],
    confiabilidade: 'confiavel'
};

export const MOCK_KPI_EXEC: KPIExecData = {
    throughput: { value: 45200, variacao: 12.5, status: 'positivo' },
    sla: { value: 98.2, meta: 98.0 },
    quarentena: { value: 3.4, limite: 5.0 }
};

export const MOCK_KPI_GROUPS: KPIGroupData = {
    operacionais: [
        {
            id: 'tempo_medio_conf',
            nome: 'Tempo Médio Conferência',
            valor: 14.5,
            unidade: 'min',
            meta: 15,
            visual: 'line',
            data: [{ name: 'Seg', value: 18 }, { name: 'Ter', value: 16 }, { name: 'Qua', value: 14 }, { name: 'Qui', value: 15 }, { name: 'Sex', value: 14 }]
        },
        {
            id: 'backlog_receb',
            nome: 'Backlog Recebimento',
            valor: 42,
            unidade: 'un',
            visual: 'area',
            data: [{ name: '08h', value: 20 }, { name: '10h', value: 45 }, { name: '12h', value: 30 }, { name: '14h', value: 55 }, { name: '16h', value: 42 }]
        },
        {
            id: 'ocupacao_estoque',
            nome: 'Ocupação Estoque',
            valor: 82,
            unidade: '%',
            meta: 85,
            visual: 'gauge'
        }
    ],
    taticos: [
        {
            id: 'taxa_retrabalho',
            nome: 'Taxa de Retrabalho',
            valor: 1.8,
            unidade: '%',
            meta: 2.0,
            visual: 'bar',
            data: [{ name: 'Sem 1', value: 2.5 }, { name: 'Sem 2', value: 2.1 }, { name: 'Sem 3', value: 1.9 }, { name: 'Sem 4', value: 1.8 }]
        },
        {
            id: 'tempo_quarentena',
            nome: 'Temp Médio Quarentena',
            valor: 22,
            unidade: 'h',
            meta: 24,
            visual: 'line',
            data: [{ name: 'Seg', value: 26 }, { name: 'Ter', value: 24 }, { name: 'Qua', value: 20 }, { name: 'Qui', value: 18 }, { name: 'Sex', value: 22 }]
        },
        {
            id: 'assertividade',
            nome: 'Assertividade Conf.',
            valor: 99.4,
            unidade: '%',
            meta: 99.0,
            visual: 'donut'
        }
    ],
    gerenciais: [
        {
            id: 'custo_op',
            nome: 'Custo Op. p/ Volume',
            valor: 3.45,
            unidade: 'R$',
            visual: 'line',
            trend: { direction: 'down', percent: 2.1 },
            data: [{ name: 'Jan', value: 3.8 }, { name: 'Fev', value: 3.6 }, { name: 'Mar', value: 3.5 }, { name: 'Abr', value: 3.45 }]
        },
        {
            id: 'perda_quarentena',
            nome: 'Perda por Quarentena',
            valor: 12500,
            unidade: 'R$',
            visual: 'bar',
            trend: { direction: 'up', percent: 5.4 },
            data: [{ name: 'Q1', value: 10000 }, { name: 'Q2', value: 11000 }, { name: 'Q3', value: 9500 }, { name: 'Q4', value: 12500 }]
        },
        {
            id: 'nivel_servico',
            nome: 'Nível de Serviço',
            valor: 99.1,
            unidade: '%',
            meta: 99.5,
            visual: 'gauge'
        }
    ]
};
