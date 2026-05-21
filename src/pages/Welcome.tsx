"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ArrowRight, Target, BarChart3, CheckCircle2, TrendingUp, Wallet,
  Sparkles, GraduationCap, CreditCard, Users, Home, Briefcase,
  AlertCircle, Mic, ScanLine, Repeat, PiggyBank, Zap,
  TrendingDown, IndianRupee,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { useAuth } from "@/hooks/useAuth";
import { SEOHead } from "@/components/SEOHead";
import { useRef } from "react";

import dashboardPreview from "../assets/welcome-dashboard (1).png";

/* ——— Animation Variants ——— */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  })
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const textReveal = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  })
};

/* ——— Brand → Category mapping (from real app) ——— */
const brandMap = [
  { brand: "Swiggy", category: "Food" },
  { brand: "Zomato", category: "Food" },
  { brand: "Ola", category: "Travel" },
  { brand: "Uber", category: "Travel" },
  { brand: "Petrol", category: "Travel" },
  { brand: "Amazon", category: "Shopping" },
  { brand: "Flipkart", category: "Shopping" },
  { brand: "Electricity", category: "Bills" },
  { brand: "Rent", category: "Housing" },
];

const categoryColors: Record<string, string> = {
  Food: "bg-primary/10 text-primary",
  Travel: "bg-foreground/8 text-foreground",
  Shopping: "bg-foreground/8 text-foreground",
  Bills: "bg-foreground/8 text-foreground",
  Housing: "bg-foreground/8 text-foreground",
};

const Welcome = () => {
  const { enterAsGuest } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  /* Hide/show navbar on scroll */
  const [navHidden, setNavHidden] = [false, (_: boolean) => {}];
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const [_navHidden, setNavHiddenState] = [false, (_: boolean) => {}];

  // Using proper state for nav
  const [navVisible, setNavVisible] = [true, (_: boolean) => {}];

  useMotionValueEvent(scrollY, "change", (latest) => {
    // no-op: keep nav always visible on welcome page for accessibility
    lastScrollY.current = latest;
  });

  return (
    <>
      <SEOHead
        title="Trackora — Know Exactly Where Your Money Goes"
        description="Trackora is a free expense tracker built for India. Log expenses by voice, snap receipts, and see your spending clearly. Know your safe-to-spend today. No bank linking required."
        keywords="expense tracker India, voice expense entry, receipt scanner, UPI spending tracker, personal finance India, budget tracker, safe to spend, Swiggy Zomato expense"
        canonicalUrl="https://trackorapp.in"
      />

      <div className="relative min-h-screen bg-background text-foreground overflow-hidden scroll-smooth">
        <CookieConsent />

        {/* ═══════ NAVBAR ═══════ */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="mx-3 sm:mx-6 mt-2 sm:mt-4">
            <div className="bg-background/60 backdrop-blur-2xl border border-border/30 rounded-2xl shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between max-w-6xl mx-auto">
              <span className="font-extrabold text-lg sm:text-2xl text-foreground tracking-tighter">
                Trackora
              </span>
              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  onClick={enterAsGuest}
                  variant="ghost"
                  className="hidden sm:inline-flex font-bold text-sm tracking-tight"
                >
                  Enter
                </Button>
                <Button
                  onClick={enterAsGuest}
                  size="sm"
                  className="sm:hidden font-bold text-xs rounded-xl px-4"
                >
                  Start Free
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.header>

        {/* ═══════ 1. HERO ═══════ */}
        <section ref={heroRef} className="relative pt-28 sm:pt-40 md:pt-48 pb-20 sm:pb-28 md:pb-36 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div style={{ opacity: heroOpacity, y: heroY }}>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">

                {/* Left — Content */}
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.h1
                    variants={textReveal}
                    custom={0}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.05em] leading-[1.1] mb-6 sm:mb-8"
                  >
                    <span className="block">Where did</span>
                    <span className="block mt-2 sm:mt-3">₹50,000 go</span>
                    <span className="text-muted-foreground/70 block mt-2 sm:mt-3">
                      this month?
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={textReveal}
                    custom={1}
                    className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-5 sm:mb-7 max-w-xl font-medium"
                  >
                    Trackora shows you — in seconds. Speak it, snap it, or type it.
                    Your expenses, finally in one place. No bank linking. No spreadsheets.
                  </motion.p>

                  <motion.div
                    variants={textReveal}
                    custom={2}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
                  >
                    <Button
                      onClick={enterAsGuest}
                      size="lg"
                      className="text-sm sm:text-base px-6 sm:px-10 py-5 sm:py-7 rounded-xl font-extrabold tracking-tight shadow-lg hover:shadow-xl transition-all group"
                    >
                      Start tracking free
                      <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </Button>
                    <Link to="/how-it-works">
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-sm sm:text-base px-6 sm:px-10 py-5 sm:py-7 rounded-xl border-2 font-bold tracking-tight w-full sm:w-auto hover:bg-foreground hover:text-background transition-all duration-300"
                      >
                        See how it works
                      </Button>
                    </Link>
                  </motion.div>

                  {/* Trust pills */}
                  <motion.div
                    variants={textReveal}
                    custom={3}
                    className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground font-medium"
                  >
                    {["Free forever", "No bank linking", "No credit card"].map((pill) => (
                      <span key={pill} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />
                        {pill}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right — Dashboard Preview */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div className="rounded-2xl overflow-hidden border border-border/40 shadow-2xl bg-card/50 backdrop-blur-sm">
                    <img
                      src={dashboardPreview}
                      alt="Trackora dashboard showing safe to spend today, expense list, spending categories, and budget summary"
                      className="w-full h-auto"
                      loading="eager"
                    />
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.7 }}
                    className="text-[11px] sm:text-xs text-muted-foreground text-center mt-4 sm:mt-6 max-w-md mx-auto leading-relaxed font-medium"
                  >
                    Your dashboard — expenses, spending categories, and your safe-to-spend number, all in one view.
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════ 2. SAFE TO SPEND TODAY ═══════ */}
        <section className="py-16 sm:py-24 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left — mockup */}
                <motion.div variants={slideInLeft}>
                  <div className="rounded-2xl sm:rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 sm:p-10">
                    <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium uppercase tracking-widest mb-3">
                      Safe to spend today
                    </p>
                    <div className="relative mb-4">
                      <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl scale-150" />
                      <p className="relative text-5xl sm:text-6xl font-extrabold tracking-tight">
                        ₹847
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium mb-6">
                      Based on income · ₹12,400 left · 15 days remaining
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="px-4 py-4 rounded-xl bg-muted/30 border border-border/30">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="h-3.5 w-3.5 text-foreground" />
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Income</p>
                        </div>
                        <p className="text-base font-bold">+₹45,000</p>
                      </div>
                      <div className="px-4 py-4 rounded-xl bg-muted/30 border border-border/30">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Spent</p>
                        </div>
                        <p className="text-base font-bold">-₹32,600</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right — copy */}
                <motion.div variants={slideInRight}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-border/50 text-xs font-bold mb-5 sm:mb-6">
                    <IndianRupee className="h-3.5 w-3.5" />
                    Your daily number
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight">
                    Not just this month.
                    <span className="text-muted-foreground/70"> Today.</span>
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-7 font-medium">
                    Every morning, Trackora calculates exactly how much you can spend today — based on your income, what you've already spent, and how many days are left in the month.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                    No guessing. No spreadsheet math. Just one clear number that tells you whether you can order that Swiggy or not.
                  </p>
                  <div className="mt-6 sm:mt-8 space-y-3">
                    {[
                      "Updates automatically as you log",
                      "Budget-based version on the budget page",
                      "Works with both income and budget limits",
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-foreground shrink-0" />
                        <span className="text-xs sm:text-sm text-muted-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════ 3. THREE WAYS TO LOG ═══════ */}
        <section className="py-16 sm:py-24 md:py-32 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-border/50 text-xs font-bold mb-4 sm:mb-5">
                  <Zap className="h-3.5 w-3.5" />
                  Every entry takes under 5 seconds
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-5">
                  Speak it. Snap it. Done.
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  Three ways to log an expense — all faster than opening a spreadsheet.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6">

                {/* Voice */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl sm:rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 sm:p-10 hover:shadow-xl hover:border-border transition-all duration-500"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-5 sm:mb-7">
                    <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-extrabold mb-2 sm:mb-3 tracking-tight">
                    Just say it. Done.
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-5 sm:mb-7">
                    You're at a petrol pump. Hands full. Just paid ₹800. Say{" "}
                    <span className="font-semibold text-foreground">"₹800 petrol"</span> — Trackora logs it,
                    categorises it, timestamps it. Before you start the engine.
                  </p>
                  {/* Voice UI mockup */}
                  <div className="rounded-xl bg-muted/20 border border-border/30 p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mic className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground italic">"₹800 petrol"</p>
                    </div>
                    <div className="flex justify-between items-center bg-foreground/5 rounded-lg px-3 py-2.5 border border-border/30">
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5">Logged instantly</p>
                        <p className="text-sm font-semibold">₹800 · Travel · Today</p>
                      </div>
                      <span className="text-[10px] font-bold text-foreground border border-border/50 rounded-full px-2.5 py-1">
                        ✓ Done
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Works with Indian brands", "Expenses, income & savings", "Confirm before saving"].map(chip => (
                      <span key={chip} className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-border/50 text-muted-foreground">
                        {chip}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Smart Import */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl sm:rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 sm:p-10 hover:shadow-xl hover:border-border transition-all duration-500"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-5 sm:mb-7">
                    <ScanLine className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-extrabold mb-2 sm:mb-3 tracking-tight">
                    Snap the bill. Skip the math.
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-5 sm:mb-7">
                    Got a Swiggy bill? A kirana receipt? A fuel slip? Point your camera at it.
                    Trackora reads the{" "}
                    <span className="font-semibold text-foreground">amount, merchant, and date</span> — then files it
                    under the right category automatically.
                  </p>
                  {/* Receipt UI mockup */}
                  <div className="rounded-xl bg-muted/20 border border-border/30 p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/30 rounded-lg h-20 flex flex-col items-center justify-center gap-1 border border-dashed border-border/40">
                        <ScanLine className="h-4 w-4 text-muted-foreground/40" />
                        <p className="text-[10px] text-muted-foreground/40">Swiggy_bill.jpg</p>
                      </div>
                      <div className="space-y-1.5">
                        {[
                          { k: "Amount", v: "₹487" },
                          { k: "Merchant", v: "Swiggy" },
                          { k: "Category", v: "Food" },
                          { k: "Date", v: "29 Apr" },
                        ].map(row => (
                          <div key={row.k} className="flex justify-between text-[11px]">
                            <span className="text-muted-foreground">{row.k}</span>
                            <span className="font-semibold">{row.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 text-center text-[11px] font-semibold bg-foreground/5 rounded-lg py-1.5 border border-border/30">
                      Confirm &amp; save →
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Swiggy · Zomato", "Kirana bills", "Petrol slips"].map(chip => (
                      <span key={chip} className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-border/50 text-muted-foreground">
                        {chip}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════ 4. AUTO-CATEGORISATION ═══════ */}
        <section className="py-16 sm:py-24 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left — copy */}
                <motion.div variants={slideInLeft}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-border/50 text-xs font-bold mb-5 sm:mb-6">
                    <Sparkles className="h-3.5 w-3.5" />
                    Built for India
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight">
                    Say Swiggy.{" "}
                    <span className="text-muted-foreground/70">We know it's food.</span>
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6 font-medium">
                    No category dropdowns. No manual sorting. Trackora recognises Indian brands
                    and apps automatically — and assigns the right category before you even tap confirm.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                    Works whether you log by voice, text, or receipt scan. The moment you say
                    "Ola" — it's already Travel.
                  </p>
                </motion.div>

                {/* Right — brand grid */}
                <motion.div variants={slideInRight}>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {brandMap.map((item, idx) => (
                      <motion.div
                        key={item.brand}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-3 sm:p-4 flex flex-col gap-2 hover:border-border hover:shadow-md transition-all duration-300"
                      >
                        <span className="text-xs sm:text-sm font-bold">{item.brand}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${categoryColors[item.category] || "bg-foreground/8 text-foreground"}`}>
                          {item.category}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center mt-4 font-medium">
                    Recognised automatically — no setup needed
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════ 5. PROBLEM / SOLUTION ═══════ */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
                  The problem every Indian knows
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                  UPI made paying ₹40 as easy as breathing — and that's the problem.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
                <motion.div variants={slideInLeft}>
                  <div className="h-full rounded-2xl sm:rounded-3xl border border-destructive/20 bg-destructive/5 p-5 sm:p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-destructive/10">
                        <AlertCircle className="h-5 w-5 sm:h-7 sm:w-7 text-destructive" />
                      </div>
                      <h3 className="text-lg sm:text-2xl font-extrabold">The problem</h3>
                    </div>
                    <div className="space-y-3 sm:space-y-5">
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                        Salary credited on the 1st. By the 20th, ₹4,000 left and no memory of where the rest went.
                        It wasn't one big purchase — it was a hundred small ones.
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                        A Swiggy order here. A UPI transfer there. A subscription you forgot about.
                        <strong className="text-foreground"> UPI makes spending invisible.</strong> And you can't fix what you can't see.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={slideInRight}>
                  <div className="h-full rounded-2xl sm:rounded-3xl border border-foreground/20 bg-foreground/5 p-5 sm:p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-foreground/10">
                        <CheckCircle2 className="h-5 w-5 sm:h-7 sm:w-7 text-foreground" />
                      </div>
                      <h3 className="text-lg sm:text-2xl font-extrabold">The solution</h3>
                    </div>
                    <div className="space-y-3 sm:space-y-5">
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                        <strong className="text-foreground">Trackora makes every rupee visible.</strong> Log in seconds.
                        Review in minutes. Understand in a week.
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                        No bank linking. No complicated setup. Just a simple habit of logging what you spend —
                        and a dashboard that shows you the truth clearly.
                      </p>
                      <div className="space-y-2 mt-2">
                        {[
                          "Works with cash and UPI both",
                          "No bank account linking needed",
                          "See patterns in 7 days of logging",
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-foreground shrink-0" />
                            <span className="text-xs sm:text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════ 6. FEATURES — 6 CARDS ═══════ */}
        <section className="py-16 sm:py-24 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
                  Everything in one place
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                  Every tool you need to understand and manage your money — free, no bank linking required.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    icon: Wallet,
                    title: "Expense tracking",
                    desc: "Log anything in seconds — voice, receipt, or manual. Every expense stays organised by category and date. Edit or delete any time.",
                  },
                  {
                    icon: BarChart3,
                    title: "Analytics & insights",
                    desc: "Your money story — income vs expenses over 3, 6, or 12 months. See your savings rate, top spending categories, and smart alerts. No AI, just your real numbers.",
                  },
                  {
                    icon: Wallet,
                    title: "Budget planning",
                    desc: "Set a monthly limit and limits per category. Progress bars show how close you are. Get a gentle alert before you cross — not after.",
                  },
                  {
                    icon: PiggyBank,
                    title: "Savings goals",
                    desc: "Create a goal, set a target and deadline, track contributions. Progress bars fill as you save. Emergency fund, trip, gadget — whatever matters to you.",
                  },
                  {
                    icon: Repeat,
                    title: "Subscriptions",
                    desc: "All your active subscriptions — Netflix, Spotify, Zomato Gold — in one view with monthly cost and renewal dates. Find the ones you forgot about.",
                  },
                  {
                    icon: CreditCard,
                    title: "Loans & debts",
                    desc: "Track all your active loans — home, car, personal, credit card. See total outstanding, paid off percentage, and EMI details in one screen.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="h-full rounded-2xl sm:rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-5 sm:p-8 hover:shadow-xl hover:border-border transition-all duration-500 hover:-translate-y-1">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5">
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={2} />
                      </div>
                      <h3 className="text-sm sm:text-lg font-bold mb-2 sm:mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-[11px] sm:text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════ 7. HOW IT WORKS — 3 STEPS ═══════ */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
                  Start in under 60 seconds
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                  No setup. No bank linking. No credit card.
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-3 gap-3 sm:gap-8 relative">
                  <div className="hidden sm:block absolute top-10 sm:top-12 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-foreground/30 via-foreground/10 to-foreground/30" />

                  {[
                    {
                      step: "1",
                      title: "Enter free",
                      desc: "No signup needed to explore. Guest mode is instant — just tap and go.",
                    },
                    {
                      step: "2",
                      title: "Log expenses",
                      desc: "Speak it, snap it, or type it. Every entry takes under 5 seconds.",
                    },
                    {
                      step: "3",
                      title: "See where it goes",
                      desc: "Dashboard shows spending by category, your safe-to-spend, and trends over time.",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.step}
                      variants={fadeUp}
                      custom={idx}
                      className="text-center relative"
                    >
                      <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-6 rounded-2xl sm:rounded-3xl bg-foreground text-background flex items-center justify-center text-xl sm:text-3xl font-extrabold shadow-xl relative z-10">
                        {item.step}
                      </div>
                      <h3 className="text-xs sm:text-xl font-extrabold mb-1 sm:mb-3">{item.title}</h3>
                      <p className="text-muted-foreground text-[10px] sm:text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div variants={fadeUp} className="text-center mt-10 sm:mt-14">
                <Button
                  onClick={enterAsGuest}
                  size="lg"
                  className="text-sm sm:text-base px-8 sm:px-12 py-5 sm:py-6 rounded-xl font-extrabold tracking-tight shadow-lg group"
                >
                  Try it now — no signup needed
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════ 8. WHO IT'S FOR ═══════ */}
        <section className="py-16 sm:py-24 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
                  Built for how Indians actually spend
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                  Swiggy orders, UPI transfers, EMIs, OTT subscriptions — Trackora understands your real life.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {[
                  {
                    icon: GraduationCap,
                    title: "Students",
                    description: "Managing pocket money or first salary. No financial background needed — Trackora is simple by design.",
                  },
                  {
                    icon: Briefcase,
                    title: "Professionals",
                    description: "EMIs, subscriptions, dining out. You earn well. Trackora shows you exactly where it goes.",
                  },
                  {
                    icon: Home,
                    title: "Families",
                    description: "Track household expenses without a spreadsheet war. One place for rent, groceries, school fees, and more.",
                  },
                  {
                    icon: Users,
                    title: "Freelancers",
                    description: "Variable income, fixed expenses. Knowing your baseline spend is survival. Trackora shows your real monthly net.",
                  },
                  {
                    icon: CreditCard,
                    title: "Debt-free seekers",
                    description: "Find the extra ₹5,000 a month hiding in plain sight. Log everything and watch the loans shrink.",
                  },
                  {
                    icon: Target,
                    title: "Goal setters",
                    description: "Saving for something specific? Set a goal, track contributions, and protect it every single month.",
                  },
                ].map((useCase, idx) => (
                  <motion.div key={useCase.title} variants={scaleIn} custom={idx}>
                    <div className="h-full rounded-xl sm:rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-4 sm:p-7 hover:shadow-xl hover:border-border transition-all duration-500 hover:-translate-y-1">
                      <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-foreground/5 w-fit mb-3 sm:mb-5">
                        <useCase.icon className="h-4 w-4 sm:h-6 sm:w-6 text-foreground" />
                      </div>
                      <h3 className="text-sm sm:text-xl font-extrabold mb-1 sm:mb-3">{useCase.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-[11px] sm:text-sm">{useCase.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════ 9. FOUNDER NOTE ═══════ */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-border/50 text-xs font-bold mb-4">
                  <Users className="h-3.5 w-3.5" />
                  The builder
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                  Built from something I witnessed at home
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                  No investors. No startup. A student from Hyderabad.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="rounded-2xl sm:rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 sm:p-10 grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-start"
              >
                {/* Avatar + name */}
                <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-foreground/8 border border-border/50 flex items-center justify-center text-2xl font-bold text-foreground flex-shrink-0">
                    S
                  </div>
                  <div className="sm:text-center">
                    <p className="text-sm font-bold">Sriyaan</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Student · Hyderabad, India</p>
                    <span className="mt-2 inline-block text-[10px] font-medium text-muted-foreground border border-border/40 rounded-full px-2.5 py-0.5">
                      Builder · Not a startup
                    </span>
                  </div>
                </div>

                {/* Quote + body */}
                <div>
                  <div className="rounded-xl bg-foreground/5 border border-border/40 px-4 py-3 mb-5 sm:mb-6">
                    <p className="text-sm sm:text-base text-foreground font-semibold leading-relaxed">
                      "UPI is making money invisible" — I didn't just read that. I saw it happen with my own parents.
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                    I'm Sriyaan, a student from Hyderabad. I didn't build Trackora because of a lecture on personal finance.
                    I built it because I watched my parents — hardworking, careful people — repeatedly reach the end of the
                    month not knowing where the money went.
                  </p>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                    It wasn't reckless spending. It was UPI making every ₹80 grocery run and ₹340 Swiggy order
                    frictionless and forgettable.{" "}
                    <strong className="text-foreground">So I built something that makes it visible.</strong>
                  </p>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    If this sounds like your house too, Trackora is for you.
                  </p>

                  <div className="mt-5 sm:mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">— Sriyaan, Hyderabad</span>
                    <span className="text-[10px] text-muted-foreground/60">Created by Sriyaan Karthikeya</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════ 10. FAQ + FINAL CTA ═══════ */}
        <section className="py-16 sm:py-24 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="max-w-3xl mx-auto"
            >
              <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-14">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
                  Common questions
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Honest answers — no marketing fluff.
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Accordion type="single" collapsible className="space-y-3 sm:space-y-4 mb-14 sm:mb-20">
                  {[
                    {
                      q: "Is Trackora free?",
                      a: "Yes. Trackora is completely free to use. No credit card, no trial period, no hidden limits. If that ever changes, existing users will be told well in advance.",
                    },
                    {
                      q: "Do I need to link my bank account?",
                      a: "No. Trackora never connects to your bank. You log expenses yourself — manually, by voice, or by scanning a receipt. Your banking details stay entirely with you.",
                    },
                    {
                      q: "What if I forget to log some expenses?",
                      a: "That's completely fine. Approximate it and move on. A slightly imprecise record you maintain for 6 months is far more useful than a perfect one you abandon in week two. Consistency always beats accuracy.",
                    },
                    {
                      q: "Is my data safe?",
                      a: "Your data is stored securely and never shared, sold, or used for ads. You can delete your account and all associated data at any time from settings.",
                    },
                  ].map((faq, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`faq-${idx}`}
                      className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm px-5 sm:px-6 data-[state=open]:shadow-lg transition-all duration-300"
                    >
                      <AccordionTrigger className="text-sm sm:text-base font-bold hover:no-underline py-5 sm:py-6">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-5 sm:pb-6">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>

              {/* Final CTA */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="relative p-6 sm:p-10 md:p-14 text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-3 sm:mb-4">
                      Start knowing where your money goes
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
                      No signup needed to explore. No bank linking. No credit card.
                      Just open it and start logging.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                      <Button
                        onClick={enterAsGuest}
                        size="lg"
                        className="text-sm sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all group font-extrabold"
                      >
                        Start tracking free
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Link to="/faq">
                        <Button
                          variant="outline"
                          size="lg"
                          className="text-sm sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-xl sm:rounded-2xl border-2 font-bold w-full sm:w-auto"
                        >
                          Read the FAQ
                        </Button>
                      </Link>
                    </div>
                    {/* Inline trust signals */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
                      {["Free forever", "No bank linking", "Built in Hyderabad, India"].map(pill => (
                        <span key={pill} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-foreground/60" />
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Welcome;