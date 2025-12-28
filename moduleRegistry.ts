import { LayoutDashboard, Truck, Package, ShieldAlert, FileText } from 'lucide-react';
import { ModuleConfig } from './types';

export const MODULE_REGISTRY: ModuleConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Visão executiva e operacional consolidada',
    icon: LayoutDashboard,
    submodules: [
      { id: 'overview_operacional', label: 'Visão Operacional', default: true },
      { id: 'alertas_globais', label: 'Alertas Globais' },
      { id: 'indicadores_kpi', label: 'Indicadores KPI' }
    ]
  },
  {
    id: 'receiving',
    label: 'Recebimento',
    description: 'Entrada física e lógica de materiais',
    icon: Truck,
    submodules: [
      { id: 'pre_registro', label: 'Pré-registro', default: true },
      { id: 'registro_chegada', label: 'Registro de Chegada' },
      { id: 'conferencia', label: 'Conferência' },
      { id: 'pendencias', label: 'Pendências' }
    ]
  },
  {
    id: 'inventory',
    label: 'Estoque',
    description: 'Controle do estado e capacidade do estoque',
    icon: Package,
    submodules: [
      { id: 'visao_geral', label: 'Visão Geral', default: true },
      { id: 'ocupacao_fisica', label: 'Ocupação Física' },
      { id: 'movimentacoes', label: 'Movimentações' },
      { id: 'itens_bloqueados', label: 'Itens Bloqueados' }
    ]
  },
  {
    id: 'quarantine',
    label: 'Quarentena',
    description: 'Análise, decisão e destinação',
    icon: ShieldAlert,
    submodules: [
      { id: 'visao_quarentena', label: 'Visão Quarentena', default: true },
      { id: 'fila_decisao', label: 'Fila de Decisão' },
      { id: 'historico_quarentena', label: 'Histórico' }
    ]
  },
  {
    id: 'audit',
    label: 'Auditoria',
    description: 'Rastreabilidade e conformidade',
    icon: FileText,
    submodules: [
      { id: 'trilhas_eventos', label: 'Trilha de Eventos', default: true },
      { id: 'historico_decisoes', label: 'Histórico de Decisões' },
      { id: 'relatorios_compliance', label: 'Compliance' }
    ]
  }
];

export const getModule = (id: string) => MODULE_REGISTRY.find(m => m.id === id);

export const getDefaultSubmodule = (moduleId: string) => {
  const module = getModule(moduleId);
  return module?.submodules.find(s => s.default)?.id || module?.submodules[0]?.id;
};