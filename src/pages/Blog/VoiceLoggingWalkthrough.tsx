import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function VoiceLoggingWalkthrough() {
  return (
    <>
      <SEOHead
        title='What Happens When You Say "₹150 Petrol" Out Loud — Inside Trackora Voice Logging'
        description="A step-by-step look at what actually happens behind the scenes when you log an expense by voice in Trackora — from speech to categorized entry."
        keywords="voice expense logging, Trackora voice entry, speak to log expense, expense tracker voice India"
        canonicalUrl="https://trackorapp.in/blog/voice-logging-walkthrough"
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
                    2 June 2026
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    9 min read
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">
                  What Happens When You Say "₹150 Petrol" Out Loud (Inside Trackora's Voice Logging)
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  At a petrol pump, hands full, helmet still on — saying "₹150
                  petrol" out loud and having it logged before the bike even
                  starts is the entire point of voice logging. Here's a
                  step-by-step look at what actually happens in those two
                  seconds.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/40 text-sm">
                Disclaimer: This article describes the general behavior of
                voice logging based on typical usage. Exact recognition
                results can vary depending on accent, background noise, and
                phrasing.
              </div>

              <h2 className="text-2xl font-semibold text-foreground">
                Step 1: Speech Becomes Text
              </h2>
              <p>
                The moment "₹150 petrol" is spoken, the phrase is converted
                to text on-device before anything else happens. This step
                alone is why voice logging is faster than typing — speech
                happens at roughly 150 words per minute, while typing on a
                phone keyboard, even quickly, rarely exceeds 40. A four-word
                phrase that takes under two seconds to say would take 10-15
                seconds to type accurately, including the time to switch
                between number and letter keyboards.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Step 2: Extracting the Amount
              </h2>
              <p>
                From the text "₹150 petrol," the amount ₹150 needs to be
                identified separately from the description. This sounds
                trivial but isn't always — a phrase like "spent around 200 on
                two coffees" requires recognizing "200" as the amount despite
                the word "around" preceding it, and "two coffees" as the
                description rather than a second number to parse. The
                extraction step is built to handle this kind of natural,
                imprecise phrasing rather than requiring a rigid format like
                "amount: 200, category: coffee."
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Step 3: Matching the Description to a Category
              </h2>
              <p>
                "Petrol" maps directly to the Travel category — this is a
                straightforward keyword match. Less obvious phrases get
                handled with broader pattern matching: "samosa" and "chai"
                both map to Food, "auto" and "metro card" both map to
                Travel, "movie tickets" maps to Entertainment. The matching
                isn't perfect for every possible phrase, which is why the
                category is shown for confirmation before saving — a two-tap
                fix if "petrol" somehow got filed under the wrong bucket,
                rather than a silent miscategorization discovered weeks
                later during a review.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Step 4: Timestamping
              </h2>
              <p>
                The entry is stamped with the current date and time
                automatically — no manual date picker required. This matters
                more than it sounds: a manual date entry is one more
                decision point where logging could be abandoned ("I'll just
                fix the date later"), and "later" rarely happens. Automatic
                timestamping removes that decision entirely, which is part of
                why voice-logged entries tend to actually get logged in the
                moment rather than reconstructed from memory at the end of
                the day.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Step 5: The Confirmation Screen
              </h2>
              <p>
                Before anything is saved permanently, a brief confirmation
                shows: ₹150, Travel, today's date. This single check
                prevents two specific failure modes — a misheard amount (₹150
                heard as ₹1,500 due to background noise) and a
                miscategorized entry. Confirming takes one tap; editing any
                field, if needed, takes a few more seconds. The entire
                process, start to confirmation, typically completes in under
                five seconds for a clear, simple phrase.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Why This Specific Speed Matters
              </h2>
              <p>
                The actual value of voice logging isn't that it's a novel
                feature — it's that five-second logging is roughly the
                threshold below which people will actually use a tracking
                feature consistently. Anything that takes 20-30 seconds per
                entry — opening an app, navigating menus, typing manually —
                gets skipped during a busy day and "caught up" later from
                memory, which is far less accurate. A ₹120 chai bought at 4
                PM is easy to forget by 9 PM; logged by voice in the moment,
                it never has the chance to be forgotten.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                A Realistic Day of Voice-Logged Entries
              </h2>
              <p>
                A normal day might include: "₹40 chai" at a morning stop,
                "₹150 petrol" at the pump, "₹280 lunch" during a break, "₹60
                auto" on the way home, and "₹350 groceries" picking up
                dinner items. Five entries, each logged in under five
                seconds, totaling ₹880 for the day — a number that exists
                accurately because each entry was captured in its own
                moment, rather than estimated afterward from a hazy memory of
                "I think I spent around a thousand today."
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Final Thoughts
              </h2>
              <p>
                Voice logging isn't a gimmick layered on top of expense
                tracking — it's a direct response to the actual reason most
                tracking attempts fail: the gap between intending to log
                something and the effort required to do it. Closing that gap
                to a few seconds is what makes the difference between
                tracking that lasts a week and tracking that lasts a year.
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}