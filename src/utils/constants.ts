export const TIME_SECURITY_MARGIN = 10 // 5 minutes

export enum Environment {
  LOCALHOST = 'localhost',
  PRODUCTION = 'production',
  STAGING = 'staging',
  INTEGRATION = 'integration',
}

export enum SambotApiUrl {
  PRODUCTION = 'https://sam-sambot-sam.prd.ops.vptech.eu/',
  STAGING = 'https://sam-sambot-sam.stg.ops.vptech.eu/',
  LOCALHOST = 'http://localhost:5000/',
}

export const SITE_NAME = 'Sambot'
export const MAX_PAGE_SIZE = 25
export const BASE_SLACK_URI = 'https://ca.slack-edge.com'
export const DefaultDateFormat = 'YYYY-MM-DD'
export const DefaultDateTimeFormat = 'YYYY-MM-DD HH:mm:ss'
export const DefaultTimeFormat = 'HH:mm:ss'
export const DefaultVatRateFormat = new Intl.NumberFormat('fr-FR', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export enum Role {
  visitor = 'sambot-visitor',
  admin = 'sambot-admin',
  support = 'sambot-support',
  accountingUser = 'sambot-accounting-user',
  accountingManager = 'sambot-accounting-manager',
  fiscalreportManager = 'sambot-fiscalreport-manager',
}

export enum Feature {
  cancelExport = 'cancelExport',
  retryExport = 'retryExport',
  ignoreExport = 'ignoreExport',
  seeExportHistory = 'seeExportHistory',
  updateExportStatuses = 'updateExportStatuses',
  sendExports = 'sendExports',
  createExternalGoodsReceipts = 'createExternalGoodsReceipts',
  generateEgrExports = 'generateEgrExports',
  createPoVatCorrections = 'createPoVatCorrections',
  deletePoVatCorrection = 'deletePoVatCorrection',
  createJuneGapsOverload = 'createJuneGapsOverload',
  deleteJuneGapsOverload = 'deleteJuneGapsOverload',
  supportImports = 'supportImports',
  checkErrorProcess = 'checkErrorProcess',
  validateIntrastat = 'validateIntrastat',
  manage = 'manage',
  uploadPlasticTaxInputs = 'uploadPlasticTaxInputs',
}

export enum Endpoint {
  ACCRUALS = '/accruals',
  CAMPAIGNS = '/campaigns',
  COGS = '/cogs',
  ELASTIC = '/elastic',
  EXTERNAL_LINKS = '/externallinks',
  EXPORTS = '/exports',
  FINANCIAL_STOCK_PILES = '/financialstockpiles',
  GLOBAL_PARAMETERS = '/globalparameters',
  GOODS_RECEIPTS = '/goodsreceipts',
  INTRASTRASTS = '/intrastats',
  ITEMS = '/items',
  JUNE_GAP_OVERLOADS = '/junegapoverloads',
  PLASTIC_TAX = '/plastictax',
  PO_VAT_CORRECTIONS = '/purchaseordervatcorrections',
  PROCESSES = '/processes',
  PURCHASE_ORDERS = '/purchaseorders',
  SAMBOT_HISTORIES = '/sambothistories',
  STOCKS = '/stocks',
  SUPPORT = '/support',
  SYNTHESIS = '/synthesis',
  USERS = '/users',
  VALUED_MOVEMENTS = '/valuedmovements',
}

export enum ExportGoodsReceiptsStatus {
  CANCEL = 'CANCEL',
  RETRY = 'RETRY',
}

export enum SamBotPage {
  about = '/about',
  accruals = '/accruals/locking',
  accrualsKoExports = '/accruals/koExports',
  campaignsDetails = '/campaigns/details',
  campaignsMonthlyClosure = '/campaigns/monthlyClosure',
  elastic = '/elastic',
  exportsDetails = '/exports/details',
  exportsExternalGoodsReceipts = '/exports/externalGoodsReceipts',
  externalLinks = '/externalLinks',
  financialStockPileDetails = '/financialStockPiles/details',
  fspAggregatedReasons = '/financialStockPiles/aggregatedReasons',
  flowFsp = '/financialStockPiles/flow',
  goodsReceiptsExports = '/goodsReceipts/manageExports',
  goodsReceiptsExternals = '/goodsReceipts/manageExternalGoodsReceipts',
  goodsReceiptsPoVatCorrections = '/goodsReceipts/poVatCorrections',
  home = '/',
  itemsDetails = '/items/details',
  manageIntrastat = '/reports/manageIntrastat',
  intrastat = '/reports/intrastat',
  synthesis = '/reports/synthesis',
  juneGapsOverloads = '/juneGapOverloads',
  processesDetails = '/processes/details',
  profile = '/profile',
  purchaseOrderDetails = '/purchaseOrders/details',
  reportsCogs = '/reports/cogs',
  reportPlasticTax = '/reports/plasticTax',
  rightsMatrix = '/rightsMatrix',
  supportImports = '/support/imports',
  userActionLogs = '/userActionLogs',
}

export const MENU_ITEMS = [
  {
    title: 'Home',
    href: SamBotPage.home,
    icon: 'Home',
  },
  {
    title: 'Accruals',
    icon: 'Accruals',
    expanded: false,
    children: [
      {
        title: 'Locking',
        href: SamBotPage.accruals,
        icon: 'Lock',
        child: true,
      },
      {
        title: 'Exports KO',
        href: SamBotPage.accrualsKoExports,
        icon: 'Accruals',
        child: true,
      },
    ],
  },
  {
    title: 'Campaigns',
    icon: 'Campaigns',
    expanded: false,
    children: [
      {
        title: 'Details',
        href: SamBotPage.campaignsDetails,
        icon: 'CampaignsDetails',
        child: true,
      },
      {
        title: 'Monthly closure',
        href: SamBotPage.campaignsMonthlyClosure,
        icon: 'CampaignsDetails',
        child: true,
      },
    ],
  },
  {
    title: 'Exports',
    icon: 'Exports',
    expanded: false,
    children: [
      {
        title: 'Details',
        href: SamBotPage.exportsDetails,
        icon: 'ExportDetails',
        child: true,
      },
      {
        title: 'External GRs',
        href: SamBotPage.exportsExternalGoodsReceipts,
        icon: 'CampaignsDetails',
        child: true,
      },
    ],
  },
  {
    title: 'Financial stock piles',
    icon: 'FinancialStockPiles',
    expanded: false,
    children: [
      {
        title: 'Aggregated reasons',
        href: SamBotPage.fspAggregatedReasons,
        icon: 'FspAggregatedReasons',
        child: true,
      },
      {
        title: 'Details',
        href: SamBotPage.financialStockPileDetails,
        icon: 'FinancialStockPileDetails',
        child: true,
      },
      {
        title: 'Flow',
        href: SamBotPage.flowFsp,
        icon: 'FspFlow',
        child: true,
      },
    ],
  },
  {
    title: 'Goods Receipts',
    icon: 'GoodsReceipts',
    expanded: false,
    children: [
      {
        title: 'Manage exports',
        href: SamBotPage.goodsReceiptsExports,
        icon: 'ManageExportsGoodsReceipts',
        child: true,
      },
      {
        title: 'Manage externals',
        href: SamBotPage.goodsReceiptsExternals,
        icon: 'ManageExternalGoodsReceipts',
        child: true,
      },
      {
        title: 'PO VAT corrections',
        href: SamBotPage.goodsReceiptsPoVatCorrections,
        icon: 'PoVatCorrections',
        child: true,
      },
    ],
  },
  {
    title: 'Items',
    icon: 'Items',
    expanded: false,
    children: [
      {
        title: 'Details',
        href: SamBotPage.itemsDetails,
        icon: 'ItemsDetails',
        child: true,
      },
    ],
  },
  {
    title: 'June gaps overloads',
    href: SamBotPage.juneGapsOverloads,
    icon: 'JuneGapOverloads',
  },
  {
    title: 'Processes',
    icon: 'Processes',
    expanded: false,
    children: [
      {
        title: 'Details',
        href: SamBotPage.processesDetails,
        icon: 'ProcessesDetails',
        child: true,
      },
    ],
  },
  {
    title: 'Purchase Orders',
    icon: 'PurchaseOrders',
    expanded: false,
    children: [
      {
        title: 'Details',
        href: SamBotPage.purchaseOrderDetails,
        icon: 'PurchaseOrderDetails',
        child: true,
      },
    ],
  },
  {
    title: 'Reports',
    icon: 'Reports',
    expanded: false,
    children: [
      {
        title: 'COGS',
        href: SamBotPage.reportsCogs,
        icon: 'ReportsCogs',
        child: true,
      },
      {
        title: 'Intrastat',
        href: SamBotPage.intrastat,
        icon: 'ReportsIntrastat',
        child: true,
      },
      {
        title: 'Plastic tax',
        href: SamBotPage.reportPlasticTax,
        icon: 'ReportsPlasticTax',
        child: true,
      },
      {
        title: 'Manage intrastat',
        href: SamBotPage.manageIntrastat,
        icon: 'ManageIntrastat',
        child: true,
      },
      {
        title: 'Synthesis',
        href: SamBotPage.synthesis,
        icon: 'ReportsSynthesis',
        child: true,
      },
    ],
  },
  {
    title: 'Support',
    icon: 'Support',
    expanded: false,
    children: [
      {
        title: 'Imports',
        href: SamBotPage.supportImports,
        icon: 'SupportImports',
        child: true,
      },
    ],
  },
]

export const MENU_USER_ITEMS = [
  {
    title: 'About',
    href: SamBotPage.about,
    icon: 'Info',
  },
  {
    title: 'External links',
    href: SamBotPage.externalLinks,
    icon: 'ExternalLinks',
  },
  {
    title: 'Profile',
    href: SamBotPage.profile,
    icon: 'Profile',
  },
]

export const MENU_MONITORING_ITEMS = [
  {
    title: 'Elastic',
    href: SamBotPage.elastic,
    icon: 'Elastic',
  },
  {
    title: 'Rights matrix',
    href: SamBotPage.rightsMatrix,
    icon: 'RightsMatrix',
  },
  {
    title: 'User action logs',
    href: SamBotPage.userActionLogs,
    icon: 'UserActionLogs',
  },
]

export enum AccountingType {
  ADJUST = 'ADJUST',
  B2B_RETURN = 'B2B_RETURN',
  B2C_RETURN = 'B2C_RETURN',
  GI_B2B = 'GI_B2B',
  GI_B2C = 'GI_B2C',
  GR_CONS = 'GR_CONS',
  GR_DECOTE_A = 'GR_DECOTE_A',
  GR_DECOTE_B = 'GR_DECOTE_B',
  GR_FP = 'GR_FP',
  GR_PS = 'GR_PS',
  GR_PSDP = 'GR_PSDP',
  LBS = 'LBS',
  SCRAP = 'SCRAP',
  NO_TYPE = 'NO_TYPE',
}

export enum ExportType {
  GR_EXT = 'GR_EXT',
  GR_EXT_AX = 'GR_EXT_AX',
  GR_INT = 'GR_INT',
  VM = 'VM',
}

export enum ExportStatus {
  INIT = 'INIT',
  PENDING = 'PENDING',
  WAITING_FINHUB = 'WAITING_FINHUB',
  FAILED = 'FAILED',
  IGNORED = 'IGNORED',
  OK_FINHUB = 'OK_FINHUB',
  KO_FINHUB = 'KO_FINHUB',
  KO_CANCELLED_SAP = 'KO_CANCELLED_SAP',
  KO_SAP = 'KO_SAP',
  OK_TO_CANCEL_FINHUB = 'OK_TO_CANCEL_FINHUB',
  KO_TO_CANCEL_FINHUB = 'KO_TO_CANCEL_FINHUB',
  OK_CANCELLED_SAP = 'OK_CANCELLED_SAP',
  OK_SAP = 'OK_SAP',
  TO_CANCEL = 'TO_CANCEL',
  TO_RETRY = 'TO_RETRY',
  PENDING_LOCKED = 'PENDING_LOCKED',
}

export enum ExportStatusGroup {
  OK = 'OK',
  KO = 'KO',
  WAITING = 'WAITING',
  OTHER = 'OTHER',
}

export enum FinancialStockPilesStatus {
  BLOCKED = 'BLOCKED',
  IGNORED = 'IGNORED',
  NEW = 'NEW',
  PROCESSED = 'PROCESSED',
  RETRY = 'RETRY',
  VALID = 'VALID',
}

export enum FinancialStockPilesStatusReason {
  AWC_NEG_SUM_QTY = 'AWC_NEG_SUM_QTY',
  AWC_NEG_VALUE = 'AWC_NEG_VALUE',
  AWC_NOT_FOUND = 'AWC_NOT_FOUND',
  AWC_VALUE_ZERO = 'AWC_VALUE_ZERO',
  CODE_STOCK_MISMATCH = 'CODE_STOCK_MISMATCH',
  CODE_STOCK_OUT_OF_SCOPE = 'CODE_STOCK_OUT_OF_SCOPE',
  CORRECTION_FOUND = 'CORRECTION_FOUND',
  CUSTOMER_NOT_FOUND = 'CUSTOMER_NOT_FOUND',
  DO_MISSING = 'DO_MISSING',
  EXCHANGE_RATE_NOT_FOUND = 'EXCHANGE_RATE_NOT_FOUND',
  GR_BLOCKED = 'GR_BLOCKED',
  ITEM_BLOCKED = 'ITEM_BLOCKED',
  ITEM_INCONSISTENCY = 'ITEM_INCONSISTENCY',
  PO_OUT_OF_SCOPE = 'PO_OUT_OF_SCOPE',
  SIM_FALLBACK = 'SIM_FALLBACK',
  SIM_UNATTRIBUTED = 'SIM_UNATTRIBUTED',
  SITE_ID_NOT_FOUND = 'SITE_ID_NOT_FOUND',
  STOCK_NEG_INITIAL_QTY = 'STOCK_NEG_INITIAL_QTY',
  STOCK_NEG_QTY = 'STOCK_NEG_QTY',
  TO_MISSING = 'TO_MISSING',
  VM_AWC_NOT_FOUND = 'VM_AWC_NOT_FOUND',
  VM_NEG_SUM_VALUES = 'VM_NEG_SUM_VALUES',
}

export enum FinancialStockPilesGrStatus {
  BLOCKED = 'BLOCKED',
  IGNORED = 'IGNORED',
  NEW = 'NEW',
  PROCESSED = 'PROCESSED',
  RETRY = 'RETRY',
  VALID = 'VALID',
}

export enum FinancialStockPilesGrStatusReason {
  CODE_STOCK_MISMATCH = 'CODE_STOCK_MISMATCH',
  CORRECTION_FOUND = 'CORRECTION_FOUND',
  GI_B2C_BLOCKED = 'GI_B2C_BLOCKED',
  NEG_GR_SUM_QTY = 'NEG_GR_SUM_QTY',
  PO_CANCELLED = 'PO_CANCELLED',
  PO_MISSING = 'PO_MISSING',
  PO_NOT_FOUND = 'PO_NOT_FOUND',
  PO_NOT_MATCHING = 'PO_NOT_MATCHING',
  PO_OUT_OF_SCOPE = 'PO_OUT_OF_SCOPE',
  PO_TYPE_MISMATCH = 'PO_TYPE_MISMATCH',
  PRICE_NOT_FOUND = 'PRICE_NOT_FOUND',
  PRICE_ERROR = 'PRICE_ERROR',
  SIM_FALLBACK = 'SIM_FALLBACK',
  SIM_UNATTRIBUTED = 'SIM_UNATTRIBUTED',
  SRO_NOT_FOUND = 'SRO_NOT_FOUND',
  STOCK_NEG_INITIAL_QTY = 'STOCK_NEG_INITIAL_QTY',
  STOCK_NEG_QTY = 'STOCK_NEG_QTY',
  TO_MISSING = 'TO_MISSING',
}

export enum GlobalParameter {
  ExportsEnabled,
  SamEnabled,
}

export enum ProcessStatus {
  InProgress = 'InProgress',
  Done = 'Done',
  Error = 'Error',
  Ignored = 'Ignored',
  ErrorChecked = 'ErrorChecked',
}

export enum SambotHistoryAction {
  Delete = 'Delete',
  Insert = 'Insert',
  Gateway = 'Gateway',
  Update = 'Update',
}

export enum SambotHistoryBusinessUnit {
  Elastic = 'Elastic',
  Exports = 'Exports',
  ExternalGoodsReceipts = 'ExternalGoodsReceipts',
  GlobalParameters = 'GlobalParameters',
  Intrastats = 'Intrastats',
  JuneGapOverloads = 'JuneGapOverloads',
  PlasticTax = 'PlasticTax',
  Processes = 'Processes',
  PurchaseOrderVatCorrections = 'PurchaseOrderVatCorrections',
  Synthesis = 'Synthesis',
}

export enum NodeType {
  Campaign = 'Campaign',
  Item = 'Item',
  AccountingType = 'AccountingType',
}
