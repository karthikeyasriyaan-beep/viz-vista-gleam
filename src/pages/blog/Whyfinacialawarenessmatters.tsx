import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function WhyFinancialAwarenessMatters() {
  return (
    <>
      <SEOHead
        title="Why Financial Awareness Matters"
        description="Learn why financial awareness is important for budgeting, savings, and long-term money management."
        keywords="financial awareness, budgeting, money management, personal finance"
        canonicalUrl="https://trackorapp.in/blog/why-financial-awareness-matters"
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-10 max-w-4xl">

          <Link to="/blog">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <article className="space-y-8">

            <div className="space-y-4">

              <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Financial Awareness
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                Why Financial Awareness Matters
              </h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  2 May 2026
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  7 min read
                </div>
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">

              <p className="text-lg leading-relaxed">
                Financial awareness means understanding how money is earned,
                spent, saved, and managed.
              </p>

              <h2>Why Awareness Is Important</h2>

              <ul>
                <li>Improves budgeting</li>
                <li>Reduces overspending</li>
                <li>Supports saving goals</li>
                <li>Improves decision-making</li>
              </ul>

              <h2>How Expense Tracking Helps</h2>

              <p>
                Tracking expenses helps people understand spending patterns more
                clearly.
              </p>

              <h2>Awareness Improves Financial Habits</h2>

              <p>
                Better awareness often leads to better financial decisions over
                time.
              </p>

              <h2>Final Thoughts</h2>

              <p>
                Financial awareness is one of the foundations of responsible
                money management.
              </p>

            </div>
          </article>
        </div>

        <Footer />
      </div>
    </>
  );
}