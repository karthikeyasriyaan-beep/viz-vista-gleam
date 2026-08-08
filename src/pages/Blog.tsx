import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function Blog() {
  const blogPosts = [
    {
      slug: "safe-to-spend-number",
      title: "The Safe-to-Spend Number: Why One Daily Figure Beats a 12-Category Budget",
      excerpt: "Discover how tracking a single daily number can simplify your finances more effectively than tedious multi-category budgeting.",
      date: "16 May 2026",
      readTime: "6 min read",
      category: "Budgeting",
    },
    {
      slug: "voice-logging-petrol-expense",
      title: "What Happens When You Say \"₹150 Petrol\" Out Loud (Inside Trackora's Voice Logging)",
      excerpt: "An inside look at how Trackora's hands-free voice logging interprets your speech to log expenses on the go instantly.",
      date: "15 May 2026",
      readTime: "5 min read",
      category: "Features",
    },
    {
      slug: "automatic-swiggy-categorization",
      title: "Why Trackora Recognizes \"Swiggy\" as Food Automatically — And What That Saves You",
      excerpt: "Learn how smart auto-categorization maps merchants perfectly behind the scenes to save you time and manual clicks.",
      date: "14 May 2026",
      readTime: "5 min read",
      category: "Automation",
    },
    {
      slug: "scanning-kirana-receipt-vs-typing",
      title: "Scanning a Kirana Receipt vs Typing It In: A Real Time Comparison",
      excerpt: "We put Trackora's smart OCR camera receipt scanner up against manual logging to see exactly how much speed you gain.",
      date: "13 May 2026",
      readTime: "7 min read",
      category: "Productivity",
    },
    {
      slug: "subscriptions-tab-forgotten-renewals",
      title: "The Subscriptions Tab: Finding the ₹999 Renewal You Forgot About",
      excerpt: "Uncover hidden monthly leaks and master recurring payment visibility using Trackora's dedicated subscription tracking.",
      date: "12 May 2026",
      readTime: "6 min read",
      category: "Savings",
    },
    {
      slug: "budget-page-vs-dashboard",
      title: "How Trackora's Budget Page Differs From Its Dashboard — And When to Use Each",
      excerpt: "Understand the tactical differences between looking at your daily operations vs analyzing your long-term budget caps.",
      date: "11 May 2026",
      readTime: "5 min read",
      category: "App Guide",
    },
    {
      slug: "savings-goals-with-deadline",
      title: "Savings Goals With a Deadline: Why \"Trip by December\" Beats \"Save More\"",
      excerpt: "Why abstract saving milestones fail and how specific, time-bound targets inside Trackora push you to succeed.",
      date: "10 May 2026",
      readTime: "6 min read",
      category: "Savings",
    },
    {
      slug: "loans-emi-outstanding-percentage",
      title: "Tracking Loans and EMIs in One Place: What the Outstanding Percentage Actually Tells You",
      excerpt: "Demystify debt breakdown and track exactly how close you are to absolute financial freedom with debt tracking metrics.",
      date: "09 May 2026",
      readTime: "8 min read",
      category: "Debt Management",
    },
    {
      slug: "log-it-later-kills-tracking",
      title: "Why \"I'll Log It Later\" Kills Expense Tracking (And What to Do Instead)",
      excerpt: "The single habit that breaks most expense tracking attempts — and the exact changes that make in-the-moment logging sustainable.",
      date: "08 May 2026",
      readTime: "10 min read",
      category: "Habits",
    },
    {
      slug: "analytics-page-spending-trends",
      title: "The Analytics Page Explained: Reading Your 3-Month Spending Trend Correctly",
      excerpt: "Stop obsessing over one-off bad days. Learn how to identify and read multi-month behavioral trend lines.",
      date: "07 May 2026",
      readTime: "7 min read",
      category: "Analytics",
    },
    {
      slug: "no-bank-login-privacy",
      title: "Why Trackora Doesn't Ask for Your Bank Login (And What That Means for Your Data)",
      excerpt: "Explore our fundamental commitment to local-first privacy security and why we don't scrape your sensitive credentials.",
      date: "06 May 2026",
      readTime: "5 min read",
      category: "Privacy",
    },
    {
      slug: "week-inside-trackora-logging",
      title: "A Week Inside Trackora: Logging Every Expense for 7 Days, Category by Category",
      excerpt: "A field study logging real-world variable spending for a week straight and the resulting financial epiphanies.",
      date: "05 May 2026",
      readTime: "9 min read",
      category: "Case Study",
    },
    {
      slug: "splitting-hostel-expenses-students",
      title: "Splitting Hostel Expenses: Using Trackora as a Student Living Away From Home",
      excerpt: "Practical tactics for college students to split rent, mess bills, and late-night snacks cleanly without ruining friendships.",
      date: "04 May 2026",
      readTime: "6 min read",
      category: "Student Finance",
    },
    {
      slug: "freelancers-fixed-budget-problem",
      title: "The Freelancer's Problem With Fixed Budgets — And How Percentage Tracking Fixes It",
      excerpt: "Static monthly budgets break when income is volatile. Learn how dynamic percentage allocations save the day.",
      date: "03 May 2026",
      readTime: "8 min read",
      category: "Freelancing",
    },
    {
      slug: "festival-season-spending-diwali-eid",
      title: "Festival Season Spending: Tracking Diwali or Eid Expenses Without Losing the Plot",
      excerpt: "How to enjoy traditional family holidays, buy gifts, and celebrate without suffering a crushing financial hangover in January.",
      date: "02 May 2026",
      readTime: "7 min read",
      category: "Budgeting",
    },
    {
      slug: "wants-category-breakdown",
      title: "Why Your \"Wants\" Category Is Bigger Than You Think — A Trackora Breakdown",
      excerpt: "Confronting sneaky spending leakage that hides under the guise of daily absolute necessities.",
      date: "01 May 2026",
      readTime: "6 min read",
      category: "Spending Habits",
    },
    {
      slug: "emi-stacking-multiple-loans",
      title: "EMI Stacking: What Happens When Two Loans Hit the Same Month",
      excerpt: "Strategic survival blueprints for handling overlapping cash crunches when multiple payments align concurrently.",
      date: "30 April 2026",
      readTime: "7 min read",
      category: "Debt Management",
    },
    {
      slug: "salaried-month-timeline-mapping",
      title: "From Salary Day to the 25th: Mapping a Real Indian Salaried Month",
      excerpt: "A realistic look into the emotional and physical arc of a typical paycheck lifecycle from early luxury to late-month survival.",
      date: "29 April 2026",
      readTime: "8 min read",
      category: "Financial Awareness",
    },
    {
      slug: "six-month-income-vs-expense",
      title: "Why Trackora Shows Income vs Expenses Over 6 Months, Not Just This Month",
      excerpt: "Why short-term views distort reality, and how zooming out to a 6-month macroeconomic perspective changes your outlook.",
      date: "28 April 2026",
      readTime: "6 min read",
      category: "Analytics",
    },
    {
      slug: "budget-app-vs-expense-tracker",
      title: "The Honest Difference Between a Budget App and an Expense Tracker (And Why Trackora Is Both)",
      excerpt: "Reactive logging tells you where you went; proactive budgeting says where you are going. Here's how to mesh both seamlessly.",
      date: "27 April 2026",
      readTime: "8 min read",
      category: "Finance Basics",
    },
  ];

  return (
    <>
      <SEOHead
        title="Trackora Blog - Budgeting, Saving & Personal Finance"
        description="Read practical finance guides on budgeting, saving money, expense tracking, and financial awareness."
        keywords="budgeting blog, personal finance, saving money, expense tracking"
        canonicalUrl="https://trackorapp.in/blog"
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-6xl">

          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Trackora Blog
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl">
                Financial tips, budgeting guides, and practical money advice
                to help you understand spending habits and make smarter
                financial decisions.
              </p>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <div key={post.slug}>
                <Link to={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6 sm:p-8 space-y-4">

                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <span className="px-3 py-1 rounded-full bg-primary/10">
                          {post.category}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </div>

                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}