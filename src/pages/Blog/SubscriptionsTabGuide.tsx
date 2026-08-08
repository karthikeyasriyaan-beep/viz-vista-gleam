import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function SubscriptionsTabGuide() {
  return (
    <>
      <SEOHead
        title="The Subscriptions Tab: Finding the ₹999 Renewal You Forgot About — Trackora"
        description="A walkthrough of Trackora's Subscriptions page — how it surfaces forgotten recurring charges and what to actually do once you find one."
        keywords="Trackora subscriptions tracker, forgotten subscription renewal, subscription audit India app"
        canonicalUrl="https://trackorapp.in/blog/subscriptions-tab-guide"
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
                    5 June 2026
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    9 min read
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">
                  The Subscriptions Tab: Finding the ₹999 Renewal You Forgot About
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  A yearly subscription that auto-renewed once, eleven months
                  ago, doesn't show up anywhere in daily spending — it's not
                  a recent transaction, and nobody remembers a charge from
                  nearly a year back. Here's how Trackora's Subscriptions
                  page is built to surface exactly this kind of charge.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/40 text-sm">
                Disclaimer: This article describes the general functionality
                of the Subscriptions feature. Specific renewal dates and
                amounts must be entered or confirmed by the user; the feature
                does not automatically access bank or card statements.
              </div>

              <h2 className="text-2xl font-semibold text-foreground">
                Why Subscriptions Specifically Need a Separate View
              </h2>
              <p>
                A regular expense list shows transactions in the order they
                happened — useful for reviewing what was spent recently, but
                not well suited to spotting a pattern like "this exact
                charge happens every month" or "this charge happens once a
                year and is due again soon." The Subscriptions page instead
                groups recurring charges together, showing each one with its
                name, amount, and next renewal date in one place — a fixed
                list, not a scrolling transaction feed.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                What the Page Actually Shows
              </h2>
              <p>
                Each entry displays the subscription name (Netflix, Spotify,
                a cloud storage plan), the monthly or annual cost, and the
                upcoming renewal date. A combined monthly total sits at the
                top — adding up every active subscription's cost, normalized
                to a monthly figure even for annual plans, so a ₹999/year
                plan shows as roughly ₹83/month in the combined total rather
                than appearing separately as a much larger annual figure
                that's harder to compare against monthly subscriptions.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Why the Combined Total Matters More Than Any Single Entry
              </h2>
              <p>
                Six subscriptions at ₹149-299 each look individually
                negligible. Combined into a single monthly total, they might
                read ₹1,350 — a number large enough to actually prompt a
                second look, in a way that six separate small numbers
                wouldn't. This is the specific value of grouping: any one
                subscription rarely looks worth questioning on its own, but
                the combined total often does.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                The ₹999 Annual Renewal Example
              </h2>
              <p>
                Picture a ₹999/year cloud storage plan, set up once during a
                free trial conversion eleven months ago and never actively
                used since. In a regular transaction list, that single
                ₹999 charge sits buried among hundreds of more recent
                entries — invisible unless someone scrolls back nearly a
                year specifically looking for it. On the Subscriptions page,
                it appears as a standing entry with its renewal date clearly
                shown, visible every time the page is opened, regardless of
                how long ago the last actual charge happened. The renewal
                date approaching — say, three weeks away — is the kind of
                signal that prompts an actual decision: keep it, or cancel
                before it renews again.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                What to Actually Do With Each Entry
              </h2>
              <p>
                For each subscription, three honest questions are worth
                asking: was this opened or used in the last 30 days; is
                there a cheaper tier that would cover actual usage; and would
                cancelling it today be missed within a week. A "no" to the
                first question and a "no" to the third are together a strong
                signal to cancel. A subscription used regularly but on an
                oversized plan is a candidate for downgrading rather than
                cancelling outright — keeping the value while cutting the
                cost.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Why Checking Quarterly Beats a One-Time Cleanup
              </h2>
              <p>
                A single subscription cleanup, done once, only reflects what
                existed at that moment — new subscriptions get added over
                time through free trials, recommendations, and limited-time
                offers, and the list quietly grows back. Reviewing the
                Subscriptions page roughly every three months catches new
                additions before they've had a chance to renew multiple times
                unnoticed, rather than relying on a single annual cleanup to
                catch everything that's accumulated over twelve months.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Final Thoughts
              </h2>
              <p>
                The Subscriptions tab isn't solving a complicated problem —
                it's solving a very specific, narrow one: recurring charges
                are structurally easy to forget because they don't require a
                fresh decision each time, unlike a one-off purchase. A
                dedicated view that groups and totals them is a direct
                response to that specific blind spot, not a general-purpose
                feature dressed up as something more.
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}