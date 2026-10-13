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

[1] BUSINESS INFORMATION:
- Business Name: ${identity.business_name || "N/A"}
- Primary Owner / Manager: ${identity.owner_name || "N/A"}
- Business Address: ${identity.business_address || "N/A"}
- Public Phone (For Customers): ${identity.public_phone || "N/A"}
- Where to Text New Lead Alerts: ${identity.alert_phone || "N/A"}
- Carrier Verification Phone: ${identity.verification_phone || "N/A"}
- Notification Email: ${identity.alert_email || "N/A"}
- Business Hours: ${identity.business_hours || servicesConfig.operating_hours || "N/A"}
- Service Area (Cities or ZIPs): ${identity.service_area || "N/A"}
- Jobs Wanted More Of: ${identity.ideal_job || "None specified"}

[2] YOUR SERVICES & BOOKING RULES:
- Selected Trade: ${servicesConfig.selected_trade || "N/A"}
- Appointment / Estimate Preference: ${servicesConfig.booking_preference || "N/A"}
- Buffer / Travel Time: ${servicesConfig.buffer_time || "N/A"}
- Services They Do NOT Offer: ${servicesConfig.excluded_services || "None"}
- Special Inquiry Instructions: ${servicesConfig.inquiry_instructions || "None"}
- Configured Services (${servicesList.length}):
${servicesText || "  None provided"}

[3] WEBSITE, LOGO & PHOTOS:
- Current Website URL: ${setup.existing_website_url || "N/A"}
- Google Business Profile (GBP): ${setup.gbp_link || "N/A"}
- GBP Admin Invite Sent: ${setup.gbp_admin_invite_sent ? "YES" : "NO"}
- Facebook / Social Media Links: ${setup.social_links || "N/A"}
- Existing Booking Software: ${setup.existing_booking_software || "None"}
- Launch Domain Choice: ${setup.domain_choice || "N/A"}
- Domain Name / Subdomain: ${setup.domain_name || "N/A"}
- Domain / Hosting Access Notes: ${setup.hosting_cms_logins || setup.registrar_access_notes || "N/A"}
- Logo / Photos Uploaded: ${setup.asset_count || 0} files
- Additional Notes or Special Requests: ${setup.notes_and_requests || "None"}
---------------------------------------
`;

    console.log("[BOOK MOAR INTAKE DISPATCH RECEIVED FOR hello@bookmoar.com]", {
      intakeId,
      business: identity.business_name,
      owner: identity.owner_name,
      publicPhone: identity.public_phone,
      alertPhone: identity.alert_phone,
      verificationPhone: identity.verification_phone,
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
          business_address: identity.business_address,
          public_phone: identity.public_phone,
          lead_alert_phone: identity.alert_phone,
          carrier_verification_phone: identity.verification_phone,
          alert_email: identity.alert_email,
          business_hours: identity.business_hours || servicesConfig.operating_hours,
          service_area: identity.service_area,
          jobs_wanted_more_of: identity.ideal_job,
          trade: servicesConfig.selected_trade,
          booking_preference: servicesConfig.booking_preference,
          buffer_time: servicesConfig.buffer_time,
          excluded_services: servicesConfig.excluded_services,
          inquiry_instructions: servicesConfig.inquiry_instructions,
          services_overview: servicesText,
          existing_website: setup.existing_website_url || "None",
          google_business_profile: setup.gbp_link || "None",
          gbp_admin_invite_sent: setup.gbp_admin_invite_sent ? "Yes" : "No",
          social_links: setup.social_links || "None",
          existing_booking_software: setup.existing_booking_software || "None",
          domain_route: setup.domain_name || setup.domain_choice,
          hosting_cms_logins: setup.hosting_cms_logins || setup.registrar_access_notes || "None",
          additional_notes: setup.notes_and_requests || "None",
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
