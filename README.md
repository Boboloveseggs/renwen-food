# renwen-food

《名著饮食图鉴》的 GitHub Pages 静态展示版。

这个版本的目标是先让网页能打开、能浏览、能发链接给别人看。它不包含后端、数据库、登录系统或构建流程，所有页面、样式、脚本、图片和数据都放在 `docs/` 目录中。

## 本地打开

直接打开：

```text
docs/index.html
```

如果浏览器限制本地读取 `foods.json`，页面会使用内置备用数据继续展示。部署到 GitHub Pages 后会正常读取 `./data/foods.json`。

## 目录结构

```text
renwen-food/
README.md
docs/
index.html
assets/
css/
style.css
js/
main.js
images/
data/
foods.json
```

## GitHub Pages 部署

1. 将 `renwen-food` 项目上传到 GitHub 仓库。
2. 进入 GitHub 仓库设置：

```text
Settings -> Pages -> Build and deployment
```

3. Source 选择：

```text
Deploy from a branch
```

4. Branch 选择：

```text
main
```

5. Folder 选择：

```text
/docs
```

6. 点击 Save。

部署后项目页通常会通过下面的路径访问：

```text
https://你的用户名.github.io/renwen-food/
```

## 说明

- 所有资源路径均使用相对路径，例如 `./assets/images/food-001.webp`。
- 第一版只展示已有 8 道菜，后续可以继续扩展到 64 道菜。
- `docs/data/foods.json` 是当前展示数据来源。
