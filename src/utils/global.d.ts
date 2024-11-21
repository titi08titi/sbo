// Auth type definitions
export type User = {
  id?: string | null
  name?: string | null
  email?: string | null
}

export type JWTToken = {
  accessToken: string | undefined
  refreshToken: string | undefined
  accessTokenExpiresAt: number | undefined
  refreshTokenExpiresAt: number
  user: User
}

export type RefreshTokenResponse = {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: string
  id_token: string
  'not-before-policy': number
  session_state: string
  scope: string
}

// Query type definitions
type Order = 'asc' | 'desc'

// Business type definitions
export type Process = {
  id: number
  name: string
  comment: string
  nbProcessedRows: number
  variationDate: string
  duration: string
  assemblyName: string
  assemblyVersion: string
  creationDate: string
  modificationDate: string
  status: string
}

export interface ProcessInfoSummary {
  lastProcessesInfo: LastProcessesInfo[]
  areFinished: boolean
  areValid: boolean
  isUnprocessedFSP: boolean
  isUnprocessedGR: boolean
  processesInError: string
}

export interface LastProcessesInfo {
  processId: number
  processName: string
  processComment?: string
  nbProcessedRows: number
  processStatus: string
  variationDate?: string
  modificationDate: string
  creationDate: string
  duration: string
  hasFailed: boolean
  isFinished: boolean
}

export interface ProcessStatistic {
  eventId: number
  simEventDate: string
  startProcessDate: string
  waitDuration: string
  importDoneDate: string
  importDuration: string
  computationDoneDate: string
  computationDuration: string
  exportDoneDate: string
  exportDuration: string
  fullProcessDuration: string
}

export type ExportGoodsReceiptsAction = {
  uuid: string
  action: string
  cancellableCount?: number
  retryableCount?: number
}

export type CreateExternalGoodsReceiptRequest = {
  purchaseOrderId: string
  vatRate: number
  amount: number
  currency: string
  variationDate: string
  comment?: string
}

export type ExternalGoodsReceiptModel = {
  externalGoodsReceiptId: number
  purchaseOrderId: string
  vatRate: number
  amount: number
  currency: string
  variationDate: string
  importedUser: string
  importedFile: string
  importedComment?: string
  externalCreation: string
  exportQueueId?: number
  exportQueueUuid?: string
  exportStatusCode?: string
  exportQueueComment?: string
  exportCreation?: string
  exportModification?: string
}

export type ExportSummary = {
  type: string
  status: string
  count: number
  creationDate: string
}

export type Export = {
  id: number
  uuId: string
  type: string
  status: string
  comment: string
  modificationDate: string
  creationDate: string
  amount?: number
  currency?: string
}

export type ExportHistory = {
  id: number
  exportQueueId: number
  status: string
  comment: string
  modificationDate: string
  creationDate: string
}

export type ExportReportModel = {
  type: string
  status: string
  count: number
  finhubCode?: string
  finhubMessage?: string
}

export type ExportInfo = {
  id: number
  amount?: number
  purchaseOrderUuId?: string
  comment: string
  modificationDate?: string
  status: string
  type: string
}

export type ExportStatusSummary = {
  purchaseOrderUuId: string
  status: string
  count: number
}

export type ErrorInfo = {
  message: string
  line?: number
}

export type ExternalLinkCategoryModel = {
  externalLinkCategoryId: number
  label: string
}

export type ExternalLinkRequest = {
  categoryId: number
  label: string
  url: string
  roles: string[]
}

export type ExternalLinkCategoryRequest = {
  label: string
}

export type ExternalLinkModel = {
  id: number
  categoryId: number
  categoryLabel: string
  label: string
  url: string
  roles: string[]
}

export type BlockedFspAggregatedReasonModel = {
  campaignCode: string
  status: string
  statusReason?: string
  grStatus?: string
  grStatusReason?: string
  itemId: number
  nbRows: number
  sumQty?: number
  sumQtyPos?: number
  sumQtyNeg?: number
}

export type AggregatedFspByItemIdModel = {
  accountingType: string
  campaignCode: string
  status: string
  statusReason?: string
  grStatus?: string
  grStatusReason?: string
  itemId: number
  nbRows: number
  sumQty?: number
  sumQtyPos?: number
  sumQtyNeg?: number
  variationDate: string
}

export type AggregatedFspBySimModel = {
  accountingType: string
  currency?: string
  deliveryOrder: string
  grStatus?: string
  grStatusReason?: string
  price?: number
  purchaseOrder: string
  quantity: number
  simId: number
  status: string
  statusReason?: string
  transferOrder: string
  type?: string
  variationDateOrigin: string
  vatRate?: number
}

export type FspAggregatedReasonModel = {
  id: number
  status: string
  statusReason?: string
  grStatus?: string
  grStatusReason?: string
  nbRows: number
  sumQty?: number
  sumQtyPos?: number
  sumQtyNeg?: number
  creationDate: string
}

export type FspMonthlyClosureModel = {
  accountingType: string
  awc?: number
  awcSnapshot?: number
  b2bCustomer: string
  campaignCode: string
  correctionFspId?: number
  creationDate: string
  currency: string
  deliveryOrder: string
  exchangeRateToEuro?: number
  grStatus?: string
  grStatusReason?: string
  id: number
  isBstock: boolean
  isPriceFromAx: boolean
  itemId: number
  itemStateId: number
  jobId?: number
  mappingVersion: number
  modificationDate: string
  originFspId?: number
  owner: string
  price?: number
  priceAvgGrIds?: string
  pricePurchaseOrder?: number
  purchaseOrder?: string
  quantity: number
  reverseAwc?: number
  simId?: number
  siteId?: number
  status: string
  statusReason: string
  stockCode: string
  stockType: string
  transferOrder: string
  type?: string
  variationDate: string
  variationDateOrigin?: string
  vatRate?: number
  warehouseId: number
}

export type FspSimDetailsModel = {
  accountingType: string
  b2bCustomer: string
  campaignCode: string
  correctionFspId: string
  currency: string
  deliveryOrder: string
  exchangeRateToEuro: number
  id: number
  isBstock: boolean
  isPriceFromAx: boolean
  itemId: number
  itemStateId: string
  jobId: number
  mappingVersion: number
  originFspId: string
  owner: string
  price: number
  pricePurchaseOrder: number
  purchaseOrder: string
  quantity: number
  reverseAwc: string
  simId: number
  siteId: number
  stockCode: string
  stockType: string
  transferOrder: string
  type: string
  variationDate: string
  variationDateOrigin: string
  vatRate: number
  warehouseId: string
  status: string
  statusReason: string
  grStatus: string
  grStatusReason: string
  modificationDate: string
  creationDate: string
}

export type ItemFspAggregatedReasonModel = {
  itemId: number
  status: string
  statusReason?: string
  grStatus?: string
  grStatusReason?: string
  accountingType?: string
  nbRows: number
  sumQty?: number
  sumQtyPos?: number
  sumQtyNeg?: number
}

export type ItemCampaignsModel = {
  itemId: number
  campaignCode: string
  hasBlockedStatuses: boolean
}

export type ItemExportsModel = {
  itemId: number
  status: string
  type: string
  count: number
}

export type JuneGapOverload = {
  id: number
  campaignCode: string
  stockCode: string
  initialUseCase: string
  targetUseCase: string
  isNew: boolean
}

export interface JuneGapOverloadRequest {
  campaignCode: string
  stockCode: string | null
  initialUseCase: string
  targetUseCase: string
}

export interface UpdateStatusByExportQueueIdModel {
  exportQueueId: number
  sourceStatus: string
  targetStatus: string
}

export interface CreatePoVatCorrectionRequest {
  purchaseOrderUuId: string
  vatOrigin: number
  vatTarget: number
}

export interface PoVatCorrectionModel {
  id: number
  purchaseOrderUuId: string
  vatOrigin: number
  vatTarget: number
  modificationDate: string
  creationDate: string
}

export interface UserActionLog {
  id: number
  action: string
  businessUnit: string
  comment: string
  email: string
  json: string
  creationDate: string
}

export interface Campaigns {
  campaignCode: string
}

export interface CampaignFinancialStockPiles {
  campaignCode: string
  status: string
  statusReason: string
  grStatus: string
  grStatusReason: string
  nbRows: number
  sumQty: number
  sumQtyPos: number
  sumQtyeg: number
  accountingType: string
}

export interface CampaignFlow {
  itemId: number
  campaignCode: string
  fromVariationDate: string
  toVariationDate: string
  statuses: CampaignFlowStatus[]
  exports: CampaignFlowExport[]
}

export interface AccountingTypeFlow {
  itemId: number
  variationDate: string
  campaignCode: string
  accountingType: string
  status: string
  statusReason: any
  grStatus: string
  grStatusReason: any
  nbRows: number
  sumQty: number
  sumQtyPos: number
  sumQtyNeg: number
}

export interface CampaignFlowStatus {
  status: string
  grStatus: string
  quantity: number
}

export interface CampaignFlowExport {
  type: string
  status: string
  quantity: number
}

export interface CampaignPurchaseOrders {
  campaignCode: string
  purchaseOrder: string
  alias: string
  stockCode: string
  status: string
  flowType: string
  contractType: string
  lastUpdateDate: string
}

export interface CampaignExports {
  campaignCode: string
  type: string
  status: string
  totalAmount?: number
  currency: string
  nbExports: number
  comment?: string
}

export interface CampaignAccountingValuationOfBlockedGrModel {
  campaignCode: string
  accountingType: string
  sumValue: number
}

export interface CampaignAccountingValuationOfBlockedVmModel {
  campaignCode: string
  accountingType: string
  sumValue: number
}

export interface CampaignAggregatedGoodsReceiptModel {
  campaignCode: string
  accountingType: string
  purchaseOrderUuid: string
  period: string
  sumAmount: number
  currency: string
}

export interface CampaignAggregatedValuedMovementModel {
  campaignCode: string
  accountingType: string
  period: string
  sumAmount: number
}

export interface SlackUserModel {
  id: string
  teamId: string
  profile: SlackUserProfileModel
}

export interface SlackUserProfileModel {
  email: string
  imageOriginal: string
  image_24: string
  image_32: string
  image_48: string
  image_72: string
  image_192: string
  image_512: string
  image_1024: string
}

export interface PurchaseOrder {
  poUuid: string
}

export interface PurchaseOrderModel {
  campaignCode: string
  alias?: string
  status: string
  flowType: string
  contractType: string
  quantity?: number
  amount?: number
  originatingCountry?: string
  originatingCountryFiscal?: string
  deliveryCountry?: string
  deliveryCountryFiscal?: string
  lastUpdateDate: string
  creationDate: string
}

export interface PurchaseOrderDetails {
  itemId: number
  stockCode?: string
  siteId?: number
  quantity: number
  price: number
  currency?: string
  vatRate?: number
  creationDate: string
}

export interface PurchaseOrderEvents {
  event: string
  currentUpdateDate: string
  lastUpdateDate?: string
}

export interface PurchaseOrderAwpModel {
  awpId: number
  purchaseOrder: string
  stockCode?: string
  vatRate: number
  itemId: number
  awpPrice: number
  currency: string
  isActive: boolean
  poLastAccountingDate: string
  modificationDate: string
  creationDate: string
}

export interface PurchaseOrderAwpEvents {
  awpEvent: string
  status?: string
  nbRef?: number
  minCreationDate: string
  maxCreationDate: string
}

export interface GlobalParameterModel {
  key: string
  value?: string
  creationDate: string
  modificationDate: string
}

export interface TaxNumberModel {
  purchaseOrderUuid: string
  supplierId: number
  taxNumber: string
}

export interface FlowNodeModel {
  id: string
  label: string
  type: NodeType
  final?: boolean
  previous: FlowNodeModel[]
  data?: any
  position?: { x: number; y: number }
  sourcePosition?: 'top' | 'right' | 'bottom' | 'left'
  targetPosition?: 'top' | 'right' | 'bottom' | 'left'
}

export interface ProcessNameModel {
  name: string
  shortName?: string
  longName: string
  category: string
  displayOrder?: number
  service: string
  workflowId?: number
  creationDate: string
  modificationDate: string
}

export interface IntrastatHistoryModel {
  year: number
  month: number
  variationDate: string
  isOpen: boolean
}

export interface IntrastatResultModel {
  year: number
  month: number
  type: string
  campaign: string
  originCountry: string
  destinationCountry: string
  intrastatCode: string
  supplier: string
  supplierTaxNumber: string
  customer: string
  customerTaxNumber: string
  quantity: number
  amount: number
  currency: string
  weight: number
  isError: boolean
  modificationDate: string
}

export interface IntrastatErrorModel {
  year: number
  month: number
  type: string
  intrastatMissing: number
  taxNumberMissing: number
  weightMissing: number
  modificationDate: string
}

export interface IntrastatItemWithoutCodeModel {
  year: number
  month: number
  campaign: string
  itemId: number
}

export interface IntrastatCampaignWithoutTaxNumberModel {
  debTypeCode: string
  campaign: string
  supplierCustomerId?: string
  sourceCountry: string
  targetCountry: string
  stockCode?: string
  purchaseOrder?: string
}

export interface SynthesisHistoryModel {
  year: number
  month: number
  variationDate: string
  closingDate?: string | null
  isOpen: boolean
}

export interface SynthesisIndicatorModel {
  indicators: string
  value?: string | null
}

export interface ElasticSearchBySqlRequest {
  query: string
  limit: number
}

export interface ElasticSearchBySqlColumn {
  name: string
  type: string
}

export interface ElasticSearchBySqlResponse {
  columns: ElasticSearchBySqlColumn[]
  rows: string[][]
}

export interface ElasticQueryModel {
  id: number
  label: string
  query: string
  email: string
  creationDate: string
}

export interface AwcModel {
  id: number
  variationDate: string
  jobId: number
  itemId?: number | null
  cost: number
  isActive: boolean
  creationDate: string
  modificationDate: string
}

export interface AwcInitialSnapshotModel {
  id: number
  itemId: number
  cost: number
  quantity: number
  priority?: number | null
  priceSource?: string | null
  creationDate: string
  modificationDate?: string | null
}

export interface EgrExportGroupByCampaignPoModel {
  campaignCode?: string | null
  purchaseOrderUuid: string
  amount: number
  currency: string
}

export interface GoodsReceiptModel {
  id: number
  variationDate: string
  financialStockPileId?: number | null
  warehouseId?: number | null
  purchaseOrderId: string
  deliveryComplete: boolean
  itemId?: number | null
  quantity: number
  isBstock: boolean
  itemStateId: number
  stockCode?: string | null
  stockType?: string | null
  ownership?: string | null
  vatRate: number
  unitPrice: number
  currency: string
  exchangeRateToEuro: number
  accountingType: string
  campaignCode?: string | null
  value: number
  status: string
  modificationDate: string
  creationDate: string
  aggregatedId?: number | null
  originVariationYear?: number | null
}

export interface ValuedMovementModel {
  id: number
  jobId: number
  itemId: number
  financialStockPileId: number
  variationDate: string
  accountingType: string
  campaignCode: string
  siteId?: number | null
  quantity: number
  value: number
  price: number
  stockCode?: string | null
  stockType?: string | null
  ownership?: string | null
  isBstock?: boolean | null
  warehouseId?: number | null
  creationDate: string
  b2bCustomer?: string | null
  status: string
  modificationDate?: string | null
  aggregatedId?: number | null
}

export interface AccrualPeriodModel {
  year: number
  month: number
  sumValue?: number | null
}

export interface AccrualKoExportModel {
  id: number
  year: number
  month: number
  type: string
  campaign: string
  accountingType: string
  value: number
  exportQueueId: number
  status: string
}

export interface CogsMonthlyReportModel {
  year: number
  month: number
  campaign: string
  siteId: number
  sumQuantity: number
  sumValue: number
  currency?: string | null
}

export interface PeriodModel {
  year: number
  month: number
}

export interface PlasticTaxHistoryArchiveModel {
  year: number
  month: number
  processId: number
  totalRows?: number | null
  isOpen: boolean
  comment?: string | null
  modificationDate: string
  creationDate: string
}
