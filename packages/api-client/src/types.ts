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
  currentAdvance: number;
  currentDue: number;
  netBalance: number;
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

export interface ClientLedgerTransactionDto {
  id: number;
  amount: number;
  referenceType: string;
  description: string;
  transactionDateUtc: string;
  referenceId: number | null;
}

export interface ClientDetailDto extends ClientDto {
  subscriptions: SubscriptionDto[];
  tenders: ClientTenderSummaryDto[];
  ledgerTransactions?: ClientLedgerTransactionDto[];
}

export interface TendererMappingDto {
  tendererId: number;
  tendererName: string;
  username: string;
  mailId: string;
  password?: string;
  passwordStatus: string;
  liquid1Status?: boolean | null;
  liquid2Status?: boolean | null;
  liquid3Status?: boolean | null;
  liquidStatus?: boolean | null;
  jvcaStatus: boolean | null;
  submitStatus: boolean | null;
  fillStatus: boolean | null;
  mapStatus: boolean | null;
  rateStatus: boolean | null;
  lessPercentage: number | null;
  chargeAmount: number;
  totalPaid: number;
  dueAmount: number;
}

export interface TenderDto {
  id: number;
  clientId: number | null;
  clientName: string | null;
  tenderId: string;
  closingDateTimeUtc: string;
  department: string;
  liquidAssetAmount: number;
  appCode: string;
  totalChargeAmount: number;
  totalPaidAmount: number;
  totalDueAmount: number;
  chargeAmount: number;
  totalPaid: number;
  dueAmount: number;
  createdAtUtc: string;
  tenderers: TendererMappingDto[];
}

export interface TenderPaymentDto {
  id: number;
  amountPaid: number;
  paymentDateUtc: string;
  paymentMethod: string;
  remarks: string;
  tendererId?: number | null;
}

export interface TenderDetailDto extends TenderDto {
  tenderers: TendererMappingDto[];
  payments: TenderPaymentDto[];
}

export interface TendererDto {
  id: number;
  name: string;
  username: string;
  password?: string;
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
