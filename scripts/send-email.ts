// 发送合同邮件（QQ邮箱SMTP）
import { readFileSync } from "fs";
import { join } from "path";
import { createTransport } from "nodemailer";

// 读取配置
const configPath = join(import.meta.dir, "..", "config", "email.env");
const config = readFileSync(configPath, "utf-8")
  .split("
")
  .filter(l => l && !l.startsWith("#"))
  .reduce((acc: Record<string,string>, line) => {
    const [k, v] = line.split("=");
    acc[k.trim()] = v.trim();
    return acc;
  }, {});

// 命令行参数
const args = process.argv.slice(2);
const toEmail = args.find(a => a.includes("@")) || "";
const subject = args.filter(a => a !== toEmail && !a.endsWith(".pdf")).join(" ") || "合同文件";
const pdfPath = args.find(a => a.endsWith(".pdf")) || "";
const body = args.filter(a => a !== toEmail && a !== pdfPath && a !== subject).join(" ") || "请查收附件中的合同文件。";

if (!toEmail) {
  console.log("用法: bun send-email.ts <收件人邮箱> <邮件主题> [PDF附件路径]");
  process.exit(1);
}

const transporter = createTransport({
  host: config.EMAIL_HOST || "smtp.qq.com",
  port: parseInt(config.EMAIL_PORT || "465"),
  secure: true,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

const mailOptions: any = {
  from: `"${config.EMAIL_SIGN || '鼎味泰'}" <${config.EMAIL_USER}>`,
  to: toEmail,
  subject: subject,
  text: body + `

-- ${config.EMAIL_SIGN || '鼎味泰'}`,
};

if (pdfPath) {
  mailOptions.attachments = [{
    filename: pdfPath.split("\\").pop() || "contract.pdf",
    path: pdfPath,
  }];
}

try {
  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ 邮件已发送: ${info.messageId}`);
} catch (err) {
  console.error("❌ 发送失败:", err.message);
}
