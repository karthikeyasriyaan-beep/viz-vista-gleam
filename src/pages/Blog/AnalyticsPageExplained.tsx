import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function AnalyticsPageExplained() {
  return (
    <>
      <SEOHead
        title="The Analytics Page Explained: Reading Your 3-Month Spending Trend Correctly — Trackora"
        description="A walkthrough of Trackora's analytics page — what each chart and metric shows, how to read a 3-month trend correctly, and what actionable decisions it enables."
        keywords="Trackora analytics page, 3 month spending trend, expense analytics India, spending pattern chart"
        canonicalUrl="https://trackorapp.in/blog/analytics-page-explained"
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
                    20 June 2026
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    10 min read
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">
                  The Analytics Page Explained: Reading Your 3-Month Spending Trend Correctly
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  The analytics page is where individual expenses become
                  visible as patterns — and where decisions about spending
                  can move from reactive ("I spent too much this month")
                  to proactive ("food delivery is trending upward and will
                  be a problem if unchecked"). Here's how to read it.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/40 text-sm">
                Disclaimer: This article describes analytics functionality
                in general terms. The data shown reflects only what has
                been logged — gaps in tracking will produce gaps in
                analytics accuracy.
              </div>

              <h2 className="text-2xl font-semibold text-foreground">
                What the Income vs Expense Chart Shows
              </h2>
              <p>
                The primary chart on the analytics page places income and
                total expenses side by side for each month in the selected
                range — 3, 6, or 12 months. The gap between the two bars
                for any given month is the actual surplus: what was genuinely
                available for savings or investment after all logged expenses.
                A month where the expense bar is taller than the income bar
                represents a deficit — spending exceeded logged income, either
                because income wasn't fully logged or because spending was
                genuinely higher than income that month.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                How to Read a 3-Month Trend
              </h2>
              <p>
                Three months is the minimum window for identifying a genuine
                trend versus a single-month anomaly. If food spending shows
                ₹4,200 in January, ₹4,800 in February, and ₹5,400 in March,
                the upward trend across three consecutive months is far more
                meaningful than a single month spike would be — it suggests
                a structural increase rather than a one-off event. The same
                logic applies downward: three consecutive months of lower
                spending in a category isn't luck, it's a sustained change
                worth recognizing.
              </p>
              <p>
                A single high month surrounded by normal months is typically
                an event — a festival, a birthday, an unusual week — not a
                trend. Three consecutive months of a direction, up or down,
                is the point at which the pattern is worth treating as a real
                signal rather than noise.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Category Breakdown: Finding the Dominant Spender
              </h2>
              <p>
                The category breakdown section of the analytics page shows
                each category's total across the selected period and its
                percentage of overall spending. For most tracked users, one
                or two categories consistently dominate: food (including
                delivery) often accounts for 35-50% of discretionary
                spending, transport another 10-15%. These high-percentage
                categories are where small percentage reductions produce the
                largest absolute savings — a 15% reduction in a category
                running at 40% of spending saves far more than eliminating
                a category running at 3%.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                The Savings Rate: What the Chart Actually Shows
              </h2>
              <p>
                The savings rate visible in the analytics page is derived
                directly from logged data: total income logged minus total
                expenses logged, divided by total income logged. A 15%
                savings rate means ₹15 of every ₹100 of logged income
                ended up unspent. This figure is only as accurate as the
                logging — if expenses are consistently logged but income is
                only partially logged, the savings rate will appear
                misleadingly high. Logging both income and expenses
                consistently is what makes this figure genuinely meaningful.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                What "Trending Up" in a Category Should Prompt
              </h2>
              <p>
                A category trending upward across three months prompts a
                specific question: is this intentional or unnoticed? Food
                delivery trending from ₹3,800 to ₹4,500 to ₹5,200 over
                three months could reflect a deliberate lifestyle change
                (moved farther from food options, started working longer
                hours) or unnoticed drift (ordering slightly more
                frequently without any particular reason). The analytics
                page surfaces the trend; it doesn't explain it. The value
                is in prompting the question, which leads to either
                intentional acceptance of the higher spending or a
                deliberate correction — both better outcomes than the drift
                continuing unnoticed for another three months.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                The Monthly Comparison View
              </h2>
              <p>
                Switching between 3, 6, and 12-month views on the analytics
                page serves different purposes. Three months shows recent
                trends with enough data to distinguish trend from anomaly.
                Six months adds seasonal context — is August always a higher
                spending month, or was this August specifically unusual?
                Twelve months shows the full annual pattern: festival spikes,
                summer travel, year-end spending — all visible as predictable
                recurring events rather than surprises when they arrive. The
                longer the window, the less useful it is for immediate
                decisions and the more useful it becomes for annual planning.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                What Good Analytics Habits Look Like
              </h2>
              <p>
                A sustainable analytics habit involves two distinct review
                types: a brief weekly check of the current month's category
                totals to catch any category running significantly ahead of
                pace, and a monthly deeper review of the 3-month trend to
                identify any directional patterns worth addressing. The
                weekly check takes five minutes; the monthly review takes
                fifteen. Together, they produce enough visibility to catch
                both immediate issues and developing patterns before either
                becomes a problem.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Final Thoughts
              </h2>
              <p>
                The analytics page turns a month of individual expense
                entries into a picture of spending behavior — and a three-month
                view of that picture into something genuinely predictive.
                The value isn't in the charts themselves; it's in the
                questions they prompt about whether the current direction of
                each category is intentional or unnoticed, and whether any
                trend visible over three months deserves a deliberate response
                before it runs for six.
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}