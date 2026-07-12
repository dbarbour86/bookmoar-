import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Book Moar",
  description: "Review the Terms of Service for using Book Moar website systems and services.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-bg text-white-text pt-32 pb-24 min-h-screen relative overflow-hidden">
        {/* Ambient Red Glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary-red/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="border-b border-border-color pb-8 mb-12">
            <h1 className="font-display text-5xl sm:text-6xl font-normal tracking-tight uppercase leading-none">
              Terms of Service
            </h1>
            <p className="text-xs text-muted-text mt-3 uppercase tracking-widest font-bold">
              Last Updated: July 2026
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-8 text-sm sm:text-base text-muted-text leading-relaxed">
            <section>
              <p>
                Welcome to <strong>Book Moar</strong>! These terms and conditions outline the rules and regulations for the use of Book Moar's Website and Services, located at <a href="https://bookmoar.com" className="text-white-text hover:text-primary-red transition-colors underline">bookmoar.com</a>.
              </p>
              <p className="mt-4">
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use Book Moar if you do not agree to take all of the terms and conditions stated on this page.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                1. Intellectual Property Rights
              </h2>
              <p>
                Other than the content you own, under these Terms, Book Moar and/or its licensors own all the intellectual property rights and materials contained in this Website. All intellectual property rights are reserved. You are granted limited license only for purposes of viewing the material contained on this Website.
              </p>
              <p>You are specifically restricted from all of the following:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Publishing any Website material in any other media without prior consent.</li>
                <li>Sublicensing, commercializing, or selling any Website software or templates.</li>
                <li>Using this Website in any way that is or may be damaging to this Website.</li>
                <li>Using this Website in any way that impacts user access to this Website.</li>
                <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                2. Our Services & Subscriptions
              </h2>
              <p>
                Book Moar provides high-converting marketing landing pages, SEO configurations, and review/booking system setups under a monthly subscription model. 
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Onboarding & Launch:</strong> We configure and host the website systems for your local business upon payment processing. Ongoing service requires an active subscription.</li>
                <li><strong>Cancellation:</strong> You may cancel your subscription at any time. Upon cancellation, your site hosting and connected automation services will remain active until the end of your current billing period, after which they will be deactivated.</li>
                <li><strong>No Refunds:</strong> Due to the custom setup, development assets, and configuration costs involved, all payments are non-refundable unless specified otherwise in writing.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                3. User Content & Accounts
              </h2>
              <p>
                In these Website Standard Terms and Conditions, "User Content" shall mean any audio, video text, images, or other material you choose to display or use within your booking systems. By displaying User Content, you grant Book Moar a non-exclusive, worldwide irrevocable license to adapt, publish, and translate it for your website services.
              </p>
              <p>
                Your User Content must be your own and must not be invading any third-party's rights. Book Moar reserves the right to remove any of your content from your website at any time without notice if it violates local regulations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                4. Limitation of Liability
              </h2>
              <p>
                In no event shall Book Moar, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website or Services whether such liability is under contract. Book Moar, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website or Services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                5. Indemnification
              </h2>
              <p>
                You hereby indemnify to the fullest extent Book Moar from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                6. Severability & Variation of Terms
              </h2>
              <p>
                If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein. Book Moar is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.
              </p>
            </section>

            <section className="space-y-3 border-t border-border-color pt-8">
              <h2 className="font-display text-2xl font-normal text-white-text uppercase tracking-wide">
                7. Governing Law
              </h2>
              <p>
                These Terms will be governed by and interpreted in accordance with the laws of the State of North Carolina, USA, and you submit to the non-exclusive jurisdiction of the state and federal courts located in North Carolina for the resolution of any disputes.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
