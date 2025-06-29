// src/hooks/useSEO.js
import { useEffect } from "react";

export const useSEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  canonicalUrl,
  author,
  publishDate,
  modifiedDate,
}) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (property, content, isProperty = false) => {
      if (!content) return;

      const selector = isProperty
        ? `meta[property="${property}"]`
        : `meta[name="${property}"]`;
      let meta = document.querySelector(selector);

      if (meta) {
        meta.setAttribute("content", content);
      } else {
        meta = document.createElement("meta");
        if (isProperty) {
          meta.setAttribute("property", property);
        } else {
          meta.setAttribute("name", property);
        }
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    };

    // Update meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", author);

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:url", canonicalUrl, true);

    // Twitter tags
    updateMetaTag("twitter:title", title, true);
    updateMetaTag("twitter:description", description, true);
    updateMetaTag("twitter:image", ogImage, true);
    updateMetaTag("twitter:card", "summary_large_image", true);

    // Article specific meta tags
    if (ogType === "article") {
      updateMetaTag("article:published_time", publishDate, true);
      updateMetaTag("article:modified_time", modifiedDate, true);
      updateMetaTag("article:author", author, true);
    }

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute("href", canonicalUrl);
      } else {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        canonical.setAttribute("href", canonicalUrl);
        document.head.appendChild(canonical);
      }
    }
  }, [
    title,
    description,
    keywords,
    ogImage,
    ogType,
    canonicalUrl,
    author,
    publishDate,
    modifiedDate,
  ]);
};

// Hook for structured data
export const useStructuredData = (structuredData) => {
  useEffect(() => {
    if (!structuredData) return;

    // Remove existing structured data
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [structuredData]);
};
