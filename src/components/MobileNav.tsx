import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CurrencySelector } from "@/components/currency-selector";

export function MobileNav() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50 safe-top lg:hidden"
    >
      <div className="flex items-center justify-center gap-3 px-3 sm:px-4 h-14 sm:h-16">
        <Link to="/dashboard" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <span className="text-lg sm:text-xl font-bold gradient-text tracking-tight">
              Trackora
            </span>
          </motion.div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <CurrencySelector />
        </div>
      </div>
    </motion.header>
  );
}
