import { Appointment } from "@/types/appointment";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail(payload: EmailPayload): Promise<boolean> {
  console.log("📧 Attempting to send email to:", payload.to);
  console.log("📧 Subject:", payload.subject);
  console.log("📧 API Key present:", !!RESEND_API_KEY);
  console.log("📧 API Key value:", RESEND_API_KEY ? `${RESEND_API_KEY.substring(0, 10)}...` : "NOT SET");

  // TEST MODE: If no API key or using placeholder, just log and return success
  if (!RESEND_API_KEY || RESEND_API_KEY === "re_your_api_key_here") {
    console.warn("⚠️ RESEND_API_KEY not configured - running in TEST MODE");
    console.log("📧 [TEST MODE] Email would be sent to:", payload.to);
    console.log("📧 [TEST MODE] Subject:", payload.subject);
    console.log("📧 [TEST MODE] ✅ Simulated email sent successfully!");
    return true; // Simulate success
  }

  try {
    console.log("📧 Sending email via Resend API...");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    const responseText = await response.text();
    console.log("📧 Resend API response status:", response.status);
    console.log("📧 Resend API response body:", responseText);

    if (!response.ok) {
      console.error("❌ Failed to send email. Response:", responseText);
      return false;
    }

    const result = JSON.parse(responseText);
    console.log("✅ Email sent successfully! ID:", result.id);
    return true;
  } catch (error) {
    console.error("❌ Email service error:", error);
    return false;
  }
}

// Email templates
function getConfirmationEmailHTML(appointment: Appointment): string {
  const date = new Date(appointment.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #5b7cf6 0%, #a78bfa 100%); padding: 40px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .appointment-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
    .detail-label { color: #64748b; font-weight: 500; }
    .detail-value { color: #0f172a; font-weight: 600; }
    .button { display: inline-block; padding: 14px 28px; background: #5b7cf6; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .footer { padding: 20px; text-align: center; color: #64748b; font-size: 14px; background: #f8fafc; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Appointment Confirmed</h1>
      <p style="margin: 8px 0 0; opacity: 0.9;">Your booking has been confirmed</p>
    </div>
    
    <div class="content">
      <p>Hi <strong>${appointment.name}</strong>,</p>
      <p>Your appointment has been successfully scheduled. We look forward to seeing you!</p>
      
      <div class="appointment-card">
        <div class="detail-row">
          <span class="detail-label">Service</span>
          <span class="detail-value">${appointment.service}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date</span>
          <span class="detail-value">${formattedDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time</span>
          <span class="detail-value">${appointment.time}</span>
        </div>
        <div class="detail-row" style="border-bottom: none;">
          <span class="detail-label">Status</span>
          <span class="detail-value" style="color: #5b7cf6;">Confirmed</span>
        </div>
      </div>
      
      <p style="margin-top: 30px;">If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
      
      <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
        Need help? Reply to this email or contact us at support@bookinghub.com
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">© 2026 BookingHub. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

function getReminderEmailHTML(appointment: Appointment): string {
  const date = new Date(appointment.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Reminder</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .reminder-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 4px; }
    .appointment-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
    .detail-label { color: #64748b; font-weight: 500; }
    .detail-value { color: #0f172a; font-weight: 600; }
    .footer { padding: 20px; text-align: center; color: #64748b; font-size: 14px; background: #f8fafc; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⏰ Appointment Reminder</h1>
      <p style="margin: 8px 0 0; opacity: 0.9;">Your appointment is coming up soon</p>
    </div>
    
    <div class="content">
      <p>Hi <strong>${appointment.name}</strong>,</p>
      
      <div class="reminder-box">
        <strong>🔔 Reminder:</strong> You have an appointment scheduled for <strong>${formattedDate}</strong> at <strong>${appointment.time}</strong>.
      </div>
      
      <div class="appointment-card">
        <div class="detail-row">
          <span class="detail-label">Service</span>
          <span class="detail-value">${appointment.service}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date</span>
          <span class="detail-value">${formattedDate}</span>
        </div>
        <div class="detail-row" style="border-bottom: none;">
          <span class="detail-label">Time</span>
          <span class="detail-value">${appointment.time}</span>
        </div>
      </div>
      
      <p>Please arrive 10 minutes early to complete any necessary paperwork.</p>
      
      <p style="margin-top: 30px;">Need to reschedule? Contact us at least 24 hours in advance.</p>
      
      <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
        Questions? Reply to this email or call us at (555) 123-4567
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">© 2026 BookingHub. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Public API
export async function sendConfirmationEmail(appointment: Appointment): Promise<boolean> {
  return sendEmail({
    to: appointment.email,
    subject: `Appointment Confirmed - ${appointment.service}`,
    html: getConfirmationEmailHTML(appointment),
  });
}

export async function sendReminderEmail(appointment: Appointment): Promise<boolean> {
  return sendEmail({
    to: appointment.email,
    subject: `Reminder: Upcoming Appointment - ${appointment.service}`,
    html: getReminderEmailHTML(appointment),
  });
}

export async function sendCancellationEmail(appointment: Appointment): Promise<boolean> {
  const date = new Date(appointment.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return sendEmail({
    to: appointment.email,
    subject: `Appointment Cancelled - ${appointment.service}`,
    html: `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h2>Appointment Cancelled</h2>
  <p>Hi ${appointment.name},</p>
  <p>Your appointment scheduled for <strong>${formattedDate}</strong> at <strong>${appointment.time}</strong> has been cancelled.</p>
  <p>If this was a mistake or you'd like to reschedule, please contact us.</p>
  <p>Thank you,<br>BookingHub Team</p>
</body>
</html>
    `.trim(),
  });
}
