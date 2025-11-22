# NPM Setup Guide for Corporate Networks

## Problem
You're getting a `403 Forbidden` error when trying to install npm packages on a corporate network.

## Solutions (Try in Order)

### Solution 1: Configure Corporate Proxy

If your company uses a proxy server, you need to configure npm to use it.

1. **Find your proxy settings:**
   - Check your browser's proxy settings (Settings → Network → Proxy)
   - Or ask your IT department for the proxy server address and port
   - Common format: `http://proxy.company.com:8080`

2. **Update `.npmrc` file:**
   ```ini
   proxy=http://your-proxy-server:port
   https-proxy=http://your-proxy-server:port
   strict-ssl=false
   registry=https://registry.npmjs.org/
   ```

3. **If proxy requires authentication:**
   ```ini
   proxy=http://username:password@proxy.company.com:8080
   https-proxy=http://username:password@proxy.company.com:8080
   ```

### Solution 2: Use Alternative Registry Mirror

Try using a different npm registry that might bypass restrictions:

**Option A: Chinese Mirror (often accessible)**
```bash
npm config set registry https://registry.npmmirror.com/
```

**Option B: Update `.npmrc`:**
```ini
registry=https://registry.npmmirror.com/
```

### Solution 3: Disable SSL Verification (Temporary)

⚠️ **Warning:** Only use this if you trust your network. This reduces security.

Update `.npmrc`:
```ini
registry=https://registry.npmjs.org/
strict-ssl=false
```

### Solution 4: Use Corporate Internal Registry

If your company has an internal npm registry:

1. Get the registry URL from your IT department
2. Update `.npmrc`:
   ```ini
   registry=https://your-internal-registry-url/
   always-auth=true
   //your-internal-registry-url/:_authToken=YOUR_TOKEN_HERE
   ```

### Solution 5: Use Yarn or pnpm with Different Registry

If npm still doesn't work, try using Yarn or pnpm:

**Yarn:**
```bash
npm install -g yarn
yarn config set registry https://registry.npmmirror.com/
yarn install
```

**pnpm:**
```bash
npm install -g pnpm
pnpm config set registry https://registry.npmmirror.com/
pnpm install
```

## Quick Test Commands

After configuring, test with:
```bash
npm config list
npm ping
npm install --dry-run
```

## Common Corporate Network Issues

1. **403 Forbidden:** Usually means the registry is blocked or requires authentication
2. **SSL Certificate Errors:** Use `strict-ssl=false` (temporary workaround)
3. **Timeout Errors:** Increase retry settings in `.npmrc`
4. **Authentication Required:** Contact IT for registry credentials

## Next Steps

1. Try Solution 1 first (proxy configuration)
2. If that doesn't work, try Solution 2 (alternative registry)
3. Contact your IT department if you need:
   - Proxy server details
   - Internal npm registry URL
   - Authentication tokens
   - Whitelist requests for npmjs.org

