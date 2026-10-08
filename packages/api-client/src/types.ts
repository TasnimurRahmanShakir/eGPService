export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
}

export interface ClientDto {
  id: number;
  name: string;
  phone: string;
  email: string;
  openingBalance: number;
  openingBalanceType: number; // 0 = Advance, 1 = Due
  openingBalanceTypeName: 'Advance' | 'Due';
  hasPurchasedSolution: boolean;
  solutionValidUptoUtc: string | null;
  createdAtUtc: string;
  createdBy: string;
}

export interface SubscriptionDto {
  id: number;
  solutionName: string;
  startDateUtc: string;
  validUptoUtc: string;
  isActive: boolean;
}

export interface ClientTenderSummaryDto {
  id: number;
  tenderId: string;
  closingDateTimeUtc: string;
  department: string;
  chargeAmount: number;
  totalPaid: number;
  dueAmount: number;
}

export interface ClientDetailDto extends ClientDto {
  subscriptions: SubscriptionDto[];
  tenders: ClientTenderSummaryDto[];
}

export interface TenderDto {
  id: number;
  clientId: number;
  clientName: string;
  tenderId: string;
  openingDateTimeUtc: string;
  closingDateTimeUtc: string;
  department: string;
  liquid1Status: boolean | null;
  liquid2Status: boolean | null;
  liquid3Status: boolean | null;
  jvcaStatus: boolean | null;
  submitStatus: boolean | null;
  fillStatus: boolean | null;
  mapStatus: boolean | null;
  rateStatus: boolean | null;
  lessPercentage: number | null;
  liquidAssetAmount: number;
  appCode: string;
  chargeAmount: number;
  totalPaid: number;
  dueAmount: number;
  createdAtUtc: string;
}

export interface TendererMappingDto {
  tendererId: number;
  tendererName: string;
  username: string;
}

export interface TenderPaymentDto {
  id: number;
  amountPaid: number;
  paymentDateUtc: string;
  paymentMethod: string;
  remarks: string;
}

export interface TenderDetailDto extends TenderDto {
  tenderers: TendererMappingDto[];
  payments: TenderPaymentDto[];
}

export interface TendererDto {
  id: number;
  name: string;
  username: string;
  createdAtUtc: string;
}

export interface AuditLogDto {
  id: number;
  moduleName: string;
  recordId: number;
  actionType: string;
  actionMessage: string;
  ipAddress: string;
  deviceInfo: string;
  osInfo: string;
  userAgent: string;
  timestampUtc: string;
  performedBy: string;
}
