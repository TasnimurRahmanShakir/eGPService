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
  canEditOpeningBalance?: boolean;
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
  clientId?: number;
  clientName?: string;
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

export interface TenderClientDto {
  id: number;
  tenderId: number;
  clientId: number;
  clientName: string;
  phone?: string | null;
  totalChargeAmount: number;
  totalPaidAmount: number;
  totalDueAmount: number;
  tenderers: TendererMappingDto[];
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
  clients?: TenderClientDto[];
  tenderers: TendererMappingDto[];
}

export interface TenderClosingIndexDto {
  date: string;
  dateUtc: string;
  tenderCount: number;
  clientCount: number;
  totalChargeAmount: number;
}

export interface TenderPaymentDto {
  id: number;
  clientId: number;
  clientName?: string;
  amountPaid: number;
  paymentDateUtc: string;
  paymentMethod: string;
  remarks: string;
  tendererId?: number | null;
  tendererName?: string;
}

export interface TenderDetailDto extends TenderDto {
  clients?: TenderClientDto[];
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

export interface CashCollectionDto {
  id: number;
  voucherNo: string;
  clientId: number;
  clientName: string;
  clientPhone?: string | null;
  totalDueBefore: number;
  amountCollected: number;
  discountAmount: number;
  totalDueAfter: number;
  paymentMethod: string;
  trxId?: string | null;
  senderPhone?: string | null;
  bankName?: string | null;
  branchName?: string | null;
  bankAccountNo?: string | null;
  chequeNo?: string | null;
  chequeDate?: string | null;
  referenceNo?: string | null;
  remarks: string;
  collectionDateUtc: string;
  collectedById: string;
  collectedByName: string;
  createdAtUtc: string;
}

export interface CashCollectionSummaryDto {
  totalCollectedToday: number;
  totalCollectedThisMonth: number;
  totalCollectedAllTime: number;
  totalMarketDue: number;
  totalVouchersCount: number;
}

