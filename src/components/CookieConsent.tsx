import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";

declare function gtag(...args: any[]): void;

const COOKIE_NAME = "trackora_consent";
const COOKIE_DAYS = 365;

function setCookie(value: "accepted" | "essential-only") {
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DAYS);
  document.cookie = `${COOKIE_NAME}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
}

function getCookie(): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  return match ? match.split("=")[1] : null;
}

function loadAdSense() {
  if (document.querySelector('script[src*="adsbygoogle"]')) return;
  const s = document.createElement("script");
  s.async = true;
  s.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9073321526391845";
  s.crossOrigin = "anonymous";
  s.onerror = () => {
    console.warn("Trackora: AdSense script failed to load.");
  };
  document.head.appendChild(s);
}

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = getCookie();
    if (!consent) {
      setTimeout(() => setShowConsent(true), 1000);
    }
  }, []);

  const acceptAll = useCallback(() => {
    setCookie("accepted");
    setShowConsent(false);

    if (typeof gtag !== "undefined") {
      gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
    loadAdSense();
  }, []);

  const rejectNonEssential = useCallback(() => {
    setCookie("essential-only");
    setShowConsent(false);

    if (typeof gtag !== "undefined") {
      gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  }, []);

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:max-w-md z-50 animate-slide-up">
      <Card className="p-6 shadow-2xl border-2 bg-card/95 backdrop-blur-lg">
        <button
          onClick={rejectNonEssential}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close — essential cookies only will be used"
          title="Close — essential cookies only will be used"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3 mb-4">
          <Cookie className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-base mb-2">We value your privacy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to enhance your experience, analyze site traffic, and provide personalized content.
              Your data is always protected and never sold.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            onClick={acceptAll}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            size="sm"
          >
            Accept All
          </Button>
          <Button
            onClick={rejectNonEssential}
            variant="outline"
            className="flex-1 rounded-xl"
            size="sm"
          >
            Essential Only
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          Preferences saved for 1 year. Learn more in our{" "}
          <a href="/privacy" className="underline hover:text-primary transition-colors">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms" className="underline hover:text-primary transition-colors">
            Terms
          </a>.
        </p>
      </Card>
    </div>
  );
}