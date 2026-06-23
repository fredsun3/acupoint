# 推送穴位图解学习应用到 GitHub

## 当前状态

- ✅ 代码已提交到本地 Git 仓库
- ✅ 远程仓库已配置：https://github.com/fredsun3/acupoint.git
- ❌ 推送失败：需要 GitHub 认证

## 推送失败原因

GitHub 不再支持密码认证，需要使用以下方式之一：

1. **个人访问令牌（Personal Access Token）** - HTTPS 方式
2. **SSH 密钥** - SSH 方式

## 解决方案

### 方案一：使用个人访问令牌（推荐）

#### 步骤 1: 创建 GitHub Personal Access Token

1. 登录 GitHub：https://github.com
2. 点击右上角头像 → Settings
3. 左侧菜单最下方 → Developer settings
4. Personal access tokens → Tokens (classic)
5. 点击 "Generate new token (classic)"
6. 设置：
   - Note: "Coze Acupoint Push"
   - Expiration: 选择合适的时间（如 90 days）
   - Select scopes: 勾选 `repo`（完整仓库访问权限）
7. 点击 "Generate token"
8. **重要**: 复制生成的 token（只显示一次，请保存好）

#### 步骤 2: 使用 Token 推送

有两种方式使用 token：

**方式 A: 直接在 URL 中使用 token**
```bash
cd /workspace/projects

# 移除旧的远程仓库
git remote remove origin

# 使用 token 添加远程仓库（替换 YOUR_TOKEN）
git remote add origin https://YOUR_TOKEN@github.com/fredsun3/acupoint.git

# 推送代码
git push -u origin main
```

**方式 B: 使用 Git Credential Helper**
```bash
cd /workspace/projects

# 配置 credential helper
git config --global credential.helper store

# 推送（会提示输入用户名和密码）
# Username: 输入您的 GitHub 用户名
# Password: 输入您的 Personal Access Token
git push -u origin main
```

### 方案二：使用 SSH 密钥

#### 步骤 1: 生成 SSH 密钥

```bash
# 生成 SSH 密钥（使用您的邮箱）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 查看公钥
cat ~/.ssh/id_ed25519.pub
```

#### 步骤 2: 添加到 GitHub

1. 登录 GitHub：https://github.com
2. 点击右上角头像 → Settings
3. 左侧菜单 → SSH and GPG keys
4. 点击 "New SSH key"
5. Title: "Coze Development"
6. Key type: "Authentication Key"
7. Key: 粘贴公钥内容（从 `ssh-ed25519` 开始到邮箱结束）
8. 点击 "Add SSH key"

#### 步骤 3: 使用 SSH 推送

```bash
cd /workspace/projects

# 移除 HTTPS 远程仓库
git remote remove origin

# 添加 SSH 远程仓库
git remote add origin git@github.com:fredsun3/acupoint.git

# 推送代码
git push -u origin main
```

## 验证推送成功

推送成功后，访问仓库：
https://github.com/fredsun3/acupoint

应该能看到所有代码文件和提交历史。

## 需要执行的操作

**请选择一种方案后，执行以下命令：**

### 如果选择方案一（Token）：

```bash
cd /workspace/projects

# 1. 移除旧的远程仓库配置
git remote remove origin

# 2. 使用您的 token 添加远程仓库
# 替换 YOUR_TOKEN 为您的 Personal Access Token
git remote add origin https://YOUR_TOKEN@github.com/fredsun3/acupoint.git

# 3. 推送代码
git push -u origin main

# 4. 验证
git remote -v
```

### 如果选择方案二（SSH）：

```bash
cd /workspace/projects

# 1. 生成 SSH 密钥（如果还没有）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 查看公钥并添加到 GitHub
cat ~/.ssh/id_ed25519.pub

# 3. 移除 HTTPS 远程仓库
git remote remove origin

# 4. 添加 SSH 远程仓库
git remote add origin git@github.com:fredsun3/acupoint.git

# 5. 推送代码
git push -u origin main

# 6. 验证
git remote -v
```

## 项目信息

- **项目名称**: 穴位图解学习应用
- **目标仓库**: https://github.com/fredsun3/acupoint
- **分支**: main
- **提交数量**: 请查看 `git log --oneline`
- **项目类型**: Taro 跨端小程序

## 注意事项

1. **Token 安全**: Personal Access Token 是敏感信息，请妥善保管
2. **Token 有效期**: Token 有有效期限制，过期后需要重新生成
3. **SSH 密钥**: SSH 密钥一旦添加，长期有效，无需定期更新
4. **推送权限**: 确保您有 `fredsun3/acupoint` 仓库的推送权限

## 如果仓库不存在

如果 `fredsun3/acupoint` 仓库还不存在：

1. 登录 GitHub
2. 点击右上角 "+" → "New repository"
3. Repository name: `acupoint`
4. Description: "穴位图解学习应用 - Taro 跨端小程序"
5. 选择 Public 或 Private
6. 不要勾选 "Initialize this repository with a README"
7. 点击 "Create repository"
8. 然后执行上面的推送命令

---

**准备好认证信息后，请告知我，我会帮您完成推送操作。**