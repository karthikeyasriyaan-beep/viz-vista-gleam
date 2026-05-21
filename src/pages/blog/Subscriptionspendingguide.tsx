import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function SubscriptionSpendingGuide() {
  return (
    <>
      <SEOHead
        title="How Subscription Services Quietly Increase Monthly Spending"
        description="Learn how subscriptions affect monthly budgets and why regular audits improve financial awareness."
        keywords="subscriptions, monthly expenses, budgeting, spending habits"
        canonicalUrl="https://trackorapp.in/blog/subscription-spending-guide"
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <Card>
            <CardContent className="p-8 space-y-6">
              <h1 className="text-4xl font-bold">
                How Subscription Services Quietly Increase Monthly Spending
              </h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                23 April 2026

                <Clock className="h-4 w-4 ml-4" />
                8 min read
              </div>

              <p>
                Subscription services are convenient, but recurring payments can
                quietly increase monthly expenses over time.
              </p>

              <h2 className="text-2xl font-bold">
                Why Subscriptions Feel Small
              </h2>

              <p>
                Small recurring charges are easy to ignore because they are
                automatic and spread across multiple services.
              </p>

              <h2 className="text-2xl font-bold">
                Common Subscription Categories
              </h2>

              <ul className="list-disc pl-6 space-y-3">
                <li>Streaming services</li>
                <li>Cloud storage</li>
                <li>Food delivery memberships</li>
                <li>Shopping memberships</li>
                <li>Software subscriptions</li>
              </ul>

              <h2 className="text-2xl font-bold">
                Reviewing Subscriptions Regularly
              </h2>

              <p>
                A monthly subscription audit can improve spending awareness and
                reduce unnecessary recurring expenses.
              </p>

              <div className="bg-muted p-4 rounded-lg text-sm">
                Disclaimer: Some subscriptions may provide real value depending
                on personal or professional needs.
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}