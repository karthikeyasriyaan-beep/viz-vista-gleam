import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Globe, MessageSquare } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Contact
          </h1>

          <p className="text-muted-foreground text-lg mb-8">
            We'd love to hear from you.
          </p>

          <div className="space-y-4">

            <p className="text-muted-foreground leading-relaxed">
              Have questions about Trackora, feedback about the platform, or
              need help with something? Reach out — we typically respond within
              1–2 business days.
            </p>

            <div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4">
              <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  Email
                </p>
                <a
                  href="mailto:trackorateam@trackorapp.in"
                  className="text-xl font-semibold text-primary hover:underline break-all"
                >
                  trackorateam@trackorapp.in
                </a>
                <p className="text-xs text-muted-foreground mt-2">
                  For faster help, mention your topic in the subject line — e.g. "Bug report", "Feedback", or "Account help".
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4">
              <Globe className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  Website
                </p>
                <a
                  href="https://trackorapp.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-primary hover:underline"
                >
                  trackorapp.in
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-muted/30 p-5 flex items-start gap-4">
              <MessageSquare className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Before reaching out
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You may find answers in our{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  ,{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms
                  </Link>
                  , or{" "}
                  <Link to="/disclaimer" className="text-primary hover:underline">
                    Disclaimer
                  </Link>{" "}
                  pages.
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}