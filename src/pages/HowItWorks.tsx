import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, ArrowRight, UserPlus, Mic, BarChart3, 
  Target, Shield, Lightbulb, CheckCircle2, 
  Wallet, PieChart, TrendingUp, Clock, Smartphone, Laptop, Scan, Mail
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";

export default function HowItWorks() {
  const { signInWithGoogle } = useAuth();
  const howToSteps = [
    { name: "Start via Guest Mode or Gmail Login", text: "Try Trackora instantly in Guest Mode or sign in via Gmail to sync your data securely across all devices." },
    { name: "Set Up Your Safe-to-Spend Budget", text: "Configure fixed monthly expenses, subscriptions, and savings targets to auto-calculate daily spending limits." },
    { name: "Log Expenses in 3 Seconds", text: "Use quick-add, receipt scanning, or speak naturally with AI Voice Logging like '₹800 petrol'." },
    { name: "Stop UPI Micro-Leakage", text: "Automatically categorize food orders, Kirana store runs, and daily UPI payments effortlessly." },
    { name: "Track Loans, EMIs & Subscriptions", text: "Keep tabs on recurring subscriptions, active loans, and debt payoff timelines in one dashboard." },
    { name: "Optimize and Build Wealth", text: "Review weekly insights, stay within safe daily spending limits, and achieve financial clarity." }
  ];

  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Sign In with Gmail or Start in Guest Mode",
      subtitle: "100% private. One-click setup with zero bank linking",
      description: "Get started in seconds using 1-tap Gmail login or test the app freely in Guest Mode. Trackora never asks for bank account credentials, credit card details, or SMS permissions.",
      details: [
        "Seamless 1-tap Google / Gmail sign-in",
        "Instant Guest Mode access with zero signup",
        "Cloud sync across mobile and desktop via Gmail",
        "No bank credentials or SMS access needed"
      ],
      tipTitle: "Pro Tip",
      tipText: "Login with your Gmail account to keep your expense data continuously backed up and accessible across all your devices."
    },
    {
      number: "02",
      icon: Wallet,
      title: "Set Your Daily 'Safe-to-Spend' Limit",
      subtitle: "Know your actual spending capacity, not just arbitrary budgets",
      description: "Set your monthly income, fixed EMIs, bill dates, and savings targets. Trackora automatically calculates your dynamic daily 'Safe-to-Spend' balance so you never overspend.",
      details: [
        "Dynamic daily Safe-to-Spend calculation",
        "Multi-currency support including INR (₹)",
        "Automated EMI and bill deductions",
        "Customizable lifestyle spending categories"
      ],
      tipTitle: "Pro Tip",
      tipText: "Plug in your fixed bills on day one. Trackora handles the daily math so you don't have to."
    },
    {
      number: "03",
      icon: Mic,
      title: "Log in 3 Seconds with Voice & AI",
      subtitle: "Say goodbye to tedious manual expense forms",
      description: "Stop typing every transaction manually. Simply speak into Trackora using natural voice commands or snap a photo of your bills and receipts for instant logging.",
      details: [
        "Natural Voice Commands (e.g., '₹800 petrol' or '₹250 Swiggy')",
        "Smart Receipt & Snap scanning",
        "Quick 1-tap add buttons for micro-transactions",
        "Auto-suggested categories"
      ],
      tipTitle: "Pro Tip",
      tipText: "Tap the mic icon right after a UPI payment to log expenses in under 3 seconds."
    },
    {
      number: "04",
      icon: Scan,
      title: "Plug Your Micro-UPI Leakages",
      subtitle: "Track frictionless daily payments before they add up",
      description: "Small UPI scans at local Kirana stores, food delivery orders, and daily rides quickly drain your account. Trackora brings localized auto-categorization built for modern spending.",
      details: [
        "Auto-categorization for Swiggy, Zomato, Kirana, and cabs",
        "Real-time micro-expense logging",
        "Optional notes for vendor names",
        "Instant backdating for missed days"
      ],
      tipTitle: "Pro Tip",
      tipText: "Check your 'Food & Dining' category mid-week to spot small UPI leaks early."
    },
    {
      number: "05",
      icon: PieChart,
      title: "Master Subscriptions, EMIs & Goals",
      subtitle: "Never get surprised by unexpected auto-debits",
      description: "Keep all active subscriptions, loans, and custom savings goals in a single view. Receive clear reminders before auto-pay renewals hit your account.",
      details: [
        "Subscription renewal alerts",
        "Active loan & debt payoff progress",
        "Target-based savings goal trackers",
        "Interactive monthly analytics"
      ],
      tipTitle: "Pro Tip",
      tipText: "Add your subscription renewal dates to avoid paying for forgotten streaming trials."
    },
    {
      number: "06",
      icon: TrendingUp,
      title: "Optimize Spending & Build Wealth",
      subtitle: "Turn clear financial insights into lasting habits",
      description: "View intuitive visual breakdowns and weekly summaries that highlight spending patterns. Make confident decisions that increase your savings rate every month.",
      details: [
        "Category-wise expense distribution",
        "Income vs. Expense comparison graphs",
        "Historical trend analysis",
        "Milestone celebrations for savings goals"
      ],
      tipTitle: "Pro Tip",
      tipText: "Spend 3 minutes reviewing your weekly analytics every Sunday to start Monday clear and confident."
    }
  ];

  const benefits = [
    {
      icon: Mail,
      title: "Fast Gmail Login & Sync",
      description: "Sign in effortlessly with Google. Back up your data safely and sync across desktop and mobile."
    },
    {
      icon: Mic,
      title: "Voice & Snap Fast Logging",
      description: "Log spending on the go in 3 seconds using natural speech or quick receipt scanning."
    },
    {
      icon: Target,
      title: "Dynamic Safe-to-Spend",
      description: "Know your exact remaining daily limit after accounting for fixed monthly EMIs and savings goals."
    },
    {
      icon: Shield,
      title: "Zero Bank Connection Privacy",
      description: "No bank credentials required. 256-bit encryption keeps your private data strictly safe."
    }
  ];

  const faqs = [
    {
      q: "How do I log in to Trackora?",
      a: "You can sign in with one tap using your Gmail / Google account to sync your expense data across all devices. Alternatively, you can start immediately in Guest Mode with zero signup."
    },
    {
      q: "Does Trackora connect to my bank account or read my SMS?",
      a: "No. Trackora operates on a 100% privacy-first model. You do not link bank accounts or grant SMS access. Fast entry tools like AI voice logging and receipt scanning make logging frictionless."
    },
    {
      q: "What is the 'Safe-to-Spend' feature?",
      a: "Safe-to-Spend takes your total income, subtracts fixed EMIs, upcoming bills, and target savings, then calculates an exact daily budget limit so you never accidentally overspend."
    },
    {
      q: "How does Voice Logging work?",
      a: "Tap the microphone button and speak naturally (e.g., '₹350 Swiggy' or '₹1200 grocery'). Trackora automatically extracts the amount, vendor, and category in seconds."
    },
    {
      q: "Can I use Trackora on my phone without downloading an app?",
      a: "Yes! Trackora is a fast Progressive Web App (PWA). You can save it directly to your home screen on Android or iOS with zero app store downloads."
    }
  ];

  return (
    <>
      <SEOHead
        title="How Trackora Works - Voice Expense Tracking & Safe-to-Spend Budgeting"
        description="Learn how Trackora helps you control daily UPI spending with Gmail sign-in, AI voice logging, receipt scanning, zero bank linking, and dynamic Safe-to-Spend limits."
        keywords="how to use Trackora, Gmail login finance app, voice expense tracker, UPI expense tracker, safe to spend budget, privacy finance app"
        canonicalUrl="https://trackorapp.in/how-it-works"
      />
      <SchemaMarkup
        type="howto"
        name="How to Take Control of Your Daily Expenses with Trackora"
        description="A simple step-by-step guide to using Trackora's Gmail sign-in, voice logging, Safe-to-Spend budgeting, and zero bank-link expense management."
        steps={howToSteps}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2" aria-label="Trackora Home">
              <span className="font-bold text-xl text-foreground tracking-tight">Trackora</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-5xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Lightbulb className="h-4 w-4" />
              Gmail Login • Guest Mode • Voice Powered • Safe-to-Spend
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Know Exactly Where Your <span className="text-primary">Money Goes</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Master daily micro-expenses in 6 easy steps. Sign in with Gmail or Guest Mode, log spending in seconds with voice commands, and control your Safe-to-Spend limit.
            </p>
          </motion.div>

          {/* Device & Access Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Easy Access & Sync:</strong> Login with your Gmail account to sync data across all your devices, or try Guest Mode instantly with zero signup.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Steps Section */}
          <div className="space-y-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      <div className="bg-gradient-to-br from-primary to-secondary p-6 lg:p-8 lg:w-48 flex flex-col items-center justify-center text-center">
                        <span className="text-4xl lg:text-5xl font-bold text-primary-foreground opacity-80">
                          {step.number}
                        </span>
                        <step.icon className="h-8 w-8 text-primary-foreground mt-2" />
                      </div>
                      
                      <div className="flex-1 p-6 lg:p-8">
                        <div className="mb-4">
                          <h2 className="text-2xl font-bold mb-1">{step.title}</h2>
                          <p className="text-primary font-medium">{step.subtitle}</p>
                        </div>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {step.description}
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                          {step.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{detail}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">💡 {step.tipTitle}: </span>
                            {step.tipText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Trackora <span className="text-primary">Is Different</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Designed specifically to prevent micro-expense leakage without exposing your banking security.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                          <benefit.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
                      <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t">
                  <Link to="/faq" className="text-primary hover:underline font-medium inline-flex items-center gap-2">
                    View all FAQs <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-2 border-primary/20 overflow-hidden">
              <CardContent className="p-8 sm:p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Take Control of Your Daily Money
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Know exactly where your money goes. Sign in with Google with zero bank linking required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => void signInWithGoogle()}
                    size="lg"
                    className="text-lg px-10 py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-secondary"
                  >
                    Sign in with Google
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Link to="/features">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-10 py-7 rounded-2xl border-2"
                    >
                      Explore All Features
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
}