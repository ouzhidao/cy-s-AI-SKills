# Git 小白小抄

> 不用背，改完文件来看一眼就行

---

## 日常三步走

```bash
# 第1步：改完文件，告诉 git 要存哪些
git add .

# 第2步：按 F5 存档，写一句人话描述
git commit -m "改了某某东西"

# 第3步：上传到 GitHub 备份
git push
```

---

## 只看这一句

| 想干嘛 | 命令 |
|---|---|
| 存本地存档 | `git add .` + `git commit -m "描述"` |
| 上传 GitHub | `git push` |
| 下载最新版 | `git pull` |
| 查看存档历史 | `git log --oneline` |
| 查看当前状态 | `git status` |

---

## 链条原理（时光机）

```
a561020 ——→ 24308ed ——→ 7b0bfbe ——→ ???
(最初)      (加skill)     (改Bun)      (你下次commit)
```

- 每一个点 = 一次 `commit` = 一个快照
- 新的点永远钩在旧的点后面，不会断
- 随时可以 `git checkout 某串数字` 回到过去

---

## 重要：不会自动同步！

- `commit` 只存你自己电脑
- `push` 才上传到 GitHub
- `pull` 才从网上拉下来

---

## 出错了怎么办

| 情况 | 解决 |
|---|---|
| 改错文件，还没 commit | `git checkout -- 文件名` 恢复原样 |
| 改错文件，已经 commit 了 | 告诉我，我帮你回退 |
| push 时提示冲突 | 先执行 `git pull`，再 `git push` |

---

## 我的仓库地址

- **GitHub**：https://github.com/ouzhidao/cy-s-AI-SKills
- **本地**：`F:\软件\SKILLs`

改了文件记得 `commit` + `push`，不然只有你自己电脑有，GitHub 上没有。
