import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { preview } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

// vite.config.ts sets build.outDir to "build" (not the Vite default "dist") —
// this MUST match or prerendered HTML silently lands somewhere that never
// gets deployed.
const outDir = path.join(rootDir, "build");

// Every public, indexable route — kept in sync with public/sitemap.xml.
// Auth-gated routes (dashboard, transactions, settings, etc.) are
// intentionally excluded: there's nothing for a crawler to index there,
// and prerendering them would just bake a stale loading spinner into
// a page bots shouldn't be visiting anyway.
const routes = [
  "/",
  "/features",
  "/how-it-works",
  "/about",
  "/contact",
  "/faq",
  "/budgeting-guide",
  "/savings-guide",
  "/debt-management-guide",
  "/blog",
  "/blog/safe-to-spend-number",
  "/blog/voice-logging-petrol-expense",
  "/blog/automatic-swiggy-categorization",
  "/blog/scanning-kirana-receipt-vs-typing",
  "/blog/subscriptions-tab-forgotten-renewals",
  "/blog/budget-page-vs-dashboard",
  "/blog/savings-goals-with-deadline",
  "/blog/loans-emi-outstanding-percentage",
  "/blog/log-it-later-kills-tracking",
  "/blog/analytics-page-spending-trends",
  "/privacy",
  "/terms",
  "/disclaimer",
];

async function run() {
  if (!fs.existsSync(outDir)) {
    console.error(`✘ Build output "${outDir}" not found — run "vite build" first.`);
    process.exit(1);
  }

  // Start the preview server in-process via Vite's own API instead of
  // spawning a shell command and guessing a port/timing — this is what
  // makes the script portable across Codespaces, CI, and local machines.
  const server = await preview({
    root: rootDir,
    preview: { host: "127.0.0.1", port: 4173, strictPort: false, open: false },
  });
  const address = server.resolvedUrls.local[0].replace(/\/$/, "");

  // Uses the Chromium that ships with the puppeteer package itself
  // (downloaded on `npm install`), instead of a hardcoded system path
  // like /usr/bin/chromium-browser that doesn't reliably exist across
  // environments — this was the actual cause of prior prerender failures.
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });

  let failures = 0;

  for (const route of routes) {
    const page = await browser.newPage();
    const url = `${address}${route}`;

    try {
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
      // Small buffer to let SEOHead's useEffect finish updating <head>
      await new Promise((r) => setTimeout(r, 300));

      const html = await page.content();

      const targetDir = route === "/" ? outDir : path.join(outDir, route);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf-8");

      console.log(`✔ Prerendered: ${route}`);
    } catch (err) {
      failures += 1;
      console.error(`✘ Failed: ${route} — ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await server.close();

  if (failures > 0) {
    console.error(`\nPrerendering finished with ${failures} failure(s).`);
    process.exit(1);
  }
  console.log("\nPrerendering complete — all routes rendered successfully.");
}

run().catch((err) => {
  console.error("Prerendering crashed:", err);
  process.exit(1);
});