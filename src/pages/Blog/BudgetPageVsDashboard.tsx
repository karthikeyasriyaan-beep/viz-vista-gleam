import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function BudgetPageVsDashboard() {
  return (
    <>
      <SEOHead
        title="How Trackora's Budget Page Differs From Its Dashboard — And When to Use Each"
        description="A clear breakdown of what Trackora's dashboard and budget page each show, why they answer different questions, and how to use them together."
        keywords="Trackora budget page, Trackora dashboard difference, expense tracker budget India"
        canonicalUrl="https://trackorapp.in/blog/budget-page-vs-dashboard"
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <Card>
            <CardContent className="p-6 sm:p-10 space-y-6">
              <div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    18 June 2026
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    10 min read
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">
                  How Trackora's Budget Page Differs From Its Dashboard — And When to Use Each
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  Trackora has two views that both deal with money but answer
                  completely different questions — the dashboard tells you
                  where you stand right now, while the budget page tells you
                  whether you're on track against a plan. Here's the
                  distinction that makes each one useful.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/40 text-sm">
                Disclaimer: This article describes the general functionality
                of both pages. Exact behavior depends on what budgets and
                income have been set up within the app.
              </div>

              <h2 className="text-2xl font-semibold text-foreground">
                What the Dashboard Answers
              </h2>
              <p>
                The dashboard answers one question: what is the current
                financial position today? This includes the safe-to-spend
                figure for today, total income logged for the current period,
                total expenses logged so far, and the running gap between the
                two. It is a real-time snapshot — it changes every time an
                expense is logged, and it reflects only what has actually
                happened so far in the current period, not what was planned
                or budgeted.
              </p>
              <p>
                The dashboard is the right place to check before a purchase:
                "is there room to spend ₹400 right now?" is a dashboard
                question. It requires no budget to have been set up — even
                without any budget limits configured, the dashboard shows
                running income vs expense and the daily available figure.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                What the Budget Page Answers
              </h2>
              <p>
                The budget page answers a different question: how does actual
                spending compare against the plan, category by category?
                Each category with a budget limit set shows a progress bar:
                how much of the limit has been used, how much remains, and
                whether the current pace is on track to stay within the limit
                by month-end. A ₹5,000 food budget that's at ₹3,800 by the
                18th of the month is visually "ahead of pace" — using 76%
                of the budget in 60% of the month suggests it will overshoot.
              </p>
              <p>
                The budget page requires active setup — limits need to be
                entered per category before it becomes useful. Without any
                budget limits set, the budget page shows spending by
                category without a comparison baseline, which is still
                informative but less actionable than the dashboard.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                The Key Difference: Now vs Against a Plan
              </h2>
              <p>
                The dashboard is present-tense: it tells you what is true
                right now. The budget page is comparative: it tells you what
                is true relative to what was planned. Both are accurate, but
                they answer different questions. Someone checking whether
                they can afford tonight's dinner uses the dashboard.
                Someone reviewing whether food delivery is running too high
                this month uses the budget page.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                When to Use Each: A Day-to-Day Pattern
              </h2>
              <p>
                A practical usage pattern that takes advantage of both:
                check the dashboard briefly before any purchase above ₹200
                — a quick glance at the safe-to-spend figure takes five
                seconds and answers the "can I afford this now" question.
                Check the budget page once or twice a week — usually Sunday
                evening works well — to review which categories are running
                ahead or behind their monthly limits, and adjust the coming
                week's spending accordingly. The dashboard is checked
                frequently and quickly; the budget page is checked less often
                but with more attention.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Setting Up Budgets That Actually Work
              </h2>
              <p>
                Budget limits set before tracking any real data tend to be
                inaccurate — they're estimates built on guesses rather than
                actual spending patterns. A more reliable approach: track
                for one full month without any budget limits set, review
                the resulting category totals, and use those real figures as
                the starting point for the following month's limits. A food
                category that actually ran at ₹6,200 last month is better
                served by a ₹5,500 limit this month (a modest, achievable
                reduction) than a ₹3,000 limit that bears no relationship to
                actual spending and will be blown through by day ten.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                How the Two Pages Feed Each Other
              </h2>
              <p>
                Budget limits set on the budget page influence the daily
                safe-to-spend calculation shown on the dashboard — a category
                that's approaching its limit causes the dashboard to reflect
                a tighter daily figure, because the remaining budget in that
                category constrains available spending even if total income
                minus total expenses would otherwise suggest more room. The
                two pages aren't independent views of the same data; they're
                connected, with budget limits actively shaping the dashboard's
                number.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Final Thoughts
              </h2>
              <p>
                Dashboard and budget page are designed for different moments
                in the day and different questions about money. Neither
                replaces the other — a dashboard without a budget answers
                "what is" but not "is this on track," while a budget page
                without real-time dashboard context answers "how am I doing
                against the plan" but not "what can I spend right now." Used
                together, they cover both the immediate and the longer-term
                financial picture that good tracking requires.
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}