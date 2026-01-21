# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  extends: [
    // other configs...
    // Enable lint rules for React
    reactX.configs['recommended-typescript'],
    // Enable lint rules for React DOM
    reactDom.configs.recommended,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## 部署到 Vercel

- 构建：在项目根目录执行 `npm run build`，生成 `dist/`
- 路由：已在 `dist/vercel.json` 配置单页回退，支持 React Router 路由直达
- 非交互部署（需个人令牌）：
  - 在 PowerShell 设置令牌：`$env:VERCEL_TOKEN = "你的 Vercel Token"`
  - 执行部署：`npx vercel deploy dist --prod --yes --token $env:VERCEL_TOKEN`
- 交互部署（已登录 CLI）：`npx vercel deploy dist --prod --yes`
- 文档参考：Vercel CLI 部署说明 https://vercel.com/docs/deployments/overview

## 自动部署（GitHub Actions）

- 推送到 `main` 分支时自动部署到生产环境
- 在 GitHub 仓库 Settings → Secrets and variables → Actions 添加以下密钥：
  - `VERCEL_TOKEN`：你的 Vercel 个人访问令牌
  - `VERCEL_ORG_ID`：组织 ID（Vercel 控制台获取）
  - `VERCEL_PROJECT_ID`：项目 ID（Vercel 控制台获取）
- 工作流文件：`.github/workflows/vercel-deploy.yml`
- 手动触发部署：在 GitHub Actions 页面使用 `Run workflow`

## 接入“扣子编程”对话

- 复制 `.env.example` 为 `.env.local`，填写：
  - `VITE_KOUZI_ENDPOINT`：扣子服务的对话接口地址或 Webhook
  - `VITE_KOUZI_TOKEN`：访问令牌
  - `VITE_KOUZI_SESSION_ID`：会话标识（可选）
- 发送消息入口位于聊天页，代码调用位置：
  - [ChatRoom.tsx](file:///c:/shanliao/demo/src/pages/ChatRoom.tsx) 使用 `sendKouziMessage`
  - 连接器实现： [kouzi.ts](file:///c:/shanliao/demo/src/lib/kouzi.ts)
- 部署到 Vercel 后，通过环境变量注入同名键，前端将使用接口完成消息往返
