import nodemailer from "nodemailer";

const CONTACT_EMAIL = "mazhar@lancerstech.com";

function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.titan.email";
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER || CONTACT_EMAIL;
  const pass = process.env.SMTP_PASSWORD;

  if (!pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export function isEmailConfigured() {
  return Boolean(process.env.SMTP_PASSWORD);
}

export async function sendContactEmail({
  name,
  email,
  projectType,
  message,
}: {
  name: string;
  email: string;
  projectType: string;
  message: string;
}) {
  const transporter = getTransporter();

  if (!transporter) {
    throw new Error(
      "Email is not configured. Add SMTP_PASSWORD to .env.local (Titan/Hostinger email password)."
    );
  }

  const to = process.env.CONTACT_TO || CONTACT_EMAIL;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || CONTACT_EMAIL;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${from}>`,
    to,
    replyTo: email,
    subject: `Portfolio Contact — ${projectType || "New Project"}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project Type: ${projectType || "Not specified"}`,
      "",
      "Message:",
      message,
    ].join("\n"),
    html: `
      <div style="font-family:sans-serif;max-width:600px;color:#1e293b">
        <h2 style="color:#3b82f6">New Portfolio Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Project Type:</strong> ${escapeHtml(projectType || "Not specified")}</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
      </div>
    `,
  });
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
