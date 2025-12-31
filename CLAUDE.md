# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Vue 3 + Vite 5 + TypeScript 的后台管理系统模板，使用 pnpm monorepo + Turbo 进行多包管理。项目提供了完整的后台管理系统功能，包括权限管理、主题切换、国际化、图表集成等。

## 常用命令

### 开发与构建

```bash
# 安装依赖
pnpm install

# 启动开发服务器 (Ant Design Vue 版本)
pnpm dev:antd

# 构建生产版本
pnpm build

# 构建指定应用
pnpm build:antd

# 预览构建结果
pnpm preview
```

### 代码质量检查

```bash
# 运行所有检查（循环依赖、依赖检查、类型检查、拼写检查）
pnpm check

# 代码格式化
pnpm format

# 代码检查
pnpm lint

# 类型检查
pnpm check:type

# 单元测试
pnpm test:unit
```

### 工具命令

```bash
# 清理所有构建产物和 node_modules
pnpm clean

# 完全重新安装
pnpm reinstall

# 更新依赖
pnpm update:deps

# 提交代码 (使用 czg 交互式提交)
pnpm commit
```

## 项目架构

### Monorepo 结构

项目采用 **pnpm workspace + Turbo** 进行 monorepo 管理：

- **internal/**: 内部工具包
  - `vite-config`: Vite 统一配置
  - `node-utils`: Node.js 工具函数
  - `lint-configs`: ESLint/Prettier/Stylelint 共享配置
  - `tailwind-config`: Tailwind CSS 共享配置

- **apps/**: 应用程序
  - `web-antd`: 基于 Ant Design Vue 的主应用

- **packages/@core/**: 核心基础包
  - `base/shared`: 共享工具函数和状态管理
  - `base/typings`: TypeScript 类型定义
  - `base/design`: 设计令牌和全局样式
  - `base/icons`: 图标组件
  - `preferences`: 偏好设置管理
  - `ui-kit/*`: UI 组件库（form-ui、menu-ui、popup-ui、shadcn-ui、tabs-ui）
  - `forward`: 组件转发层

- **packages/effects/**: 功能效果包
  - `access`: 权限控制和指令
  - `common-ui`: 通用 UI 组件
  - `hooks`: Vue 组合式函数
  - `layouts`: 布局组件
  - `plugins`: 插件（echarts、vxe-table、motion）
  - `request`: HTTP 请求客户端

- **packages/**: 其他功能包
  - `constants`: 常量定义
  - `locales`: 国际化语言包
  - `stores`: Pinia 状态管理
  - `styles`: 样式文件
  - `types`: 类型定义
  - `utils`: 工具函数
  - `icons`: 图标

### 应用层架构（apps/web-antd）

应用层的核心初始化流程：

1. **main.ts**: 应用入口
   - 初始化偏好设置 (`initPreferences`)
   - 启动引导 (`bootstrap`)

2. **bootstrap.ts**: 引导流程
   - 初始化组件适配器 (`initComponentAdapter`)
   - 初始化表单组件 (`initSetupVbenForm`)
   - 设置国际化 (`setupI18n`)
   - 初始化 Pinia stores (`initStores`)
   - 注册权限指令 (`registerAccessDirective`)
   - 配置路由和插件

3. **router/**: 路由配置
   - `routes/core.ts`: 核心路由（登录、404等）
   - `routes/modules/`: 动态路由模块（按功能划分）
   - `guard/`: 路由守卫（权限验证）

4. **adapter/**: 组件适配器
   - `component/`: UI 组件适配（Ant Design Vue）
   - `form/`: 表单组件适配
   - `vxe-table.ts`: VXE Table 适配

5. **api/**: API 接口
   - `request/`: 基于 axios 的请求客户端配置
   - 按业务模块划分的 API 文件

6. **store/**: 应用状态
   - `auth.ts`: 认证状态（登录、登出）
   - `dict.ts`: 字典数据
   - `index.ts`: Store 导出

### 路由系统

项目采用 **动态路由 + 权限控制** 的设计：

- **核心路由 (`coreRoutes`)**: 无需权限验证的路由（登录页、404等）
- **动态路由 (`dynamicRoutes`)**: 从 `routes/modules/` 自动导入，需要权限验证
- **静态路由 (`staticRoutes`)**: 始终显示在菜单的路由
- **外部路由 (`externalRoutes`)**: 不需要 Layout 的内嵌页面

路由模块定义在 `apps/web-antd/src/router/routes/modules/*.ts`，每个文件导出一个 `RouteRecordRaw[]` 数组。

### 权限系统

- **权限存储**: `@vben/stores` 的 `useAccessStore`
- **权限指令**: `v-access` 指令用于按钮级权限控制
- **权限守卫**: 路由守卫进行页面级权限验证
- **访问码**: 通过 `getAccessCodesApi` 获取用户权限码

### 偏好设置系统

使用 `@vben/preferences` 管理应用偏好：

- **命名空间**: 基于 `VITE_APP_NAMESPACE`、版本和环境隔离
- **配置覆盖**: `apps/web-antd/src/preferences.ts` 定义应用级覆盖
- **响应式**: 使用 `usePreferences()` 获取响应式偏好值

支持的布局模式：

- `sidebar-nav`: 侧边导航
- `sidebar-mixed-nav`: 侧边混合导航
- `header-nav`: 头部导航
- `header-mixed-nav`: 头部混合导航
- `header-sidebar-nav`: 顶部通栏 + 侧边导航
- `full-content`: 全屏内容

### UI 组件适配

项目支持多 UI 库适配，通过适配器模式：

- **Shadcn UI**: 基础组件库（内部使用）
- **Ant Design Vue**: 主应用 UI 库
- **组件映射**: `COMPONENT_MAP` 定义组件映射关系
- **表单系统**: 统一的表单配置和验证

适配器位于 `apps/web-antd/src/adapter/`，通过 `globalShareState` 注册组件。

## 关键约定

### 导入路径别名

- `#/*`: 应用内部导入（`apps/web-antd/src/*`）
- `@vben/*`: 包导入（`packages/*`）
- `@vben-core/*`: 核心包导入（`packages/@core/*`）

### 目录结构约定

- `views/`: 页面组件
- `router/routes/modules/`: 路由模块
- `api/`: API 接口
- `store/`: 应用级状态
- `adapter/`: UI 组件适配器
- `locales/`: 语言包

### 类型定义

- 全局类型定义在 `packages/@core/base/typings/src/`
- 应用特定类型在 `apps/web-antd/src/types/`
- API 类型定义在对应的 API 文件中

### 国际化

- 语言包位于 `packages/locales/src/langs/`
- 使用 `$t()` 函数进行翻译
- 支持的语言：zh-CN、en-US

## 开发注意事项

### 添加新页面

1. 在 `apps/web-antd/src/views/` 创建页面组件
2. 在 `router/routes/modules/` 创建路由模块
3. 如需权限控制，配置路由 meta 权限信息
4. 在 `api/` 添加对应的 API 接口

### 添加新 API

1. 在 `apps/web-antd/src/api/` 创建 API 文件
2. 使用 `requestClient` 发起请求
3. 定义 TypeScript 类型
4. 在 `helper.ts` 中处理通用响应逻辑（401、消息提示等）

### 修改主题配置

1. 修改 `apps/web-antd/src/preferences.ts` 覆盖默认偏好
2. 或修改 `packages/@core/preferences/src/config.ts` 修改全局默认值

### 调试技巧

- 使用 Vue Devtools 查看组件和状态
- 查看 Network 面板调试 API 请求
- 修改 `vite.config.mts` 中的 proxy 配置调试后端接口
