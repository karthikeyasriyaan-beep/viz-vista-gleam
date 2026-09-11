import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root") as HTMLElement;

// Check if react-snap left pre-rendered HTML in the root container
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
} else {
  createRoot(rootElement).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}