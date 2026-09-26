import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function WeekInsideTrackoraLogging() {
  return (
    <>
      <SEOHead
        title="A Week Inside Trackora: Logging Every Expense for 7 Days, Category by Category — Trackora"
        description="A day-by-day log of tracking every single expense for a week using Trackora — what got caught, what got missed, and what changed by day seven."
        keywords="expense tracking case study, week of tracking spending, Trackora daily logging, India budgeting diary"
        canonicalUrl="https://trackorapp.in/blog/week-inside-trackora-logging"
        type="article"
        publishedTime="2026-05-05"
        imageUrl="https://trackorapp.in/og-image.png"
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
                    05 May 2026
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    9 min read
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">
                  A Week Inside Trackora: Logging Every Expense for 7 Days,
                  Category by Category
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  Most people underestimate how much of their spending is
                  small, frequent, and forgettable by the time evening rolls
                  around. Here's what logging absolutely everything for seven
                  straight days actually looks like — including the days it
                  felt tedious.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/40 text-sm">
                Disclaimer: Figures below are an illustrative composite based
                on typical usage patterns, not one individual's actual bank
                statement. Your own numbers will look different.
              </div>

              <h2 className="text-2xl font-semibold text-foreground">
                Day 1–2: The Obvious Stuff
              </h2>
              <p>
                The first two days are easy because the spending is obvious —
                a ₹180 auto ride, a ₹320 lunch, a ₹60 chai round with
                colleagues. These get logged in the moment, right after
                paying, using voice entry while still walking. Nothing here
                is surprising yet; it mostly confirms what was already
                expected.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Day 3: The First Real Surprise
              </h2>
              <p>
                By day three, a pattern shows up that wasn't obvious before:
                three separate food delivery orders, ₹240 to ₹410 each,
                totaling nearly ₹900 in a single day without a single
                "big" purchase involved. None of these felt significant
                individually — each was just "I don't feel like cooking
                tonight" — but stacked together they quietly outweighed two
                proper restaurant meals combined.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Day 4: The Forgotten Subscription
              </h2>
              <p>
                A ₹499 OTT renewal hits, one that had been genuinely
                forgotten about since the free trial months earlier. This is
                the exact kind of expense that never shows up in a
                self-reported "what did I spend on" mental tally, because it
                doesn't involve an active decision that day — the money just
                leaves quietly. Logging it (via the receipt-scan feature on
                the payment confirmation email) is what surfaces it at all.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Day 5: The Day That Felt Expensive But Wasn't
              </h2>
              <p>
                A grocery run alone feels like a big spend in the moment —
                walking out with several bags and a ₹1,850 bill. But logged
                and compared against the week so far, it's actually one of
                the more efficient days: that single trip covered five to six
                days of meals, working out to under ₹350 a day. The lesson
                here isn't about the amount, it's about how spending "feels"
                bigger in the moment than it turns out to be once it's
                actually placed next to the smaller, invisible charges from
                day three.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Day 6: The Almost-Missed Entry
              </h2>
              <p>
                A ₹150 cash payment to a local vendor is the one that nearly
                slips through — no digital trail, no notification, no
                receipt. This is the weak point of any tracking system:
                cash. It only gets captured because of a deliberate five-
                second pause to log it manually before the memory of the
                exact amount fades, which by the next morning it likely
                would have.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Day 7: What the Week Actually Added Up To
              </h2>
              <p>
                Looking at the full week on Trackora's analytics page rather
                than any single day, the food delivery pattern from day
                three repeats — smaller amounts recurring almost daily add up
                to more than any single "big" purchase across the whole
                week. That's the actual value of logging every day rather
                than trying to recall a week's spending from memory on
                Sunday night: memory keeps the big, dramatic purchases and
                quietly drops the small repeated ones, which is exactly
                backwards from where the real leakage tends to be.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Final Thoughts
              </h2>
              <p>
                Nothing about this week involved a single dramatic overspend.
                What it showed instead was how much small, repeatable
                spending hides in plain sight when it isn't written down in
                the moment it happens. A week is enough time to see the
                pattern; it's not enough time to fix it — that part takes
                actually looking at the numbers and deciding what, if
                anything, needs to change.
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}
