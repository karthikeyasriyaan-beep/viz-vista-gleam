// Single source of truth for expense categories across the entire app.
// Used by: AddExpenseDialog, EditExpenseDialog, SetBudgetDialog,
// VoiceInput keyword detection, Transactions category map.
//
// Keep these names IDENTICAL everywhere so envelope budgets correctly
// match logged expenses by category string.

export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Bills",
  "Shopping",
  "Health",
  "Entertainment",
  "Education",
  "Savings",
  "Loan EMI",
  "Subscription",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

// Keyword -> category mapping for voice input + free-text parsing on Transactions.
export const CATEGORY_KEYWORDS: Record<string, ExpenseCategory> = {
  // Food
  food: "Food", grocery: "Food", groceries: "Food", lunch: "Food", dinner: "Food",
  breakfast: "Food", coffee: "Food", restaurant: "Food", snack: "Food",
  zomato: "Food", swiggy: "Food", dining: "Food",
  // Transport
  transport: "Transport", uber: "Transport", ola: "Transport", petrol: "Transport",
  fuel: "Transport", flight: "Transport", train: "Transport", bus: "Transport",
  taxi: "Transport", cab: "Transport", travel: "Transport",
  // Housing
  rent: "Housing", housing: "Housing", mortgage: "Housing", maintenance: "Housing",
  // Bills
  electricity: "Bills", bill: "Bills", wifi: "Bills", internet: "Bills",
  phone: "Bills", recharge: "Bills", water: "Bills", gas: "Bills",
  // Shopping
  shopping: "Shopping", clothes: "Shopping", amazon: "Shopping", flipkart: "Shopping",
  // Health
  health: "Health", medical: "Health", medicine: "Health", doctor: "Health",
  hospital: "Health", pharmacy: "Health",
  // Entertainment
  entertainment: "Entertainment", movie: "Entertainment", concert: "Entertainment",
  game: "Entertainment",
  // Education
  education: "Education", course: "Education", school: "Education",
  college: "Education", tuition: "Education", book: "Education",
  // Savings
  savings: "Savings", saving: "Savings", goal: "Savings",
  // Loan EMI
  emi: "Loan EMI", loan: "Loan EMI",
  // Subscription
  subscription: "Subscription", netflix: "Subscription", spotify: "Subscription",
  prime: "Subscription",
};

export function detectExpenseCategory(text: string, fallback: ExpenseCategory = "Other"): ExpenseCategory {
  const lower = text.toLowerCase();
  for (const [kw, cat] of Object.entries(CATEGORY_KEYWORDS)) {
    if (lower.includes(kw)) return cat;
  }
  return fallback;
}
