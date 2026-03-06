
export type View =
  | 'Dashboard'
  | 'Messages'
  | 'Assets'
  | 'Asset Detail'
  | 'Asset Location'
  | 'Asset Meters'
  | 'Asset Documentation'
  | 'Asset History'
  | 'Work Requests'
  | 'Work Orders'
  | 'Work Order Detail'
  | 'Labor Allocation'
  | 'Procedures'
  | 'Preventive Maintenance'
  | 'Projects'
  | 'Warehousing'
  | 'Parts Catalog'
  | 'Inventory Transactions'
  | 'Purchase Requisitions'
  | 'RFQs'
  | 'Purchase Orders'
  | 'Vendors'
  | 'Vendor Detail'
  | 'Inventory Alerts'
  | 'Cycle Counting'
  | 'Invoice Reconciliation'
  | 'Personnel Management'
  | 'Reporting & Analytics'
  | 'Asset Health Score'
  | 'Report: Purchase Requisitions'
  | 'Report: Purchase Orders'
  | 'Report: Cycle Counts'
  | 'Admin & Settings'
  | 'System Settings'
  | 'Audit Trails'
  | 'User Rights & Permissions';

export enum AssetStatus {
  Operational = 'Operational',
  UnderMaintenance = 'Under Maintenance',
  Decommissioned = 'Decommissioned',
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  plantId: string;
  zoneId: string;
  areaId: string;
  purchaseDate: string;
  cost: number;
  status: AssetStatus;
  meterReading: number;
  underWarranty: boolean;
  warrantyExpiryDate?: string;
  custodianId: string; // Planner Group ID
  meterId?: string;
  bomNotes?: string;
  idealCycleTime?: number; // Units per hour
  unitsProducedPerHour?: number; // Actual average production rate
  defectRate?: number; // e.g., 0.05 for 5%
  createdBy: string; // User ID
}

export enum WorkOrderStatus {
  Open = 'Open',
  InProgress = 'In Progress',
  Completed = 'Completed',
  Archived = 'Archived',
  Cancelled = 'Cancelled',
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical',
}

export enum WorkOrderType {
    Corrective = 'Corrective',
    Breakdown = 'Breakdown',
    Preventive = 'Preventive',
    Project = 'Project',
}

export interface PartUsed {
  partId: string;
  quantity: number;
}

export interface RootCauseAnalysis {
    componentAffectedId?: string; // BOM item ID
    componentAffectedCustom?: string; // Free text for unknown component
    problemStatement: string;
    immediateActionTaken: string;
    fiveWhyAnalysis: string;
    rootCauses: string;
    correctiveActions: string;
    verificationPlan: string;
}

export interface WorkOrder {
  id: string;
  description: string;
  assetId?: string;
  priority: Priority;
  status: WorkOrderStatus;
  dueDate: string;
  partsUsed: PartUsed[];
  estimatedDuration: number;
  laborHours: number;
  workOrderType: WorkOrderType;
  createdDate: string;
  createdBy: string; // User ID
  pmPlanId?: string;
  projectId?: string;
  workRequestId?: string;
  controllerGroupId?: string;
  workCenterId?: string;
  assignedUserIds: string[];
  procedureIds: string[];
  locationDescription?: string;
  planningGroupId?: string;
  zoneId?: string;
  parentWorkOrderId?: string;
  rca?: RootCauseAnalysis;
  plantCostCodeId?: string;
  zoneCostCodeId?: string;
  sectionCostCodeId?: string;
  accountCostCodeId?: string;
  cancellationReason?: string;
}

export interface Part {
  id: string;
  partNumber: string;
  name: string;
  location: string;
  quantity: number;
  reorderPoint: number;
  maxQuantity?: number; // Used for System PR generation logic
  unitCost: number;
  unitOfMeasure: string;
  assetId?: string;
  type: 'Stock' | 'Non-stock';
  leadTime?: number; // in days
  vendorId?: string;
  dateCreated: string;
  createdBy: string; // User ID
  isActive?: boolean;
}

export interface Store {
    id: string;
    name: string;
    location: string;
    description?: string;
    createdBy: string; // User ID
}

export enum WorkRequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  ConvertedToWO = 'Converted to Work Order',
}

export interface WorkRequest {
  id: string;
  description: string;
  assetId?: string;
  locationDescription?: string;
  requesterId: string;
  requesterContact?: string;
  priority: Priority;
  status: WorkRequestStatus;
  requestDate: string;
  attachments?: { name: string; size: number; type: string }[];
  plannerGroupId?: string;
  rejectionReason?: string;
}

export interface SafetyOperation {
    opNo: string;
    description: string;
}

export interface WorkInstructionOperation {
    opNo: string;
    description: string;
    duration: number; // in hours
}

export interface SOPOperation {
    opNo: string;
    description: string;
}

export interface SafetyInstruction {
    id: string;
    description: string;
    createdDate: string;
    createdBy: string; // User ID
    operations: SafetyOperation[];
    remarks: string;
}

export interface WorkInstruction {
    id: string;
    assetId: string;
    description: string;
    createdDate: string;
    createdBy: string; // User ID
    operations: WorkInstructionOperation[];
    totalDuration: number;
    remarks: string;
}

export interface SOP {
    id: string;
    assetId?: string;
    description: string;
    createdDate: string;
    createdBy: string; // User ID
    operations: SOPOperation[];
    remarks: string;
}

export type PMFrequency = 'Weekly' | 'Bi-Weekly' | 'Monthly' | '3-Monthly' | '6-Monthly' | 'Annually';

export interface PreventiveMaintenance {
  id: string;
  name: string;
  assetId: string;
  procedureIds: string[];
  createdDate: string;
  createdBy: string; // User ID
  duration: number;
  isActive?: boolean; // If false, no WOs are generated

  triggerType: 'Calendar' | 'Meter';

  // Calendar-based fields
  frequency?: PMFrequency;
  nextDueDate?: string;

  // Meter-based fields
  meterId?: string;
  meterTriggerValue?: number; // The interval, e.g., every 4000 hours
  lastTriggerReading?: number; // The meter reading when the last PM was generated
}


export enum ProjectStatus {
  Planning = 'Planning',
  InProgress = 'In Progress',
  OnHold = 'On Hold',
  Completed = 'Completed',
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;
  createdDate: string;
  createdBy: string; // User ID
}

export enum POType {
    ShortTerm = 'Short Term',
    LongTerm = 'Long Term',
}

export enum POStatus {
    Draft = 'Draft',
    PendingApproval = 'Pending Approval',
    PendingHighValueApproval = 'Pending High-Value Approval',
    Approved = 'Approved',
    Rejected = 'Rejected',
    AddMoreInfo = 'Add More Info',
    Submitted = 'Submitted', // to vendor
    PartiallyReceived = 'Partially Received',
    Received = 'Received',
    Closed = 'Closed',
}

export interface POItem {
    partId: string;
    description: string;
    quantity: number;
    unitOfMeasure: string;
    unitCost: number;
    quantityReceived: number;
}

export interface PurchaseOrder {
    id: string;
    poType: POType;
    orderDate: string;
    prId: string;
    rfqId: string;
    vendorId: string;
    shipToAddress: string;
    expectedDeliveryDate: string;
    paymentTerms: string;
    termsAndConditions: string;
    placeOfSupply: string;
    currency: string;
    taxRate: number; // e.g. 0.05 for 5%
    notes?: string;
    status: POStatus;
    items: POItem[];
    createdBy: string; // User ID
    storeId?: string; // Linked store for System PRs
    // Approval fields
    approverId?: string; // Department Head
    highValueApproverId?: string; // For orders > 4500
    rejectionRemarks?: string;
}

export enum PRStatus {
  Draft = 'Draft',
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  RFQCreated = 'RFQ Created',
}

export enum PRType {
    Manual = 'Manual',
    System = 'System'
}

export enum PRItemType {
    Item = 'Item',
    Service = 'Service'
}

export interface PurchaseRequisition {
  id: string; // MPR-001 or SPR-001
  type: PRType;
  requestDate: string;
  status: PRStatus;
  priority: Priority;
  vendorId?: string;
  budgetCode?: string; 
  remarks?: string;
  approverId?: string;
  
  // Manual PR fields
  requesterId?: string;
  description?: string; 
  itemType?: PRItemType;
  specifications?: string;
  estimatedCost?: number | 'Vendor to determine';
  deliveryDate?: string;
  deliveryZoneId?: string;
  justification?: string;
  attachments?: { name: string; size: number; type: string }[];
  internalNotes?: string;
  assetId?: string;
  workOrderId?: string;

  // System PR fields
  items?: { partId: string; quantity: number, unitCost: number, unitOfMeasure: string }[]; 
  zoneId?: string;
  areaId?: string;
  storeId?: string; // Warehouse location
}

export enum RFQStatus {
  Draft = 'Draft',
  WaitingApproval = 'Waiting Approval',
  SentToVendor = 'Sent to Vendor',
  QuotationReceived = 'Quotation Received',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Closed = 'Closed',
}

export interface RFQ {
  id: string; // RFQ Number
  date: string; // Date of RFQ
  prId: string; // Parent PR Number
  requesterId: string;
  priority: Priority;
  description: string;
  vendorIds: string[]; // Changed from vendorId: string to array
  deliveryDate: string;
  justification: string;
  status: RFQStatus;
  approverId?: string;
  remarks?: string;
}

export enum TransactionType {
    Issue = 'Issue',
    Receipt = 'Receipt',
    Adjustment = 'Adjustment',
}

export interface InventoryTransaction {
    id: string;
    partId: string;
    type: TransactionType;
    quantity: number;
    date: string;
    workOrderId?: string;
    userId: string;
}

export enum CycleCountStatus {
    Scheduled = 'Scheduled',
    InProgress = 'In Progress',
    Completed = 'Completed',
    Posted = 'Posted',
}

export interface CycleCountItem {
    partId: string;
    systemQty: number;
    countedQty: number | null;
}

export interface CycleCount {
    id: string;
    location: string;
    scheduledDate: string;
    status: CycleCountStatus;
    countItems?: CycleCountItem[];
    isPosted?: boolean;
    createdBy?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  lastPasswordChangeDate?: string;
  role: 'Administrator' | 'Technician' | 'Manager' | 'Requester' | 'Planner' | 'Clerk' | 'Controller' | 'Operator' | 'Factory Manager' | 'Supervisor' | 'Engineer';
  department: string;
  workCenter: string;
  profilePictureUrl?: string;
  zoneIds?: string[];
  isActive?: boolean;
}

export interface Department {
    id: string;
    name: string;
    description?: string;
}

export interface Document {
  id: string;
  name: string;
  assetId: string;
  type: 'Work Instruction' | 'SOP' | 'Schematic' | 'PI Drawing' | 'Safety Instruction' | 'MSDS';
  url: string;
  dateCreated: string;
  createdBy: string; // User ID
  vendorId?: string;
}

export enum MeterType {
    Manual = 'Manual',
    Automatic = 'Automatic',
}

export interface Meter {
  id: string;
  assetId: string;
  name: string;
  type: MeterType;
  lastReading: number;
  unitOfMeasure: string;
  lastReadingDate: string;
  createdBy: string; // User ID
  isActive?: boolean;
  maxReadingLimit?: number; // Max expected reading for validation
}

export interface MeterReading {
  id: string;
  meterId: string;
  value: number;
  date: string;
  userId: string; // User who recorded the reading
}

export interface Message {
  id: string;
  sender: string; // Could be a name or 'System'
  recipientId: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
}

export interface WorkCenter {
    id: string;
    name: string;
    userIds: string[];
    controllerGroupId: string;
}

export interface ControllerGroup {
    id: string;
    name: string;
    userIds: string[];
    plannerGroupId?: string;
    managerGroupId?: string;
}

export interface SystemAdminGroup {
    id: string;
    name: string;
    userIds: string[];
}

export interface TopManagementGroup {
    id: string;
    name: string;
    userIds: string[];
}

// Previously 'ManagementGroup', now specific to Logistics
export interface LogisticsManagementGroup {
    id: string;
    name: string;
    userIds: string[];
    topManagementGroupId?: string;
}

// New Asset Management Group
export interface AssetManagementGroup {
    id: string;
    name: string;
    userIds: string[];
    topManagementGroupId?: string;
}

export interface EngineerGroup {
    id: string;
    name: string;
    userIds: string[];
    managerGroupId?: string;
}

export interface PlannerGroup {
    id: string;
    name: string;
    userIds: string[];
    engineerGroupId?: string;
}

export interface ClerkGroup {
    id: string;
    name: string;
    userIds: string[];
    plannerGroupId?: string;
    logisticsControllerId?: string;
}

export interface LaborLog {
    id: string;
    workOrderId: string;
    userId: string;
    startTime: string; // ISO format
    endTime: string; // ISO format
    notes: string;
}

export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

export interface Plant {
    id: string;
    name: string;
}

export interface Zone {
    id: string;
    name: string;
    plantId: string;
    planningGroupId?: string;
}

export interface Area {
    id:string;
    name: string;
    zoneId: string;
}

export interface CostCenterCode {
    id: string;
    code: number;
    name: string;
}

export interface CostCenter {
    id: string;
    plantCostCodeId: string;
    zoneCostCodeId: string;
    sectionCostCodeId: string;
    accountCostCodeId: string;
    dateCreated: string;
}

export interface Budget {
    id: string;
    name: string;
    costCenterId: string;
    fiscalYear: number;
    amount: number;
    spent: number;
}

export enum InvoiceStatus {
    Pending = 'Pending',
    Approved = 'Approved',
    Disputed = 'Disputed',
    Paid = 'Paid',
}

export interface InvoiceItem {
    poItemIndex: number;
    partId: string;
    description: string;
    orderedQty: number;
    unitOfMeasure: string;
    receivedQty: number;
    billedQty: number;
    orderedUnitCost: number;
    billedUnitCost: number;
}

export enum InvoiceExceptionType {
    PriceMismatch = 'Price Mismatch',
    QuantityMismatch = 'Quantity Mismatch',
    Damage = 'Damage',
    Other = 'Other',
}

export interface Invoice {
    id: string;
    poId: string;
    invoiceNumber: string;
    invoiceDate: string;
    items: InvoiceItem[];
    status: InvoiceStatus;
    notes?: string;
    disputeReason?: string;
    exceptionType?: InvoiceExceptionType;
    exceptionNotes?: string;
    attachment?: {
        name: string;
        url: string;
    };
}

export interface BomItem {
  id: string;
  assetId: string;
  partId: string;
  quantity: number;
  unitOfMeasure: string;
  notes?: string;
  parentId?: string | null;
}

export interface Settings {
    currency: string;
    dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
    defaultWorkOrderPriorities: {
        [WorkOrderType.Preventive]: Priority;
        [WorkOrderType.Corrective]: Priority;
        [WorkOrderType.Breakdown]: Priority;
        [WorkOrderType.Project]: Priority;
    };
    defaultWorkRequestPriority: Priority;
    laborRatePerHour: number;
    defaultPaymentTerms: string;
    highValuePOThreshold: number;
    notifications: {
        newWorkRequest: boolean;
        lowStockAlert: boolean;
        pmDue: boolean;
        purchaseRequisition: boolean;
        requestForQuotation: boolean;
        purchaseOrder: boolean;
    };
    exchangeRate: {
        USD: number;
        EUR: number;
    };
    workWeekHours: 40 | 48;
    inventoryLocked: boolean;
}

export interface Currency {
    code: string;
    name: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string; // ISO 8601 string
  userId: string;
  action: string; // e.g., 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT'
  entityType: string; // e.g., 'Asset', 'WorkOrder', 'System'
  entityId: string;
  details: string; // Human-readable summary
  status: 'Success' | 'Failure';
}

export interface MockData {
  assets: Asset[];
  workOrders: WorkOrder[];
  parts: Part[];
  stores: Store[];
  workRequests: WorkRequest[];
  safetyInstructions: SafetyInstruction[];
  workInstructions: WorkInstruction[];
  sops: SOP[];
  preventiveMaintenances: PreventiveMaintenance[];
  projects: Project[];
  purchaseOrders: PurchaseOrder[];
  purchaseRequisitions: PurchaseRequisition[];
  rfqs: RFQ[];
  vendors: Vendor[];
  inventoryTransactions: InventoryTransaction[];
  cycleCounts: CycleCount[];
  users: User[];
  departments: Department[];
  documents: Document[];
  meters: Meter[];
  meterReadings: MeterReading[];
  messages: Message[];
  workCenters: WorkCenter[];
  maintenanceControllers: ControllerGroup[];
  logisticsControllers: ControllerGroup[];
  systemAdmins: SystemAdminGroup[];
  topManagementGroups: TopManagementGroup[];
  logisticsManagers: LogisticsManagementGroup[];
  assetManagers: AssetManagementGroup[];
  engineers: EngineerGroup[];
  plannerGroups: PlannerGroup[];
  logisticsClerks: ClerkGroup[];
  maintenanceClerks: ClerkGroup[];
  laborLogs: LaborLog[];
  plants: Plant[];
  zones: Zone[];
  areas: Area[];
  plantCostCodes: CostCenterCode[];
  zoneCostCodes: CostCenterCode[];
  sectionCostCodes: CostCenterCode[];
  accountCostCodes: CostCenterCode[];
  costCenters: CostCenter[];
  budgets: Budget[];
  bomItems: BomItem[];
  invoices: Invoice[];
  settings: Settings;
  auditLog: AuditLogEntry[];
  groupPermissions: Record<string, View[]>; // Dynamic permissions storage
}
