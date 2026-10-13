import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const intakeId = payload.intake_id || `BM-INTAKE-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = payload.timestamp || new Date().toISOString();
    const identity = payload.business_identity || {};
    const servicesConfig = payload.services_configuration || {};
    const servicesList = servicesConfig.services || [];
    const setup = payload.setup_and_assets || {};

    // Format human-readable text summary for email
    const servicesText = servicesList
      .map(
        (s: any, i: number) =>
          `  ${i + 1}. ${s.service_name} | Duration: ${s.duration_mins}m | Price: ${s.price_or_deposit}`
      )
      .join("\n");

    const emailSubject = `🚨 New Book Moar Intake: ${identity.business_name || "New Client"} [${intakeId}]`;

    const emailBodyText = `
NEW BOOK MOAR CLIENT ONBOARDING INTAKE
---------------------------------------
Intake ID: ${intakeId}
Timestamp: ${timestamp}

[1] CLIENT & DISPATCH IDENTITY:
- Business Name: ${identity.business_name || "N/A"}
- Primary Owner: ${identity.owner_name || "N/A"}
- Alert Mobile (SMS): ${identity.alert_phone || "N/A"}
- Alert Email: ${identity.alert_email || "N/A"}
- Service Area & Radius: ${identity.service_area || "N/A"}

[2] CORE SERVICES & SCHEDULING:
- Operating Hours: ${servicesConfig.operating_hours || "N/A"}
- Buffer Time: ${servicesConfig.buffer_time || "N/A"}
- Configured Services (${servicesList.length}):
${servicesText || "  None provided"}

[3] DOMAIN & BRAND ASSETS:
- Domain Choice: ${setup.domain_choice || "N/A"}
- Domain Name / Subdomain: ${setup.domain_name || "N/A"}
- Registrar Notes: ${setup.registrar_access_notes || "N/A"}
- Google Business Profile (GBP): ${setup.gbp_link || "N/A"}
- Assets Staged: ${setup.asset_count || 0} files
- Template Fallback: ${setup.used_template_fallback ? "Yes" : "No"}
---------------------------------------
`;

    console.log("[BOOK MOAR INTAKE DISPATCH RECEIVED FOR hello@bookmoar.com]", {
      intakeId,
      business: identity.business_name,
      owner: identity.owner_name,
      phone: identity.alert_phone,
      email: identity.alert_email,
    });

    let emailSent = false;

    // Delivery Option A: Resend API if API key is present
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Book Moar Intake <onboarding@bookmoar.com>",
            to: ["hello@bookmoar.com"],
            subject: emailSubject,
            text: emailBodyText,
          }),
        });
        if (resendRes.ok) {
          emailSent = true;
          console.log("[RESEND SUCCESS] Email sent to hello@bookmoar.com");
        }
      } catch (resendErr) {
        console.warn("[RESEND WARNING] Could not send via Resend API", resendErr);
      }
    }

    // Delivery Option B: FormSubmit Relay directly to hello@bookmoar.com
    try {
      const formSubmitRes = await fetch("https://formsubmit.co/ajax/hello@bookmoar.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "https://www.bookmoar.com",
        },
        body: JSON.stringify({
          _subject: emailSubject,
          _template: "table",
          intake_id: intakeId,
          business_name: identity.business_name,
          owner_name: identity.owner_name,
          alert_phone: identity.alert_phone,
          alert_email: identity.alert_email,
          service_area: identity.service_area,
          operating_hours: servicesConfig.operating_hours,
          buffer_time: servicesConfig.buffer_time,
          domain_route: setup.domain_name || setup.domain_choice,
          services_overview: servicesText,
          google_business_profile: setup.gbp_link || "None",
          intake_summary: emailBodyText,
        }),
      });
      const fsData = await formSubmitRes.json();
      console.log("[FORMSUBMIT RELAY RESPONSE]", fsData);
      emailSent = true;
    } catch (fsErr) {
      console.warn("[FORMSUBMIT WARNING] Could not forward via FormSubmit", fsErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Intake registered and routed to hello@bookmoar.com",
        intake_id: intakeId,
        recipient: "hello@bookmoar.com",
        email_sent: emailSent,
        received_at: timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[BOOK MOAR INTAKE ROUTE ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to parse and process intake payload" },
      { status: 400 }
    );
  }
}
