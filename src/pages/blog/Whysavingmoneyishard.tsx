import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function WhySavingMoneyIsHard() {
  return (
    <>
      <SEOHead
        title="Why Saving Money Feels Difficult for Most People"
        description="Understand why saving money feels difficult and learn practical ways to improve saving habits."
        keywords="saving money, personal finance, budgeting, savings habits"
        canonicalUrl="https://trackorapp.in/blog/why-saving-money-is-hard"
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
                Why Saving Money Feels Difficult for Most People
              </h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                24 April 2026

                <Clock className="h-4 w-4 ml-4" />
                7 min read
              </div>

              <p>
                Saving money can feel difficult because modern spending systems
                are designed for convenience and instant gratification.
              </p>

              <h2 className="text-2xl font-bold">
                Lifestyle Inflation
              </h2>

              <p>
                As income increases, spending often increases too. This reduces
                the ability to save consistently.
              </p>

              <h2 className="text-2xl font-bold">
                Invisible Spending
              </h2>

              <p>
                Small digital transactions often feel insignificant individually
                but become large monthly expenses over time.
              </p>

              <h2 className="text-2xl font-bold">
                Building Better Saving Habits
              </h2>

              <ul className="list-disc pl-6 space-y-3">
                <li>Track expenses regularly.</li>
                <li>Automate savings if possible.</li>
                <li>Set realistic financial goals.</li>
                <li>Reduce unnecessary purchases gradually.</li>
              </ul>

              <div className="bg-muted p-4 rounded-lg text-sm">
                Disclaimer: Savings capacity varies depending on income,
                responsibilities, and cost of living.
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}