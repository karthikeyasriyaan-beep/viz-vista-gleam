import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function LoansEmiOutstandingPercentage() {
  return (
    <>
      <SEOHead
        title="Tracking Loans and EMIs in One Place: What the Outstanding Percentage Actually Tells You — Trackora"
        description="A walkthrough of Trackora's Loans page and what the outstanding-paid percentage actually means for someone juggling multiple EMIs."
        keywords="Trackora loans tracker, EMI tracking app India, outstanding loan percentage"
        canonicalUrl="https://trackorapp.in/blog/loans-emi-outstanding-percentage"
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
                    7 June 2026
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    10 min read
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">
                  Tracking Loans and EMIs in One Place: What the Outstanding Percentage Actually Tells You
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  A home loan, a personal loan, and a credit card balance,
                  each with its own statement, due date, and interest rate,
                  are easy to lose a combined sense of. Here's how viewing
                  them together changes what becomes visible.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/40 text-sm">
                Disclaimer: This article describes how loan tracking works in
                general terms and is not financial or lending advice. Loan
                amounts and EMI figures must be entered or confirmed by the
                user.
              </div>

              <h2 className="text-2xl font-semibold text-foreground">
                Why Loans Spread Across Apps Hide the Full Picture
              </h2>
              <p>
                A home loan tracked through one bank's app, a personal loan
                through another, and a credit card balance through a third
                each show their own number in isolation — but none of them
                show the combined monthly EMI commitment or the total
                outstanding debt across all three. Someone paying ₹12,000 on
                a home loan and ₹6,000 on a personal loan EMI is committing
                ₹18,000 a month before anything else, but that combined
                figure only exists if someone manually adds the two together
                — which rarely happens by default.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                What the Loans Page Actually Shows
              </h2>
              <p>
                Each active loan appears with its original amount, current
                outstanding balance, monthly EMI, and a paid-off percentage.
                A ₹5,00,000 home loan with ₹3,80,000 still outstanding shows
                as 24% paid off — a single number that communicates progress
                far more directly than the raw outstanding figure alone. A
                combined total at the top adds up every active EMI, giving
                the full monthly debt commitment in one glance.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Why the Percentage Matters More Than the Raw Balance
              </h2>
              <p>
                ₹3,80,000 still owed sounds large in isolation, regardless of
                whether it represents 24% or 76% of the original loan. The
                percentage adds context the raw number doesn't: 24% paid off
                on a 15-year home loan is roughly on schedule for year three
                or four, while the same percentage on a 3-year personal loan
                would be concerning. Seeing the percentage next to the
                original loan term makes it possible to judge whether
                progress is actually on pace, rather than just seeing a large
                outstanding figure with no sense of whether that's expected
                or not.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                The EMI Stacking Problem This Surfaces
              </h2>
              <p>
                Two loans taken out at different times, each individually
                affordable when approved, can end up with EMI due dates
                landing in the same week of the month — a coincidence that's
                easy to miss when each loan is tracked separately, but
                immediately visible when both appear on the same page with
                their due dates shown together. Spotting this overlap early
                makes it possible to plan around it — setting aside the
                combined amount in advance — rather than discovering the
                clash only when both payments are due simultaneously against
                a tighter-than-expected balance.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                How This Connects to the Daily Safe-to-Spend Number
              </h2>
              <p>
                EMI commitments tracked on the Loans page feed directly into
                the daily spending calculation elsewhere in the app — a
                ₹18,000 combined monthly EMI is treated as already
                committed, not available for discretionary spending, even
                before the due date arrives. This prevents the common trap
                of treating the full salary as available simply because the
                EMI hasn't technically been deducted yet; the money is
                already spoken for, and the daily number reflects that
                reality rather than a misleadingly larger "available"
                balance.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                A Realistic Example: Two Loans, One Salary
              </h2>
              <p>
                Consider a ₹50,000 salary with a ₹12,000 home loan EMI and a
                ₹5,000 personal loan EMI, totaling ₹17,000 in fixed monthly
                debt commitment — 34% of income before rent, groceries, or
                anything else is counted. Seeing both loans on one page with
                their combined EMI total makes this 34% figure immediately
                visible, rather than requiring two separate mental
                calculations from two separate apps. With the home loan at
                31% paid off (on pace for its 15-year term) and the personal
                loan at 60% paid off (running ahead of its shorter 3-year
                term), the combined view also shows that the personal loan
                will clear well before the home loan — useful information for
                planning what happens to that ₹5,000/month once the personal
                loan is fully paid off.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Final Thoughts
              </h2>
              <p>
                Tracking loans separately, spread across different apps and
                statements, hides exactly the kind of combined picture that
                matters most — total monthly commitment, overlapping due
                dates, and relative payoff progress. Bringing them together
                in one place doesn't change the underlying debt, but it
                changes what's visible about it, which is often the
                difference between a EMI clash being a planned-for non-event
                and an unwelcome surprise.
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}