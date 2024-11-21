import { Feature, Role, SamBotPage } from '#utils/constants'

export const Authorizations = [
  {
    page: SamBotPage.about,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.fiscalreportManager, Role.visitor],
    features: [],
  },
  {
    page: SamBotPage.accruals,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
    features: [],
  },
  {
    page: SamBotPage.accrualsKoExports,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
    features: [],
  },
  {
    page: SamBotPage.campaignsDetails,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.visitor],
    features: [],
  },
  {
    page: SamBotPage.campaignsMonthlyClosure,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser],
    features: [],
  },
  {
    page: SamBotPage.elastic,
    authorizedRoles: [Role.admin],
    features: [],
  },
  {
    page: SamBotPage.exportsDetails,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.visitor],
    features: [
      {
        feature: Feature.cancelExport,
        authorizedRoles: [Role.admin, Role.support],
      },
      {
        feature: Feature.retryExport,
        authorizedRoles: [Role.admin, Role.support],
      },
      {
        feature: Feature.ignoreExport,
        authorizedRoles: [Role.admin, Role.support],
      },
      {
        feature: Feature.seeExportHistory,
        authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
      },
      {
        feature: Feature.sendExports,
        authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
      },
    ],
  },
  {
    page: SamBotPage.exportsExternalGoodsReceipts,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.visitor],
    features: [],
  },
  {
    page: SamBotPage.externalLinks,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.fiscalreportManager, Role.visitor],
    features: [
      {
        feature: Feature.manage,
        authorizedRoles: [Role.admin],
      },
    ],
  },
  {
    page: SamBotPage.financialStockPileDetails,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.visitor],
    features: [],
  },
  {
    page: SamBotPage.fspAggregatedReasons,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser],
    features: [],
  },
  {
    page: SamBotPage.flowFsp,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser],
    features: [],
  },
  {
    page: SamBotPage.goodsReceiptsExports,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser],
    features: [
      {
        feature: Feature.updateExportStatuses,
        authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
      },
      {
        feature: Feature.sendExports,
        authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
      },
    ],
  },
  {
    page: SamBotPage.goodsReceiptsExternals,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser],
    features: [
      {
        feature: Feature.createExternalGoodsReceipts,
        authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
      },
      {
        feature: Feature.generateEgrExports,
        authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
      },
      {
        feature: Feature.sendExports,
        authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
      },
    ],
  },
  {
    page: SamBotPage.goodsReceiptsPoVatCorrections,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser],
    features: [
      {
        feature: Feature.createPoVatCorrections,
        authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
      },
      {
        feature: Feature.deletePoVatCorrection,
        authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
      },
    ],
  },
  {
    page: SamBotPage.home,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.fiscalreportManager, Role.visitor],
    features: [],
  },
  {
    page: SamBotPage.intrastat,
    authorizedRoles: [Role.admin, Role.accountingManager, Role.accountingUser, Role.support, Role.fiscalreportManager],
    features: [],
  },
  {
    page: SamBotPage.itemsDetails,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.visitor],
    features: [],
  },
  {
    page: SamBotPage.juneGapsOverloads,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.visitor],
    features: [
      {
        feature: Feature.createJuneGapsOverload,
        authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
      },
      {
        feature: Feature.deleteJuneGapsOverload,
        authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
      },
    ],
  },
  {
    page: SamBotPage.manageIntrastat,
    authorizedRoles: [Role.admin, Role.accountingManager, Role.fiscalreportManager],
    features: [
      {
        feature: Feature.validateIntrastat,
        authorizedRoles: [Role.admin, Role.accountingManager, Role.fiscalreportManager],
      },
    ],
  },
  {
    page: SamBotPage.processesDetails,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.visitor],
    features: [
      {
        feature: Feature.checkErrorProcess,
        authorizedRoles: [Role.admin],
      },
    ],
  },
  {
    page: SamBotPage.profile,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.fiscalreportManager, Role.visitor],
    features: [],
  },
  {
    page: SamBotPage.purchaseOrderDetails,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.visitor],
    features: [],
  },
  {
    page: SamBotPage.reportsCogs,
    authorizedRoles: [Role.admin, Role.accountingManager, Role.accountingUser, Role.support],
    features: [],
  },
  {
    page: SamBotPage.reportPlasticTax,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
    features: [
      {
        feature: Feature.uploadPlasticTaxInputs,
        authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
      },
    ],
  },
  {
    page: SamBotPage.rightsMatrix,
    authorizedRoles: [Role.admin, Role.accountingManager, Role.accountingUser, Role.support],
    features: [],
  },
  {
    page: SamBotPage.synthesis,
    authorizedRoles: [Role.admin, Role.accountingManager, Role.accountingUser, Role.support, Role.fiscalreportManager],
    features: [],
  },
  {
    page: SamBotPage.supportImports,
    authorizedRoles: [Role.admin],
    features: [
      {
        feature: Feature.supportImports,
        authorizedRoles: [Role.admin],
      },
    ],
  },
  {
    page: SamBotPage.userActionLogs,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager],
    features: [],
  },
]

export const hasPageAccess = (page: string, roles: string[]) => {
  const pageAuthorization = Authorizations.find((access) => access.page === page)
  return pageAuthorization != null && pageAuthorization.authorizedRoles.some((authorizedRole) => roles.indexOf(authorizedRole) >= 0)
}

export const hasFeatureAccess = (page: string, feature: string, roles: string[]) => {
  const pageAuthorization = Authorizations.find((access) => access.page === page)
  if (!pageAuthorization) {
    return false
  }
  const features = pageAuthorization.features ?? []
  if (features.length === 0) {
    return true
  }
  const featureAuthorization = features.find((featureAuthorization) => featureAuthorization.feature === feature)
  if (featureAuthorization) {
    return featureAuthorization.authorizedRoles.some((authorizedRole) => roles.indexOf(authorizedRole) >= 0)
  }
  return false
}
