import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function WantsCategoryBreakdown() {
  return (
    <>
      <SEOHead
        title='Why Your "Wants" Category Is Bigger Than You Think — A Trackora Breakdown — Trackora'
        description="Most people underestimate discretionary spending because it hides inside categories that feel like necessities. Here's how to spot it."
        keywords="wants vs needs budgeting, discretionary spending India, hidden spending leakage, 50/30/20 rule"
        canonicalUrl="https://trackorapp.in/blog/wants-category-breakdown"
        type="article"
        publishedTime="2026-05-01"
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
                    01 May 2026
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    6 min read
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">
                  Why Your "Wants" Category Is Bigger Than You Think
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ask most people what percentage of their spending is
                  discretionary and the answer is usually a guess in the
                  15–20% range. Look at the actual logged data and it's
                  routinely closer to 35–40%. The gap isn't dishonesty — it's
                  that wants are very good at disguising themselves as needs.
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-foreground">
                The Disguise Mechanism
              </h2>
              <p>
                Food is a need. A ₹280 home-cooked-equivalent meal from a
                delivery app, ordered because cooking felt like too much
                effort after a long day, gets mentally filed under the same
                "food, a need" label — even though the actual need (eating)
                could have been met for a fraction of the cost. The category
                is correct; the amount inside it is inflated by a want
                (convenience) wearing a need's name tag. This is the single
                biggest reason discretionary spending gets undercounted: it's
                rarely a standalone line item like "entertainment," it's
                baked into the more expensive version of something
                unavoidable.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Where This Shows Up Most in Indian Household Spending
              </h2>
              <p>
                A few categories carry this disguise particularly well.
                Food delivery versus home cooking is the clearest one —
                both get logged as "food," but the price difference between
                them is almost entirely a want. Cab rides versus public
                transport or a shared auto is another — both get you there,
                one costs three to five times more for the same trip.
                Branded groceries versus generic equivalents at the same
                kirana store is a quieter version of the same thing —
                nobody logs "brand premium" as its own line, it's absorbed
                into "groceries."
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Why This Matters More Than It Seems
              </h2>
              <p>
                This isn't an argument for cutting all of it out — a
                reasonable amount of convenience and comfort spending is a
                completely fine choice, not a failure. The problem is
                specifically not knowing the real number. Someone who
                believes they spend 15% on wants and actually spends 38% is
                planning their entire savings rate around a figure that's
                off by more than double. That gap is exactly why a savings
                goal that "should" be achievable on paper keeps not
                happening in practice — the math was built on the wrong
                starting number.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                How to Actually See the Real Number
              </h2>
              <p>
                The fix isn't stricter categorization at the moment of
                logging — most people won't reliably tag "convenience
                premium" on every order in real time. It's reviewing
                categories after the fact and asking a specific question per
                category: of this month's food spending, how much was
                genuinely unavoidable versus how much was a delivery order
                that could have been a ₹60 home meal instead? Trackora's
                analytics page makes this review possible precisely because
                every expense is already logged with a real amount and date
                — the pattern is sitting there, it just needs a second look
                with the right question in mind.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Final Thoughts
              </h2>
              <p>
                Wants aren't the enemy — an inaccurate picture of them is.
                Once the real percentage is visible, the choice to keep
                spending on convenience or cut back becomes an actual
                decision instead of a number nobody ever really checked.
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}
