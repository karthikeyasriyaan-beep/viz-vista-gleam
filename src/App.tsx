import { useLocation, Outlet, Route, Routes, Navigate, useParams } from "react-router-dom";
import type { ComponentType } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { CurrencyProvider } from "@/components/currency-selector";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { BottomNav } from "@/components/BottomNav";
import { MobileNav } from "@/components/MobileNav";
import { PageTransition } from "@/components/PageTransition";
import { CookieConsent } from "@/components/CookieConsent";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import SmartImport from "./pages/SmartImport";
import Analytics from "./pages/Analytics";
import Subscriptions from "./pages/Subscriptions";
import Loans from "./pages/Loans";
import Savings from "./pages/Savings";
import Budget from "./pages/Budget";
import Settings from "./pages/Settings";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Disclaimer from "./pages/Disclaimer";
import HowItWorks from "./pages/HowItWorks";
import BudgetingGuide from "./pages/BudgetingGuide";
import SavingsGuide from "./pages/SavingsGuide";
import DebtManagementGuide from "./pages/DebtManagementGuide";
import Resources from "./pages/Resources";
import ResourceArticle from "./pages/ResourceArticle";
import ResetPassword from "./pages/ResetPassword";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

// ——— Blog Imports (first 10) ———
import SafeToSpendNumber from "./pages/Blog/SafeToSpendNumber";
import VoiceLoggingWalkthrough from "./pages/Blog/VoiceLoggingWalkthrough";
import SwiggyAutoCategorization from "./pages/Blog/SwiggyAutoCategorization";
import ReceiptScanVsTyping from "./pages/Blog/ReceiptScanVsTyping";
import SubscriptionsTabGuide from "./pages/Blog/SubscriptionsTabGuide";
import BudgetPageVsDashboard from "./pages/Blog/BudgetPageVsDashboard";
import SavingsGoalsWithDeadlines from "./pages/Blog/SavingsGoalsWithDeadlines";
import LoansEmiOutstandingPercentage from "./pages/Blog/LoansEmiOutstandingPercentage";
import LogItLaterKillsTracking from "./pages/Blog/LogItLaterKillsTracking";
import AnalyticsPageExplained from "./pages/Blog/AnalyticsPageExplained";

const queryClient = new QueryClient();

const blogArticleMap: Record<string, ComponentType> = {
  "safe-to-spend-number": SafeToSpendNumber,
  "voice-logging-petrol-expense": VoiceLoggingWalkthrough,
  "automatic-swiggy-categorization": SwiggyAutoCategorization,
  "scanning-kirana-receipt-vs-typing": ReceiptScanVsTyping,
  "subscriptions-tab-forgotten-renewals": SubscriptionsTabGuide,
  "budget-page-vs-dashboard": BudgetPageVsDashboard,
  "savings-goals-with-deadline": SavingsGoalsWithDeadlines,
  "loans-emi-outstanding-percentage": LoansEmiOutstandingPercentage,
  "log-it-later-kills-tracking": LogItLaterKillsTracking,
  "analytics-page-spending-trends": AnalyticsPageExplained,
};

function BlogArticleRouter() {
  const { slug } = useParams();
  const Article = slug ? blogArticleMap[slug] : undefined;

  if (!Article) {
    return <Navigate to="/blog" replace />;
  }

  return <Article />;
}

function AppLayout() {
  const location = useLocation();
  const publicPaths = [
    "/",
    "/privacy",
    "/terms",
    "/features",
    "/about",
    "/contact",
    "/faq",
    "/blog",
    "/disclaimer",
    "/reset-password",
    "/how-it-works",
    "/budgeting-guide",
    "/savings-guide",
    "/debt-management-guide",
    "/resources",
  ];
  const hideNavPaths = ["/onboarding"];
  const showNav =
    !publicPaths.includes(location.pathname) &&
    !location.pathname.startsWith("/blog/") &&
    !location.pathname.startsWith("/resources/") &&
    !hideNavPaths.includes(location.pathname);

  return (
    <div className="min-h-screen w-full overflow-x-hidden scroll-smooth flex">
      {showNav && <DesktopSidebar />}
      <div className="flex-1 flex flex-col min-w-0">
        {showNav && <MobileNav />}
        <div className={showNav ? "pt-14 sm:pt-16 lg:pt-0 pb-16 lg:pb-0" : ""}>
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </div>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <AuthProvider>
        <CurrencyProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <CookieConsent />
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Welcome />} />

                <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/smart-import" element={<SmartImport />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/loans" element={<Loans />} />
                  <Route path="/savings" element={<Savings />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>

                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/features" element={<Features />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogArticleRouter />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/budgeting-guide" element={<BudgetingGuide />} />
                <Route path="/savings-guide" element={<SavingsGuide />} />
                <Route path="/debt-management-guide" element={<DebtManagementGuide />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/:slug" element={<ResourceArticle />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </TooltipProvider>
        </CurrencyProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}