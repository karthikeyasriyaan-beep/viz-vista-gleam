import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddLoanDialogProps {
  onSuccess?: () => void;
}

const loanStatuses = [
  { value: "active", label: "Active" },
  { value: "paid_off", label: "Paid Off" },
  { value: "defaulted", label: "Defaulted" },
];

export function AddLoanDialog({ onSuccess }: AddLoanDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    initial_amount: "",
    monthly_payment: "",
    start_date: new Date().toISOString().split("T")[0],
    status: "active",
    direction: "owe",
    notes: "",
  });

  const queryClient = useQueryClient();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const reset = () =>
    setFormData({
      name: "", initial_amount: "",
      monthly_payment: "", start_date: new Date().toISOString().split("T")[0],
      status: "active", direction: "owe", notes: "",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authLoading || !user) {
      toast({ title: "Please wait", description: "Your session is still getting ready.", variant: "destructive" });
      return;
    }

    const initialAmount = parseFloat(formData.initial_amount) || 0;
      const monthlyPayment = parseFloat(formData.monthly_payment) || 0;
      const isCredit = formData.direction === "owed";
    if (initialAmount <= 0) {
      toast({ title: "Validation Error", description: "Loan amount must be greater than 0.", variant: "destructive" });
      return;
    }
    if (monthlyPayment <= 0) {
      toast({ title: "Validation Error", description: "Monthly payment must be greater than 0.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Auto-calculate end date
      let endDate: string | null = null;
      if (monthlyPayment > 0) {
        const months = Math.ceil(initialAmount / monthlyPayment);
        if (months > 0 && months < 1200) {
          const end = new Date(formData.start_date);
          end.setMonth(end.getMonth() + months);
          endDate = end.toISOString().split("T")[0];
        }
      }

      const loanPayload = {
        user_id: user.id,
        name: formData.name.trim(),
        initial_amount: initialAmount,
        current_balance: initialAmount,
        monthly_payment: monthlyPayment,
        start_date: formData.start_date,
        end_date: endDate,
        status: formData.status,
        notes: `${isCredit ? "Owed to you" : "You owe"}${formData.notes.trim() ? ` — ${formData.notes.trim()}` : ""}`,
      };

      const { error } = await supabase.from("loans").insert(loanPayload);
      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["loans", user.id] });
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      queryClient.invalidateQueries({ queryKey: ["expenses", user.id] });
      queryClient.invalidateQueries({ queryKey: ["income", user.id] });

      toast({ title: "Loan added", description: `${formData.name} added successfully.` });
      reset();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error adding loan:", error);
      toast({ title: "Error", description: "Failed to add loan. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5 h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm">
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Add Loan
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-md border-border/50 bg-background p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-border/30">
          <DialogTitle className="text-base font-semibold">Add Loan</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4 overflow-y-auto max-h-[70vh]">

          {/* Loan Name */}
          <div className="space-y-1.5">
            <Label htmlFor="loan-name" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Loan Name</Label>
            <Input
              id="loan-name"
              placeholder="e.g., Car Loan, Student Loan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-10 text-sm rounded-lg"
              required
            />
          </div>

          {/* Loan Amount */}
          <div className="space-y-1.5">
            <Label htmlFor="loan-amount" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Loan Amount</Label>
            <Input
              id="loan-amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.initial_amount}
              onChange={(e) => setFormData({ ...formData, initial_amount: e.target.value })}
              className="h-10 text-sm rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="loan-direction" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Loan type</Label>
              <Select value={formData.direction} onValueChange={(v) => setFormData({ ...formData, direction: v })}>
                <SelectTrigger className="h-10 text-sm rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owe">You owe money</SelectItem>
                  <SelectItem value="owed">Someone owes you</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="loan-payment" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Monthly EMI</Label>
              <Input
                id="loan-payment"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.monthly_payment}
                onChange={(e) => setFormData({ ...formData, monthly_payment: e.target.value })}
                className="h-10 text-sm rounded-lg"
                required
              />
            </div>
          </div>

          {/* Start Date + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="loan-start" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Start Date</Label>
              <Input
                id="loan-start"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="h-10 text-sm rounded-lg"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                <SelectTrigger className="h-10 text-sm rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {loanStatuses.map((s) => (
                    <SelectItem key={s.value} value={s.value} className="text-sm">{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* End date auto-calc hint */}
          <p className="text-[11px] text-muted-foreground/60 -mt-2">
            End date is calculated automatically from your amount and EMI.
          </p>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="loan-notes" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Notes <span className="normal-case tracking-normal">(optional)</span>
            </Label>
            <Textarea
              id="loan-notes"
              placeholder="Any extra details..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="resize-none text-sm rounded-lg"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 h-10 text-sm rounded-lg">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 h-10 text-sm rounded-lg">
              {loading ? "Adding..." : "Add Loan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
