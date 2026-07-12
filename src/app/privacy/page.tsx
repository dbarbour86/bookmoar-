import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Book Moar",
  description: "Learn how Book Moar collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Header />
      <main className="bg-brand-bg text-white-text pt-32 pb-24 min-h-screen relative overflow-hidden">
        {/* Ambient Red Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-red/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="border-b border-border-color pb-8 mb-12">
            <h1 className="font-display text-5xl sm:text-6xl font-normal tracking-tight uppercase leading-none">
              Privacy Policy
            </h1>
            <p className="text-xs text-muted-text mt-3 uppercase tracking-widest font-bold">
              Last Updated: July 2026
            </p>
          </div>

          {/* Policy Content */}
          <div className="space-y-8 text-sm sm:text-base text-muted-text leading-relaxed">
            <section>
              <p>
                At <strong>Book Moar</strong>, accessible from <a href="https://bookmoar.com" className="text-white-text hover:text-primary-red transition-colors underline">bookmoar.com</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Book Moar and how we use it.
              </p>
              <p className="mt-4">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:hello@bookmoar.com" className="text-white-text hover:text-primary-red transition-colors underline">hello@bookmoar.com</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                1. Information We Collect
              </h2>
              <p>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Account & Booking Data:</strong> When you book a call or register an account, we may ask for your contact information, including items such as your name, business name, address, email address, and telephone number.</li>
                <li><strong>Payment Data:</strong> Payment details (e.g. credit card information) are collected and processed securely by our third-party payment processors (such as Stripe). We do not store your credit card numbers on our servers.</li>
                <li><strong>Communications:</strong> If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect in various ways, including to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Provide, operate, and maintain our website and booking systems.</li>
                <li>Improve, personalize, and expand our website conversions.</li>
                <li>Understand and analyze how you use our website.</li>
                <li>Develop new products, services, features, and functionality.</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                <li>Process your transactions and manage onboarding.</li>
                <li>Send you text notifications or reminders if opted in.</li>
                <li>Find and prevent fraud.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                3. Log Files
              </h2>
              <p>
                Book Moar follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                4. Third-Party Privacy Policies
              </h2>
              <p>
                Book Moar's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party servers (such as Google Analytics, Stripe, or Cal.com) for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                5. GDPR & CCPA Data Protection Rights
              </h2>
              <p>We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
                <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
                <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>The right to restrict or object to processing:</strong> You have the right to request that we restrict or object to our processing of your personal data, under certain conditions.</li>
                <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
            </section>

            <section className="space-y-3 border-t border-border-color pt-8">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                6. Contact Information
              </h2>
              <p>
                If you have questions, suggestions, or requests regarding this Privacy Policy, please contact us:
              </p>
              <div className="bg-card-bg border border-border-color rounded-xl p-6 mt-4 space-y-2">
                <p className="text-white-text font-semibold">Book Moar Website Systems</p>
                <p>Email: <a href="mailto:hello@bookmoar.com" className="text-primary-red hover:underline">hello@bookmoar.com</a></p>
                <p>Phone: <a href="tel:9193519505" className="text-primary-red hover:underline">(919) 351-9505</a></p>
                <p>Location: North Carolina, USA</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
