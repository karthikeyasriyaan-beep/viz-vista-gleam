import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-foreground mb-8">About Trackora</h1>

          <div className="mb-12 py-16 sm:py-24 md:py-32">
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
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
