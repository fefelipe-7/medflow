import { LucideIcon } from 'lucide-react';

// Enums for State Machine logic
export enum ReceivingStatus {
  PRE_REGISTERED = 'Pré-registrado',
  AWAITING_ARRIVAL = 'Aguardando Chegada',
  IN_CONFERENCE = 'Em Conferência',
  CONFERENCE_FINISHED = 'Conferência Finalizada',
  DIVERGENCE = 'Com Divergência',
  COMPLETED = 'Concluído'
}

export enum InventoryStatus {
  AVAILABLE = 'Disponível',
  RESERVED = 'Reservado',
  BLOCKED = 'Bloqueado',
  QUARANTINE = 'Em Quarentena',
  EXPIRED = 'Vencido'
}

// Domain Entities
export interface Shipment {
  id: string;
  provider: string;
  invoiceNumber: string;
  expectedDate: string;
  status: ReceivingStatus;
  itemsCount: number;
  lastUpdated: string;
  assignedTo?: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  batch: string;
  expiryDate: string;
  location: string;
  quantity: number;
  status: InventoryStatus;
  warehouse: string;
}

export interface QuarantineItem extends InventoryItem {
  supplier: string;
  entryDate: string;
  daysInQuarantine: number;
  criticality: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  riskScore: number;
  reason: string;
  analysisStatus: 'Em Análise' | 'Aguardando Decisão' | 'Liberado' | 'Bloqueado';
}

export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  user: string;
  timestamp: string;
  details: string;
}

// --- ARCHITECTURE TYPES ---

export type ModuleId = 'dashboard' | 'receiving' | 'inventory' | 'quarantine' | 'audit';

export interface SubmoduleConfig {
  id: string;
  label: string;
  default?: boolean;
}

export interface ModuleConfig {
  id: ModuleId;
  label: string;
  description?: string;
  icon: LucideIcon;
  submodules: SubmoduleConfig[];
}

// Event Bus Types
export type EventType = 
  | 'QUARANTINE_DECISION_MADE' 
  | 'INVENTORY_MOVEMENT' 
  | 'SHIPMENT_RECEIVED'
  | 'LOG_CREATED';

export interface AppEvent {
  type: EventType;
  payload: any;
  timestamp: number;
}