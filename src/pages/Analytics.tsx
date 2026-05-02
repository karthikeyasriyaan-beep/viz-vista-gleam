import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";
import {
  TrendingUp, TrendingDown, Wallet, PiggyBank, CreditCard, Repeat,
  ArrowUpRight, ArrowDownRight, Target, AlertTriangle, Sparkles, BarChart3,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// ---------- helpers ----------
function parseAppDate(d: string | Date): Date {
  if (d instanceof Date) return d;
  const [y, m, day] = d.split("-").map(Number);
  if (y && m && day) return new Date(y, m - 1, day);
  return new Date(d);
}

const monthLabel = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });

const easing = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: easing },
  }),
};

// ---------- chart tooltip ----------
const ChartTip = ({ active, payload, label, formatAmount }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border/40 bg-background/95 backdrop-blur-md px-3 py-2 shadow-xl">
      {label && <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-bold tabular-nums">{formatAmount(Number(p.value))}</span>
        </div>
      ))}
    </div>
  );
};

// ---------- stat card ----------
function StatCard({ label, value, delta, icon: Icon, tone = "neutral", index = 0 }: any) {
  const positive = delta != null && delta >= 0;
  return (
    <motion.div
      variants={fadeUp} initial="hidden" animate="show" custom={index}
      className="relative overflow-hidden rounded-2xl border border-border/30 bg-card p-4 sm:p-5 group hover:border-border/60 transition-colors"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-foreground/[0.02] to-transparent pointer-events-none" />
      <div className="flex items-start justify-between mb-3 relative">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground/70" />
      </div>
      <div className="text-xl sm:text-2xl font-extrabold tracking-tight tabular-nums relative">{value}</div>
      {delta != null && (
        <div className={cn(
          "mt-2 inline-flex items-center gap-1 text-[11px] font-medium",
          tone === "expense" ? (positive ? "text-rose-500" : "text-emerald-500")
                              : (positive ? "text-emerald-500" : "text-rose-500")
        )}>
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          <span className="tabular-nums">{Math.abs(delta).toFixed(1)}%</span>
          <span className="text-muted-foreground font-normal">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}

// ---------- main ----------
export default function Analytics() {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();
  const [range, setRange] = useState<"3m" | "6m" | "12m">("6m");

  const fetchAll = (table: string) => async (): Promise<any[]> => {
    if (!user) return [];
    const { data } = await (supabase.from(table as any) as any).select("*").eq("user_id", user.id);
    return (data as any[]) || [];
  };

  const { data: expenses = [], isLoading: l1 } = useQuery({ queryKey: ["expenses", user?.id], queryFn: fetchAll("expenses"), enabled: !!user });
  const { data: income = [], isLoading: l2 } = useQuery({ queryKey: ["income", user?.id], queryFn: fetchAll("income"), enabled: !!user });
  const { data: subscriptions = [], isLoading: l3 } = useQuery({ queryKey: ["subscriptions", user?.id], queryFn: fetchAll("subscriptions"), enabled: !!user });
  const { data: loans = [], isLoading: l4 } = useQuery({ queryKey: ["loans", user?.id], queryFn: fetchAll("loans"), enabled: !!user });
  const { data: savings = [], isLoading: l5 } = useQuery({ queryKey: ["savings", user?.id], queryFn: fetchAll("savings"), enabled: !!user });

  const isLoading = l1 || l2 || l3 || l4 || l5;

  // ------ aggregations ------
  const totals = useMemo(() => {
    const totalIncome = income.reduce((s: number, x: any) => s + Number(x.amount || 0), 0);
    const totalExpenses = expenses.reduce((s: number, x: any) => s + Number(x.amount || 0), 0);
    const net = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (net / totalIncome) * 100 : 0;
    return { totalIncome, totalExpenses, net, savingsRate };
  }, [income, expenses]);

  // monthly trend
  const monthlyTrend = useMemo(() => {
    const months = range === "3m" ? 3 : range === "6m" ? 6 : 12;
    const now = new Date();
    const map = new Map<string, { key: string; label: string; income: number; expense: number; net: number }>();
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      map.set(key, { key, label: monthLabel(d), income: 0, expense: 0, net: 0 });
    }
    for (const inc of income) {
      const d = parseAppDate(inc.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const slot = map.get(key); if (slot) slot.income += Number(inc.amount || 0);
    }
    for (const ex of expenses) {
      const d = parseAppDate(ex.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const slot = map.get(key); if (slot) slot.expense += Number(ex.amount || 0);
    }
    const arr = Array.from(map.values());
    arr.forEach(m => m.net = m.income - m.expense);
    return arr;
  }, [income, expenses, range]);

  // month-over-month deltas
  const deltas = useMemo(() => {
    if (monthlyTrend.length < 2) return { income: 0, expense: 0, net: 0 };
    const cur = monthlyTrend[monthlyTrend.length - 1];
    const prev = monthlyTrend[monthlyTrend.length - 2];
    const pct = (a: number, b: number) => b === 0 ? 0 : ((a - b) / Math.abs(b)) * 100;
    return { income: pct(cur.income, prev.income), expense: pct(cur.expense, prev.expense), net: pct(cur.net, prev.net) };
  }, [monthlyTrend]);

  // category breakdown for spending
  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of expenses) {
      const cat = e.category || "Other";
      map.set(cat, (map.get(cat) || 0) + Number(e.amount || 0));
    }
    const arr = Array.from(map.entries())
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount);
    const total = arr.reduce((s, x) => s + x.amount, 0);
    return arr.map(x => ({ ...x, pct: total > 0 ? (x.amount / total) * 100 : 0 }));
  }, [expenses]);

  // top recurring (subscriptions)
  const subsMonthly = useMemo(() => {
    const active = subscriptions.filter((s: any) => s.status === "active");
    const total = active.reduce((s: number, x: any) => {
      const a = Number(x.amount || 0);
      return s + (x.billing_cycle === "yearly" ? a / 12 : a);
    }, 0);
    return { active, total };
  }, [subscriptions]);

  // loans
  const loanStats = useMemo(() => {
    const active = loans.filter((l: any) => l.status === "active");
    const debt = active.reduce((s: number, l: any) => s + Number(l.current_balance || 0), 0);
    const initial = active.reduce((s: number, l: any) => s + Number(l.initial_amount || 0), 0);
    const paid = initial - debt;
    const pct = initial > 0 ? (paid / initial) * 100 : 0;
    return { active, debt, initial, paid, pct };
  }, [loans]);

  // savings
  const savingsStats = useMemo(() => {
    const target = savings.reduce((s: number, x: any) => s + Number(x.target_amount || 0), 0);
    const saved = savings.reduce((s: number, x: any) => s + Number(x.current_amount || 0), 0);
    const pct = target > 0 ? (saved / target) * 100 : 0;
    return { target, saved, pct };
  }, [savings]);

  // ------ insights (smart, rule-based, NOT AI) ------
  const insights = useMemo(() => {
    const out: { type: "positive" | "warning" | "info"; title: string; body: string }[] = [];

    // Where did money go?
    if (categoryBreakdown.length > 0) {
      const top = categoryBreakdown[0];
      out.push({
        type: "info",
        title: `Most of your money went to ${top.name}`,
        body: `${formatAmount(top.amount)} — ${top.pct.toFixed(0)}% of total spending. Review if this matches your priorities.`,
      });
    }

    // Spending up vs last month
    if (deltas.expense > 15) {
      out.push({
        type: "warning",
        title: "Spending climbing fast",
        body: `Expenses jumped ${deltas.expense.toFixed(0)}% from last month. Tighten one category to slow the curve.`,
      });
    } else if (deltas.expense < -10) {
      out.push({
        type: "positive",
        title: "Spending under control",
        body: `You cut expenses by ${Math.abs(deltas.expense).toFixed(0)}% versus last month. Lock in the win.`,
      });
    }

    // Savings rate
    if (totals.totalIncome > 0) {
      if (totals.savingsRate < 0) {
        out.push({
          type: "warning",
          title: "You're spending more than you earn",
          body: `Net: ${formatAmount(totals.net)}. Cut a recurring expense or pause a non-essential category this month.`,
        });
      } else if (totals.savingsRate < 10) {
        out.push({
          type: "warning",
          title: "Savings rate is low",
          body: `Only ${totals.savingsRate.toFixed(0)}% of income saved. Aim for 20% — start by trimming the top category.`,
        });
      } else if (totals.savingsRate >= 20) {
        out.push({
          type: "positive",
          title: "Healthy savings rate",
          body: `Saving ${totals.savingsRate.toFixed(0)}% of income. Consider routing the surplus to a goal.`,
        });
      }
    }

    // Subscriptions weight
    if (subsMonthly.total > 0 && totals.totalExpenses > 0) {
      const share = (subsMonthly.total / (totals.totalExpenses / Math.max(monthlyTrend.length, 1))) * 100;
      if (share > 25) {
        out.push({
          type: "warning",
          title: "Subscriptions are eating your budget",
          body: `${formatAmount(subsMonthly.total)}/mo across ${subsMonthly.active.length} subs — ~${share.toFixed(0)}% of monthly spend. Audit and cancel unused ones.`,
        });
      }
    }

    // Debt
    if (loanStats.debt > 0 && loanStats.pct < 25) {
      out.push({
        type: "info",
        title: "Debt payoff is just getting started",
        body: `${loanStats.pct.toFixed(0)}% paid. Increase monthly payment by even 10% to shorten the runway.`,
      });
    }

    // Goals
    if (savingsStats.target > 0 && savingsStats.pct < 50) {
      out.push({
        type: "info",
        title: "Savings goals need momentum",
        body: `${savingsStats.pct.toFixed(0)}% to target. Automate a small weekly transfer to compound progress.`,
      });
    }

    if (out.length === 0) {
      out.push({
        type: "info",
        title: "Add more transactions to unlock insights",
        body: "The more you log, the smarter Trackora gets at spotting patterns.",
      });
    }
    return out;
  }, [categoryBreakdown, deltas, totals, subsMonthly, loanStats, savingsStats, monthlyTrend, formatAmount]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground/20 border-t-foreground" />
      </div>
    );
  }

  const grayPalette = [
    "hsl(var(--foreground))",
    "hsl(var(--foreground) / 0.75)",
    "hsl(var(--foreground) / 0.55)",
    "hsl(var(--foreground) / 0.4)",
    "hsl(var(--foreground) / 0.3)",
    "hsl(var(--foreground) / 0.22)",
    "hsl(var(--foreground) / 0.16)",
  ];

  return (
    <>
      <NoIndexMeta />

      {/* Sticky header — matches Transactions / Smart Import vibe */}
      <div className="sticky top-14 sm:top-16 lg:top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/20">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-2.5 sm:h-14 sm:py-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <h1 className="text-base font-bold tracking-tight">Analytics</h1>
          </div>
          <div className="flex items-center gap-1 p-0.5 rounded-full border border-border/40 bg-muted/30 self-start sm:self-auto">
            {(["3m", "6m", "12m"] as const).map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "text-[11px] font-semibold px-3 py-1 rounded-full transition-all",
                  range === r ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6 pb-24 lg:pb-6 space-y-5 sm:space-y-6">
        {/* Hero summary */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-1">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Your money story</p>
          <h2 className="text-[1.6rem] leading-tight sm:text-4xl font-extrabold tracking-tight break-words">
            {totals.net >= 0 ? "You kept" : "You overspent"}{" "}
            <span className="bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-transparent">
              {formatAmount(Math.abs(totals.net))}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Across {monthlyTrend.length} months • Savings rate {totals.savingsRate.toFixed(1)}%
          </p>
        </motion.div>

        {/* Top stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          <StatCard label="Income" value={formatAmount(totals.totalIncome)} delta={deltas.income} icon={TrendingUp} index={0} />
          <StatCard label="Expenses" value={formatAmount(totals.totalExpenses)} delta={deltas.expense} icon={TrendingDown} tone="expense" index={1} />
          <StatCard label="Net" value={formatAmount(totals.net)} delta={deltas.net} icon={Wallet} index={2} />
          <StatCard label="Savings rate" value={`${totals.savingsRate.toFixed(1)}%`} icon={Target} index={3} />
        </div>

        {/* Smart insights */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
          className="rounded-2xl border border-border/30 bg-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-border/20">
            <Sparkles className="h-3.5 w-3.5" />
            <p className="text-[11px] font-bold uppercase tracking-[0.14em]">Answers for you</p>
          </div>
          <div className="divide-y divide-border/20">
            {insights.map((ins, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, ease: easing }}
                className="flex items-start gap-3 px-4 sm:px-5 py-3.5"
              >
                <div className={cn(
                  "mt-0.5 h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 border",
                  ins.type === "warning" && "bg-rose-500/10 border-rose-500/30 text-rose-500",
                  ins.type === "positive" && "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
                  ins.type === "info" && "bg-foreground/5 border-border/40 text-foreground"
                )}>
                  {ins.type === "warning" ? <AlertTriangle className="h-3.5 w-3.5" />
                    : ins.type === "positive" ? <TrendingUp className="h-3.5 w-3.5" />
                    : <Sparkles className="h-3.5 w-3.5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold tracking-tight">{ins.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{ins.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trend line chart — black/grey gradient */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5}
          className="rounded-2xl border border-border/30 bg-card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Cash flow</p>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">Income vs Expenses</h3>
            </div>
          </div>
          <div className="h-[260px] sm:h-[320px] mt-4">
            <ResponsiveContainer>
              <AreaChart data={monthlyTrend} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" opacity={0.5} vertical={false} />
                <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false}
                  tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                <Tooltip content={<ChartTip formatAmount={formatAmount} />} />
                <Area type="monotone" dataKey="income" name="Income" stroke="hsl(var(--foreground))" strokeWidth={2.2} fill="url(#incomeFill)" />
                <Area type="monotone" dataKey="expense" name="Expense" stroke="hsl(var(--foreground) / 0.55)" strokeWidth={2} strokeDasharray="4 4" fill="url(#expenseFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tabs: deeper analytics per feature */}
        <Tabs defaultValue="spending" className="space-y-4">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-5 h-auto p-1 bg-muted/40 rounded-xl">
            {[
              { v: "spending", l: "Spending" },
              { v: "income", l: "Income" },
              { v: "subs", l: "Subs" },
              { v: "loans", l: "Loans" },
              { v: "goals", l: "Goals" },
            ].map(t => (
              <TabsTrigger key={t.v} value={t.v}
                className="text-[11px] sm:text-xs font-semibold rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                {t.l}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Spending */}
          <TabsContent value="spending" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* category bar */}
              <div className="rounded-2xl border border-border/30 bg-card p-4 sm:p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-1">Where did it go</p>
                <h3 className="text-lg font-extrabold tracking-tight mb-4">Top categories</h3>
                <div className="h-[260px]">
                  <ResponsiveContainer>
                    <BarChart data={categoryBreakdown.slice(0, 6)} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" opacity={0.4} horizontal={false} />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false}
                        tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                      <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} width={80} />
                      <Tooltip content={<ChartTip formatAmount={formatAmount} />} cursor={{ fill: "hsl(var(--foreground) / 0.04)" }} />
                      <Bar dataKey="amount" name="Spent" radius={[0, 8, 8, 0]}>
                        {categoryBreakdown.slice(0, 6).map((_, i) => (
                          <Cell key={i} fill={grayPalette[i % grayPalette.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* category list with bars */}
              <div className="rounded-2xl border border-border/30 bg-card p-4 sm:p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-1">Breakdown</p>
                <h3 className="text-lg font-extrabold tracking-tight mb-4">By share</h3>
                <div className="space-y-3">
                  {categoryBreakdown.length === 0 && (
                    <p className="text-sm text-muted-foreground">No expenses yet.</p>
                  )}
                  {categoryBreakdown.slice(0, 7).map((c, i) => (
                    <div key={c.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold">{c.name}</span>
                        <span className="tabular-nums text-muted-foreground">{formatAmount(c.amount)} • {c.pct.toFixed(0)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted/60 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${c.pct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05, ease: easing }}
                          className="h-full rounded-full"
                          style={{ background: grayPalette[i % grayPalette.length] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Income */}
          <TabsContent value="income" className="space-y-4">
            <div className="rounded-2xl border border-border/30 bg-card p-4 sm:p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-1">Inflow trend</p>
              <h3 className="text-lg font-extrabold tracking-tight mb-4">Monthly income</h3>
              <div className="h-[260px]">
                <ResponsiveContainer>
                  <LineChart data={monthlyTrend} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" opacity={0.4} vertical={false} />
                    <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false}
                      tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                    <Tooltip content={<ChartTip formatAmount={formatAmount} />} />
                    <Line type="monotone" dataKey="income" name="Income" stroke="hsl(var(--foreground))" strokeWidth={2.5}
                      dot={{ fill: "hsl(var(--foreground))", r: 3 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          {/* Subscriptions */}
          <TabsContent value="subs" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border/30 bg-card p-4 sm:p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Monthly cost</p>
                <p className="text-3xl font-extrabold tracking-tight mt-2 tabular-nums">{formatAmount(subsMonthly.total)}</p>
                <p className="text-xs text-muted-foreground mt-1">{subsMonthly.active.length} active subscriptions</p>
              </div>
              <div className="lg:col-span-2 rounded-2xl border border-border/30 bg-card p-4 sm:p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-3">Top subscriptions</p>
                <div className="space-y-2.5">
                  {subsMonthly.active.length === 0 && <p className="text-sm text-muted-foreground">No active subscriptions.</p>}
                  {subsMonthly.active
                    .map((s: any) => ({ ...s, monthly: s.billing_cycle === "yearly" ? Number(s.amount) / 12 : Number(s.amount) }))
                    .sort((a: any, b: any) => b.monthly - a.monthly)
                    .slice(0, 6)
                    .map((s: any, i: number) => {
                      const max = subsMonthly.active.reduce((m: number, x: any) => {
                        const v = x.billing_cycle === "yearly" ? Number(x.amount) / 12 : Number(x.amount);
                        return Math.max(m, v);
                      }, 1);
                      const pct = (s.monthly / max) * 100;
                      return (
                        <div key={s.id} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold flex items-center gap-2"><Repeat className="h-3 w-3 text-muted-foreground" />{s.name}</span>
                            <span className="tabular-nums">{formatAmount(s.monthly)}/mo</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted/60 overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6, delay: i * 0.04, ease: easing }}
                              className="h-full rounded-full" style={{ background: grayPalette[i % grayPalette.length] }} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Loans */}
          <TabsContent value="loans" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border/30 bg-card p-4 sm:p-5 flex flex-col justify-center items-center">
                <div className="w-full h-[180px]">
                  <ResponsiveContainer>
                    <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: "Paid", value: loanStats.pct, fill: "hsl(var(--foreground))" }]} startAngle={90} endAngle={-270}>
                      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                      <RadialBar background={{ fill: "hsl(var(--muted))" }} dataKey="value" cornerRadius={20} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-2xl font-extrabold tracking-tight tabular-nums -mt-24">{loanStats.pct.toFixed(0)}%</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mt-16">Paid off</p>
              </div>
              <div className="lg:col-span-2 rounded-2xl border border-border/30 bg-card p-4 sm:p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Outstanding</p>
                    <p className="text-xl font-extrabold tabular-nums">{formatAmount(loanStats.debt)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Paid</p>
                    <p className="text-xl font-extrabold tabular-nums">{formatAmount(loanStats.paid)}</p>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  {loanStats.active.length === 0 && <p className="text-sm text-muted-foreground">No active loans.</p>}
                  {loanStats.active.slice(0, 5).map((l: any, i: number) => {
                    const pct = ((Number(l.initial_amount) - Number(l.current_balance)) / Number(l.initial_amount)) * 100;
                    return (
                      <div key={l.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold flex items-center gap-2"><CreditCard className="h-3 w-3 text-muted-foreground" />{l.name}</span>
                          <span className="tabular-nums">{pct.toFixed(0)}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted/60 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, delay: i * 0.05, ease: easing }}
                            className="h-full rounded-full" style={{ background: grayPalette[i % grayPalette.length] }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Goals */}
          <TabsContent value="goals" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border/30 bg-card p-4 sm:p-5">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Saved</p>
                <p className="text-2xl font-extrabold tabular-nums mt-1">{formatAmount(savingsStats.saved)}</p>
                <p className="text-xs text-muted-foreground mt-1">of {formatAmount(savingsStats.target)}</p>
                <div className="h-2 rounded-full bg-muted/60 overflow-hidden mt-3">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(savingsStats.pct, 100)}%` }}
                    transition={{ duration: 0.8, ease: easing }}
                    className="h-full rounded-full bg-foreground" />
                </div>
                <p className="text-xs font-bold mt-2 tabular-nums">{savingsStats.pct.toFixed(1)}% complete</p>
              </div>
              <div className="lg:col-span-2 rounded-2xl border border-border/30 bg-card p-4 sm:p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-3">Individual goals</p>
                <div className="space-y-3">
                  {savings.length === 0 && <p className="text-sm text-muted-foreground">No savings goals yet.</p>}
                  {savings.map((g: any, i: number) => {
                    const pct = Math.min(100, ((Number(g.current_amount) || 0) / (Number(g.target_amount) || 1)) * 100);
                    return (
                      <div key={g.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold flex items-center gap-2"><PiggyBank className="h-3 w-3 text-muted-foreground" />{g.name}</span>
                          <span className="tabular-nums text-muted-foreground">{formatAmount(g.current_amount || 0)} / {formatAmount(g.target_amount)}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted/60 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, delay: i * 0.04, ease: easing }}
                            className="h-full rounded-full" style={{ background: grayPalette[i % grayPalette.length] }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <p className="text-[11px] text-muted-foreground text-center pt-4">
          Insights are computed from your data — no AI, just smart math.
        </p>
      </div>
    </>
  );
}
