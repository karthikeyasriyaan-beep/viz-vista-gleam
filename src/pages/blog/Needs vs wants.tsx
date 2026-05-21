import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function NeedsVsWants() {
  return (
    <>
      <SEOHead
        title="Understanding Needs vs Wants in Personal Finance"
        description="Learn the difference between needs and wants and how it improves budgeting and financial decision-making."
        keywords="needs vs wants, budgeting, personal finance, spending habits"
        canonicalUrl="https://trackorapp.in/blog/needs-vs-wants"
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
                Budgeting
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                Understanding Needs vs Wants in Personal Finance
              </h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  6 May 2026
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  7 min read
                </div>
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                One of the most important financial skills is understanding the
                difference between needs and wants.
              </p>

              <h2>What Are Needs?</h2>

              <p>
                Needs are essential expenses required for daily living and
                survival.
              </p>

              <ul>
                <li>Food</li>
                <li>Housing</li>
                <li>Transportation</li>
                <li>Healthcare</li>
              </ul>

              <h2>What Are Wants?</h2>

              <p>
                Wants are non-essential purchases that improve comfort or
                enjoyment.
              </p>

              <ul>
                <li>Luxury shopping</li>
                <li>Entertainment upgrades</li>
                <li>Impulse purchases</li>
              </ul>

              <h2>Why This Difference Matters</h2>

              <p>
                Understanding spending priorities improves budgeting and
                financial awareness.
              </p>

              <h2>Final Thoughts</h2>

              <p>
                Better financial decisions often begin with understanding what
                is necessary and what is optional.
              </p>
            </div>
          </article>
        </div>

        <Footer />
      </div>
    </>
  );
}