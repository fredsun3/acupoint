# 穴位图解学习 H5 版本部署指南

## 📱 项目简介

穴位图解学习小程序 H5 版本，提供52个人体穴位的详细图解、位置说明、功能功效和艾灸疗法指导。可在微信中直接访问，无需安装小程序。

## 🚀 部署步骤

### 一、构建后端服务

后端服务使用 NestJS 框架，提供穴位数据查询、搜索和图片上传功能。

```bash
# 1. 进入后端目录
cd /workspace/projects/server

# 2. 安装依赖
pnpm install

# 3. 配置环境变量
# 创建 .env 文件，配置以下变量：
# COZE_BUCKET=your-bucket-name
# COZE_ACCESS_KEY=your-access-key
# COZE_SECRET_KEY=your-secret-key
# COZE_ENDPOINT=your-endpoint

# 4. 构建后端
pnpm build

# 5. 启动后端服务
pnpm start:prod
```

后端服务默认运行在 `http://localhost:3000`

### 二、部署 H5 前端

H5 前端已构建完成，位于 `/workspace/projects/dist-web` 目录。

#### 方式一：部署到静态网站托管服务（推荐）

1. **Vercel 部署**：
```bash
# 安装 Vercel CLI
npm i -g vercel

# 在 dist-web 目录下部署
cd /workspace/projects/dist-web
vercel
```

2. **Netlify 部署**：
```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
cd /workspace/projects/dist-web
netlify deploy --prod
```

3. **阿里云 OSS + CDN**：
```bash
# 上传到 OSS
ossutil cp dist-web oss://your-bucket-name/acupoints-h5/ -r

# 配置 CDN 加速
```

#### 方式二：部署到自己的服务器

```bash
# 1. 使用 Nginx 部署
# 安装 Nginx
apt install nginx

# 2. 复制文件到 Nginx 目录
cp -r /workspace/projects/dist-web/* /var/www/html/acupoints-h5/

# 3. 配置 Nginx
cat > /etc/nginx/sites-available/acupoints-h5 << 'EOF'
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html/acupoints-h5;
    index index.html;

    # 配置反向代理到后端 API
    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # SPA 路由配置
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# 4. 启用站点
ln -s /etc/nginx/sites-available/acupoints-h5 /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 三、配置 API 域名

由于 H5 使用 hash 路由模式，需要配置正确的后端 API 域名：

#### 方法一：通过环境变量配置（推荐）

在构建时设置 `PROJECT_DOMAIN` 环境变量：

```bash
cd /workspace/projects
export PROJECT_DOMAIN=https://your-api-domain.com
pnpm build:web
```

#### 方法二：通过 Nginx 反向代理（已在上方配置）

Nginx 会自动将 `/api` 请求代理到后端服务。

#### 方法三：直接修改 JavaScript 代码

在 `dist-web/js/app.f5cb298f.js` 中查找并替换 API 域名（不推荐，维护困难）。

## 📱 在微信中访问

### 方法一：直接分享链接

1. 部署成功后，获取 H5 链接，例如：`https://your-domain.com/index.html`
2. 在微信中直接发送这个链接
3. 点击链接即可在微信中打开

### 方法二：微信公众号菜单

1. 登录微信公众号后台
2. 进入"自定义菜单"
3. 添加菜单项，选择"跳转网页"
4. 填入 H5 链接
5. 保存并发布菜单

### 方法三：微信分享卡片

在 H5 中集成微信 JS-SDK，实现自定义分享卡片：

```javascript
// 引入微信 JS-SDK
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>

// 配置分享信息
wx.config({
  appId: 'your-appid',
  timestamp: timestamp,
  nonceStr: nonceStr,
  signature: signature,
  jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
});

wx.ready(function () {
  wx.updateAppMessageShareData({
    title: '穴位图解学习',
    desc: '52个人体穴位图解，学习中医养生知识',
    link: window.location.href,
    imgUrl: 'https://your-domain.com/static/images/share-icon.jpg'
  });
});
```

## 🔧 配置说明

### 构建配置

- **输出目录**：`dist-web`
- **路由模式**：`hash`（使用 hash 路由，有利于 SEO 和部署）
- **公共路径**：`./`（相对路径，便于部署）
- **设计宽度**：750px

### 功能特性

- ✅ 穴位列表展示（52个穴位）
- ✅ 穴位分类筛选（头面颈、躯干、四肢）
- ✅ 穴位搜索功能
- ✅ 穴位详情页面
- ✅ 图片自由缩放功能
- ✅ 图片上传功能
- ✅ 响应式设计，适配各种屏幕
- ✅ 支持微信浏览器访问

## 📦 文件结构

```
dist-web/
├── index.html          # 入口 HTML 文件
├── css/
│   ├── vendors.css     # 第三方库样式
│   └── index.css       # 应用样式
├── js/
│   ├── vendors.js      # 第三方库（403KB，包含 React、Taro 等）
│   ├── common.js       # 公共代码
│   └── app.js          # 应用代码
└── static/
    └── images/
        ├── house.png               # TabBar 图标
        ├── house-active.png
        ├── activity.png
        ├── activity-active.png
        ├── user.png
        └── user-active.png
```

## 🌐 域名配置

### 域名要求

1. 前端域名：`https://your-domain.com`（任意域名）
2. 后端域名：`https://your-api-domain.com`（或通过 Nginx 反向代理）

### 微信域名白名单

如果需要使用微信支付、分享等功能，需要在微信公众平台配置域名白名单：

1. 登录微信公众平台
2. 进入"开发" → "接口权限" → "网页授权"
3. 添加你的域名到授权回调域名

### HTTPS 配置

微信要求必须使用 HTTPS 协议：

```bash
# 使用 Let's Encrypt 免费证书
apt install certbot python3-certbot-nginx

# 获取证书
certbot --nginx -d your-domain.com

# 自动续期
certbot renew --dry-run
```

## 🎨 主题配色

- **主色**：朱砂红 `#C23B34`
- **背景色**：`#FFF5F5`
- **文字色**：`#333333`
- **边框色**：`#E5E5E5`

## 🐛 常见问题

### Q1: 访问 H5 时白屏？
- 检查浏览器控制台是否有 JavaScript 错误
- 检查 API 接口是否正常返回数据
- 确保所有静态资源（CSS、JS、图片）都能正常加载

### Q2: API 请求失败？
- 检查后端服务是否正常运行
- 检查 API 域名配置是否正确
- 检查跨域配置是否正确

### Q3: 图片无法加载？
- 检查图片 URL 是否有效
- 检查对象存储配置是否正确
- 检查浏览器控制台的错误信息

### Q4: 在微信中样式错乱？
- 确保使用 HTTPS 协议
- 检查微信浏览器的兼容性
- 检查是否有样式被微信浏览器拦截

## 📞 技术支持

如有问题，请检查：
1. 浏览器控制台的错误信息
2. 后端服务日志
3. 网络请求返回结果

## 📄 许可证

本项目仅供学习和研究使用。
