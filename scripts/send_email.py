# -*- coding: utf-8 -*-
"""发送合同邮件（QQ邮箱 SMTP）"""
import sys, os, smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

def load_config():
    cfg = {}
    config_path = os.path.join(os.path.dirname(__file__), '..', 'config', 'email.env')
    with open(config_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                k, v = line.split('=', 1)
                cfg[k.strip()] = v.strip()
    return cfg

def send_email(to_email, subject, body, pdf_path=None):
    cfg = load_config()
    
    msg = MIMEMultipart()
    msg['From'] = f'{cfg["EMAIL_SIGN"]} <{cfg["EMAIL_USER"]}>'
    msg['To'] = to_email
    msg['Subject'] = subject
    
    msg.attach(MIMEText(f'{body}\n\n-- {cfg["EMAIL_SIGN"]}', 'plain', 'utf-8'))
    
    if pdf_path and os.path.exists(pdf_path):
        with open(pdf_path, 'rb') as f:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(f.read())
            encoders.encode_base64(part)
            fname = os.path.basename(pdf_path)
            part.add_header('Content-Disposition', f'attachment; filename="{fname}"')
            msg.attach(part)
    
    with smtplib.SMTP_SSL(cfg.get('EMAIL_HOST', 'smtp.qq.com'), int(cfg.get('EMAIL_PORT', 465))) as server:
        server.login(cfg['EMAIL_USER'], cfg['EMAIL_PASS'])
        server.send_message(msg)
    
    return True

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('用法: python send_email.py <收件人邮箱> <主题> [PDF路径]')
        print('示例: python send_email.py supplier@qq.com "设备采购合同" contract.pdf')
        sys.exit(1)
    
    to = sys.argv[1]
    subject = sys.argv[2]
    pdf = sys.argv[3] if len(sys.argv) > 3 else None
    body = '请查收附件中的合同文件。'
    
    try:
        send_email(to, subject, body, pdf)
        print(f'✅ 邮件已发送至 {to}')
    except Exception as e:
        print(f'❌ 发送失败: {e}')
        sys.exit(1)
