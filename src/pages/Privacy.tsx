import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    body: "Trackora may collect information such as account details, expense records, transaction descriptions, budget information, savings goals, voice-input expense entries, device information, browser information, and usage analytics required to operate and improve the platform.",
  },
  {
    title: "2. How We Use Information",
    body: "The information collected is used to operate and improve the Trackora platform. This includes storing expense records, displaying spending summaries, improving system performance, and ensuring the security of the service.",
  },
  {
    title: "3. AI Features",
    body: "Trackora may use artificial intelligence technologies to process voice-based expense entries, categorize expenses, and generate insights. AI-generated outputs may not always be accurate and should be reviewed by users.",
  },
  {
    title: "4. Cookies",
    body: "Users may choose their cookie preferences through the Trackora cookie consent banner. Essential cookies are required for core website functionality, while optional cookies help improve analytics and advertising.",
  },
  {
    title: "5. Advertising",
    body: "Trackora may display advertisements through third-party advertising partners such as Google AdSense. These providers may use cookies or similar technologies to serve relevant advertisements and measure performance.",
  },
  {
    title: "6. Data Security",
    body: "Trackora takes reasonable steps to protect user information from unauthorized access, misuse, or disclosure. Security practices are used to ensure that financial records and personal information remain protected.",
  },
  {
    title: "7. Data Retention",
    body: "Trackora retains user information only as long as necessary to provide services, comply with legal obligations, resolve disputes, and improve platform functionality.",
  },
  {
    title: "8. Third-Party Services",
    body: "Trackora may integrate third-party services such as analytics providers or advertising networks. These services may collect anonymous usage information according to their own privacy policies.",
  },
  {
    title: "9. Your Rights",
    body: "Users may request access to, correction of, or deletion of their personal information where applicable. Users remain in control of the information they choose to store within Trackora.",
  },
  {
    title: "10. User Control",
    body: "Users can manage and edit their expense records directly from their Trackora dashboard. The platform is designed to give users control over the information they choose to store.",
  },
  {
    title: "11. Governing Law",
    body: "This Privacy Policy is governed in accordance with applicable Indian laws. By using Trackora, users consent to the practices described herein as permitted under applicable Indian regulations.",
  },
  {
    title: "12. Policy Updates",
    body: "Trackora may update this Privacy Policy occasionally to reflect improvements or changes to the platform. Any updates will be posted on this page.",
  },
];

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>

          <p className="text-muted-foreground text-sm mb-1">Last updated: June 4, 2026</p>
          <p className="text-muted-foreground text-sm mb-6">Effective date: June 4, 2026</p>

          <p className="text-muted-foreground leading-relaxed mb-10">
            This Privacy Policy describes how Trackora collects, uses, and protects information when users access the Trackora website and its expense tracking and AI-powered financial services. By using Trackora, users agree to the practices described in this policy.
          </p>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-xl font-semibold text-foreground mb-2">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
              </section>
            ))}

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">13. Contact</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                If you have questions regarding this Privacy Policy or your personal information, reach out to us:
              </p>
              <div className="p-4 rounded-lg bg-muted/50 space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a href="mailto:trackorateam@trackorapp.in" className="text-primary hover:underline">
                    trackorateam@trackorapp.in
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Website:</strong> trackorapp.in
                </p>
                <Link to="/contact" className="text-primary hover:underline block">
                  Visit our Contact page
                </Link>
              </div>
            </section>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;