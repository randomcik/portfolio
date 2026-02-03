import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown; // honeypot
  startedAt?: unknown; // ms timestamp set client-side
};

function asString(v: unknown) {
  return typeof v === "string" ? v : null;
}

function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonError(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return jsonError("Invalid JSON.", 400);
  }

  const name = asString(body.name)?.trim() ?? "";
  const email = asString(body.email)?.trim() ?? "";
  const message = asString(body.message)?.trim() ?? "";
  const company = asString(body.company)?.trim() ?? "";
  const startedAtRaw = body.startedAt;

  // Anti-spam: honeypot
  if (company.length > 0) {
    return jsonError("Invalid submission.", 400);
  }

  // Anti-spam: minimum fill time
  if (typeof startedAtRaw === "number" && Number.isFinite(startedAtRaw)) {
    const elapsed = Date.now() - startedAtRaw;
    if (elapsed < 1200) return jsonError("Please try again.", 429);
  }

  if (name.length < 2 || name.length > 120) {
    return jsonError("Please enter a valid name.");
  }
  if (!isEmail(email) || email.length > 200) {
    return jsonError("Please enter a valid email.");
  }
  if (message.length < 10 || message.length > 4000) {
    return jsonError("Please enter a valid message.");
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL,
  } = process.env;

  if (
    !SMTP_HOST ||
    !SMTP_PORT ||
    !SMTP_USER ||
    !SMTP_PASS ||
    !CONTACT_TO_EMAIL ||
    !CONTACT_FROM_EMAIL
  ) {
    return jsonError("Server is not configured for email yet.", 500);
  }

  const port = Number(SMTP_PORT);
  if (!Number.isFinite(port) || port <= 0) {
    return jsonError("Server email configuration error.", 500);
  }

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const subject = `Portfolio contact — ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
    "",
    `Sent: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    await transport.sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject,
      text,
    });
  } catch {
    return jsonError("Failed to send email. Please try again later.", 502);
  }

  return Response.json({ ok: true });
}

