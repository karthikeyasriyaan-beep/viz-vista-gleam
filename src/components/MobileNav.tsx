import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { CurrencySelector } from "@/components/currency-selector";

export function MobileNav() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50 safe-top lg:hidden"
    >
      <div className="flex items-center justify-between px-3 sm:px-4 h-14 sm:h-16">
        <Link to="/dashboard" className="flex items-center gap-2 min-w-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-lg sm:text-xl font-bold gradient-text truncate text-card-foreground"
          >
            Trackora
          </motion.div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <ThemeToggle />
          <CurrencySelector />
        </div>
      </div>
    </motion.header>
  );
}
