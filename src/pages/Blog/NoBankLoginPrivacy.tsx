import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function NoBankLoginPrivacy() {
  return (
    <>
      <SEOHead
        title="Why Trackora Doesn't Ask for Your Bank Login (And What That Means for Your Data) — Trackora"
        description="Trackora never asks for net banking credentials or account aggregator access. Here's the actual privacy tradeoff behind that choice."
        keywords="expense tracker privacy India, bank login security, account aggregator risk, Trackora data privacy"
        canonicalUrl="https://trackorapp.in/blog/no-bank-login-privacy"
        type="article"
        publishedTime="2026-05-06"
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
                    06 May 2026
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    5 min read
                  </div>
                </div>

                <h1 className="text-4xl font-bold mb-4">
                  Why Trackora Doesn't Ask for Your Bank Login (And What That
                  Means for Your Data)
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  A lot of expense trackers ask you to link a bank account or
                  authorize an account aggregator before you can log a single
                  rupee. Trackora doesn't. That's a deliberate choice, not a
                  missing feature — here's the actual reasoning behind it.
                </p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/40 text-sm">
                Disclaimer: This article describes Trackora's own data
                handling approach and general context about how bank-linked
                finance apps work in India. It isn't a security audit of any
                specific competitor product.
              </div>

              <h2 className="text-2xl font-semibold text-foreground">
                What "Bank Linking" Actually Involves
              </h2>
              <p>
                Apps that auto-import transactions usually do it one of two
                ways: net banking credential sharing (you type your actual
                login into a third-party screen), or the RBI's Account
                Aggregator framework, where a licensed AA fetches your
                transaction data with your consent and passes it to the app.
                The AA route is more regulated and doesn't expose your raw
                password, but either way, the app ends up holding a live,
                continuously updating feed of every transaction across your
                linked accounts — not just what you choose to share, all of
                it.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Why That's a Bigger Attack Surface Than It Sounds
              </h2>
              <p>
                The moment your full transaction history sits on a company's
                servers, that data becomes a target independent of how
                careful you personally are. A breach at the app's end — not
                your bank's — is enough to expose months of spending
                patterns, merchant names, and account balances. This isn't
                hypothetical: financial-data breaches at fintech intermediaries
                have happened before, and the exposed data is rarely just
                "amounts" — it includes exactly where, when, and how someone
                spends, which is a detailed behavioral profile in its own
                right.
              </p>
              <p>
                There's also a subtler cost: once an app has full auto-import,
                it has less reason to ask what you were actually thinking
                when you spent something. A ₹4,000 charge imported silently
                from a bank feed carries no context. The same ₹4,000 logged
                by hand — as a birthday gift, an emergency repair, a rare
                splurge — carries the context that actually helps you
                understand your own spending later.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                What Trackora Does Instead
              </h2>
              <p>
                Trackora asks you to log expenses directly — by voice, by
                scanning a receipt, or by typing them in — rather than
                pulling your full bank history in the background. That means
                Trackora never sees your net banking password, never holds a
                live feed of your account balance, and only stores what you
                actually chose to record. If you didn't log it, Trackora
                doesn't know it happened.
              </p>
              <p>
                This is a real tradeoff, not a free win: it asks a little
                more of you upfront (a few seconds to log each expense)
                instead of doing it silently in the background. In exchange,
                you keep a much smaller, much more deliberate data footprint
                sitting on any server that isn't your own bank.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Who This Tradeoff Suits
              </h2>
              <p>
                If your priority is truly zero-effort tracking and you're
                comfortable with a regulated AA-based provider handling that
                data, auto-import apps are a reasonable choice — that's a
                legitimate way to use these tools. Trackora is built for
                people who'd rather spend five seconds logging an expense
                than hand over standing access to their full financial
                history, especially given how routinely UPI is used for
                small, frequent, everyday spends in India that most people
                don't necessarily want sitting in a third-party database
                indefinitely.
              </p>

              <h2 className="text-2xl font-semibold text-foreground">
                Final Thoughts
              </h2>
              <p>
                Not asking for your bank login isn't a limitation we're
                working around — it's the actual design decision. Manual
                logging costs a few seconds per entry; a smaller data
                footprint is what you get back for that cost. Which one is
                worth it depends on how much you value not having your full
                spending history sitting outside your own bank's systems.
              </p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}
