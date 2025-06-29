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
};
