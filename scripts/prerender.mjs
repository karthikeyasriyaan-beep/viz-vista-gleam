import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");

// Only routes that are real, live pages right now.
// Update this list as you wire up more posts in blogArticleMap
// or add new public pages — keep it in sync with sitemap.xml.
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

const BASE_URL = "http://localhost:4173";

async function run() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const route of routes) {
    const page = await browser.newPage();
    const url = `${BASE_URL}${route}`;

    try {
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
      // Small buffer to let SEOHead's useEffect finish updating <head>
      await new Promise((r) => setTimeout(r, 300));

      const html = await page.content();

      const outDir = route === "/" ? distDir : path.join(distDir, route);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");

      console.log(`✔ Prerendered: ${route}`);
    } catch (err) {
      console.error(`✘ Failed: ${route}`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("\nPrerendering complete.");
}

run();