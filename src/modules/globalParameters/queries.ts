import { getSambotClientWithToken } from '#core/client'
import { Endpoint, GlobalParameter } from '#utils/constants'
import { GlobalParameterModel } from '#utils/global'

const GlobalParameterExportsEnabled = 'SAM.EXPORTS.ENABLED'
const GlobalParameterSamEnabled = 'SAM.ENABLED'

function getValueByKey(key: GlobalParameter): string {
  switch (key) {
    case GlobalParameter.ExportsEnabled:
      return GlobalParameterExportsEnabled
    case GlobalParameter.SamEnabled:
      return GlobalParameterSamEnabled
  }
}

async function isGlobalParameterEnabled(key: GlobalParameter): Promise<boolean> {
  const sambotClientWithToken = await getSambotClientWithToken()
  const globalParameter = await sambotClientWithToken
    .get(`${Endpoint.GLOBAL_PARAMETERS}?key=${getValueByKey(key)}`)
    .then<GlobalParameterModel>((res) => res.data)
  return globalParameter.value?.toLowerCase?.() === 'true'
}

interface UpdateGlobalParameterRequest {
  key: string
  value: string
}

const updateGlobalParameter = async (key: GlobalParameter, isEnabled: boolean) => {
  const sambotClientWithToken = await getSambotClientWithToken()
  const body: UpdateGlobalParameterRequest = {
    key: getValueByKey(key),
    value: isEnabled.toString(),
  }
  return await sambotClientWithToken.post(Endpoint.GLOBAL_PARAMETERS, body).then<boolean>((response) => response.data)
}

export { isGlobalParameterEnabled, updateGlobalParameter }
