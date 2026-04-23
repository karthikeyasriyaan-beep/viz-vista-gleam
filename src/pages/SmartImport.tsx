import { useState, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  Sparkles, Upload, Trash2, Loader2, ImageIcon, Plus, Save, ClipboardPaste,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCurrency } from "@/components/currency-selector";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { NoIndexMeta } from "@/components/NoIndexMeta";

interface DraftExpense {
  id: string;
  name: string;
  amount: string;
  category: string;
  date: string;
  source?: "screenshot" | "text" | "manual";
}

const CATEGORIES = [
  "Food", "Travel", "Bills", "Housing", "Shopping",
  "Health", "Entertainment", "Salary", "Gift", "Other",
];

const KEYWORD_CATEGORY: Record<string, string> = {
  food: "Food", lunch: "Food", dinner: "Food", coffee: "Food",
  zomato: "Food", swiggy: "Food", grocery: "Food", restaurant: "Food",
  uber: "Travel", ola: "Travel", taxi: "Travel", petrol: "Travel",
  fuel: "Travel", flight: "Travel", train: "Travel", bus: "Travel",
  rent: "Housing", electricity: "Bills", wifi: "Bills", internet: "Bills",
  phone: "Bills", recharge: "Bills",
  amazon: "Shopping", flipkart: "Shopping", clothes: "Shopping", shopping: "Shopping",
  medical: "Health", medicine: "Health", health: "Health", doctor: "Health",
  movie: "Entertainment", netflix: "Entertainment",
};

function detectCategoryFromText(text: string): string {
  const lower = text.toLowerCase();
  for (const [kw, cat] of Object.entries(KEYWORD_CATEGORY)) {
    if (lower.includes(kw)) return cat;
  }
  return "Other";
}

function parseQuickEntries(input: string): DraftExpense[] {
  const today = new Date().toISOString().split("T")[0];
  const parts = input.split(/[,\n]+/).map(p => p.trim()).filter(Boolean);
  const out: DraftExpense[] = [];
  for (const part of parts) {
    const m = part.match(/(\d+(?:\.\d+)?)/);
    if (!m) continue;
    const amount = parseFloat(m[1]);
    const rest = part.replace(m[0], "").trim();
    const tokens = rest.split(/\s+/).filter(Boolean);
    let category = "Other";
    let name = rest;
    // last token might be category
    if (tokens.length > 1) {
      const last = tokens[tokens.length - 1].toLowerCase();
      const matched = CATEGORIES.find(c => c.toLowerCase() === last);
      if (matched) {
        category = matched;
        name = tokens.slice(0, -1).join(" ");
      } else {
        category = detectCategoryFromText(rest);
      }
    } else if (rest) {
      category = detectCategoryFromText(rest);
    }
    if (!name) name = category;
    out.push({
      id: crypto.randomUUID(),
      name,
      amount: String(amount),
      category,
      date: today,
      source: "text",
    });
  }
  return out;
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

export default function SmartImport() {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();
  const [drafts, setDrafts] = useState<DraftExpense[]>([]);
  const [scanning, setScanning] = useState(false);
  const [saving, setSaving] = useState(false);
  const [quickInput, setQuickInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const total = useMemo(
    () => drafts.reduce((s, d) => s + (Number(d.amount) || 0), 0),
    [drafts],
  );

  const handleScreenshot = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    setScanning(true);
    try {
      const base64 = await fileToBase64(file);
      setPreviewUrl(base64);
      const { data, error } = await supabase.functions.invoke("parse-receipt", {
        body: { imageBase64: base64 },
      });
      if (error) throw error;
      const txns = (data?.transactions || []) as any[];
      if (!txns.length) {
        toast.warning("No transactions detected. Try a clearer screenshot or add manually.");
        return;
      }
      const today = new Date().toISOString().split("T")[0];
      const newDrafts: DraftExpense[] = txns.map(t => ({
        id: crypto.randomUUID(),
        name: String(t.name || "Unknown"),
        amount: String(t.amount || 0),
        category: CATEGORIES.includes(t.category) ? t.category : "Other",
        date: t.date || today,
        source: "screenshot",
      }));
      setDrafts(prev => [...newDrafts, ...prev]);
      toast.success(`Detected ${newDrafts.length} transaction${newDrafts.length > 1 ? "s" : ""}`);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Failed to scan screenshot");
    } finally {
      setScanning(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleScreenshot(f);
    e.target.value = "";
  };

  const onPaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          e.preventDefault();
          await handleScreenshot(file);
          return;
        }
      }
    }
  };

  const handleQuickAdd = () => {
    if (!quickInput.trim()) return;
    const parsed = parseQuickEntries(quickInput);
    if (!parsed.length) {
      toast.error("Couldn't parse — try '200 food, 150 uber travel'");
      return;
    }
    setDrafts(prev => [...parsed, ...prev]);
    setQuickInput("");
    toast.success(`Added ${parsed.length} entry${parsed.length > 1 ? "s" : ""}`);
  };

  const addManualRow = () => {
    setDrafts(prev => [
      {
        id: crypto.randomUUID(),
        name: "",
        amount: "",
        category: "Other",
        date: new Date().toISOString().split("T")[0],
        source: "manual",
      },
      ...prev,
    ]);
  };

  const updateDraft = (id: string, patch: Partial<DraftExpense>) => {
    setDrafts(prev => prev.map(d => (d.id === id ? { ...d, ...patch } : d)));
  };

  const removeDraft = (id: string) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
  };

  const clearAll = () => {
    setDrafts([]);
    setPreviewUrl(null);
  };

  const saveAll = async () => {
    if (!user) {
      toast.error("Please sign in to save");
      return;
    }
    if (!drafts.length) {
      toast.error("Nothing to save");
      return;
    }
    for (const d of drafts) {
      if (!d.name.trim() || !d.amount || isNaN(Number(d.amount)) || Number(d.amount) <= 0) {
        toast.error("Each expense needs a name and a valid amount");
        return;
      }
    }
    setSaving(true);
    try {
      const inserts = drafts.map(d => ({
        user_id: user.id,
        name: d.name.trim(),
        category: d.category,
        amount: Number(d.amount),
        date: d.date,
      }));
      const { error } = await supabase.from("expenses").insert(inserts);
      if (error) throw error;
      toast.success(`Saved ${drafts.length} expense${drafts.length > 1 ? "s" : ""}`);
      setDrafts([]);
      setPreviewUrl(null);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full" onPaste={onPaste}>
      <NoIndexMeta />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-32 lg:pt-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Smart Import</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Upload a UPI/PayPal screenshot or type quick entries — we'll add them to your expenses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Screenshot upload */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Upload Screenshot</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              GPay, PhonePe, Paytm, BHIM, PayPal. You can also paste (Ctrl/Cmd+V).
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
            <div className="flex gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={scanning}
                className="gap-2 flex-1"
              >
                {scanning ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Scanning…</>
                ) : (
                  <><Upload className="h-4 w-4" /> Choose Image</>
                )}
              </Button>
              <Button
                variant="outline"
                disabled={scanning}
                className="gap-2"
                onClick={() => toast.info("Press Ctrl/Cmd+V anywhere on this page to paste a screenshot")}
              >
                <ClipboardPaste className="h-4 w-4" /> Paste
              </Button>
            </div>
            {previewUrl && (
              <div className="mt-3 rounded-lg border overflow-hidden bg-muted/30">
                <img src={previewUrl} alt="screenshot preview" className="max-h-48 w-full object-contain" />
              </div>
            )}
          </Card>

          {/* Quick text entry */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Quick Entry</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Type like <span className="font-mono bg-muted px-1.5 py-0.5 rounded">200 food, 150 uber travel</span>. Comma-separate multiple.
            </p>
            <Textarea
              value={quickInput}
              onChange={e => setQuickInput(e.target.value)}
              placeholder="200 food, 150 uber travel, 50 coffee"
              rows={3}
              className="mb-3"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleQuickAdd();
                }
              }}
            />
            <Button onClick={handleQuickAdd} className="w-full gap-2" disabled={!quickInput.trim()}>
              <Plus className="h-4 w-4" /> Add to list
            </Button>
          </Card>
        </div>

        {/* Detected list */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Detected expenses ({drafts.length})</h2>
              <p className="text-xs text-muted-foreground">Edit, delete, or add more before saving.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={addManualRow} className="gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Row
              </Button>
              {drafts.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1.5 text-destructive">
                  <Trash2 className="h-3.5 w-3.5" /> Clear
                </Button>
              )}
            </div>
          </div>

          {drafts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No expenses yet. Upload a screenshot or type a quick entry above.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {drafts.map(d => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-12 gap-2 items-end p-3 rounded-lg border bg-card/50"
                  >
                    <div className="col-span-12 sm:col-span-4">
                      <Label className="text-[10px] uppercase text-muted-foreground">Name</Label>
                      <Input
                        value={d.name}
                        onChange={e => updateDraft(d.id, { name: e.target.value })}
                        placeholder="e.g. Zomato"
                        className="h-9"
                      />
                    </div>
                    <div className="col-span-5 sm:col-span-2">
                      <Label className="text-[10px] uppercase text-muted-foreground">Amount</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={d.amount}
                        onChange={e => updateDraft(d.id, { amount: e.target.value })}
                        className="h-9"
                      />
                    </div>
                    <div className="col-span-7 sm:col-span-3">
                      <Label className="text-[10px] uppercase text-muted-foreground">Category</Label>
                      <Select value={d.category} onValueChange={v => updateDraft(d.id, { category: v })}>
                        <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-9 sm:col-span-2">
                      <Label className="text-[10px] uppercase text-muted-foreground">Date</Label>
                      <Input
                        type="date"
                        value={d.date}
                        onChange={e => updateDraft(d.id, { date: e.target.value })}
                        className="h-9"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-1 flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => removeDraft(d.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </Card>
      </div>

      {/* Sticky footer total */}
      {drafts.length > 0 && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          className="fixed bottom-14 lg:bottom-0 left-0 right-0 z-30 border-t bg-card/95 backdrop-blur-md"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Total</div>
              <div className="text-xl sm:text-2xl font-bold">{formatAmount(total)}</div>
            </div>
            <Button
              size="lg"
              onClick={saveAll}
              disabled={saving}
              className="gap-2 min-w-[160px]"
            >
              {saving ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
              ) : (
                <><Save className="h-4 w-4" /> Save all ({drafts.length})</>
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
