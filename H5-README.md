# 穴位图解学习小程序 - H5 版本部署完成

## ✅ 部署状态

H5 版本已成功构建并准备就绪！

### 📦 构建信息

- **构建时间**: 2025-04-24
- **构建类型**: H5 (Web)
- **输出目录**: `/workspace/projects/dist-web`
- **总大小**: 584KB
- **文件数量**: 18 个文件
- **路由模式**: Hash 模式（适合部署）
- **公共路径**: 相对路径（./）

### 📁 文件结构

```
dist-web/
├── index.html          (2.3KB) - 入口文件
├── css/
│   ├── vendors.css     (8.38KB) - 第三方库样式
│   └── index.css       (55.40KB) - 应用样式
├── js/
│   ├── vendors.js      (403.49KB) - 第三方库（React、Taro等）
│   ├── common.js       (14.07KB) - 公共代码
│   └── app.js          (20.35KB) - 应用代码
└── static/
    └── images/
        ├── house.png               (1.11KB) - 首页图标
        ├── house-active.png        (1.20KB) - 首页选中图标
        ├── activity.png            (1.37KB) - 穴位库图标
        ├── activity-active.png     (1.48KB) - 穴位库选中图标
        ├── user.png                (1.36KB) - 我的图标
        └── user-active.png         (1.47KB) - 我的选中图标
```

## 🚀 部署方式

### 方式一：一键部署到本地服务器（推荐用于测试）

```bash
cd /workspace/projects
./deploy-h5.sh
```

**前提条件**：
- 后端服务已启动（`cd server && pnpm start:prod`）
- 已安装 Nginx

**部署后访问**: `http://localhost/index.html`

### 方式二：部署到 Vercel（免费云托管）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
cd /workspace/projects/dist-web
vercel --prod
```

**详细说明**: 请查看 [H5-QUICKSTART.md](./H5-QUICKSTART.md)

### 方式三：部署到 Netlify（免费云托管）

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
cd /workspace/projects/dist-web
netlify deploy --prod
```

**详细说明**: 请查看 [H5-QUICKSTART.md](./H5-QUICKSTART.md)

### 方式四：部署到阿里云/腾讯云 OSS + CDN

适合国内用户，访问速度快，稳定可靠。

**详细说明**: 请查看 [H5-DEPLOYMENT.md](./H5-DEPLOYMENT.md)

### 方式五：部署到自己的服务器

使用提供的 Nginx 配置文件：

```bash
# 1. 复制文件到服务器
scp -r /workspace/projects/dist-web/* user@your-server:/var/www/html/acupoints-h5/

# 2. 复制 Nginx 配置
scp /workspace/projects/nginx-config.conf user@your-server:/etc/nginx/sites-available/acupoints-h5

# 3. 启用站点并重启 Nginx
ssh user@your-server
sudo ln -s /etc/nginx/sites-available/acupoints-h5 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**详细说明**: 请查看 [H5-DEPLOYMENT.md](./H5-DEPLOYMENT.md)

## 📱 在微信中访问

### 快速开始

1. **部署 H5 版本**（选择上述任一方式）
2. **获取访问链接**，例如：`https://your-domain.com/index.html`
3. **在微信中发送链接**或**生成二维码**
4. **点击链接即可在微信中打开**

### 微信公众号集成

如果需要将 H5 集成到微信公众号：

1. 登录微信公众平台
2. 进入"自定义菜单"
3. 添加菜单项，选择"跳转网页"
4. 填入 H5 链接
5. 保存并发布

### 微信分享优化

为了让分享更美观，可以集成微信 JS-SDK 实现自定义分享卡片：

```javascript
// 参考 H5-DEPLOYMENT.md 中的说明
```

## 🔧 配置说明

### API 域名配置

H5 版本需要配置后端 API 域名才能正常工作：

#### 方法一：通过环境变量配置（推荐）

```bash
export PROJECT_DOMAIN=https://your-api-domain.com
pnpm build:web
```

#### 方法二：通过 Nginx 反向代理（已配置）

在 `nginx-config.conf` 中已配置了 API 代理：

```nginx
location /api/ {
    proxy_pass http://localhost:3000/api/;
    ...
}
```

#### 方法三：在云平台配置重写规则

参考 `H5-QUICKSTART.md` 中的云平台配置说明。

### HTTPS 配置

微信要求必须使用 HTTPS 协议：

```bash
# 使用 Let's Encrypt 免费证书
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📚 相关文档

- **[H5-QUICKSTART.md](./H5-QUICKSTART.md)** - 快速开始指南，包含各种云平台的部署方法
- **[H5-DEPLOYMENT.md](./H5-DEPLOYMENT.md)** - 详细部署指南，包含完整配置说明
- **[nginx-config.conf](./nginx-config.conf)** - Nginx 配置文件（包含 HTTP 和 HTTPS）
- **[deploy-h5.sh](./deploy-h5.sh)** - 一键部署脚本（本地服务器）

## 🎨 应用特性

- ✅ 52个人体穴位详细图解
- ✅ 穴位分类筛选（头面颈、躯干、四肢）
- ✅ 穴位搜索功能
- ✅ 穴位详情页面
- ✅ 图片自由缩放功能（50% - 300%）
- ✅ 图片上传功能
- ✅ 响应式设计，适配各种屏幕
- ✅ 支持微信浏览器访问
- ✅ 朱砂红主题，中医风格
- ✅ 压缩优化，体积小（584KB）

## 🌐 域名要求

### 必须条件

- ✅ 必须使用 **HTTPS** 协议
- ✅ 域名需要在微信公众平台配置（如需使用微信支付等功能）
- ✅ 后端 API 必须可访问

### 推荐配置

- 前端域名：`https://your-domain.com`
- 后端域名：`https://your-api-domain.com`（或通过反向代理）
- CDN 加速：配置静态资源 CDN

## 🐛 常见问题

### Q1: 访问 H5 时白屏？

**解决方案**：
1. 打开浏览器控制台，查看错误信息
2. 检查 API 请求是否正常
3. 确保所有静态资源都能加载
4. 检查 HTTPS 证书是否有效

### Q2: API 请求失败？

**解决方案**：
1. 检查后端服务是否正常运行
2. 检查 API 域名配置是否正确
3. 检查跨域配置是否正确
4. 检查网络请求返回的错误信息

### Q3: 图片无法加载？

**解决方案**：
1. 检查图片 URL 是否有效
2. 检查对象存储配置是否正确
3. 检查浏览器控制台的错误信息
4. 确保图片格式支持（PNG、JPG、SVG）

### Q4: 在微信中样式错乱？

**解决方案**：
1. 确保使用 HTTPS 协议
2. 检查微信浏览器的兼容性
3. 清除微信浏览器缓存
4. 检查是否有样式被拦截

### Q5: 如何更新 H5 版本？

**解决方案**：
```bash
# 1. 重新构建
cd /workspace/projects
pnpm build:web

# 2. 部署更新
./deploy-h5.sh
# 或
vercel --prod
# 或
netlify deploy --prod
```

## 📊 性能指标

### 构建结果

- **vendors.js**: 403KB (gzip: 131KB) - 第三方库
- **app.js**: 20KB (gzip: 7KB) - 应用代码
- **CSS**: 55KB (gzip: 9KB) - 样式文件
- **总大小**: 584KB
- **Gzip 后**: 约 147KB

### 加载时间（预估）

- **4G 网络**: 约 2-3 秒
- **WiFi 网络**: 约 0.5-1 秒
- **首次加载**: 加载 vendors.js + app.js + CSS
- **二次访问**: 利用浏览器缓存，约 0.5 秒

## 🎯 下一步

1. ✅ 选择部署方式（本地/云平台）
2. ✅ 部署 H5 版本
3. ✅ 配置域名和 HTTPS
4. ✅ 配置 API 域名
5. ✅ 在微信中测试访问
6. ✅ 分享给用户使用

## 📞 技术支持

如有问题，请：
1. 查看浏览器控制台错误信息
2. 查看 Nginx 日志：`/var/log/nginx/acupoints-h5-error.log`
3. 查看后端服务日志
4. 参考详细部署文档

## 📄 许可证

本项目仅供学习和研究使用。

---

**祝您使用愉快！🎉**
