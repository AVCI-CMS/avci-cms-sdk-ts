# AVCI CMS TypeScript / JavaScript SDK (`avcicms`)

Official TypeScript & JavaScript SDK for AVCI CMS REST APIs using the `x-avcicms-*` header standard.

## Installation

```bash
npm install avcicms
```

## Quick Start

### Browser / Mobile (Publishable Key)

```ts
import { AvciCMS } from 'avcicms';

const cms = new AvciCMS({
  clientId: process.env.NEXT_PUBLIC_AVCICMS_CLIENT_ID!,
  apiKey: process.env.NEXT_PUBLIC_AVCICMS_PUBLIC_KEY!, // pk_live_...
  language: 'tr',
});

const { data: posts } = await cms.content.findMany('blog');
const { data: menus } = await cms.workspace.getMenus();
```

### Server / SSR / Cron (Secret Key)

```ts
import { AvciCMS } from 'avcicms';

const cms = new AvciCMS({
  clientId: process.env.NEXT_PUBLIC_AVCICMS_CLIENT_ID!,
  secretKey: process.env.AVCICMS_SECRET_KEY!, // sk_live_... (sent via x-avcicms-secret-key)
});

const { data: settings } = await cms.workspace.getSettings();
```

## Headers Managed Automatically

- `x-avcicms-client` — Workspace public UUID (`clientId`)
- `x-avcicms-api-key` — Publishable key (`apiKey`, `pk_live_...`)
- `x-avcicms-secret-key` — Server-only secret key (`secretKey`, `sk_live_...`)
- `x-avcicms-language` — Content language override (`language`)
- `Authorization` — Optional end-user JWT (`accessToken`)
