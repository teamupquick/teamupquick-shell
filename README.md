# TeamUpQuick Shell

TeamUpQuick 微前端架構的 Shell 應用，負責整合所有微前端模組，提供統一的入口和導航。

## 功能

- 集成所有微前端模組
- 提供統一的路由管理
- 提供全局狀態和上下文
- 管理用戶認證和權限

## 開發

### 安裝依賴

```bash
npm install
```

### 啟動開發服務器

```bash
npm start
```

### 構建生產版本

```bash
npm run build
```

## 微前端集成

Shell 應用使用 Webpack Module Federation 集成其他微前端模組。在 `webpack.common.js` 文件中配置遠程模組：

```javascript
// 在 ModuleFederationPlugin 中
remotes: {
  auth: "auth@http://localhost:3001/remoteEntry.js",
  project: "project@http://localhost:3002/remoteEntry.js",
  // ...其他模組
}
```

## 部署

Shell 應用可以單獨部署到 AWS S3，通過 CloudFront 提供全球訪問。 