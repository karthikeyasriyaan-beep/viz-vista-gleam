import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { CurrencyProvider } from "@/components/currency-selector";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { BottomNav } from "@/components/BottomNav";
import { MobileNav } from "@/components/MobileNav";
import { PageTransition } from "@/components/PageTransition";
import { AnimatePresence } from "framer-motion";

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

import SmartBudgetingStrategies from "./pages/blog/SmartBudgetingStrategies";
import SubscriptionAuditGuide from "./pages/blog/SubscriptionAuditGuide";
import WhatIsPersonalFinance from "./pages/blog/WhatIsPersonalFinance";
import WhyTrackingExpenses from "./pages/blog/WhyTrackingExpensesMattersMoreThanYouThink";
import FiftyThirtyTwentyRule from "./pages/blog/FiftyThirtyTwentyRule";
import MoneyManagementStudents from "./pages/blog/MoneyManagementStudents";
import DigitalVsManualTracking from "./pages/blog/DigitalVsManualTracking";
import ImportanceExpenseTracking from "./pages/blog/ImportanceExpenseTracking";
import MonthlyBudgetingGuide from "./pages/blog/MonthlyBudgetingGuide";
import SavingMoneyEffectively from "./pages/blog/SavingMoneyEffectively";
import BudgetingFamilies from "./pages/blog/BudgetingFamilies";
import CommonFinancialMistakes from "./pages/blog/CommonFinancialMistakes";
import UnderstandingSpendingPatterns from "./pages/blog/UnderstandingSpendingPatterns";
import FinancialDisciplineHabits from "./pages/blog/FinancialDisciplineHabits";
import Avoidimpulsespending from "./pages/blog/Avoidimpulsespending";
import Beginnersavingstratergies from "./pages/blog/Beginnersavingstratergies";
import Budgetingmethods from "./pages/blog/Budgetingmethods";
import Buildbetterspendinghabits from "./pages/blog/Buildbetterspendinghabits";
import EmergencyFundguide from "./pages/blog/EmergencyFundguide";
import Impulsespending from "./pages/blog/Impulsespending";
import Needsvswants from "./pages/blog/Needs vs wants";
import Reducemonthlyexpenses from "./pages/blog/Reducemonthlyexpenses";
import Subscriptionspendingguide from "./pages/blog/Subscriptionspendingguide";
import Whybudgetingisimportant from "./pages/blog/Whybudgetingisimportant";
import Whyfinacialawarenessmatters from "./pages/blog/Whyfinacialawarenessmatters";
import Whysavingmoneyishard from "./pages/blog/Whysavingmoneyishard";
import Upipaymentsspendinghabit from "./pages/blog/upipaymentsspendinghabit";

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
import { CookieConsent } from "./components/CookieConsent";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
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

                <Route
                  path="/blog/smart-budgeting-strategies"
                  element={<SmartBudgetingStrategies />}
                />

                <Route
                  path="/blog/subscription-audit-guide"
                  element={<SubscriptionAuditGuide />}
                />

                <Route
                  path="/blog/what-is-personal-finance"
                  element={<WhatIsPersonalFinance />}
                />

                <Route
                  path="/blog/why-tracking-expenses"
                  element={<WhyTrackingExpenses />}
                />

                <Route
                  path="/blog/fifty-thirty-twenty-rule"
                  element={<FiftyThirtyTwentyRule />}
                />

                <Route
                  path="/blog/money-management-students"
                  element={<MoneyManagementStudents />}
                />

                <Route
                  path="/blog/digital-vs-manual-tracking"
                  element={<DigitalVsManualTracking />}
                />

                <Route
                  path="/blog/importance-expense-tracking"
                  element={<ImportanceExpenseTracking />}
                />

                <Route
                  path="/blog/monthly-budgeting-guide"
                  element={<MonthlyBudgetingGuide />}
                />

                <Route
                  path="/blog/saving-money-effectively"
                  element={<SavingMoneyEffectively />}
                />

                <Route
                  path="/blog/budgeting-families"
                  element={<BudgetingFamilies />}
                />

                <Route
                  path="/blog/common-financial-mistakes"
                  element={<CommonFinancialMistakes />}
                />

                <Route
                  path="/blog/understanding-spending-patterns"
                  element={<UnderstandingSpendingPatterns />}
                />

                <Route
                  path="/blog/financial-discipline-habits"
                  element={<FinancialDisciplineHabits />}
                />

                <Route
                  path="/blog/avoid-impulse-spending"
                  element={<Avoidimpulsespending />}
                />

                <Route
                  path="/blog/beginner-saving-strategies"
                  element={<Beginnersavingstratergies />}
                />

                <Route
                  path="/blog/budgeting-methods"
                  element={<Budgetingmethods />}
                />

                <Route
                  path="/blog/build-better-spending-habits"
                  element={<Buildbetterspendinghabits />}
                />

                <Route
                  path="/blog/emergency-fund-guide"
                  element={<EmergencyFundguide />}
                />

                <Route
                  path="/blog/impulse-spending"
                  element={<Impulsespending />}
                />

                <Route
                  path="/blog/needs-vs-wants"
                  element={<Needsvswants />}
                />

                <Route
                  path="/blog/reduce-monthly-expenses"
                  element={<Reducemonthlyexpenses />}
                />

                <Route
                  path="/blog/subscription-spending-guide"
                  element={<Subscriptionspendingguide />}
                />

                <Route
                  path="/blog/why-budgeting-is-important"
                  element={<Whybudgetingisimportant />}
                />

                <Route
                  path="/blog/why-financial-awareness-matters"
                  element={<Whyfinacialawarenessmatters />}
                />

                <Route
                  path="/blog/why-saving-money-is-hard"
                  element={<Whysavingmoneyishard />}
                />

                <Route
                  path="/blog/upi-payments-spending-habit"
                  element={<Upipaymentsspendinghabit />}
                />

                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/budgeting-guide" element={<BudgetingGuide />} />
                <Route path="/savings-guide" element={<SavingsGuide />} />

                <Route
                  path="/debt-management-guide"
                  element={<DebtManagementGuide />}
                />

                <Route path="/resources" element={<Resources />} />

                <Route
                  path="/resources/:slug"
                  element={<ResourceArticle />}
                />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </TooltipProvider>
        </CurrencyProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;