// src/components/BlogPostView.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { type BlogPost } from "../types/blog";
import { getRelatedPosts } from "../data/blog-posts";

// Import blog images
import imgDriveway from "../assets/images/blog/driveway-cleaning-featured.jpg";
import imgChesapeake from "../assets/images/blog/chesapeake-humidity-featured.jpg";
import imgSeasonal from "../assets/images/blog/seasonal-pressure-washing-featured.jpg";
import imgAffordable from "../assets/images/blog/affordable-pressure-washing-featured.jpg";
import imgChristmas from "../assets/images/blog/christmas-lights-featured.jpg";
import imgGutter from "../assets/images/blog/gutter-cleaning-featured.jpg";

// Import logo for author images
import logoMain from "../assets/logos/main-logo.png";

// Comment interface
interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

// Map blog slugs to imported images
const blogImageMap: Record<string, string> = {
  "driveway-cleaning-101-removing-oil-stains-mold-and-dirt": imgDriveway,
  "how-chesapeake-humidity-affects-home-exterior": imgChesapeake,
  "best-time-of-year-pressure-washing-hampton-roads": imgSeasonal,
  "affordable-pressure-washing-solutions-virginia": imgAffordable,
  "reliable-christmas-light-hanging-hampton-roads": imgChristmas,
  "expert-gutter-cleaning-services-hampton-roads": imgGutter,
};

// Get image for post
const getPostImage = (post: BlogPost): string => {
  return blogImageMap[post.slug] || imgDriveway; // Default to driveway image
};

// Utility functions for local storage
const getStoredData = (
  key: string,
  defaultValue: string | number | boolean | object
) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStoredData = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silent fail for localStorage issues
  }
};

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

// Optimized BlogPostCard with better accessibility
const BlogPostCard: React.FC<BlogPostCardProps> = React.memo(
  ({ post, featured = false }) => {
    const [localLikes, setLocalLikes] = useState(post.likes);
    const [localViews, setLocalViews] = useState(post.views);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
      // Check if post is liked
      const likedPosts = getStoredData(`likedPosts`, []) as number[];
      setIsLiked(likedPosts.includes(post.id));

      // Increment view count when card is rendered
      const viewedPosts = getStoredData(`viewedPosts`, []) as number[];
      if (!viewedPosts.includes(post.id)) {
        setLocalViews((prev) => prev + 1);
        viewedPosts.push(post.id);
        setStoredData(`viewedPosts`, viewedPosts);
      }
    }, [post.id]);

    const handleLike = (e: React.MouseEvent) => {
      e.preventDefault();
      const likedPosts = getStoredData(`likedPosts`, []) as number[];

      if (isLiked) {
        const newLikedPosts = likedPosts.filter((id) => id !== post.id);
        setStoredData(`likedPosts`, newLikedPosts);
        setLocalLikes((prev) => prev - 1);
        setIsLiked(false);
      } else {
        likedPosts.push(post.id);
        setStoredData(`likedPosts`, likedPosts);
        setLocalLikes((prev) => prev + 1);
        setIsLiked(true);
      }
    };

    const cardClasses = featured
      ? "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      : "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300";

    const imageSrc = getPostImage(post);

    return (
      <article className={cardClasses}>
        <div className="relative">
          <img
            src={imageSrc}
            alt={post.title}
            className={`w-full object-cover ${featured ? "h-64" : "h-48"}`}
            loading="lazy"
            width={featured ? "800" : "400"}
            height={featured ? "256" : "192"}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-sky-700 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-800 mb-3">
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
            <span className="mx-2">•</span>
            <span className="font-medium">{localViews} views</span>
          </div>
          <h2
            className={`font-heading font-bold text-gray-900 mb-3 leading-tight ${
              featured ? "text-2xl" : "text-xl"
            }`}
          >
            <Link
              to={`/blog/${post.slug}`}
              className="hover:text-sky-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded"
            >
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-800 mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={logoMain}
                alt={post.author}
                className="w-10 h-10 rounded-full mr-3 object-contain bg-white p-1 border border-gray-200"
                width="40"
                height="40"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {post.author}
                </p>
                <p className="text-xs text-gray-700">Expert Team</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <button
                onClick={handleLike}
                className={`flex items-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1 ${
                  isLiked
                    ? "text-red-600 hover:text-red-700"
                    : "text-gray-800 hover:text-red-600"
                }`}
                aria-label={
                  isLiked
                    ? `Unlike post. Currently ${localLikes} likes`
                    : `Like post. Currently ${localLikes} likes`
                }
              >
                <svg
                  className={`w-4 h-4 mr-1 transition-transform duration-200 ${
                    isLiked ? "scale-110" : ""
                  }`}
                  fill={isLiked ? "currentColor" : "none"}
                  stroke={isLiked ? "none" : "currentColor"}
                  strokeWidth="2"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">{localLikes}</span>
              </button>
              <span
                className="flex items-center text-gray-800"
                aria-label={`${post.comments} comments`}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="font-medium">{post.comments}</span>
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-200 text-gray-900 text-xs rounded-full hover:bg-sky-200 hover:text-sky-900 cursor-pointer transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                  tabIndex={0}
                  role="button"
                  aria-label={`Filter by tag: ${tag}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      // Add tag filtering logic here
                    }
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }
);

BlogPostCard.displayName = "BlogPostCard";

interface BlogPostViewProps {
  post: BlogPost;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ post }) => {
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [localViews, setLocalViews] = useState(post.views);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  const relatedPosts = getRelatedPosts(post.id);
  const imageSrc = getPostImage(post);

  useEffect(() => {
    // Check if post is liked
    const likedPosts = getStoredData(`likedPosts`, []) as number[];
    setIsLiked(likedPosts.includes(post.id));

    // Load comments for this post
    const storedComments = getStoredData(
      `comments_${post.id}`,
      []
    ) as Comment[];
    setComments(storedComments);

    // Increment view count
    const viewedPosts = getStoredData(`viewedPosts`, []) as number[];
    if (!viewedPosts.includes(post.id)) {
      setLocalViews((prev) => prev + 1);
      viewedPosts.push(post.id);
      setStoredData(`viewedPosts`, viewedPosts);
    }
  }, [post.id]);

  const handleLike = () => {
    const likedPosts = getStoredData(`likedPosts`, []) as number[];

    if (isLiked) {
      const newLikedPosts = likedPosts.filter((id) => id !== post.id);
      setStoredData(`likedPosts`, newLikedPosts);
      setLocalLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      likedPosts.push(post.id);
      setStoredData(`likedPosts`, likedPosts);
      setLocalLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "Guest User",
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
      avatar: logoMain,
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    setStoredData(`comments_${post.id}`, updatedComments);
    setNewComment("");
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `${post.title} - ${post.excerpt}`;

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(text)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          setShareMessage("Link copied to clipboard!");
          setTimeout(() => setShareMessage(""), 2000);
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Elite Exteriors Blog</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={imageSrc} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag: string) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <link
          rel="canonical"
          href={`https://www.elitxteriors.com/blog/${post.slug}`}
        />
      </Helmet>
      <main className="pt-20 pb-16 lg:pt-24 lg:pb-24 bg-white antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
          <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg">
            {/* Article Header */}
            <header className="mb-8 lg:mb-12 not-format">
              <div className="mb-6">
                <Link
                  to="/blog"
                  className="inline-flex items-center text-sky-600 hover:text-sky-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back to Blog
                </Link>
              </div>
              <div className="mb-6">
                <span className="bg-sky-700 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="mb-6 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-8 lg:text-5xl font-heading">
                {post.title}
              </h1>
              <div className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-6 text-sm text-gray-900">
                  <img
                    className="mr-4 w-16 h-16 rounded-full object-contain bg-white p-2"
                    src={logoMain}
                    alt={post.author}
                    width="64"
                    height="64"
                  />
                  <div>
                    <p className="text-xl font-bold text-gray-900 font-heading">
                      {post.author}
                    </p>
                    <p className="text-base text-gray-700 font-paragraph">
                      {post.authorBio}
                    </p>
                    <div className="flex items-center mt-2 space-x-4 text-sm text-gray-700">
                      <time dateTime={post.publishDate}>
                        {new Date(post.publishDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{localViews} views</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Featured Image with proper dimensions */}
              <img
                src={imageSrc}
                alt={post.title}
                className="w-full rounded-lg shadow-lg mb-8"
                width="800"
                height="400"
                loading="eager"
              />

              {/* Interactive Social Share & Engagement */}
              <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-t border-b border-gray-300 mb-8 bg-gray-50 px-6 rounded-lg">
                <div className="flex items-center space-x-6 mb-4 sm:mb-0">
                  <button
                    onClick={handleLike}
                    className={`flex items-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg px-3 py-2 ${
                      isLiked
                        ? "text-red-600 hover:text-red-700"
                        : "text-gray-800 hover:text-red-600"
                    }`}
                    aria-label={
                      isLiked
                        ? `Unlike post. Currently ${localLikes} likes`
                        : `Like post. Currently ${localLikes} likes`
                    }
                  >
                    <svg
                      className={`w-6 h-6 mr-2 transition-transform duration-200 ${
                        isLiked ? "scale-110" : ""
                      }`}
                      fill={isLiked ? "currentColor" : "none"}
                      stroke={isLiked ? "none" : "currentColor"}
                      strokeWidth="2"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {localLikes} {localLikes === 1 ? "Like" : "Likes"}
                  </button>
                  <span
                    className="flex items-center text-gray-800 font-medium"
                    aria-label={`${comments.length} comments`}
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {comments.length}{" "}
                    {comments.length === 1 ? "Comment" : "Comments"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-800">
                    Share:
                  </span>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="text-blue-600 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                    aria-label="Share on Facebook"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="text-blue-400 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-1"
                    aria-label="Share on Twitter"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="text-blue-700 hover:text-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 rounded p-1"
                    aria-label="Share on LinkedIn"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 rounded p-1"
                    aria-label="Copy link"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
                {shareMessage && (
                  <div
                    className="absolute top-full mt-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium"
                    role="status"
                    aria-live="polite"
                  >
                    {shareMessage}
                  </div>
                )}
              </div>
            </header>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:font-paragraph prose-p:text-gray-700 prose-a:text-sky-600 prose-a:no-underline hover:prose-a:text-sky-800 prose-strong:text-gray-900 prose-ul:font-paragraph prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-sky-200 text-sky-800 text-sm rounded-full hover:bg-sky-300 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                    tabIndex={0}
                    role="button"
                    aria-label={`Filter by tag: ${tag}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        // Add tag filtering logic here
                      }
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <section
              className="mt-12 pt-8 border-t border-gray-300"
              aria-labelledby="comments-heading"
            >
              <h3
                id="comments-heading"
                className="text-xl font-bold text-gray-900 mb-6 font-heading"
              >
                Comments ({comments.length})
              </h3>

              {/* Comment Form */}
              <form
                onSubmit={handleComment}
                className="mb-8 p-6 bg-gray-50 rounded-lg"
              >
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  Add a comment
                </label>
                <textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this article..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors text-gray-900 bg-white"
                  rows={4}
                  required
                />
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-700">
                    Your comment will be posted as "Guest User"
                  </p>
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="px-6 py-2 bg-sky-700 hover:bg-sky-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                  >
                    Post Comment
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex space-x-4 p-4 bg-white rounded-lg border border-gray-200"
                    >
                      <img
                        src={comment.avatar || logoMain}
                        alt={comment.author}
                        className="w-10 h-10 rounded-full object-contain bg-gray-200 p-1 flex-shrink-0"
                        width="40"
                        height="40"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">
                            {comment.author}
                          </h4>
                          <time
                            className="text-gray-700 text-sm"
                            dateTime={comment.timestamp}
                          >
                            {new Date(comment.timestamp).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </time>
                        </div>
                        <p className="text-gray-800 leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-700">
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </section>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg border border-sky-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                  Need Professional Exterior Services?
                </h3>
                <p className="text-gray-800 mb-6 font-paragraph max-w-2xl mx-auto">
                  Get a free quote for pressure washing, gutter cleaning, or any
                  of our exterior services. Serving Hampton Roads, Virginia with
                  exceptional quality and customer service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/quote"
                    className="inline-flex items-center justify-center px-6 py-3 text-white bg-sky-700 hover:bg-sky-800 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                  >
                    Get Free Quote
                  </Link>
                  <a
                    href="tel:+1-757-796-7240"
                    className="inline-flex items-center justify-center px-6 py-3 text-sky-700 bg-white border-2 border-sky-700 hover:bg-sky-700 hover:text-white rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                  >
                    Call (757) 796-7240
                  </a>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                <img
                  className="w-16 h-16 rounded-full mr-4 object-contain bg-white p-2"
                  src={logoMain}
                  alt={post.author}
                  width="64"
                  height="64"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 font-heading">
                    {post.author}
                  </h4>
                  <p className="text-gray-800 mt-2 font-paragraph">
                    {post.authorBio}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    Elite Exteriors is a family-run business founded by Ahmet
                    from Turkey and Gaby from Zimbabwe, providing exceptional
                    pressure washing, gutter cleaning, and exterior services in
                    Hampton Roads, Virginia.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <aside
            className="py-16 bg-gray-50"
            aria-labelledby="related-posts-heading"
          >
            <div className="px-4 mx-auto max-w-screen-xl">
              <h2
                id="related-posts-heading"
                className="mb-8 text-2xl font-bold text-gray-900 font-heading text-center"
              >
                Related Articles
              </h2>
              <div className="grid gap-8 lg:grid-cols-3">
                {relatedPosts.slice(0, 3).map((relatedPost) => (
                  <BlogPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </aside>
        )}
      </main>
    </>
  );
};

export default BlogPostView;
