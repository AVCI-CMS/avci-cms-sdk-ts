# AVCI CMS TypeScript SDK

The official TypeScript SDK for AVCI CMS. It provides a 100% type-safe, lightweight, and modern interface to interact with your AVCI CMS project.

## 🚀 Getting Started

**Important:** Before using the SDK, you must create an account and a project on the [AVCI CMS App](https://app.avcicms.com). Once your project is created, you will be able to generate your `API Key` and `Project ID`.

### Installation

```bash
npm install avcicms
```

### Usage

```typescript
import { AvciCMS } from 'avcicms';

const cms = new AvciCMS({
  apiKey: 'YOUR_API_KEY',
  projectId: 'YOUR_PROJECT_ID',
});

// Example: Fetch posts
async function fetchPosts() {
  const posts = await cms.content.findMany('posts');
  console.log(posts);
}
```

## Features
- 100% Type-Safe (generated via OpenAPI)
- Built on `openapi-fetch` (Lightweight and fast)
- Support for Node.js and Browser environments

## Resources
- **Documentation & Guides:** https://doc.avcicms.com
- **Official Website:** https://avcicms.com
- **Help Center:** https://avcicms.com/resources/help-center
