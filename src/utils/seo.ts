// src/utils/seo.ts
import type { BlogPost } from "../types/blog";

// SEO Configuration
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "blog";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

// Generate meta tags for SEO
export const generateMetaTags = (
  config: SEOConfig
): Array<{ name?: string; property?: string; content: string }> => {
  const meta = [];

  // Basic meta tags
  meta.push({ name: "description", content: config.description });
  if (config.keywords?.length) {
    meta.push({ name: "keywords", content: config.keywords.join(", ") });
  }
  if (config.author) {
    meta.push({ name: "author", content: config.author });
  }

  // Open Graph tags
  meta.push({ property: "og:title", content: config.title });
  meta.push({ property: "og:description", content: config.description });
  meta.push({ property: "og:type", content: config.type || "website" });

  if (config.url) {
    meta.push({ property: "og:url", content: config.url });
  }
  if (config.image) {
    meta.push({ property: "og:image", content: config.image });
    meta.push({ property: "og:image:alt", content: config.title });
  }

  // Article-specific Open Graph tags
  if (config.type === "article") {
    if (config.publishedTime) {
      meta.push({
        property: "article:published_time",
        content: config.publishedTime,
      });
    }
    if (config.modifiedTime) {
      meta.push({
        property: "article:modified_time",
        content: config.modifiedTime,
      });
    }
    if (config.author) {
      meta.push({ property: "article:author", content: config.author });
    }
    if (config.section) {
      meta.push({ property: "article:section", content: config.section });
    }
    if (config.tags?.length) {
      config.tags.forEach((tag) => {
        meta.push({ property: "article:tag", content: tag });
      });
    }
  }

  // Twitter Card tags
  meta.push({ name: "twitter:card", content: "summary_large_image" });
  meta.push({ name: "twitter:title", content: config.title });
  meta.push({ name: "twitter:description", content: config.description });
  if (config.image) {
    meta.push({ name: "twitter:image", content: config.image });
  }

  return meta;
};

// Generate structured data for blog posts
export const generateBlogPostStructuredData = (
  post: BlogPost,
  siteUrl: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? `${siteUrl}${post.featuredImage}` : undefined,
    author: {
      "@type": "Organization",
      name: "Elite Exteriors",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Elite Exteriors",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/src/assets/logos/main-logo.png`,
      },
    },
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags?.join(", "),
    wordCount: post.content?.split(" ").length || 0,
    articleBody: post.content,
  };
};

// Generate structured data for blog listing page
export const generateBlogListingStructuredData = (
  posts: BlogPost[],
  siteUrl: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Elite Exteriors Blog",
    description:
      "Expert insights on pressure washing, exterior cleaning, and home maintenance from Elite Exteriors.",
    url: `${siteUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Elite Exteriors",
      url: siteUrl,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.publishDate,
      author: {
        "@type": "Organization",
        name: "Elite Exteriors",
      },
    })),
  };
};

// Generate structured data for organization
export const generateOrganizationStructuredData = (siteUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}#organization`,
    name: "Elite Exteriors",
    description:
      "Professional pressure washing and exterior cleaning services in Chesapeake, Virginia Beach, Norfolk, and surrounding areas.",
    url: siteUrl,
    telephone: "+1-757-XXX-XXXX", // Replace with actual phone
    email: "info@eliteexteriors.com", // Replace with actual email
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chesapeake",
      addressRegion: "VA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "36.7682088",
      longitude: "-76.2874927",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Chesapeake",
        addressRegion: "VA",
      },
      {
        "@type": "City",
        name: "Virginia Beach",
        addressRegion: "VA",
      },
      {
        "@type": "City",
        name: "Norfolk",
        addressRegion: "VA",
      },
    ],
    serviceType: [
      "Pressure Washing",
      "House Washing",
      "Driveway Cleaning",
      "Deck Cleaning",
      "Gutter Cleaning",
      "Commercial Pressure Washing",
    ],
    logo: `${siteUrl}/src/assets/logos/main-logo.png`,
    image: `${siteUrl}/src/assets/images/about-us.jpg`,
    sameAs: [
      // Add social media URLs when available
    ],
  };
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (
  breadcrumbs: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

// SEO-friendly URL slug generation
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
};

// Extract keywords from content
export const extractKeywords = (
  content: string,
  maxKeywords: number = 10
): string[] => {
  // Common stop words to filter out
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "can",
    "this",
    "that",
    "these",
    "those",
  ]);

  const words = content
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word));

  const wordCount: { [key: string]: number } = {};
  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
};

// Generate canonical URL
export const generateCanonicalUrl = (path: string, baseUrl: string): string => {
  return `${baseUrl.replace(/\/$/, "")}${
    path.startsWith("/") ? path : `/${path}`
  }`;
};

// Calculate reading time
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};
