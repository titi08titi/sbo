import { DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

export interface KeycloakJwtPayload extends JwtPayload {
  realm_access: RealmAccess
  resource_access: ResourceAccess
}

type RealmAccess = {
  roles: string[]
}

type OidcStockAccountingMachineSamSambotUiPub = {
  roles: string[]
}

type ResourceAccess = {
  'oidc_stock-accounting-machine_sam-sambot-ui_pub': OidcStockAccountingMachineSamSambotUiPub
}

interface IUser extends DefaultUser {
  roles?: string[]
}

declare module 'next-auth' {
  type User = IUser
  interface Session {
    user?: User
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id_token: string
    user: IUser
  }
}
