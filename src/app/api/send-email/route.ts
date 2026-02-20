import { NextRequest, NextResponse } from "next/server";
import { sendConfirmationEmail, sendReminderEmail, sendCancellationEmail } from "@/services/emailService";

export async function POST(request: NextRequest) {
  try {
    console.log("📨 API /send-email called");
    const body = await request.json();
    console.log("📨 Request body:", { type: body.type, appointmentId: body.appointment?.id });
    
    const { type, appointment } = body;

    if (!type || !appointment) {
      console.error("❌ Missing required fields:", { type: !!type, appointment: !!appointment });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("📨 Sending", type, "email to:", appointment.email);
    let success = false;

    switch (type) {
      case "confirmation":
        success = await sendConfirmationEmail(appointment);
        break;
      case "reminder":
        success = await sendReminderEmail(appointment);
        break;
      case "cancellation":
        success = await sendCancellationEmail(appointment);
        break;
      default:
        console.error("❌ Invalid email type:", type);
        return NextResponse.json(
          { error: "Invalid email type" },
          { status: 400 }
        );
    }

    console.log("📨 Email send result:", success);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
