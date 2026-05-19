// 列出所有 SKILL
import { readdirSync, statSync } from "fs";
import { join } from "path";

const skillsDir = join(import.meta.dir, "..", "skills");
const dirs = readdirSync(skillsDir).filter(d => {
  const full = join(skillsDir, d);
  return statSync(full).isDirectory();
});

console.log(`\n📋 共 ${dirs.length} 个 SKILL：\n`);
dirs.forEach((d, i) => {
  const skillMd = join(skillsDir, d, "SKILL.md");
  const exists = require("fs").existsSync(skillMd);
  console.log(`  ${i + 1}. ${d} ${exists ? "✅" : "⚠️ 缺SKILL.md"}`);
});
console.log();
