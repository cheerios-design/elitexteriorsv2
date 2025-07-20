// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import BlogPageOptimized from "./pages/BlogPageOptimized";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Import Flowbite JavaScript (bundled approach)
import "flowbite";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPageOptimized />} />
          <Route path="/blog/:slug" element={<BlogPageOptimized />} />
          {/* Add future routes here */}
          <Route path="/quote" element={<div>Quote Page Coming Soon</div>} />
          <Route
            path="/contact"
            element={<div>Contact Page Coming Soon</div>}
          />
          <Route
            path="/privacy"
            element={<div>Privacy Policy Coming Soon</div>}
          />
          <Route
            path="/terms"
            element={<div>Terms & Conditions Coming Soon</div>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
