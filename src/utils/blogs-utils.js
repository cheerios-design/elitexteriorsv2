// src/utils/blog-utils.js

// Reading time calculator
export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, ""); // Strip HTML tags
  const wordCount = textContent.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
};

// Format date for display
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatOptions = { ...defaultOptions, ...options };
  return new Date(dateString).toLocaleDateString("en-US", formatOptions);
};

// Generate excerpt from content
export const generateExcerpt = (content, maxLength = 160) => {
  const textContent = content.replace(/<[^>]*>/g, ""); // Strip HTML tags
  if (textContent.length <= maxLength) return textContent;

  const truncated = textContent.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  return lastSpaceIndex > 0
    ? truncated.substring(0, lastSpaceIndex) + "..."
    : truncated + "...";
};

// Slug generator
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
};

// Social sharing URLs
export const getSocialShareUrls = (
  post,
  baseUrl = "https://www.elitxteriors.com"
) => {
  const url = `${baseUrl}/blog/${post.slug}`;
  const text = `${post.title} - ${post.excerpt}`;

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    email: `mailto:?subject=${encodeURIComponent(
      post.title
    )}&body=${encodeURIComponent(`Check out this article: ${url}`)}`,
    copy: url,
  };
};

// Table of contents generator
export const generateTableOfContents = (content) => {
  const headingRegex = /<h([2-6])[^>]*>([^<]+)<\/h[2-6]>/g;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].trim();
    const id = generateSlug(text);

    headings.push({
      level,
      text,
      id,
      children: [],
    });
  }

  return headings;
};

// Add IDs to headings in content
export const addHeadingIds = (content) => {
  return content.replace(
    /<h([2-6])([^>]*)>([^<]+)<\/h[2-6]>/g,
    (match, level, attributes, text) => {
      const id = generateSlug(text.trim());
      const hasId = attributes.includes("id=");

      if (hasId) return match;

      return `<h${level}${attributes} id="${id}">${text}</h${level}>`;
    }
  );
};

// View tracking (you can integrate with analytics)
export const trackView = (postSlug) => {
  // This would integrate with your analytics service
  // For now, we'll just log it
  console.log(`Post viewed: ${postSlug}`);

  // Example Google Analytics 4 event
  if (typeof gtag !== "undefined") {
    gtag("event", "page_view", {
      page_title: postSlug,
      page_location: window.location.href,
      content_group1: "Blog Post",
    });
  }
};

// Like functionality (would integrate with backend)
export const toggleLike = (postId) => {
  // This would typically make an API call to your backend
  // For now, we'll use localStorage for demo purposes
  const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
  const isLiked = likedPosts.includes(postId);

  if (isLiked) {
    const updatedLikes = likedPosts.filter((id) => id !== postId);
    localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));
    return false;
  } else {
    likedPosts.push(postId);
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    return true;
  }
};

// Check if post is liked
export const isPostLiked = (postId) => {
  const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
  return likedPosts.includes(postId);
};

// Copy to clipboard functionality
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackErr) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

// Estimated reading progress
export const calculateReadingProgress = (contentElement) => {
  if (!contentElement) return 0;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const elementTop = contentElement.offsetTop;
  const elementHeight = contentElement.offsetHeight;
  const windowHeight = window.innerHeight;

  const startReading = elementTop - windowHeight / 2;
  const endReading = elementTop + elementHeight - windowHeight / 2;

  if (scrollTop < startReading) return 0;
  if (scrollTop > endReading) return 100;

  const progress =
    ((scrollTop - startReading) / (endReading - startReading)) * 100;
  return Math.max(0, Math.min(100, progress));
};

// Search highlight functionality
export const highlightSearchTerm = (text, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === "") return text;

  // Escape special regex characters in searchTerm
  const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedTerm})`, "gi");
  return text.replace(
    regex,
    '<mark class="bg-yellow-200 px-1 rounded">$1</mark>'
  );
};

// Popular posts algorithm (based on views, likes, comments, and recency)
export const calculatePopularityScore = (post) => {
  const now = new Date();
  const publishDate = new Date(post.publishDate);
  const daysSincePublish = (now - publishDate) / (1000 * 60 * 60 * 24);

  // Recency factor (newer posts get slight boost)
  const recencyFactor = Math.max(0.5, 1 - daysSincePublish / 365);

  // Engagement score
  const engagementScore = post.views * 0.1 + post.likes * 2 + post.comments * 5;

  return engagementScore * recencyFactor;
};

// Get popular posts
export const getPopularPosts = (posts, limit = 5) => {
  return posts
    .map((post) => ({
      ...post,
      popularityScore: calculatePopularityScore(post),
    }))
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit);
};

// Related posts algorithm (improved)
export const getRelatedPostsAdvanced = (currentPost, allPosts, limit = 3) => {
  const scoredPosts = allPosts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => {
      let score = 0;

      // Category match (highest weight)
      if (post.category === currentPost.category) {
        score += 10;
      }

      // Tag matches
      const commonTags = post.tags.filter((tag) =>
        currentPost.tags.includes(tag)
      );
      score += commonTags.length * 3;

      // Title similarity (basic keyword matching)
      const currentTitleWords = currentPost.title.toLowerCase().split(" ");
      const postTitleWords = post.title.toLowerCase().split(" ");
      const commonWords = currentTitleWords.filter(
        (word) => word.length > 3 && postTitleWords.includes(word)
      );
      score += commonWords.length * 2;

      // Recency bonus
      const daysDiff =
        Math.abs(
          new Date(post.publishDate) - new Date(currentPost.publishDate)
        ) /
        (1000 * 60 * 60 * 24);
      if (daysDiff < 30) score += 2;

      return { ...post, relevanceScore: score };
    })
    .filter((post) => post.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);

  return scoredPosts;
};

// Newsletter signup validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Comment form validation
export const validateComment = (comment) => {
  const errors = {};

  if (!comment.name || comment.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  if (!comment.email || !validateEmail(comment.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!comment.content || comment.content.trim().length < 10) {
    errors.content = "Comment must be at least 10 characters long";
  }

  if (comment.content && comment.content.length > 1000) {
    errors.content = "Comment must be less than 1000 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// URL slug validation
export const isValidSlug = (slug) => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
};

// Generate breadcrumbs for blog posts
export const generateBreadcrumbs = (post) => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  if (post) {
    breadcrumbs.push({
      label: post.category,
      href: `/blog?category=${post.category
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")}`,
    });
    breadcrumbs.push({
      label: post.title,
      href: `/blog/${post.slug}`,
      current: true,
    });
  }

  return breadcrumbs;
};

// Local storage helpers for blog preferences
export const BlogPreferences = {
  // Save user's preferred categories
  savePreferredCategories: (categories) => {
    localStorage.setItem(
      "blog_preferred_categories",
      JSON.stringify(categories)
    );
  },

  getPreferredCategories: () => {
    try {
      return JSON.parse(
        localStorage.getItem("blog_preferred_categories") || "[]"
      );
    } catch {
      return [];
    }
  },

  // Save reading history
  addToReadingHistory: (postSlug) => {
    try {
      const history = JSON.parse(
        localStorage.getItem("blog_reading_history") || "[]"
      );
      const updatedHistory = [
        postSlug,
        ...history.filter((slug) => slug !== postSlug),
      ].slice(0, 20);
      localStorage.setItem(
        "blog_reading_history",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error("Error saving reading history:", error);
    }
  },

  getReadingHistory: () => {
    try {
      return JSON.parse(localStorage.getItem("blog_reading_history") || "[]");
    } catch {
      return [];
    }
  },

  // Newsletter subscription status
  setNewsletterSubscription: (email, isSubscribed) => {
    localStorage.setItem(
      "newsletter_subscription",
      JSON.stringify({
        email,
        isSubscribed,
        timestamp: new Date().toISOString(),
      })
    );
  },

  getNewsletterSubscription: () => {
    try {
      return JSON.parse(localStorage.getItem("newsletter_subscription"));
    } catch {
      return null;
    }
  },
};

// Performance monitoring helpers
export const BlogAnalytics = {
  // Track time spent reading
  trackReadingTime: (postSlug) => {
    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime) / 1000); // seconds

      // You can send this to your analytics service
      console.log(`Time spent reading ${postSlug}: ${timeSpent} seconds`);

      // Example Google Analytics 4 event
      if (typeof gtag !== "undefined") {
        gtag("event", "reading_time", {
          post_slug: postSlug,
          time_spent: timeSpent,
          content_group1: "Blog Post",
        });
      }
    };
  },

  // Track scroll depth
  trackScrollDepth: (postSlug) => {
    let maxScrollDepth = 0;
    const depths = [25, 50, 75, 100];
    const trackedDepths = new Set();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );

      maxScrollDepth = Math.max(maxScrollDepth, scrollPercent);

      depths.forEach((depth) => {
        if (scrollPercent >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);

          // Track milestone
          if (typeof gtag !== "undefined") {
            gtag("event", "scroll_depth", {
              post_slug: postSlug,
              scroll_depth: depth,
              content_group1: "Blog Post",
            });
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      return maxScrollDepth;
    };
  },
};

// Export all utilities as a default object
export default {
  calculateReadingTime,
  formatDate,
  generateExcerpt,
  generateSlug,
  getSocialShareUrls,
  generateTableOfContents,
  addHeadingIds,
  trackView,
  toggleLike,
  isPostLiked,
  copyToClipboard,
  calculateReadingProgress,
  highlightSearchTerm,
  calculatePopularityScore,
  getPopularPosts,
  getRelatedPostsAdvanced,
  validateEmail,
  validateComment,
  isValidSlug,
  generateBreadcrumbs,
  BlogPreferences,
  BlogAnalytics,
};
