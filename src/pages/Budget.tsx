import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import {
  AlertCircle,
  Plus,
  Edit,
  ChevronDown,
  Sparkles,
  Trash2,
} from "lucide-react";
import { NoIndexMeta } from "@/components/NoIndexMeta";
import { useState, useMemo, useRef, useEffect } from "react";
import { SetBudgetDialog } from "@/components/forms/SetBudgetDialog";
import { toast } from "sonner";

const ease = [0.16, 1, 0.3, 1] as [
  number,
  number,
  number,
  number
];

function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  format: (n: number) => string;
}) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<number>(0);

  useEffect(() => {
    const start = ref.current;
    const diff = value - start;

    if (diff === 0) return;

    const duration = 600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplay(start + diff * eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        ref.current = value;
      }
    };

    requestAnimationFrame(tick);
  }, [value]);

  return <>{format(display)}</>;
}

export default function Budget() {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();
  const queryClient = useQueryClient();

  const [setBudgetOpen, setSetBudgetOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<any>(null);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const now = new Date();
  const daysInMonth = new Date(
    currentYear,
    currentMonth,
    0
  ).getDate();

  const daysLeft = daysInMonth - now.getDate();

  const { data: budgets = [] } = useQuery({
    queryKey: ["budgets", user?.id, currentMonth, currentYear],
    queryFn: async () => {
      if (!user) return [];

      const { data } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", user.id)
        .eq("month", currentMonth)
        .eq("year", currentYear);

      return data || [];
    },
    enabled: !!user,
  });

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const startOfMonth = new Date(
        currentYear,
        currentMonth - 1,
        1
      ).toISOString();

      const endOfMonth = new Date(
        currentYear,
        currentMonth,
        0,
        23,
        59,
        59
      ).toISOString();

      const { data } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id)
        .gte("date", startOfMonth)
        .lte("date", endOfMonth);

      return data || [];
    },
    enabled: !!user,
  });

  const totalSpending = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  const totalBudgetLimit = budgets.reduce(
    (sum: number, b: any) =>
      sum + Number(b.monthly_limit || 0),
    0
  );

  const remainingBudget = totalBudgetLimit - totalSpending;

  const budgetProgress =
    totalBudgetLimit > 0
      ? (totalSpending / totalBudgetLimit) * 100
      : 0;

  const dailySafe =
    daysLeft > 0 && remainingBudget > 0
      ? remainingBudget / daysLeft
      : 0;

  const categorySpending = expenses.reduce(
    (acc: Record<string, number>, exp) => {
      const cat = exp.category || "Uncategorized";

      acc[cat] = (acc[cat] || 0) + Number(exp.amount);

      return acc;
    },
    {}
  );

  const insight = useMemo(() => {
    if (totalBudgetLimit === 0) {
      return "Add a category budget to get daily spending guidance";
    }

    if (budgetProgress >= 100) {
      return "You've exceeded your category budgets this month";
    }

    if (budgetProgress >= 80) {
      return "You're close to your budget limit — spend wisely";
    }

    const topCat = Object.entries(categorySpending).sort(
      (a, b) => b[1] - a[1]
    )[0];

    if (topCat) {
      return `Most spending on ${topCat[0]} (${formatAmount(
        topCat[1]
      )})`;
    }

    return "Your spending is under control this month!";
  }, [
    totalBudgetLimit,
    budgetProgress,
    categorySpending,
    formatAmount,
  ]);

  const getProgressColor = (pct: number) => {
    if (pct >= 90) return "bg-destructive";
    if (pct >= 70) return "bg-warning";

    return "";
  };

  const handleDeleteBudget = async (budgetId: string) => {
    try {
      await supabase
        .from("budgets")
        .delete()
        .eq("id", budgetId);

      toast.success("Budget deleted");

      queryClient.invalidateQueries({
        queryKey: [
          "budgets",
          user?.id,
          currentMonth,
          currentYear,
        ],
      });
    } catch (error) {
      toast.error("Failed to delete budget");
    }
  };

  return (
    <>
      <NoIndexMeta />

      <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-6 pb-28 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <h1 className="text-xl font-bold tracking-tight">
              Budget
            </h1>

            <p className="text-xs text-foreground/60 mt-0.5">
              Control spending with gentle guidance
            </p>
          </motion.div>

          {/* Insight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-primary/5 border border-primary/10"
          >
            <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />

            <p className="text-xs text-foreground/70 font-medium">
              {insight}
            </p>
          </motion.div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-card border border-border/40 p-5">
              <p className="text-xs text-foreground/60 mb-1">
                Total Budget
              </p>

              <p className="text-2xl font-bold">
                <AnimatedNumber
                  value={totalBudgetLimit}
                  format={formatAmount}
                />
              </p>
            </div>

            <div className="rounded-xl bg-card border border-border/40 p-5">
              <p className="text-xs text-foreground/60 mb-1">
                Total Spent
              </p>

              <p className="text-2xl font-bold text-destructive">
                <AnimatedNumber
                  value={totalSpending}
                  format={formatAmount}
                />
              </p>
            </div>

            <div className="rounded-xl bg-card border border-border/40 p-5">
              <p className="text-xs text-foreground/60 mb-1">
                Safe Daily Spend
              </p>

              <p className="text-2xl font-bold text-primary">
                <AnimatedNumber
                  value={Math.max(dailySafe, 0)}
                  format={formatAmount}
                />
              </p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="rounded-xl bg-card border border-border/40 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">
                Monthly Progress
              </p>

              <p className="text-sm font-bold">
                {budgetProgress.toFixed(0)}%
              </p>
            </div>

            <Progress
              value={Math.min(budgetProgress, 100)}
              className="h-2"
              indicatorClassName={getProgressColor(
                budgetProgress
              )}
            />

            <div className="flex justify-between text-xs text-foreground/60">
              <span>
                {formatAmount(totalSpending)} spent
              </span>

              <span>
                {formatAmount(remainingBudget)} left
              </span>
            </div>
          </div>

          {/* Category Budgets Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">
                Category Budgets
              </p>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingBudget(null);
                  setSetBudgetOpen(true);
                }}
                className="h-8 px-3 text-xs font-bold rounded-lg gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </Button>
            </div>

            {budgets.length === 0 ? (
              <div className="rounded-xl bg-card border border-border/40 px-5 py-10 text-center">
                <p className="text-sm text-foreground/60 mb-3">
                  No category budgets yet
                </p>

                <Button
                  onClick={() => setSetBudgetOpen(true)}
                  variant="outline"
                  className="rounded-xl h-10 px-5"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Category Budget
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {budgets.map((budget: any, index: number) => {
                  const spent =
                    categorySpending[budget.category] || 0;

                  const limit = Number(
                    budget.monthly_limit
                  );

                  const progress = (spent / limit) * 100;

                  const isExpanded =
                    expandedCat === budget.id;

                  const budgetLeft = limit - spent;

                  const dailySafeForBudget =
                    daysLeft > 0 && budgetLeft > 0
                      ? budgetLeft / daysLeft
                      : 0;

                  return (
                    <motion.div
                      key={budget.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.2 + index * 0.04,
                        ease,
                      }}
                      whileHover={{ scale: 1.01, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setExpandedCat(
                          isExpanded ? null : budget.id
                        )
                      }
                      className="rounded-xl bg-card border border-border/40 hover:border-border/60 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
                    >
                      <div className="px-4 py-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-semibold">
                            {budget.category}
                          </p>

                          <div className="flex items-center gap-1.5">
                            {progress >= 80 && (
                              <AlertCircle
                                className={`h-3.5 w-3.5 ${
                                  progress >= 100
                                    ? "text-destructive"
                                    : "text-warning"
                                }`}
                              />
                            )}

                            <ChevronDown
                              className={`h-3.5 w-3.5 text-foreground/50 transition-transform duration-200 ${
                                isExpanded
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2 mb-3">
                          <div className="text-center">
                            <p className="text-[9px] text-foreground/60 uppercase tracking-wider font-medium">
                              Reserved
                            </p>

                            <p className="text-sm font-bold text-primary">
                              {formatAmount(limit)}
                            </p>
                          </div>

                          <div className="text-center">
                            <p className="text-[9px] text-foreground/60 uppercase tracking-wider font-medium">
                              Spent
                            </p>

                            <p className="text-sm font-bold text-destructive">
                              {formatAmount(spent)}
                            </p>
                          </div>

                          <div className="text-center">
                            <p className="text-[9px] text-foreground/60 uppercase tracking-wider font-medium">
                              Left
                            </p>

                            <p
                              className={`text-sm font-bold ${
                                budgetLeft < 0
                                  ? "text-destructive"
                                  : "text-success"
                              }`}
                            >
                              {formatAmount(budgetLeft)}
                            </p>
                          </div>

                          <div className="text-center">
                            <p className="text-[9px] text-foreground/60 uppercase tracking-wider font-medium">
                              Daily
                            </p>

                            <p className="text-sm font-bold text-primary">
                              {formatAmount(
                                Math.round(
                                  dailySafeForBudget
                                )
                              )}
                            </p>
                          </div>
                        </div>

                        <Progress
                          value={Math.min(progress, 100)}
                          className="h-1.5"
                          indicatorClassName={getProgressColor(
                            progress
                          )}
                        />
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-0 border-t border-border/30">
                              <div className="pt-3 space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="px-3 py-2 rounded-lg bg-muted/20 border border-border/30 text-center">
                                    <p className="text-[10px] text-foreground/60 uppercase tracking-wider font-medium mb-0.5">
                                      Left
                                    </p>

                                    <p
                                      className={`text-sm font-bold ${
                                        budgetLeft < 0
                                          ? "text-destructive"
                                          : "text-success"
                                      }`}
                                    >
                                      {formatAmount(
                                        budgetLeft
                                      )}
                                    </p>
                                  </div>

                                  <div className="px-3 py-2 rounded-lg bg-primary/5 border border-primary/20 text-center">
                                    <p className="text-[10px] text-foreground/60 uppercase tracking-wider font-medium mb-0.5">
                                      Daily Safe
                                    </p>

                                    <p className="text-sm font-bold text-primary">
                                      {formatAmount(
                                        Math.round(
                                          dailySafeForBudget
                                        )
                                      )}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingBudget(
                                        budget
                                      );
                                      setSetBudgetOpen(true);
                                    }}
                                    className="flex-1 h-9 px-4 rounded-lg text-xs font-bold gap-1.5"
                                  >
                                    <Edit className="h-3 w-3" />
                                    Edit
                                  </Button>

                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteBudget(
                                        budget.id
                                      );
                                    }}
                                    className="h-9 px-3 rounded-lg text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <SetBudgetDialog
        open={setBudgetOpen}
        onOpenChange={setSetBudgetOpen}
        editingBudget={editingBudget}
      />
    </>
  );
}