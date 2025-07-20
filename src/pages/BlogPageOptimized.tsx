// src/pages/BlogPageOptimized.tsx
import React, { Suspense, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { blogPosts } from "../data/blog-posts";
import {
  generateMetaTags,
  generateBlogPostStructuredData,
  generateBlogListingStructuredData,
  generateBreadcrumbStructuredData,
} from "../utils/seo";
import { applySecurityHeaders } from "../utils/security";

// Lazy load components for code splitting
const BlogPostView = React.lazy(() => import("../components/BlogPostView"));
const BlogListingView = React.lazy(
  () => import("../components/BlogListingView")
);

// Loading Component with skeleton
const BlogLoadingSkeleton: React.FC = () => (
  <div className="animate-pulse container mx-auto px-4 py-12">
    <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
    </div>
  </div>
);

// Error Boundary Component
class BlogErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Blog page error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're having trouble loading this page. Please try refreshing or
              return to our homepage.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors mr-4"
            >
              Refresh Page
            </button>
            <a
              href="/"
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Go Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const BlogPageOptimized: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Apply security headers
  useEffect(() => {
    applySecurityHeaders();
  }, []);

  // Performance monitoring
  useEffect(() => {
    const measurePerformance = () => {
      if ("performance" in window) {
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;
        console.log(
          "Blog Page Load Time:",
          navigation.loadEventEnd - navigation.loadEventStart,
          "ms"
        );
      }
    };

    if (document.readyState === "complete") {
      measurePerformance();
    } else {
      window.addEventListener("load", measurePerformance);
      return () => window.removeEventListener("load", measurePerformance);
    }
  }, []);

  // Memoized post finding
  const currentPost = useMemo(() => {
    return slug ? blogPosts.find((post) => post.slug === slug) : null;
  }, [slug]);

  // Generate SEO data
  const seoConfig = useMemo(() => {
    const siteUrl = window.location.origin;

    if (currentPost) {
      return {
        title: `${currentPost.title} | Elite Exteriors Blog`,
        description: currentPost.metaDescription || currentPost.excerpt,
        keywords: currentPost.tags,
        author: currentPost.author,
        image: currentPost.featuredImage
          ? `${siteUrl}${currentPost.featuredImage}`
          : undefined,
        url: `${siteUrl}/blog/${currentPost.slug}`,
        type: "article" as const,
        publishedTime: currentPost.publishDate,
        modifiedTime: currentPost.publishDate,
        section: currentPost.category,
        tags: currentPost.tags,
      };
    } else {
      return {
        title:
          "Expert Pressure Washing & Exterior Cleaning Blog | Elite Exteriors",
        description:
          "Discover expert tips, guides, and insights on pressure washing, house cleaning, and exterior maintenance from Elite Exteriors professionals.",
        keywords: [
          "pressure washing",
          "house washing",
          "exterior cleaning",
          "home maintenance",
          "driveway cleaning",
        ],
        url: `${siteUrl}/blog`,
        type: "blog" as const,
      };
    }
  }, [currentPost]);

  // Generate structured data
  const structuredData = useMemo(() => {
    const siteUrl = window.location.origin;

    if (currentPost) {
      return {
        blogPost: generateBlogPostStructuredData(currentPost, siteUrl),
        breadcrumb: generateBreadcrumbStructuredData([
          { name: "Home", url: siteUrl },
          { name: "Blog", url: `${siteUrl}/blog` },
          {
            name: currentPost.title,
            url: `${siteUrl}/blog/${currentPost.slug}`,
          },
        ]),
      };
    } else {
      return {
        blogListing: generateBlogListingStructuredData(blogPosts, siteUrl),
        breadcrumb: generateBreadcrumbStructuredData([
          { name: "Home", url: siteUrl },
          { name: "Blog", url: `${siteUrl}/blog` },
        ]),
      };
    }
  }, [currentPost]);

  const metaTags = generateMetaTags(seoConfig);

  return (
    <BlogErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* SEO Head Tags */}
        <Helmet>
          <title>{seoConfig.title}</title>
          <link rel="canonical" href={seoConfig.url} />

          {/* Meta Tags */}
          {metaTags.map((tag, index) => (
            <meta
              key={index}
              {...(tag.name ? { name: tag.name } : { property: tag.property })}
              content={tag.content}
            />
          ))}

          {/* Structured Data */}
          {structuredData.blogPost && (
            <script type="application/ld+json">
              {JSON.stringify(structuredData.blogPost)}
            </script>
          )}
          {structuredData.blogListing && (
            <script type="application/ld+json">
              {JSON.stringify(structuredData.blogListing)}
            </script>
          )}
          {structuredData.breadcrumb && (
            <script type="application/ld+json">
              {JSON.stringify(structuredData.breadcrumb)}
            </script>
          )}

          {/* Performance hints */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
        </Helmet>

        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-4 z-50 rounded-br-md"
        >
          Skip to main content
        </a>

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main id="main-content" className="pt-20" role="main">
          <Suspense fallback={<BlogLoadingSkeleton />}>
            {currentPost ? (
              <BlogPostView post={currentPost} />
            ) : (
              <BlogListingView />
            )}
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BlogErrorBoundary>
  );
};

export default BlogPageOptimized;
