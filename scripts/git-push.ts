// 一键 Git 提交 & 推送
import { $ } from "bun";

const msg = process.argv.slice(2).join(" ") || "update skills";
console.log(`\n📤 Git add + commit + push: "${msg}"\n`);

await $`git add -A`;
await $`git commit -m ${msg}`.nothrow();
await $`git push origin main`;
console.log("\n✅ 推送完成\n");
