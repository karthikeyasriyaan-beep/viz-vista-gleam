import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "1. Eligibility",
    body: "By using Trackora, you confirm that you have the legal capacity to agree to these Terms and Conditions and comply with applicable laws.",
  },
  {
    title: "2. Use of the Platform",
    body: "Trackora provides tools that allow users to record and review personal expense information. Users agree to use the platform responsibly and only for lawful purposes related to personal financial organization.",
  },
  {
    title: "3. User Responsibilities",
    body: "Users are responsible for the accuracy of the information they enter into Trackora. The platform stores expense data as provided by the user and does not verify or validate financial entries.",
  },
  {
    title: "4. Account Security",
    body: "Users are responsible for maintaining the security of their accounts and devices. Trackora is not responsible for unauthorized access resulting from a user's failure to protect their credentials.",
  },
  {
    title: "5. AI Features",
    body: "Trackora may provide AI-powered features including voice-based expense entry, categorization, and financial insights. AI-generated results may contain inaccuracies and should be reviewed by users before relying on them.",
  },
  {
    title: "6. Service Availability",
    body: "Trackora aims to provide reliable access to its services. However, the platform may occasionally experience updates, maintenance, or technical interruptions that temporarily affect availability.",
  },
  {
    title: "7. Limitation of Responsibility",
    body: "Trackora is provided for informational and personal financial organization purposes only. The platform does not provide financial, investment, tax, legal, or professional advice. Users remain solely responsible for their financial decisions and any actions taken based on information displayed by the platform.",
  },
  {
    title: "8. Termination",
    body: "Trackora reserves the right to suspend or terminate access to the platform if users violate these Terms and Conditions or engage in activities that may harm the platform, other users, or its services.",
  },
  {
    title: "9. Intellectual Property",
    body: "All content, design, features, and code on Trackora are the property of Trackora and its creator. No part of the platform may be reproduced, distributed, or used without prior written permission.",
  },
  {
    title: "10. Governing Law",
    body: "These Terms and Conditions are governed by and construed in accordance with applicable Indian laws. By using Trackora, users consent to the jurisdiction of applicable Indian courts for any disputes arising from these terms.",
  },
  {
    title: "11. Changes to the Terms",
    body: "Trackora may update these Terms and Conditions periodically to reflect improvements or changes to the platform. Updated terms will be published on this page. Users are encouraged to review these terms periodically. Continued use of the platform after updates constitutes acceptance of the revised terms.",
  },
];

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms and Conditions</h1>

          <p className="text-muted-foreground text-sm mb-1">Last updated: June 4, 2026</p>
          <p className="text-muted-foreground text-sm mb-6">Effective date: June 4, 2026</p>

          <p className="text-muted-foreground leading-relaxed mb-10">
            These Terms and Conditions outline the rules and guidelines for using the Trackora website and its expense tracking and AI-powered financial services. By accessing or using Trackora, you agree to comply with these terms. Continued use of the platform constitutes acceptance of any updates to these terms.
          </p>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-xl font-semibold text-foreground mb-2">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
              </section>
            ))}

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">12. Contact</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                If you have questions regarding these Terms and Conditions, reach out to us:
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

export default Terms;