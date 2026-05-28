import { NextResponse } from "next/server";
import { isEmailConfigured, sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          error:
            "Email server not configured. Add your Titan email password in .env.local (see README).",
        },
        { status: 503 }
      );
    }

    const { name, email, projectType, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      projectType: projectType?.trim() || "",
      message: message.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to send message.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
