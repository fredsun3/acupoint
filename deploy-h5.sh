#!/bin/bash

# 穴位图解学习 H5 版本本地部署脚本
# 用于在本地快速测试 H5 版本

set -e

echo "=================================="
echo "  穴位图解学习 H5 版本部署脚本"
echo "=================================="
echo ""

# 检查是否安装了 Nginx
if ! command -v nginx &> /dev/null; then
    echo "❌ 未检测到 Nginx，正在安装..."
    if [ -f /etc/debian_version ]; then
        sudo apt update
        sudo apt install -y nginx
    elif [ -f /etc/redhat-release ]; then
        sudo yum install -y nginx
    else
        echo "❌ 无法识别您的操作系统，请手动安装 Nginx"
        exit 1
    fi
    echo "✅ Nginx 安装完成"
else
    echo "✅ 已安装 Nginx"
fi

# 检查后端服务是否运行
if ! curl -s http://localhost:3000/api/acupoints > /dev/null; then
    echo "⚠️  后端服务未运行，请先启动后端服务"
    echo "   启动命令: cd server && pnpm start:prod"
    read -p "是否继续部署？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 设置变量
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DEPLOY_DIR="/var/www/html/acupoints-h5"
NGINX_CONF_DIR="/etc/nginx/sites-available"

# 备份现有的部署
if [ -d "$DEPLOY_DIR" ]; then
    echo "📦 备份现有部署..."
    sudo mv "$DEPLOY_DIR" "${DEPLOY_DIR}.backup.$(date +%Y%m%d_%H%M%S)"
fi

# 创建部署目录
echo "📁 创建部署目录..."
sudo mkdir -p "$DEPLOY_DIR"

# 复制 H5 文件
echo "📋 复制 H5 文件..."
sudo cp -r "$SCRIPT_DIR/dist-web"/* "$DEPLOY_DIR/"

# 设置权限
echo "🔐 设置文件权限..."
sudo chown -R www-data:www-data "$DEPLOY_DIR"
sudo chmod -R 755 "$DEPLOY_DIR"

# 复制 Nginx 配置
echo "⚙️  配置 Nginx..."
sudo cp "$SCRIPT_DIR/nginx-config.conf" "$NGINX_CONF_DIR/acupoints-h5"

# 启用站点
if [ -d "/etc/nginx/sites-enabled" ]; then
    echo "🔗 启用站点..."
    sudo ln -sf "$NGINX_CONF_DIR/acupoints-h5" /etc/nginx/sites-enabled/acupoints-h5
fi

# 测试 Nginx 配置
echo "🧪 测试 Nginx 配置..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx 配置测试通过"
    echo "🔄 重启 Nginx..."
    sudo systemctl reload nginx
else
    echo "❌ Nginx 配置测试失败，请检查配置"
    exit 1
fi

echo ""
echo "=================================="
echo "  🎉 部署完成！"
echo "=================================="
echo ""
echo "📍 H5 访问地址:"
echo "   http://localhost/index.html"
echo ""
echo "📖 如果有域名，请修改 Nginx 配置文件中的 server_name"
echo "   配置文件: $NGINX_CONF_DIR/acupoints-h5"
echo ""
echo "🔧 后续步骤:"
echo "   1. 如果有域名，配置域名解析"
echo "   2. 配置 HTTPS 证书（推荐使用 Let's Encrypt）"
echo "   3. 在微信中测试访问"
echo ""
echo "📚 详细部署文档请查看: $SCRIPT_DIR/H5-DEPLOYMENT.md"
echo ""
