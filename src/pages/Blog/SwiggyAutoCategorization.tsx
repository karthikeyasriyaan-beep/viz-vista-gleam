import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function SwiggyAutoCategorization() {
  return (
    <>
      <SEOHead
        title='Why Trackora Recognizes "Swiggy" as Food Automatically — And What That Saves You'
        description="How Trackora's brand recognition works for Indian apps like Swiggy, Ola, and Amazon, and the real time and accuracy it saves compared to manual categorization."
        keywords="Trackora auto categorization, Swiggy Zomato Ola expense tracking, automatic expense category India"
        canonicalUrl="https://trackorapp.in/blog/swiggy-auto-categorization"
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
                    3 June 2026
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    9 min read
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">
                  Why Trackora Recognizes "Swiggy" as Food Automatically — And What That Saves You
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  Type or say "Swiggy" anywhere in an expense entry and it
                  files under Food without being asked. Same for "Ola" under
                  Travel, "Amazon" under Shopping, "Electricity" under Bills.
                  Here's why this specific design choice matters more than it
                  first appears.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/40 text-sm">
                Disclaimer: This article describes general categorization
                behavior. Brand recognition covers commonly used Indian
                services and may not include every possible merchant name.
              </div>

              <h2 className="text-2xl font-semibold text-foreground">
                The Hidden Cost of Manual Category Selection
              </h2>
              <p>
                Most expense apps ask for a category to be picked from a
                dropdown on every entry. That's a small decision — maybe two
                or three seconds — but it repeats for every single purchase,
                every day. Across 150-200 monthly transactions, that's
                roughly 6-10 minutes a month spent purely on categorization,
                not on the more useful act of actually recording what was
                spent. Automatic recognition removes that decision entirely
                for anything matching a known brand, which sounds minor until
                multiplied across a full month of daily use.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                How the Matching Actually Works
              </h2>
              <p>
                The system holds a mapped list of common Indian brands and
                services against their typical category: Swiggy and Zomato
                map to Food, Ola and Uber and "petrol" map to Travel, Amazon
                and Flipkart map to Shopping, "electricity" and "rent" map to
                Bills and Housing respectively. When a logged description
                contains one of these terms — typed or spoken — the category
                fills in automatically, with the option to override it
                before confirming. The matching looks for the brand name
                anywhere in the phrase, so "Swiggy order with friends" and
                "ordered from Swiggy" both resolve correctly.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Why Indian-Specific Recognition Matters
              </h2>
              <p>
                A generic expense tracker built for a global market typically
                recognizes brands like Starbucks or Uber Eats — names that
                mean little to someone whose actual daily spending involves
                Swiggy, Zomato, BigBasket, and local kirana stores. Building
                recognition around the specific apps and services common in
                Indian daily life means the automatic categorization actually
                fires on real transactions, rather than requiring constant
                manual override because the recognized brand list doesn't
                match local spending habits.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                A Realistic Comparison: With and Without Recognition
              </h2>
              <p>
                Without brand recognition, logging a Swiggy order means:
                type or say the amount, manually select "Food" from a
                category list, confirm. With recognition, the same entry
                becomes: type or say "₹450 Swiggy," and Food is already
                selected, ready for a single confirmation tap. The second
                version removes one full step — and across a month with 20-25
                food delivery orders alone, that's 20-25 fewer manual
                category selections, each one a small chance for a mistap or
                a wrong category that would otherwise need correcting later
                during a review.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Why Consistent Categorization Matters for Analytics
              </h2>
              <p>
                Manual categorization introduces drift over time — the same
                kind of Swiggy order might get filed under "Food" one week
                and "Entertainment" another week, depending on mood or
                carelessness in the moment. That inconsistency quietly
                corrupts a category-based spending review months later: a
                "Food" total that's actually missing several entries because
                they were filed elsewhere understates real food spending.
                Automatic categorization keeps the same brand consistently
                mapped to the same category every time, which means a
                three-month food spending trend is actually comparing the
                same thing across all three months, rather than comparing
                inconsistently-applied labels.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                What Happens With an Unrecognized Merchant
              </h2>
              <p>
                Not every purchase matches a known brand — a local tailor, an
                unfamiliar shop, a one-off service. In these cases, the
                category field simply stays open for manual selection,
                exactly as it would in an app with no recognition at all.
                The recognition system isn't trying to guess every possible
                merchant; it's specifically targeting the small set of
                brands that account for a large share of recurring daily
                spending — food delivery, ride-hailing, major e-commerce,
                utilities — where automatic matching genuinely saves
                meaningful time across dozens of monthly transactions.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Final Thoughts
              </h2>
              <p>
                Recognizing "Swiggy" as Food isn't a flashy feature — it's a
                small, repeated time-save that compounds across hundreds of
                monthly entries into a genuinely lighter tracking experience.
                More importantly, it keeps categorization consistent enough
                that the resulting spending data is actually trustworthy to
                review later, rather than scattered across inconsistently
                applied labels.
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}