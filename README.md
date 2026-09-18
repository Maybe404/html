# html

页面源码仓库。笔记在 Obsidian，这里只放 HTML。

```text
drafts/    还在改（不发布）
private/   只本地看（不发布）
public/    可公开（先脱敏）；合并到 main 后发布
```

观风相关页面暂在 `private/guanfeng/`。

## 发布

只有 `public/` 会上传到 Cloudflare Workers 静态资源。`drafts/` 和 `private/` 即使进了 git，也不会上线。

推送或合并到 `main` 后，GitHub Actions 会跑 `wrangler deploy`。公开地址：

- 自定义域名：[html.maybe404.com](https://html.maybe404.com)
- 备用：`html-maybe404.<account>.workers.dev`

URL 相对 `public/`。`public/foo/bar.html` 的规范路径是 `/foo/bar`（`/foo/bar.html` 会跳过去）。根路径 `/` 对应 `public/index.html`。

本地预览（只看即将上线的内容）：

```bash
npx wrangler@latest dev
```
