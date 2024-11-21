import { SamBotPage } from '#utils/constants'

function openTab(url: string) {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

export function openCampaignDetailsTab(campaignCode: string) {
  openTab(`${SamBotPage.campaignsDetails}?code=${campaignCode}`)
}

export function openItemDetailsTab(itemId: string) {
  openTab(`${SamBotPage.itemsDetails}?id=${itemId}`)
}

export function openPurchaseOrderDetailsTab(uuid: string) {
  openTab(`${SamBotPage.purchaseOrderDetails}?uuid=${uuid}`)
}
