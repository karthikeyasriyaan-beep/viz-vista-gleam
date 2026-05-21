import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function AvoidingImpulseSpending() {
  return (
    <>
      <SEOHead
        title="How to Avoid Impulse Spending"
        description="Learn practical strategies to reduce unnecessary purchases and improve financial discipline."
        keywords="impulse spending, money habits, budgeting, saving money"
        canonicalUrl="https://trackorapp.in/blog/avoiding-impulse-spending"
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
                    20 April 2026
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    8 min read
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">
                  How to Avoid Impulse Spending
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  Impulse spending can slowly damage savings without people
                  realizing how often it happens.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/40 text-sm">
                Disclaimer: Spending decisions depend on personal financial
                situations. This article is for educational purposes only.
              </div>

              <p>
                Online shopping, instant UPI payments, and one-click purchases
                make spending extremely convenient. Because transactions happen
                quickly, people often spend emotionally instead of logically.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Use the 24-Hour Rule
              </h2>

              <p>
                Before purchasing non-essential items, wait at least 24 hours.
                This creates time to decide whether the purchase is actually
                necessary.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Track Small Purchases
              </h2>

              <p>
                Small purchases often feel harmless, but repeated spending adds
                up quickly over time.
              </p>

              <p>
                Tracking these expenses increases awareness and helps reduce
                unnecessary spending habits.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Avoid Emotional Spending
              </h2>

              <p>
                Many impulse purchases happen during boredom, stress, or
                frustration. Identifying emotional triggers can reduce
                unnecessary buying behavior.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Final Thoughts
              </h2>

              <p>
                Avoiding impulse spending is not about never buying enjoyable
                things. It is about spending more intentionally and understanding
                where money goes.
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}