import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function ImpulseSpending() {
  return (
    <>
      <SEOHead
        title="How Impulse Spending Affects Your Finances"
        description="Learn how impulse spending affects budgeting, savings, and long-term financial habits."
        keywords="impulse spending, budgeting, spending habits, personal finance"
        canonicalUrl="https://trackorapp.in/blog/impulse-spending"
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
                Spending Habits
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                How Impulse Spending Affects Your Finances
              </h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  4 May 2026
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  7 min read
                </div>
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">

              <p className="text-lg leading-relaxed">
                Impulse spending refers to purchases made without planning or
                careful consideration.
              </p>

              <h2>Why Impulse Spending Happens</h2>

              <ul>
                <li>Emotions</li>
                <li>Online shopping convenience</li>
                <li>Discount offers</li>
                <li>Instant digital payments</li>
              </ul>

              <h2>How It Affects Finances</h2>

              <p>
                Frequent impulse purchases can reduce savings and disrupt
                budgets.
              </p>

              <h2>How to Reduce Impulse Spending</h2>

              <ul>
                <li>Wait before buying</li>
                <li>Track expenses</li>
                <li>Create spending limits</li>
              </ul>

              <h2>Final Thoughts</h2>

              <p>
                Awareness and planning can reduce unnecessary spending and
                improve financial discipline.
              </p>

            </div>
          </article>
        </div>

        <Footer />
      </div>
    </>
  );
}