# 穴位图解学习 H5 版本快速开始

## 🚀 快速部署到本地服务器

### 前提条件

- 已安装 Node.js 18+
- 已安装 pnpm
- 后端服务已构建并启动

### 一键部署脚本

使用提供的部署脚本快速部署到本地服务器：

```bash
# 1. 确保后端服务正在运行
cd /workspace/projects/server
pnpm start:prod

# 2. 在另一个终端运行部署脚本
cd /workspace/projects
chmod +x deploy-h5.sh
./deploy-h5.sh
```

部署完成后，访问：`http://localhost/index.html`

## ☁️ 部署到云平台

### 1. Vercel 部署（推荐，免费）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署
cd /workspace/projects/dist-web
vercel --prod
```

**注意**：Vercel 部署后需要配置 API 代理：

1. 在 Vercel 项目设置中添加环境变量：`PROJECT_DOMAIN=https://your-api-domain.com`
2. 或在 `vercel.json` 中配置重写规则：
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://your-api-domain.com/api/:path*" }
  ]
}
```

### 2. Netlify 部署（推荐，免费）

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 部署
cd /workspace/projects/dist-web
netlify deploy --prod
```

**注意**：Netlify 部署后需要配置 API 代理：

创建 `netlify.toml` 文件：
```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-api-domain.com/api/:splat"
  status = 200
```

### 3. 阿里云 OSS + CDN 部署

```bash
# 安装阿里云 OSS 工具
npm install -g ali-oss

# 配置 ossutil
# 编辑 ~/.ossutilconfig

# 上传文件
cd /workspace/projects/dist-web
ossutil cp . oss://your-bucket-name/acupoints-h5/ -r -update

# 配置 CDN 加速
# 在阿里云 CDN 控制台添加 CDN 加速域名
```

### 4. 腾讯云 COS + CDN 部署

```bash
# 安装腾讯云 COS 工具
npm install -g coscmd

# 配置 coscmd
coscmd config -a <SecretId> -s <SecretKey> -b <BucketName> -r <Region>

# 上传文件
cd /workspace/projects/dist-web
coscmd upload -r . /acupoints-h5/

# 配置 CDN 加速
# 在腾讯云 CDN 控制台添加 CDN 加速域名
```

## 🌐 配置自定义域名

### 1. 购买域名

推荐域名注册商：
- 阿里云万网
- 腾讯云
- Cloudflare（提供免费 SSL）

### 2. 配置 DNS 解析

将域名解析到你的服务器 IP 或云平台提供的域名：

```
类型    主机记录    记录值        TTL
A       @          your-server-ip  600
A       www        your-server-ip  600
```

### 3. 配置 HTTPS

使用 Let's Encrypt 免费证书：

```bash
# 安装 certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

## 📱 在微信中访问

### 方法一：直接分享链接

1. 部署成功后，获取 H5 链接
2. 在微信聊天中直接发送链接
3. 点击链接即可打开

### 方法二：生成二维码

使用二维码生成工具将 H5 链接转换为二维码：

```bash
# 安装 qrcode 工具
npm install -g qrcode

# 生成二维码
qrcode "https://your-domain.com/index.html" > qrcode.png
```

### 方法三：微信公众号菜单

1. 登录微信公众平台
2. 进入"自定义菜单" → "菜单管理"
3. 添加菜单项，选择"跳转网页"
4. 填入 H5 链接
5. 保存并发布

## 🎨 自定义配置

### 修改应用标题

编辑 `dist-web/index.html`：

```html
<title>你的应用名称</title>
<meta name="description" content="应用描述">
<meta name="keywords" content="关键词1,关键词2,关键词3">
```

### 修改主题色

项目使用 Tailwind CSS，主题色定义在 `src/app.css` 中：

```css
:root {
  --primary: #C23B34;  /* 主色：朱砂红 */
  --background: #FFF5F5;  /* 背景色 */
}
```

修改后需要重新构建 H5：

```bash
pnpm build:web
```

### 配置 API 域名

在构建时设置环境变量：

```bash
export PROJECT_DOMAIN=https://your-api-domain.com
pnpm build:web
```

或直接修改 JavaScript 代码中的 API 地址（不推荐）。

## 📊 性能优化

### 1. 启用 CDN

将静态资源部署到 CDN，加快访问速度：

- 图片、CSS、JS 文件
- 第三方库（vendors.js）

### 2. 启用 gzip 压缩

Nginx 已配置 gzip 压缩，可显著减少传输大小。

### 3. 启用浏览器缓存

静态资源已配置 7 天缓存：

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 7d;
    add_header Cache-Control "public, immutable";
}
```

### 4. 代码分割

项目已自动进行代码分割：
- `vendors.js` - 第三方库（403KB）
- `common.js` - 公共代码（14KB）
- `app.js` - 应用代码（20KB）

## 🔍 监控和分析

### 1. 添加网站分析

集成百度统计、Google Analytics 等：

```html
<!-- 在 index.html 中添加 -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?your-site-id";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

### 2. 错误监控

集成 Sentry 等错误监控服务：

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-dsn",
  environment: process.env.NODE_ENV,
});
```

## 🆘 常见问题

### Q: 如何更新 H5 版本？

```bash
# 1. 重新构建
cd /workspace/projects
pnpm build:web

# 2. 部署到服务器
./deploy-h5.sh

# 或使用云平台 CLI
vercel --prod  # Vercel
netlify deploy --prod  # Netlify
```

### Q: 如何查看访问日志？

```bash
# Nginx 日志
sudo tail -f /var/log/nginx/acupoints-h5-access.log
sudo tail -f /var/log/nginx/acupoints-h5-error.log

# 云平台日志
vercel logs  # Vercel
netlify logs  # Netlify
```

### Q: 如何备份？

```bash
# 备份部署目录
sudo tar -czf acupoints-h5-backup.tar.gz /var/www/html/acupoints-h5

# 备份 Nginx 配置
sudo cp /etc/nginx/sites-available/acupoints-h5 ./nginx-config-backup.conf
```

## 📚 相关文档

- [详细部署指南](./H5-DEPLOYMENT.md)
- [Nginx 配置文件](./nginx-config.conf)
- [Taro H5 文档](https://docs.taro.zone/docs/h5)
- [Nginx 文档](https://nginx.org/en/docs/)

## 📞 技术支持

如有问题，请：
1. 检查浏览器控制台错误信息
2. 查看 Nginx 日志
3. 检查后端服务状态
4. 参考详细部署文档

## 📄 许可证

本项目仅供学习和研究使用。
