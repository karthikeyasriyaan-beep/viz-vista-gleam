import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function HowToReduceMonthlyExpenses() {
  return (
    <>
      <SEOHead
        title="How to Reduce Monthly Expenses Without Sacrificing Everything"
        description="Learn practical ways to reduce monthly expenses while maintaining a balanced lifestyle."
        keywords="reduce expenses, save money, budgeting, monthly spending"
        canonicalUrl="https://trackorapp.in/blog/how-to-reduce-monthly-expenses"
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
                How to Reduce Monthly Expenses Without Sacrificing Everything
              </h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  26 April 2026
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  8 min read
                </div>
              </div>

              <p>
                Reducing expenses does not mean removing every enjoyable part of
                life. Sustainable financial improvement comes from identifying
                unnecessary spending and making smarter decisions gradually.
              </p>

              <h2 className="text-2xl font-bold">
                Track Your Spending First
              </h2>

              <p>
                Most people underestimate how much they spend on food delivery,
                subscriptions, convenience purchases, and online shopping.
              </p>

              <h2 className="text-2xl font-bold">
                Focus on Repeated Expenses
              </h2>

              <ul className="list-disc pl-6 space-y-3">
                <li>Reduce unused subscriptions.</li>
                <li>Limit impulse purchases.</li>
                <li>Cook more meals at home.</li>
                <li>Plan shopping before buying.</li>
                <li>Avoid unnecessary upgrades.</li>
              </ul>

              <h2 className="text-2xl font-bold">
                Small Changes Matter
              </h2>

              <p>
                Financial stability usually improves through consistency rather
                than extreme restrictions.
              </p>

              <div className="bg-muted p-4 rounded-lg text-sm">
                Disclaimer: Financial situations differ for every individual and
                household.
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}