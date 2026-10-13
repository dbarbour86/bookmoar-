import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

interface DeliveryAttempt {
  provider: string;
  success: boolean;
  error?: string;
  statusCode?: number;
  response?: any;
}

/**
 * Diagnostic GET endpoint:
 * Allows inspecting which email providers and environment variables are active on Vercel
 * (without revealing any secret keys or values).
 */
export async function GET() {
  const envCheck = {
    has_resend_key: Boolean(process.env.RESEND_API_KEY),
    resend_from: process.env.RESEND_FROM || "(defaulting to onboarding@bookmoar.com / onboarding@resend.dev)",
    has_smtp_host: Boolean(process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST),
    has_smtp_user: Boolean(process.env.SMTP_USER || process.env.EMAIL_SERVER_USER),
    has_smtp_pass: Boolean(process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.EMAIL_SERVER_PASSWORD),
    has_email_server_url: Boolean(process.env.EMAIL_SERVER || process.env.MAIL_URL),
    has_sendgrid_key: Boolean(process.env.SENDGRID_API_KEY),
    has_postmark_key: Boolean(process.env.POSTMARK_API_KEY || process.env.POSTMARK_SERVER_TOKEN),
    target_recipient: "hello@bookmoar.com",
    formsubmit_fallback_enabled: true,
  };

  const activeProviders: string[] = [];
  if (envCheck.has_smtp_host || envCheck.has_email_server_url) activeProviders.push("SMTP");
  if (envCheck.has_resend_key) activeProviders.push("Resend");
  if (envCheck.has_sendgrid_key) activeProviders.push("SendGrid");
  if (envCheck.has_postmark_key) activeProviders.push("Postmark");
  activeProviders.push("FormSubmit (Fallback)");

  return NextResponse.json({
    status: "online",
    service: "Book Moar Intake Dispatcher",
    active_providers: activeProviders,
    environment_check: envCheck,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const intakeId = payload.intake_id || `BM-INTAKE-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = payload.timestamp || new Date().toISOString();
    const identity = payload.business_identity || {};
    const servicesConfig = payload.services_configuration || {};
    const servicesList = servicesConfig.services || [];
    const setup = payload.setup_and_assets || {};

    const targetEmail = "hello@bookmoar.com";
    const emailSubject = `🚨 New Book Moar Intake: ${identity.business_name || "New Client"} [${intakeId}]`;

    // Format human-readable text summary for email
    const servicesText = servicesList
      .map(
        (s: any, i: number) =>
          `  ${i + 1}. ${s.service_name} | Price: ${s.price_or_deposit || "N/A"}${
            s.duration_mins ? ` | Duration: ${s.duration_mins}m` : ""
          }`
      )
      .join("\n");

    const emailBodyText = `
NEW BOOK MOAR CLIENT ONBOARDING INTAKE
=======================================
Intake ID: ${intakeId}
Timestamp: ${timestamp}

[1] BUSINESS INFORMATION:
---------------------------------------
- Business Name: ${identity.business_name || "N/A"}
- Primary Owner / Manager: ${identity.owner_name || "N/A"}
- Business Address: ${identity.business_address || "N/A"}
- Public Phone (For Customers): ${identity.public_phone || "N/A"}
- Where to Text New Lead Alerts: ${identity.alert_phone || "N/A"}
- Carrier Verification Phone: ${identity.verification_phone || "N/A"}
- Notification Email: ${identity.alert_email || "N/A"}
- Business Hours: ${identity.business_hours || servicesConfig.operating_hours || "N/A"}
- Service Area (Cities / ZIPs): ${identity.service_area || "N/A"}
- Jobs Wanted More Of: ${identity.ideal_job || "None specified"}

[2] YOUR SERVICES & BOOKING RULES:
---------------------------------------
- Selected Trade: ${servicesConfig.selected_trade || "N/A"}
- Appointment / Estimate Preference: ${servicesConfig.booking_preference || "N/A"}
- Drive / Buffer Time: ${servicesConfig.buffer_time || "N/A"}
- Services They Do NOT Offer: ${servicesConfig.excluded_services || "None"}
- Special Inquiry Instructions: ${servicesConfig.inquiry_instructions || "None"}
- Configured Services (${servicesList.length}):
${servicesText || "  None provided"}

[3] WEBSITE, LOGO & PHOTOS:
---------------------------------------
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
=======================================
`;

    console.log("[BOOK MOAR INTAKE DISPATCH RECEIVED]", {
      intakeId,
      business: identity.business_name,
      owner: identity.owner_name,
      targetEmail,
    });

    const deliveryAttempts: DeliveryAttempt[] = [];
    let emailSent = false;
    let providerUsed = "";

    // -------------------------------------------------------------------------
    // PROVIDER 1: SMTP via nodemailer (if SMTP env vars are present)
    // -------------------------------------------------------------------------
    const smtpHost = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_SERVER_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.EMAIL_SERVER_PASSWORD;
    const smtpUrl = process.env.EMAIL_SERVER || process.env.MAIL_URL;

    if (!emailSent && (smtpHost || smtpUrl)) {
      try {
        console.log("[DISPATCH ATTEMPT] Trying SMTP transport...");
        const transporter = smtpUrl
          ? nodemailer.createTransport(smtpUrl)
          : nodemailer.createTransport({
              host: smtpHost,
              port: smtpPort,
              secure: smtpPort === 465,
              auth: smtpUser ? { user: smtpUser, pass: smtpPass } : undefined,
            });

        const fromAddress =
          process.env.SMTP_FROM ||
          process.env.EMAIL_FROM ||
          `"Book Moar Intake" <${smtpUser || "onboarding@bookmoar.com"}>`;

        const info = await transporter.sendMail({
          from: fromAddress,
          to: targetEmail,
          subject: emailSubject,
          text: emailBodyText,
        });

        console.log("[SMTP SUCCESS]", info.messageId);
        emailSent = true;
        providerUsed = "SMTP";
        deliveryAttempts.push({
          provider: "SMTP",
          success: true,
          response: { messageId: info.messageId },
        });
      } catch (smtpErr: any) {
        console.error("[SMTP ERROR]", smtpErr.message);
        deliveryAttempts.push({
          provider: "SMTP",
          success: false,
          error: smtpErr.message || "SMTP send failure",
        });
      }
    }

    // -------------------------------------------------------------------------
    // PROVIDER 2: Resend API (if RESEND_API_KEY is present)
    // -------------------------------------------------------------------------
    if (!emailSent && process.env.RESEND_API_KEY) {
      try {
        console.log("[DISPATCH ATTEMPT] Trying Resend API...");
        const customFrom = process.env.RESEND_FROM || "Book Moar Intake <onboarding@bookmoar.com>";

        let resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: customFrom,
            to: [targetEmail],
            subject: emailSubject,
            text: emailBodyText,
          }),
        });

        let resendData: any = null;
        try {
          resendData = await resendRes.json();
        } catch (_) {}

        // If custom domain unverified (403), retry with default onboarding@resend.dev
        if (!resendRes.ok && (resendRes.status === 403 || resendData?.name === "validation_error")) {
          console.warn("[RESEND NOTICE] Custom domain unverified, retrying with onboarding@resend.dev...");
          resendRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Book Moar <onboarding@resend.dev>",
              to: [targetEmail],
              subject: emailSubject,
              text: emailBodyText,
            }),
          });
          try {
            resendData = await resendRes.json();
          } catch (_) {}
        }

        // If Resend is in free test mode and restricts recipients to the verified account owner:
        if (
          !resendRes.ok &&
          resendData?.message &&
          resendData.message.includes("You can only send testing emails to your own email address")
        ) {
          const accountOwnerMatch = resendData.message.match(/\(([^)]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\)/);
          const fallbackRecipient = accountOwnerMatch ? accountOwnerMatch[1] : "derek.barbour@gmail.com";
          console.warn(`[RESEND NOTICE] Sending to Resend account owner email: ${fallbackRecipient}`);
          resendRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Book Moar <onboarding@resend.dev>",
              to: [fallbackRecipient],
              subject: `[FORWARDED TO ${targetEmail}] ${emailSubject}`,
              text: `NOTE: Resend is in unverified domain mode. This intake was delivered to your account email (${fallbackRecipient}). To receive at ${targetEmail}, verify your domain at resend.com/domains.\n\n` + emailBodyText,
            }),
          });
          try {
            resendData = await resendRes.json();
          } catch (_) {}
        }

        if (resendRes.ok) {
          console.log("[RESEND SUCCESS]", resendData);
          emailSent = true;
          providerUsed = "Resend";
          deliveryAttempts.push({
            provider: "Resend",
            success: true,
            statusCode: resendRes.status,
            response: resendData,
          });
        } else {
          const errMsg = resendData?.message || `Resend failed with HTTP ${resendRes.status}`;
          console.error("[RESEND ERROR]", errMsg, resendData);
          deliveryAttempts.push({
            provider: "Resend",
            success: false,
            statusCode: resendRes.status,
            error: errMsg,
            response: resendData,
          });
        }
      } catch (resendErr: any) {
        console.error("[RESEND EXCEPTION]", resendErr.message);
        deliveryAttempts.push({
          provider: "Resend",
          success: false,
          error: resendErr.message || "Resend network exception",
        });
      }
    }

    // -------------------------------------------------------------------------
    // PROVIDER 3: SendGrid API (if SENDGRID_API_KEY is present)
    // -------------------------------------------------------------------------
    if (!emailSent && process.env.SENDGRID_API_KEY) {
      try {
        console.log("[DISPATCH ATTEMPT] Trying SendGrid API...");
        const sgFrom = process.env.SENDGRID_FROM || "onboarding@bookmoar.com";
        const sgRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: targetEmail }] }],
            from: { email: sgFrom, name: "Book Moar Intake" },
            subject: emailSubject,
            content: [{ type: "text/plain", value: emailBodyText }],
          }),
        });

        if (sgRes.ok || sgRes.status === 202) {
          console.log("[SENDGRID SUCCESS]");
          emailSent = true;
          providerUsed = "SendGrid";
          deliveryAttempts.push({ provider: "SendGrid", success: true, statusCode: sgRes.status });
        } else {
          const errText = await sgRes.text();
          console.error("[SENDGRID ERROR]", errText);
          deliveryAttempts.push({ provider: "SendGrid", success: false, statusCode: sgRes.status, error: errText });
        }
      } catch (sgErr: any) {
        console.error("[SENDGRID EXCEPTION]", sgErr.message);
        deliveryAttempts.push({ provider: "SendGrid", success: false, error: sgErr.message });
      }
    }

    // -------------------------------------------------------------------------
    // PROVIDER 4: FormSubmit Relay (universal fallback)
    // -------------------------------------------------------------------------
    if (!emailSent) {
      try {
        console.log("[DISPATCH ATTEMPT] Trying FormSubmit relay to hello@bookmoar.com...");
        const formSubmitRes = await fetch("https://formsubmit.co/ajax/hello@bookmoar.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "BookMoar-Intake-Engine/1.0",
            Referer: "https://www.bookmoar.com",
          },
          body: JSON.stringify({
            _subject: emailSubject,
            _template: "table",
            intake_id: intakeId,
            business_name: identity.business_name || "N/A",
            owner_name: identity.owner_name || "N/A",
            business_address: identity.business_address || "N/A",
            public_phone: identity.public_phone || "N/A",
            lead_alert_phone: identity.alert_phone || "N/A",
            carrier_verification_phone: identity.verification_phone || "N/A",
            alert_email: identity.alert_email || "N/A",
            business_hours: identity.business_hours || servicesConfig.operating_hours || "N/A",
            service_area: identity.service_area || "N/A",
            jobs_wanted_more_of: identity.ideal_job || "None",
            trade: servicesConfig.selected_trade || "N/A",
            booking_preference: servicesConfig.booking_preference || "N/A",
            buffer_time: servicesConfig.buffer_time || "N/A",
            excluded_services: servicesConfig.excluded_services || "None",
            inquiry_instructions: servicesConfig.inquiry_instructions || "None",
            services_overview: servicesText || "None",
            existing_website: setup.existing_website_url || "None",
            google_business_profile: setup.gbp_link || "None",
            gbp_admin_invite_sent: setup.gbp_admin_invite_sent ? "Yes" : "No",
            social_links: setup.social_links || "None",
            existing_booking_software: setup.existing_booking_software || "None",
            domain_route: setup.domain_name || setup.domain_choice || "None",
            hosting_cms_logins: setup.hosting_cms_logins || setup.registrar_access_notes || "None",
            additional_notes: setup.notes_and_requests || "None",
            intake_summary: emailBodyText,
          }),
        });

        const rawText = await formSubmitRes.text();
        let fsData: any = {};
        try {
          fsData = JSON.parse(rawText);
        } catch (_) {
          fsData = { raw: rawText.slice(0, 300) };
        }

        if (formSubmitRes.ok && (fsData.success === "true" || fsData.success === true)) {
          console.log("[FORMSUBMIT SUCCESS]", fsData);
          emailSent = true;
          providerUsed = "FormSubmit";
          deliveryAttempts.push({
            provider: "FormSubmit",
            success: true,
            statusCode: formSubmitRes.status,
            response: fsData,
          });
        } else {
          console.error("[FORMSUBMIT ERROR]", formSubmitRes.status, fsData);
          deliveryAttempts.push({
            provider: "FormSubmit",
            success: false,
            statusCode: formSubmitRes.status,
            error: fsData?.message || `FormSubmit returned HTTP ${formSubmitRes.status}`,
            response: fsData,
          });
        }
      } catch (fsErr: any) {
        console.error("[FORMSUBMIT EXCEPTION]", fsErr.message);
        deliveryAttempts.push({
          provider: "FormSubmit",
          success: false,
          error: fsErr.message || "FormSubmit network exception",
        });
      }
    }

    // -------------------------------------------------------------------------
    // RESPONSE: Return full telemetry to frontend
    // -------------------------------------------------------------------------
    if (emailSent) {
      return NextResponse.json(
        {
          success: true,
          message: `Intake registered and emailed to ${targetEmail} via ${providerUsed}`,
          intake_id: intakeId,
          recipient: targetEmail,
          email_sent: true,
          delivery_provider: providerUsed,
          delivery_attempts: deliveryAttempts,
          received_at: timestamp,
        },
        { status: 200 }
      );
    } else {
      // If all delivery options failed, return clear error diagnostics
      console.error("[BOOK MOAR CRITICAL] All email delivery providers failed", deliveryAttempts);
      return NextResponse.json(
        {
          success: true, // The intake was parsed and saved in log
          message: "Intake data recorded, but automated email delivery failed across all providers.",
          intake_id: intakeId,
          recipient: targetEmail,
          email_sent: false,
          delivery_provider: null,
          email_error: "All configured email delivery channels failed or require credentials on Vercel.",
          delivery_attempts: deliveryAttempts,
          instructions:
            "Set RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS in Vercel environment variables, or check FormSubmit activation for hello@bookmoar.com.",
          received_at: timestamp,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("[BOOK MOAR INTAKE ROUTE EXCEPTION]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to parse and process intake payload",
        details: error.message,
      },
      { status: 400 }
    );
  }
}
