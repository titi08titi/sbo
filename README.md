# Veepee SAM Backoffice
Backoffice of SAM named Sambot

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## SSO

If you need to setup the SSO you first needs to:

* Go to `http://localhost/`. This url is whitelisted by SSO, if changed you need to open a [ticket on SSO](https://git.vptech.eu/veepee/foundation/products/platform-services/services/authentication/client-samples/-/issues) to add it to the whitelist.

* Login with your SSO credentials, ask for permissions at [#prd-sam-dev](Slack).

Deployed versions can be accessed at:
* Preprod: https://sambot-ui-preprod.checkout.vptech.eu/
* Prod: https://sambot-ui.vptech.eu/

## Core libraries
* React
* Next-js
* MUI & concrete-ui
* TailwindCss
* React-Query
* Jest
* Prop Types
* ESLint
* Keycloak
* React Testing Library

## Running
To start development server:

```bash
git clone https://git.vptech.eu/veepee/stock/products/sam/backoffices/sambot-ui.git

cd sambot-ui

yarn install

copy  .env.local.example .env.local 

yarn run dev
```

## Production
This project has a canary for promoting to Production. Before promoting check that the canary has built and there are enough healthy instances in Nomad.

## Architecture
The app is built using a Model View ViewModel pattern following a SOC principle in which business logic is handled by models.

```
sambot-ui
├── components
├── core
├── hooks
├── middlewares
├── modules
├── pages
├── styles
└── utils
```

### Authentication
For authentication SSO credentials are required and handled with [Next.js Auth].

### Data fetching
For fetching remote data, this project uses [Axios](https://github.com/axios/axios) + [React-Query](https://github.com/TanStack/query) as for fetching and data management.

All endpoints paths are located inside `/utils/constants.ts`

### Testing
For testing [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Jest](https://jestjs.io/).

### Renovate
[renovate](https://docs.renovatebot.com) is already pre-configured, do not forget to keep the `renovate.json` file up to date. To enable it on your project invite `@svc_renovate_bot` with the developer role.

## Tips
### Lint your code
```
npm run lint -- --fix
```

### SSR example page
```
import { NextPage } from 'next/types'

import { withMainLayoutPage } from '#components/layouts/MainLayout'
import withSSRProps from '#middlewares/SSR/withSSRProps'
import { About } from '#modules/about'
import { AboutProps } from '#modules/about/about'

const AboutPage: NextPage = (props: AboutProps) => {
  return <About query={props.query} queryResult={props.queryResult} />
}

export const getServerSideProps = withSSRProps<AboutProps>(async (ctx) => {
  const { query } = ctx
  if (!query.text) {
    return {
      props: {
        queryResult: null,
        query: null,
      },
    }
  }
  const rawResult = await fetch('https://reqres.in/api/users/1', { cache: 'force-cache' })
  const result = await rawResult.json()
  return {
    props: {
      queryResult: result,
      query: query.text,
    },
  }
})

export default withMainLayoutPage(AboutPage, () => ({
  title: 'About',
}))
```
