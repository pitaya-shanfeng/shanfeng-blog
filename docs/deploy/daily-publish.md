# 每日行业日报：自动同步与发布

## 流程

```
~/Desktop/知识沉淀/行业日报/每日动态日报-YYYY-MM-DD.md   ← 每天 10 点后这里会多一篇
        │  node scripts/sync-hotnews.mjs（补 frontmatter）
        ▼
src/content/posts/hotnews/                              ← 站内文章
        │  astro build + CDN 改写
        ▼
dist/  ──rsync──▶  124.220.166.185:/var/www/shanfeng    ← 线上
```

`scripts/publish-daily.sh` 把上面整条串起来，并且**没有新文件时会直接退出**，不会空跑构建。

## 手动跑

```bash
./scripts/publish-daily.sh            # 同步 + 构建 + 部署 + 推仓库
./scripts/publish-daily.sh --dry-run  # 只看会同步哪些
```

日志在 `.logs/daily-YYYY-MM-DD.log`。

## 每天自动跑（macOS launchd）

懒人版：把下面内容存成 `~/Library/LaunchAgents/com.shanfeng.daily.plist`，
然后 `launchctl load ~/Library/LaunchAgents/com.shanfeng.daily.plist`。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.shanfeng.daily</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>/Users/yutao/Documents/产品专家/Blog构建/scripts/publish-daily.sh</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key><integer>10</integer>
    <key>Minute</key><integer>40</integer>
  </dict>
  <key>StandardOutPath</key><string>/tmp/shanfeng-daily.out</string>
  <key>StandardErrorPath</key><string>/tmp/shanfeng-daily.err</string>
  <key>RunAtLoad</key><false/>
</dict>
</plist>
```

注意：

- 电脑 10:40 必须醒着；睡眠中错过的话，launchd 会在唤醒后补跑一次
- 离线/断网时脚本会失败，日志里能看到，重跑一次即可
- 首次运行前确认 `.deploy.env` 里有 `DEPLOY_HOST`

## 只同步不发布

```bash
node scripts/sync-hotnews.mjs --dry-run   # 列出会新增的
node scripts/sync-hotnews.mjs             # 只写进内容目录，等你自己构建
node scripts/sync-hotnews.mjs --force     # 覆盖已存在的同日文件
```
