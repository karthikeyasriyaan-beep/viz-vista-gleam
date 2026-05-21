import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Contact
          </h1>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              Have questions about Trackora, feedback about the platform, or
              need help with something?
            </p>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                Contact Email
              </p>

              <a
                href="mailto:trackorateam@trackorapp.in"
                className="text-xl font-semibold text-primary hover:underline break-all"
              >
                trackorateam@trackorapp.in
              </a>
            </div>

            <p>
              You can send us an email anytime and we’ll get back to you as
              soon as possible.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}