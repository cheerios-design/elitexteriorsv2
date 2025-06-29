/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/BlogPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  blogPosts,
  blogCategories,
  popularTags,
  getRelatedPosts,
  searchPosts,
  filterByCategory,
} from "../data/blog-posts";
import { type BlogPost, type BlogCategory } from "../types/blog";

// Import blog images
import imgDriveway from "../assets/images/blog/driveway-cleaning-featured.jpg";
import imgChesapeake from "../assets/images/blog/chesapeake-humidity-featured.jpg";
import imgSeasonal from "../assets/images/blog/seasonal-pressure-washing-featured.jpg";
import imgAffordable from "../assets/images/blog/affordable-pressure-washing-featured.jpg";
import imgChristmas from "../assets/images/blog/christmas-lights-featured.jpg";
import imgGutter from "../assets/images/blog/gutter-cleaning-featured.jpg";

// Import logo for author images
import logoMain from "../assets/logos/main-logo.png";

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

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
  </div>
);

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  featured = false,
}) => {
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
        />
        <div className="absolute top-4 left-4">
          <span className="bg-sky-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
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
          <span>{post.views} views</span>
        </div>
        <h2
          className={`font-heading font-bold text-gray-900 mb-3 ${
            featured ? "text-2xl" : "text-xl"
          }`}
        >
          <Link
            to={`/blog/${post.slug}`}
            className="hover:text-sky-600 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logoMain}
              alt={post.author}
              className="w-10 h-10 rounded-full mr-3 object-contain bg-white p-1"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author}</p>
              <p className="text-xs text-gray-500">Expert Team</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              {post.likes}
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              {post.comments}
            </span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-sky-100 hover:text-sky-700 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

interface BlogPostViewProps {
  post: BlogPost;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ post }) => {
  const relatedPosts = getRelatedPosts(post.id);
  const imageSrc = getPostImage(post);

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
      </Helmet>
      <main className="pt-20 pb-16 lg:pt-24 lg:pb-24 bg-white antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
          <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg">
            {/* Article Header */}
            <header className="mb-8 lg:mb-12 not-format">
              <div className="mb-6">
                <Link
                  to="/blog"
                  className="inline-flex items-center text-sky-600 hover:text-sky-800 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
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
                <span className="bg-sky-600 text-white px-4 py-2 rounded-full text-sm font-medium">
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
                  />
                  <div>
                    <p className="text-xl font-bold text-gray-900 font-heading">
                      {post.author}
                    </p>
                    <p className="text-base text-gray-500 font-paragraph">
                      {post.authorBio}
                    </p>
                    <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
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
                      <span>{post.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Featured Image */}
              <img
                src={imageSrc}
                alt={post.title}
                className="w-full rounded-lg shadow-lg mb-8"
              />

              {/* Social Share & Engagement */}
              <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 mb-8">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {post.likes} Likes
                  </button>
                  <span className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {post.comments} Comments
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">Share:</span>
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="text-blue-700 hover:text-blue-900 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </button>
                  <button className="text-blue-800 hover:text-blue-600 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>
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
                    className="px-3 py-1 bg-sky-100 text-sky-700 text-sm rounded-full hover:bg-sky-200 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg border border-sky-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  Ready to Transform Your Property?
                </h3>
                <p className="text-gray-700 mb-6 font-paragraph">
                  Get a free quote for our professional exterior cleaning
                  services in Hampton Roads.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/quote"
                    className="btn-primary inline-flex items-center justify-center px-6 py-3 text-white bg-sky-600 hover:bg-sky-700 rounded-lg font-medium transition-colors"
                  >
                    Get Free Quote
                  </Link>
                  <a
                    href="tel:+1-757-796-7240"
                    className="btn-secondary inline-flex items-center justify-center px-6 py-3 text-sky-600 bg-white border-2 border-sky-600 hover:bg-sky-600 hover:text-white rounded-lg font-medium transition-all"
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
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 font-heading">
                    {post.author}
                  </h4>
                  <p className="text-gray-600 mt-2 font-paragraph">
                    {post.authorBio}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
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
          <aside className="py-16 bg-gray-50">
            <div className="px-4 mx-auto max-w-screen-xl">
              <h2 className="mb-8 text-2xl font-bold text-gray-900 font-heading">
                Related Articles
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost: BlogPost) => (
                  <BlogPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Newsletter Signup */}
        <section className="bg-white py-16">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-md sm:text-center">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl font-heading">
                Stay Updated with Elite Exteriors
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-gray-500 md:mb-12 sm:text-xl font-paragraph">
                Get the latest tips, seasonal maintenance advice, and exclusive
                offers delivered to your inbox.
              </p>
              <form className="max-w-md mx-auto">
                <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                  <div className="relative w-full">
                    <label
                      htmlFor="email"
                      className="hidden mb-2 text-sm font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                      </svg>
                    </div>
                    <input
                      className="block p-3 pl-9 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-sky-500 focus:border-sky-500 newsletter-input"
                      placeholder="Enter your email"
                      type="email"
                      id="email"
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-sky-600 border-sky-600 sm:rounded-none sm:rounded-r-lg hover:bg-sky-700 focus:ring-4 focus:ring-sky-300"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
                <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500">
                  We care about your privacy.
                  <Link
                    to="/privacy"
                    className="font-medium text-sky-600 hover:underline ml-1"
                  >
                    Read our Privacy Policy
                  </Link>
                  .
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const BlogListingView: React.FC = () => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsLoading(true);

    setTimeout(() => {
      if (query.trim()) {
        const results = searchPosts(query);
        setFilteredPosts(results);
      } else {
        setFilteredPosts(filterByCategory(selectedCategory));
      }
      setIsLoading(false);
    }, 300);
  };

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setIsLoading(true);

    setTimeout(() => {
      const filtered = filterByCategory(category);
      setFilteredPosts(filtered);
      setIsLoading(false);
    }, 200);
  };

  const featuredPost = blogPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <>
      <Helmet>
        <title>Blog - Expert Tips & Insights | Elite Exteriors</title>
        <meta
          name="description"
          content="Read expert tips and insights about pressure washing, gutter cleaning, and home maintenance from Elite Exteriors. Serving Hampton Roads, Virginia."
        />
        <meta
          name="keywords"
          content="pressure washing blog, home maintenance tips, gutter cleaning advice, Hampton Roads, Virginia"
        />
        <meta
          property="og:title"
          content="Elite Exteriors Blog - Expert Home Maintenance Tips"
        />
        <meta
          property="og:description"
          content="Expert tips and insights about exterior cleaning and maintenance from the professionals at Elite Exteriors."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.elitxteriors.com/blog" />
      </Helmet>

      <main className="pt-20 pb-16 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 font-heading">
                Expert Tips & Insights
              </h1>
              <p className="text-xl md:text-2xl mb-8 font-paragraph opacity-90">
                Professional advice for maintaining your home's exterior in
                Hampton Roads
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-lg leading-5 bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 transition duration-150 ease-in-out"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Featured Post */}
              {!searchQuery && selectedCategory === "all" && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heading">
                    Featured Article
                  </h2>
                  <BlogPostCard post={featuredPost} featured={true} />
                </section>
              )}

              {/* Category Filter */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {blogCategories.map((category: BlogCategory) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryFilter(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? "bg-sky-600 text-white"
                          : "bg-white text-gray-700 hover:bg-sky-100 hover:text-sky-600"
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Results Info */}
              {searchQuery && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800">
                    {filteredPosts.length} article
                    {filteredPosts.length !== 1 ? "s" : ""} found for "
                    {searchQuery}"
                  </p>
                </div>
              )}

              {/* Articles Grid */}
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No articles found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filter criteria.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-8 md:grid-cols-2">
                      {(searchQuery || selectedCategory !== "all"
                        ? filteredPosts
                        : regularPosts
                      ).map((post: BlogPost) => (
                        <BlogPostCard key={post.id} post={post} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/4">
              <div className="sticky top-24 space-y-8">
                {/* Popular Tags */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-sky-100 hover:text-sky-700 cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">
                    Recent Posts
                  </h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 4).map((post: BlogPost) => (
                      <div key={post.id} className="flex space-x-3">
                        <img
                          src={getPostImage(post)}
                          alt={post.title}
                          className="w-15 h-15 rounded object-cover flex-shrink-0"
                        />
                        <div>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="text-sm font-medium text-gray-900 hover:text-sky-600 transition-colors line-clamp-2"
                          >
                            {post.title}
                          </Link>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(post.publishDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-gradient-to-br from-sky-600 to-blue-700 rounded-lg shadow-md p-6 text-white">
                  <h3 className="text-lg font-semibold mb-3 font-heading">
                    Need Professional Help?
                  </h3>
                  <p className="text-sm mb-4 opacity-90 font-paragraph">
                    Get expert exterior cleaning services for your Hampton Roads
                    property.
                  </p>
                  <Link
                    to="/quote"
                    className="inline-block w-full text-center bg-white text-sky-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

const BlogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (slug) {
      const post = blogPosts.find((p: BlogPost) => p.slug === slug);
      if (post) {
        setCurrentPost(post);
      } else {
        navigate("/blog", { replace: true });
      }
    } else {
      setCurrentPost(null);
    }
    setIsLoading(false);
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {currentPost ? <BlogPostView post={currentPost} /> : <BlogListingView />}
      <Footer />
    </>
  );
};

export default BlogPage;
