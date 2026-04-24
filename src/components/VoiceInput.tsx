import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, X, Check, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { addGuestExpense, addGuestIncome } from "@/lib/guest-storage";

type EntryType = "expense" | "income" | "savings";

interface ParsedVoiceEntry {
  type: EntryType;
  amount: number;
  category: string;
  description: string;
}

interface VoiceInputProps {
  /** Visual variant of the trigger button */
  variant?: "floating" | "inline" | "icon";
  /** Restrict accepted entry types (default: all) */
  allowedTypes?: EntryType[];
  /** Optional className for the trigger */
  className?: string;
  /** Callback after a successful save */
  onSuccess?: () => void;
  /** Optional label for inline variant */
  label?: string;
}

/* ──────────────────────────────────────────────────────────────────
   Hindi number words → digits (basic)
   ────────────────────────────────────────────────────────────────── */
const HINDI_NUMBERS: Record<string, number> = {
  ek: 1, do: 2, teen: 3, char: 4, chaar: 4, paanch: 5, panch: 5,
  che: 6, chhe: 6, saat: 7, aath: 8, nau: 9, dus: 10, das: 10,
  bees: 20, tees: 30, chalis: 40, pachas: 50, saath: 60,
  sattar: 70, assi: 80, nabbe: 90, sau: 100, hazaar: 1000, hajar: 1000,
};

const MULTIPLIERS: Record<string, number> = {
  k: 1000, thousand: 1000, hazaar: 1000, hajar: 1000,
  lakh: 100000, lac: 100000,
  m: 1000000, million: 1000000,
};

/* Categorisation keyword map */
const CATEGORY_KEYWORDS: Record<string, string> = {
  food: "Food", grocery: "Food", lunch: "Food", dinner: "Food",
  breakfast: "Food", coffee: "Food", restaurant: "Food", snack: "Food",
  zomato: "Food", swiggy: "Food",
  travel: "Travel", uber: "Travel", ola: "Travel", petrol: "Travel",
  fuel: "Travel", flight: "Travel", train: "Travel", bus: "Travel",
  rent: "Housing", housing: "Housing",
  electricity: "Bills", bill: "Bills", wifi: "Bills", internet: "Bills",
  phone: "Bills", recharge: "Bills",
  shopping: "Shopping", clothes: "Shopping", amazon: "Shopping", flipkart: "Shopping",
  health: "Health", medical: "Health", medicine: "Health", doctor: "Health",
  gift: "Gift", entertainment: "Entertainment", movie: "Entertainment",
  salary: "Salary", freelance: "Freelance", bonus: "Salary",
};

function detectCategory(text: string, fallback: string): string {
  const lower = text.toLowerCase();
  for (const [kw, cat] of Object.entries(CATEGORY_KEYWORDS)) {
    if (lower.includes(kw)) return cat;
  }
  return fallback;
}

/* Extract a numeric amount from spoken text (English digits + basic Hindi) */
function extractAmount(text: string): number {
  const lower = text.toLowerCase();

  // Pattern: "5k", "10k", "2.5k"
  const kMatch = lower.match(/(\d+(?:\.\d+)?)\s*(k|thousand|lakh|lac|million|m)\b/);
  if (kMatch) {
    const base = parseFloat(kMatch[1]);
    const mult = MULTIPLIERS[kMatch[2]] ?? 1;
    return Math.round(base * mult);
  }

  // Plain digits
  const digitMatch = lower.match(/(\d+(?:[,\d]*)(?:\.\d+)?)/);
  if (digitMatch) {
    return parseFloat(digitMatch[1].replace(/,/g, ""));
  }

  // Hindi words
  const tokens = lower.split(/\s+/);
  let total = 0;
  let current = 0;
  let found = false;
  for (const t of tokens) {
    if (t in HINDI_NUMBERS) {
      const n = HINDI_NUMBERS[t];
      found = true;
      if (n === 100 || n === 1000) {
        current = (current || 1) * n;
      } else {
        current += n;
      }
    } else if (current) {
      total += current;
      current = 0;
    }
  }
  total += current;
  return found ? total : 0;
}

/* Detect entry type from natural language */
function detectType(text: string, allowed: EntryType[]): EntryType {
  const lower = text.toLowerCase();
  const savingsKw = ["saving", "save", "savings", "bachat", "daalo", "deposit"];
  const incomeKw = ["income", "earn", "earned", "salary", "received", "got paid", "freelance", "bonus"];
  const expenseKw = ["spent", "spend", "paid", "expense", "bought", "buy", "kharcha", "expense for", "log"];

  if (allowed.includes("savings") && savingsKw.some(k => lower.includes(k))) return "savings";
  if (allowed.includes("income") && incomeKw.some(k => lower.includes(k))) return "income";
  if (allowed.includes("expense") && expenseKw.some(k => lower.includes(k))) return "expense";

  // Fallback to first allowed type
  return allowed[0];
}

/* Parse the full transcript */
function parseTranscript(text: string, allowed: EntryType[]): ParsedVoiceEntry | null {
  const amount = extractAmount(text);
  if (!amount || amount <= 0) return null;

  const type = detectType(text, allowed);
  const fallbackCat = type === "savings" ? "Savings" : type === "income" ? "Income" : "Other";
  const category = detectCategory(text, fallbackCat);

  // Description = trimmed transcript
  const description = text.trim().slice(0, 80);

  return { type, amount, category, description };
}

/* ────────────────────────────────────────────────────────────────── */

export function VoiceInput({
  variant = "icon",
  allowedTypes = ["expense", "income", "savings"],
  className,
  onSuccess,
  label = "Voice Input",
}: VoiceInputProps) {
  const { user, isGuest, loading: authLoading } = useAuth();
  const { formatAmount } = useCurrency();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "listening" | "processing" | "confirm" | "error">("idle");
  const [transcript, setTranscript] = useState("");
  const [parsed, setParsed] = useState<ParsedVoiceEntry | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const recognitionRef = useRef<any>(null);
  const supportedRef = useRef<boolean>(false);


  /* Check browser support once */
  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    supportedRef.current = !!SR;
  }, []);

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* no-op */
    }
  }, []);

  const startListening = useCallback(() => {
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setStatus("error");
      setErrorMsg("Voice input is not supported on this browser.");
      return;
    }

    setTranscript("");
    setParsed(null);
    setErrorMsg("");
    setStatus("listening");

    const rec = new SR();
    rec.lang = "en-IN";
    rec.continuous = false;
    rec.interimResults = true;

    let finalText = "";

    rec.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      setTranscript(finalText || interim);
    };

    rec.onerror = (e: any) => {
      const msg =
        e.error === "not-allowed"
          ? "Microphone access denied. Please allow it in your browser."
          : e.error === "no-speech"
          ? "Didn't catch that. Please try again."
          : "Something went wrong. Please try again.";
      setStatus("error");
      setErrorMsg(msg);
    };

    rec.onend = () => {
      const text = finalText.trim();
      if (!text) {
        setStatus((s) => (s === "error" ? s : "error"));
        setErrorMsg((m) => m || "Didn't catch that. Please try again.");
        return;
      }
      setStatus("processing");
      // small delay for the UX
      setTimeout(() => {
        const result = parseTranscript(text, allowedTypes);
        if (!result) {
          setStatus("error");
          setErrorMsg("Couldn't find an amount. Try: \"Spent 200 on food\".");
          return;
        }
        setParsed(result);
        setStatus("confirm");
      }, 350);
    };

    recognitionRef.current = rec;
    try {
      rec.start();
    } catch {
      setStatus("error");
      setErrorMsg("Couldn't start microphone. Please try again.");
    }
  const openAndStartListening = useCallback(() => {
    setOpen(true);
    setStatus("idle");
    setTimeout(() => startListening(), 0);
  }, [startListening]);

  useEffect(() => {
    if (!open) {
      stopListening();
      setStatus("idle");
      setTranscript("");
      setParsed(null);
      setErrorMsg("");
      setSaving(false);
    }
  }, [open, stopListening]);


  const handleSave = async () => {
    if (!parsed) return;
    if (authLoading || (!isGuest && !user)) {
      toast.error("Your session is still getting ready. Please try again.");
      return;
    }
    setSaving(true);
    try {
      const today = new Date().toISOString().split("T")[0];

      if (parsed.type === "expense") {
        if (isGuest) {
          addGuestExpense({
            name: parsed.description,
            amount: parsed.amount,
            date: today,
            category: parsed.category,
          });
        } else {
          const { error } = await supabase.from("expenses").insert({
            user_id: user!.id,
            name: parsed.description,
            amount: parsed.amount,
            date: today,
            category: parsed.category,
          });
          if (error) throw error;
        }
        toast.success(`-${formatAmount(parsed.amount)} expense added`);
        queryClient.invalidateQueries({ queryKey: ["expenses"] });
      } else if (parsed.type === "income") {
        if (isGuest) {
          addGuestIncome({
            source: parsed.description,
            amount: parsed.amount,
            date: today,
            category: parsed.category,
          });
        } else {
          const { error } = await supabase.from("income").insert({
            user_id: user!.id,
            source: parsed.description,
            amount: parsed.amount,
            date: today,
            category: parsed.category,
          });
          if (error) throw error;
        }
        toast.success(`+${formatAmount(parsed.amount)} income added`);
        queryClient.invalidateQueries({ queryKey: ["income"] });
      } else if (parsed.type === "savings") {
        if (isGuest) {
          toast.error("Sign in to save savings goals.");
          setSaving(false);
          return;
        }
        const { error } = await supabase.from("savings").insert({
          user_id: user!.id,
          name: parsed.description || "Voice savings",
          target_amount: parsed.amount,
          current_amount: parsed.amount,
        });
        if (error) throw error;
        toast.success(`${formatAmount(parsed.amount)} added to savings`);
        queryClient.invalidateQueries({ queryKey: ["savings"] });
      }

      onSuccess?.();
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  /* ─── Trigger button rendering ─── */
  const isSupported =
    typeof window !== "undefined" &&
    !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  const triggerButton = (() => {
    if (variant === "floating") {
      return (
        <Button
          size="icon"
          disabled={!isSupported}
          onClick={openAndStartListening}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg fixed bottom-20 right-5 z-30 lg:bottom-6",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            className
          )}
          aria-label="Voice input"
        >
          <Mic className="h-6 w-6" />
        </Button>
      );
    }
    if (variant === "inline") {
      return (
        <Button
          variant="outline"
          disabled={!isSupported}
          onClick={openAndStartListening}
          className={cn(
            "h-12 rounded-xl border-2 border-primary/20 hover:border-primary/40 gap-2 text-sm font-bold px-5",
            className
          )}
        >
          <Mic className="h-4 w-4 text-primary" />
          {label}
        </Button>
      );
    }
    return (
      <Button
        size="icon"
        variant="outline"
        disabled={!isSupported}
        onClick={openAndStartListening}
        className={cn("h-10 w-10 rounded-xl", className)}
        aria-label="Voice input"
      >
        <Mic className="h-4 w-4 text-primary" />
      </Button>
    );
  })();

  const trigger = !isSupported ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-block">{triggerButton}</span>
      </TooltipTrigger>
      <TooltipContent>Voice input not supported on this browser</TooltipContent>
    </Tooltip>
  ) : (
    triggerButton
  );

  return (
    <>
      {trigger}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mic className="h-4 w-4 text-primary" />
              Voice Input
            </DialogTitle>
            <DialogDescription className="text-xs">
              Try saying: "Spent 200 on food" or "Add 500 to savings"
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <AnimatePresence mode="wait">
              {/* LISTENING */}
              {status === "listening" && (
                <motion.div
                  key="listening"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 py-6"
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20"
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    />
                    <div className="relative h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                      <Mic className="h-9 w-9" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground">Listening…</p>
                  {transcript && (
                    <p className="text-xs text-muted-foreground italic text-center max-w-xs">
                      "{transcript}"
                    </p>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={stopListening}
                    className="text-xs"
                  >
                    <MicOff className="h-3.5 w-3.5 mr-1.5" /> Stop
                  </Button>
                </motion.div>
              )}

              {/* PROCESSING */}
              {status === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 py-8"
                >
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  <p className="text-sm font-medium text-muted-foreground">Processing…</p>
                </motion.div>
              )}

              {/* CONFIRM */}
              {status === "confirm" && parsed && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="rounded-2xl bg-muted/40 border border-border/40 p-5 space-y-3">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Confirm {parsed.type}
                    </p>
                    <p className="text-2xl font-bold">
                      {parsed.type === "expense" ? "-" : "+"}
                      {formatAmount(parsed.amount)}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        Category
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {parsed.category}
                      </span>
                    </div>
                    {transcript && (
                      <p className="text-xs text-muted-foreground italic border-t border-border/40 pt-2">
                        "{transcript}"
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl"
                      onClick={() => {
                        setParsed(null);
                        startListening();
                      }}
                      disabled={saving}
                    >
                      <X className="h-4 w-4 mr-1.5" /> Retry
                    </Button>
                    <Button
                      className="flex-1 rounded-xl"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-1.5" /> Confirm
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ERROR */}
              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 py-6 text-center"
                >
                  <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <p className="text-sm font-semibold">{errorMsg}</p>
                  <Button onClick={startListening} className="rounded-xl mt-2">
                    <Mic className="h-4 w-4 mr-1.5" /> Try again
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
