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
      slug: "fifty-thirty-twenty-rule",
      title: "The 50/30/20 Rule Explained: A Simple Budget That Works",
      excerpt:
        "Learn how the 50/30/20 budgeting rule helps you balance needs, wants, and savings.",
      date: "16 May 2026",
      readTime: "8 min read",
      category: "Budgeting",
    },
    {
      slug: "why-tracking-expenses-matters",
      title: "Why Tracking Expenses Matters More Than You Think",
      excerpt:
        "Understand why expense tracking is the foundation of financial awareness.",
      date: "15 May 2026",
      readTime: "7 min read",
      category: "Expense Tracking",
    },
    {
      slug: "monthly-budget-guide",
      title: "How to Create a Monthly Budget for Beginners",
      excerpt:
        "A practical beginner-friendly guide to creating a realistic monthly budget.",
      date: "14 May 2026",
      readTime: "9 min read",
      category: "Budgeting",
    },
    {
      slug: "upi-payments-spending-habits",
      title: "How UPI Payments Make Small Expenses Invisible",
      excerpt:
        "Digital payments make spending easier and harder to notice.",
      date: "13 May 2026",
      readTime: "6 min read",
      category: "Spending Habits",
    },
    {
      slug: "money-management-students",
      title: "Money Management Tips for Students",
      excerpt:
        "Simple financial habits students should build early.",
      date: "12 May 2026",
      readTime: "7 min read",
      category: "Student Finance",
    },
    {
      slug: "save-money-effectively",
      title: "How to Save Money Effectively Without Feeling Restricted",
      excerpt:
        "Practical ways to save money consistently without frustration.",
      date: "11 May 2026",
      readTime: "8 min read",
      category: "Savings",
    },
    {
      slug: "common-financial-mistakes",
      title: "10 Common Financial Mistakes and How to Avoid Them",
      excerpt:
        "Avoid the most common money mistakes people make.",
      date: "10 May 2026",
      readTime: "10 min read",
      category: "Finance Tips",
    },
    {
      slug: "what-is-personal-finance",
      title: "What Is Personal Finance? A Beginner’s Guide",
      excerpt:
        "Learn the basics of personal finance management.",
      date: "9 May 2026",
      readTime: "9 min read",
      category: "Finance Basics",
    },
    {
      slug: "build-better-spending-habits",
      title: "How to Build Better Spending Habits",
      excerpt:
        "Learn how small spending habits shape your financial future.",
      date: "8 May 2026",
      readTime: "7 min read",
      category: "Financial Habits",
    },
    {
      slug: "emergency-fund-guide",
      title: "Why Everyone Needs an Emergency Fund",
      excerpt:
        "Emergency funds provide financial stability during uncertainty.",
      date: "7 May 2026",
      readTime: "8 min read",
      category: "Savings",
    },

    {
      slug: "stop-living-paycheck-to-paycheck",
      title: "How to Stop Living Paycheck to Paycheck",
      excerpt:
        "Break the cycle of financial stress with practical budgeting habits.",
      date: "6 May 2026",
      readTime: "9 min read",
      category: "Budgeting",
    },
    {
      slug: "best-budgeting-methods",
      title: "Best Budgeting Methods for Beginners",
      excerpt:
        "Explore beginner-friendly budgeting systems that actually work.",
      date: "5 May 2026",
      readTime: "10 min read",
      category: "Budgeting",
    },
    {
      slug: "save-money-on-food",
      title: "How to Save Money on Food Every Month",
      excerpt:
        "Reduce food spending without sacrificing quality or convenience.",
      date: "4 May 2026",
      readTime: "7 min read",
      category: "Savings",
    },
    {
      slug: "reduce-monthly-expenses",
      title: "Simple Ways to Reduce Monthly Expenses",
      excerpt:
        "Easy ways to lower recurring expenses and improve savings.",
      date: "3 May 2026",
      readTime: "8 min read",
      category: "Money Saving",
    },
    {
      slug: "zero-based-budgeting",
      title: "Zero-Based Budgeting Explained for Beginners",
      excerpt:
        "Learn how zero-based budgeting helps control every rupee.",
      date: "2 May 2026",
      readTime: "9 min read",
      category: "Budgeting",
    },
    {
      slug: "budget-after-college",
      title: "How to Create a Budget After College",
      excerpt:
        "Financial tips for graduates starting their first jobs.",
      date: "1 May 2026",
      readTime: "8 min read",
      category: "Student Finance",
    },
    {
      slug: "where-money-goes",
      title: "Why Most People Don’t Know Where Their Money Goes",
      excerpt:
        "Digital payments make small daily spending harder to notice.",
      date: "30 April 2026",
      readTime: "7 min read",
      category: "Expense Tracking",
    },
    {
      slug: "daily-expense-tracking-habits",
      title: "Daily Expense Tracking Habits That Actually Work",
      excerpt:
        "Build realistic expense tracking habits you can maintain long term.",
      date: "29 April 2026",
      readTime: "7 min read",
      category: "Expense Tracking",
    },
    {
      slug: "expense-tracking-categories",
      title: "Best Categories for Expense Tracking",
      excerpt:
        "Using proper categories improves financial clarity and awareness.",
      date: "28 April 2026",
      readTime: "6 min read",
      category: "Expense Tracking",
    },
    {
      slug: "small-expenses-destroy-savings",
      title: "How Small Expenses Destroy Savings Over Time",
      excerpt:
        "Small purchases add up faster than most people realize.",
      date: "27 April 2026",
      readTime: "8 min read",
      category: "Savings",
    },

    {
      slug: "cash-vs-upi-spending",
      title: "Cash vs UPI Spending Psychology",
      excerpt:
        "Learn how payment methods influence spending behavior.",
      date: "26 April 2026",
      readTime: "8 min read",
      category: "Behavioral Finance",
    },
    {
      slug: "financial-mistakes-students",
      title: "Financial Mistakes College Students Make",
      excerpt:
        "Avoid common financial mistakes students make during college life.",
      date: "25 April 2026",
      readTime: "7 min read",
      category: "Student Finance",
    },
    {
      slug: "students-save-money-india",
      title: "How Students Can Save Money in India",
      excerpt:
        "Practical saving tips specifically for Indian students.",
      date: "24 April 2026",
      readTime: "8 min read",
      category: "Savings",
    },
    {
      slug: "money-habits-before-25",
      title: "Best Money Habits to Learn Before 25",
      excerpt:
        "Financial habits built early can shape long-term stability.",
      date: "23 April 2026",
      readTime: "7 min read",
      category: "Financial Habits",
    },
    {
      slug: "budgeting-hostel-students",
      title: "Budgeting Tips for Hostel Students",
      excerpt:
        "Simple budgeting ideas for students living away from home.",
      date: "22 April 2026",
      readTime: "6 min read",
      category: "Student Finance",
    },
    {
      slug: "why-financial-discipline-matters",
      title: "Why Financial Discipline Matters",
      excerpt:
        "Financial discipline is more important than income alone.",
      date: "21 April 2026",
      readTime: "8 min read",
      category: "Financial Habits",
    },
    {
      slug: "financial-stress-daily-life",
      title: "How Financial Stress Affects Daily Life",
      excerpt:
        "Money stress impacts productivity, mental peace, and decisions.",
      date: "20 April 2026",
      readTime: "7 min read",
      category: "Financial Awareness",
    },
    {
      slug: "needs-vs-wants",
      title: "The Difference Between Needs and Wants",
      excerpt:
        "Understanding needs vs wants improves financial decisions.",
      date: "19 April 2026",
      readTime: "6 min read",
      category: "Finance Basics",
    },
    {
      slug: "financial-awareness-vs-income",
      title: "Why Financial Awareness Is More Important Than Income",
      excerpt:
        "Higher income alone does not guarantee financial stability.",
      date: "18 April 2026",
      readTime: "8 min read",
      category: "Financial Awareness",
    },
    {
      slug: "lifestyle-inflation",
      title: "How Lifestyle Inflation Ruins Savings",
      excerpt:
        "Increasing lifestyle expenses can quietly destroy long-term savings.",
      date: "17 April 2026",
      readTime: "8 min read",
      category: "Savings",
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