import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // In production or development, log incoming intake payload
    console.log("[BOOK MOAR INTAKE DISPATCH RECEIVED]", {
      intake_id: payload.intake_id,
      timestamp: payload.timestamp,
      business_name: payload.business_identity?.business_name,
      alert_phone: payload.alert_phone || payload.business_identity?.alert_phone,
      service_count: payload.services_configuration?.services?.length,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Book Moar Intake Payload registered and stored successfully.",
        intake_id: payload.intake_id || `BM-INTAKE-${Date.now().toString(36).toUpperCase()}`,
        received_at: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[BOOK MOAR INTAKE ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to parse intake payload" },
      { status: 400 }
    );
  }
}
