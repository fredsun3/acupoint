# 人体穴位学习小程序设计指南

## 品牌定位

**应用名称**: 穴位通
**设计风格**: 中医传统文化 + 现代简约设计
**目标用户**: 中医学习者、针灸从业者、养生爱好者
**设计理念**: 传统中医智慧，现代科技呈现

## 配色方案

### 主色调
- **中医红**: `#C23B34`（对应 Tailwind: `text-[#C23B34]`, `bg-[#C23B34]`）
  - 用于强调、按钮、图标
  - 象征气血、生命力

### 辅助色
- **草药绿**: `#7CB342`（对应 Tailwind: `text-[#7CB342]`, `bg-[#7CB342]`）
  - 用于健康、成功、正面信息
- **艾灸金**: `#FFA000`（对应 Tailwind: `text-[#FFA000]`, `bg-[#FFA000]`）
  - 用于艾灸相关、特效标记

### 中性色
- **背景白**: `#FFFFFF`（对应 Tailwind: `bg-white`, `text-white`）
- **浅灰底**: `#F5F5F5`（对应 Tailwind: `bg-gray-50`）
- **文字主**: `#333333`（对应 Tailwind: `text-gray-900`）
- **文字辅**: `#666666`（对应 Tailwind: `text-gray-600`）
- **边框线**: `#E5E5E5`（对应 Tailwind: `border-gray-200`）

### 语义色
- **穴位激活**: `#FF5722`（橙色，对应 Tailwind: `text-[#FF5722]`）
- **针灸位置**: `#2196F3`（蓝色，对应 Tailwind: `text-[#2196F3]`）
- **艾灸位置**: `#FF9800`（橙黄，对应 Tailwind: `text-[#FF9800]`）

## 字体规范

| 层级 | 大小 | 字重 | 应用场景 |
|------|------|------|----------|
| H1 | text-2xl | font-bold | 页面标题 |
| H2 | text-xl | font-semibold | 区块标题 |
| H3 | text-lg | font-medium | 子标题 |
| Body | text-base | font-normal | 正文 |
| Small | text-sm | font-normal | 辅助文字 |
| Caption | text-xs | font-normal | 标签、备注 |

## 间距系统

- **页面边距**: `p-4` (16px)
- **卡片内边距**: `p-4` (16px)
- **组件间距**: `gap-4` (16px)
- **标题与内容间距**: `mb-2` (8px)
- **列表项间距**: `space-y-4` (16px)

## 组件使用原则

**核心原则**: 所有通用 UI 组件优先使用 `@/components/ui/*`，禁止用 `View/Text` 手搓通用组件。

### 必须优先使用的 UI 组件

| 功能 | 组件 | 说明 |
|------|------|------|
| 按钮 | `Button` | 所有操作按钮，不手搓 |
| 输入框 | `Input` | 搜索、表单输入，不手搓 |
| 卡片 | `Card` | 信息容器，穴位卡片 |
| 标签 | `Badge` | 穴位分类、状态标识 |
| 弹窗 | `Dialog` | 穴位详情、分享弹窗 |
| 提示 | `Toast` | 操作反馈 |
| 折叠 | `Accordion` | 穴位分类展开 |
| 标签页 | `Tabs` | 穴位分类切换 |
| 加载态 | `Skeleton` | 列表加载占位 |

### 页面 UI 单元映射

**首页**:
- 分类入口 → `Card` + `Button`
- 搜索框 → `Input`
- 热门穴位 → `Card` + `Badge`

**穴位列表页**:
- 列表容器 → `Card` + `CardContent`
- 筛选器 → `Tabs`
- 加载态 → `Skeleton`

**穴位详情页**:
- 穴位图片 → `Image`
- 位置说明 → `Text` + `Badge`
- 功效介绍 → `Text`
- 针灸艾灸卡片 → `Card` + `Separator`
- 操作按钮 → `Button`
- 分享弹窗 → `Dialog`

**上传页**:
- 图片选择 → `Button`
- 图片预览 → `Image`
- 上传进度 → `Progress`

## 导航结构

### TabBar 配置

页面路由：
- 首页: `pages/index/index`
- 穴位库: `pages/acupoints/index`
- 我的: `pages/profile/index`

TabBar 图标（需使用 CLI 生成）:
```bash
npx taro-lucide-tabbar BookMap Activity User -c "#999999" -a "#C23B34" -o ./src/assets/tabbar -s 81
```

配置要点：
- iconPath/selectedIconPath 必须以 `./` 开头
- 选中颜色使用中医红 `#C23B34`
- 未选中颜色使用灰色 `#999999`

### 页面跳转规范
- 首页 → 穴位详情: `Taro.navigateTo({ url: '/pages/detail/index?id=xxx' })`
- TabBar 页面切换: `Taro.switchTab({ url: '/pages/xxx/index' })`
- 返回上一页: `Taro.navigateBack({ delta: 1 })`

## 容器样式原则

### 卡片容器
- 圆角: `rounded-xl`
- 阴影: `shadow-sm`
- 背景: `bg-white`
- 内边距: `p-4`

### 按钮
- 主按钮: `bg-[#C23B34] text-white rounded-lg`
- 次按钮: `bg-gray-100 text-gray-900 rounded-lg`
- 边框按钮: `border border-gray-200 rounded-lg`

## 跨端兼容性规范

### H5/小程序适配
- 平台检测: `const isMiniApp = [Taro.ENV_TYPE.WEAPP, Taro.ENV_TYPE.TT].includes(Taro.getEnv())`
- Text 垂直排列必须添加 `block` 类
- Input 必须用 View 包裹，样式放外层
- Fixed + Flex 必须使用 `style={{ position: 'fixed', display: 'flex' }}`

### 原生组件
- 相机、录音需平台检测 + H5 降级
- Image 使用 `lazyLoad` 优化性能
- 避免直接使用 Canvas、Video 等原生组件

## 性能优化

### 图片优化
- 所有穴位图片上传到 TOS 对象存储
- 使用 `lazyLoad` 懒加载
- 使用 `mode="aspectFill"` 适配容器
- 压缩图片大小（< 500KB）

### 列表优化
- 使用虚拟列表（VirtualList）
- 分页加载（每页 20 条）
- 骨架屏占位（Skeleton）

## 小程序约束

### 包体积控制
- 主包 ≤ 2MB
- 所有图片上传到 TOS 对象存储
- TabBar 图标仅可使用本地 PNG
- 避免引入大型第三方库

### 域名配置
- TOS 域名需在小程序后台配置
- 本地开发需开启「不校验合法域名」

## 内容规范

### 穴位信息展示
- 穴位名称: H2 + 加粗 + 中医红
- 穴位位置: Body + 图标辅助
- 功效介绍: Body + 分段展示
- 针灸艾灸: 卡片分隔 + 图标标识
- 注意事项: Alert 提示框

### 图片标注
- 穴位位置图: 必须标注穴位点
- 使用不同颜色标注针灸/艾灸位置
- 图片清晰度 ≥ 720p
