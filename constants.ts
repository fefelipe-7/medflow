import { InventoryItem, InventoryStatus, ReceivingStatus, Shipment, AuditLog, QuarantineItem } from "./types";
import { LayoutDashboard, Truck, Package, ShieldAlert, FileText, Activity } from "lucide-react";

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'receiving', label: 'Recebimento', icon: Truck },
  { id: 'inventory', label: 'Estoque', icon: Package },
  { id: 'quarantine', label: 'Quarentena', icon: ShieldAlert },
  { id: 'audit', label: 'Auditoria', icon: FileText },
];

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'SHP-2024-001',
    provider: 'MedTech Solutions',
    invoiceNumber: 'NF-99821',
    expectedDate: '2024-05-20',
    status: ReceivingStatus.IN_CONFERENCE,
    itemsCount: 1500,
    lastUpdated: '2024-05-20 08:30',
    assignedTo: 'Carlos Silva'
  },
  {
    id: 'SHP-2024-002',
    provider: 'Global Pharma',
    invoiceNumber: 'NF-11202',
    expectedDate: '2024-05-21',
    status: ReceivingStatus.PRE_REGISTERED,
    itemsCount: 5000,
    lastUpdated: '2024-05-19 14:15'
  },
  {
    id: 'SHP-2024-003',
    provider: 'BioLab Insumos',
    invoiceNumber: 'NF-44321',
    expectedDate: '2024-05-18',
    status: ReceivingStatus.DIVERGENCE,
    itemsCount: 300,
    lastUpdated: '2024-05-18 16:45',
    assignedTo: 'Ana Souza'
  },
  {
    id: 'SHP-2024-004',
    provider: 'Surgical Corp',
    invoiceNumber: 'NF-55112',
    expectedDate: '2024-05-15',
    status: ReceivingStatus.COMPLETED,
    itemsCount: 120,
    lastUpdated: '2024-05-15 11:00',
    assignedTo: 'Roberto Mendes'
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-001',
    sku: 'MED-SYR-10ML',
    name: 'Seringa Descartável 10ml',
    batch: 'B2023-99',
    expiryDate: '2026-12-01',
    location: 'A-01-04',
    quantity: 15000,
    status: InventoryStatus.AVAILABLE,
    warehouse: 'CD Principal'
  },
  {
    id: 'INV-002',
    sku: 'MED-GLV-LAT-M',
    name: 'Luva Látex Tam M',
    batch: 'L2201-AA',
    expiryDate: '2024-06-01',
    location: 'B-02-10',
    quantity: 5000,
    status: InventoryStatus.QUARANTINE,
    warehouse: 'CD Principal'
  },
  {
    id: 'INV-003',
    sku: 'MED-MSK-N95',
    name: 'Máscara N95',
    batch: 'M9921-XX',
    expiryDate: '2025-01-15',
    location: 'A-05-01',
    quantity: 200,
    status: InventoryStatus.BLOCKED,
    warehouse: 'CD Secundário'
  },
  {
    id: 'INV-004',
    sku: 'MED-GAU-STE',
    name: 'Gaze Estéril 10x10',
    batch: 'G1102-BB',
    expiryDate: '2027-03-20',
    location: 'C-01-01',
    quantity: 50000,
    status: InventoryStatus.AVAILABLE,
    warehouse: 'CD Principal'
  }
];

export const MOCK_QUARANTINE_LIST: QuarantineItem[] = [
  {
    id: 'Q-001',
    sku: 'MED-BIO-VAC',
    name: 'Vacina Influenza 2024',
    batch: 'V24-001',
    expiryDate: '2024-12-01',
    location: 'Q-01',
    quantity: 500,
    status: InventoryStatus.QUARANTINE,
    warehouse: 'Quarentena A1',
    supplier: 'BioPharma Global',
    entryDate: '2024-05-10',
    daysInQuarantine: 10,
    criticality: 'Crítica',
    riskScore: 85,
    reason: 'Desvio de Temperatura no Transporte',
    analysisStatus: 'Em Análise'
  },
  {
    id: 'Q-002',
    sku: 'MED-SURG-KIT',
    name: 'Kit Cirúrgico Estéril',
    batch: 'K99-22',
    expiryDate: '2025-05-15',
    location: 'Q-02',
    quantity: 120,
    status: InventoryStatus.QUARANTINE,
    warehouse: 'Quarentena A1',
    supplier: 'Surgical Corp',
    entryDate: '2024-05-18',
    daysInQuarantine: 2,
    criticality: 'Alta',
    riskScore: 45,
    reason: 'Avaria na Embalagem Secundária',
    analysisStatus: 'Em Análise'
  },
  {
    id: 'Q-003',
    sku: 'MED-GLV-NIT',
    name: 'Luva Nitrílica P',
    batch: 'N55-11',
    expiryDate: '2024-06-01',
    location: 'Q-03',
    quantity: 5000,
    status: InventoryStatus.QUARANTINE,
    warehouse: 'Quarentena A2',
    supplier: 'Global Gloves',
    entryDate: '2024-04-20',
    daysInQuarantine: 30,
    criticality: 'Média',
    riskScore: 65,
    reason: 'Documentação Incompleta',
    analysisStatus: 'Aguardando Decisão'
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-9921',
    action: 'Alteração de Estado',
    entity: 'SHP-2024-001',
    user: 'Carlos Silva',
    timestamp: '2024-05-20 08:30:12',
    details: 'Status alterado de Aguardando Chegada para Em Conferência'
  },
  {
    id: 'LOG-9920',
    action: 'Bloqueio de Lote',
    entity: 'INV-002',
    user: 'Marina Costa',
    timestamp: '2024-05-20 08:15:00',
    details: 'Lote L2201-AA movido para Quarentena. Motivo: Suspeita de avaria.'
  },
  {
    id: 'LOG-9919',
    action: 'Login',
    entity: 'System',
    user: 'Carlos Silva',
    timestamp: '2024-05-20 08:00:05',
    details: 'Acesso via IP 192.168.1.45'
  }
];

export const STATUS_COLORS: Record<string, string> = {
  [ReceivingStatus.PRE_REGISTERED]: 'bg-slate-800 text-slate-300 border-slate-700',
  [ReceivingStatus.AWAITING_ARRIVAL]: 'bg-blue-900/30 text-blue-400 border-blue-800/50',
  [ReceivingStatus.IN_CONFERENCE]: 'bg-amber-900/30 text-amber-400 border-amber-800/50',
  [ReceivingStatus.CONFERENCE_FINISHED]: 'bg-indigo-900/30 text-indigo-400 border-indigo-800/50',
  [ReceivingStatus.DIVERGENCE]: 'bg-red-900/30 text-red-400 border-red-800/50',
  [ReceivingStatus.COMPLETED]: 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50',
  
  [InventoryStatus.AVAILABLE]: 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50',
  [InventoryStatus.RESERVED]: 'bg-blue-900/30 text-blue-400 border-blue-800/50',
  [InventoryStatus.BLOCKED]: 'bg-red-900/30 text-red-400 border-red-800/50',
  [InventoryStatus.QUARANTINE]: 'bg-amber-900/30 text-amber-400 border-amber-800/50',
  [InventoryStatus.EXPIRED]: 'bg-slate-800 text-slate-400 border-slate-700 decoration-line-through',
};