// src/utils/security.ts

// Security Headers Configuration
export const securityHeaders = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://unpkg.com https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
    "connect-src 'self' https://api.netlify.com https://*.netlify.app",
    "media-src 'self' data: blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "block-all-mixed-content",
    "upgrade-insecure-requests",
  ].join("; "),
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": [
    "camera=()",
    "microphone=()",
    "geolocation=()",
    "payment=()",
    "usb=()",
    "bluetooth=()",
  ].join(", "),
};

// Security Meta Tags
export const securityMetaTags = [
  {
    httpEquiv: "X-UA-Compatible",
    content: "IE=edge",
  },
  {
    httpEquiv: "Content-Type",
    content: "text/html; charset=utf-8",
  },
  {
    name: "referrer",
    content: "strict-origin-when-cross-origin",
  },
];

// Function to apply security headers in development
export const applySecurityHeaders = () => {
  if (typeof document !== "undefined") {
    // Add security meta tags
    securityMetaTags.forEach((tag) => {
      const meta = document.createElement("meta");
      if (tag.httpEquiv) {
        meta.httpEquiv = tag.httpEquiv;
      }
      if (tag.name) {
        meta.name = tag.name;
      }
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Add CSP meta tag for immediate protection
    const cspMeta = document.createElement("meta");
    cspMeta.httpEquiv = "Content-Security-Policy";
    cspMeta.content = securityHeaders["Content-Security-Policy"];
    document.head.appendChild(cspMeta);
  }
};

// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript protocols
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim();
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return ["http:", "https:"].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Phone number validation
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ""));
};

// XSS Protection
export const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Generate nonce for inline scripts
export const generateNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
};

// CSRF Token generation (for future forms)
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
};
