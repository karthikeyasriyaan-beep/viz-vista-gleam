import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";

const Disclaimer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="h-6 w-6 text-primary" />

                <CardTitle className="text-3xl font-display">
                  Disclaimer
                </CardTitle>
              </div>

              <p className="text-muted-foreground">
                Last updated: June 4, 2026
              </p>

              <p className="text-sm text-muted-foreground mt-4">
                Please read this disclaimer carefully before using Trackora.
                This disclaimer governs your use of our website and services.
              </p>
            </CardHeader>

            <CardContent className="prose prose-sm max-w-none space-y-6">

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  1. General Information Purpose
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  The information provided on Trackora (trackorapp.in) is for{" "}
                  <strong>
                    general informational and educational purposes only
                  </strong>.
                  All content, including articles, guides, tools, and features,
                  is provided in good faith. However, we make no representation
                  or warranty of any kind, express or implied, regarding the
                  accuracy, adequacy, validity, reliability, availability, or
                  completeness of any information on the website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  2. Not Financial Advice
                </h2>

                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 mb-4">
                  <p className="text-foreground font-medium">
                    <strong>IMPORTANT:</strong> Trackora is a financial
                    tracking and budgeting tool, NOT a financial advisory
                    service.
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  The content on this website, including all articles,
                  blog posts, calculators, and tracking features:
                </p>

                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>
                    <strong>Does NOT</strong> constitute financial advice,
                    investment advice, tax advice, or legal advice
                  </li>

                  <li>
                    <strong>Does NOT</strong> replace consultation with qualified
                    financial professionals
                  </li>

                  <li>
                    <strong>Should NOT</strong> be used as the sole basis for
                    any financial decisions
                  </li>

                  <li>
                    <strong>Is NOT</strong> personalized to your specific
                    financial situation
                  </li>
                </ul>

                <p className="text-muted-foreground leading-relaxed mt-3">
                  Before making any financial decisions, including but not
                  limited to investments, debt management, loan applications,
                  or major purchases, you should consult with a qualified
                  financial advisor, accountant, or other appropriate
                  professional who can assess your individual circumstances.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  3. No Professional Relationship
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  Using Trackora does not create a fiduciary, advisory,
                  or professional relationship between you and Trackora,
                  its owners, operators, or affiliates.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  4. Accuracy of Information
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  While we strive to provide accurate and up-to-date information,
                  we cannot guarantee that all information on our website is:
                </p>

                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>Completely accurate or error-free</li>
                  <li>Current or reflective of the latest financial regulations</li>
                  <li>Applicable to all jurisdictions or situations</li>
                  <li>Comprehensive of all available options</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  5. User Responsibility
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  You are solely responsible for:
                </p>

                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                  <li>
                    Evaluating the accuracy and usefulness of any information
                  </li>

                  <li>
                    Ensuring the accuracy of data you enter into the platform
                  </li>

                  <li>
                    Making your own financial decisions based on your own
                    research and professional advice
                  </li>
                </ul>

                <p className="text-muted-foreground leading-relaxed mt-3">
                  Trackora relies on information entered by users. Any reports,
                  analytics, insights, categorizations, forecasts, or recommendations
                  generated by the platform depend on the accuracy and completeness of
                  the information provided by the user.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  6. Limitation of Liability
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  Under no circumstances shall Trackora, its owners,
                  operators, employees, or affiliates be liable for any damages.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  7. External Links Disclaimer
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to external websites or resources.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  8. Testimonials and User Content
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  Any testimonials, user stories, or success stories featured
                  on our website represent individual experiences and results.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  9. "As Is" Basis
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  Trackora is provided on an "as is" and "as available" basis.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  10. Changes to This Disclaimer
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify this disclaimer at any time
                  without prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  11. AI Features Disclaimer
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  Trackora may use artificial intelligence (AI) technologies to assist
                  with expense categorization, voice-based expense logging, financial
                  insights, and related features. While we strive to improve accuracy,
                  AI-generated suggestions, categorizations, and insights may contain
                  errors, omissions, or inaccuracies.
                </p>

                <p className="text-muted-foreground leading-relaxed mt-3">
                  Users are responsible for reviewing and verifying all AI-generated
                  outputs before relying on them for budgeting, financial planning,
                  expense management, or other financial decisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  12. Contact Information
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this disclaimer or our services:
                </p>

                <div className="mt-3 p-4 rounded-lg bg-muted/50 space-y-2">
                  <p>
                    <strong>Website:</strong> trackorapp.in
                  </p>

                  <p>
                    <strong>Email:</strong> trackorateam@trackorapp.in
                  </p>

                  <Link
                    to="/contact"
                    className="text-primary hover:underline"
                  >
                    Visit our Contact page
                  </Link>
                </div>
              </section>

              <div className="mt-8 p-6 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm text-foreground font-medium">
                  <strong>Remember:</strong> Trackora is a tool to help you
                  organize and understand your finances better.
                  It is not a substitute for professional financial advice.
                </p>
              </div>

            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Disclaimer;