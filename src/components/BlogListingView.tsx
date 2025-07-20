// src/components/BlogListingView.tsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { type BlogPost } from "../types/blog";
import {
  blogPosts,
  blogCategories,
  popularTags,
  searchPosts,
  filterByCategory,
} from "../data/blog-posts";

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

// Loading component with better contrast
const LoadingSpinner: React.FC = () => (
  <div
    className="flex items-center justify-center py-12"
    role="status"
    aria-label="Loading content"
  >
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-600"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

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
            <a
              href={`/blog/${post.slug}`}
              className="hover:text-sky-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded"
            >
              {post.title}
            </a>
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

const BlogListingView: React.FC = () => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle search with debouncing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        const results = searchPosts(searchQuery);
        setFilteredPosts(results);
        setIsLoading(false);
      } else if (selectedCategory !== "all") {
        setIsLoading(true);
        setFilteredPosts(filterByCategory(selectedCategory));
        setIsLoading(false);
      } else {
        setFilteredPosts(blogPosts);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCategory]);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Clear search when filtering by category
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Elite Exteriors Blog",
            description:
              "Expert tips and insights about pressure washing, gutter cleaning, and home maintenance",
            url: "https://www.elitxteriors.com/blog",
            publisher: {
              "@type": "Organization",
              name: "Elite Exteriors",
              logo: {
                "@type": "ImageObject",
                url: "https://www.elitxteriors.com/images/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.elitxteriors.com/blog",
            },
          })}
        </script>
      </Helmet>

      <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-sky-400 to-sky-200 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-heading">
                Elite Exteriors Blog
              </h1>
              <p className="text-xl mb-8 text-white font-paragraph">
                Expert tips, insights, and guides for maintaining your
                property's exterior
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <label htmlFor="blog-search" className="sr-only">
                    Search articles
                  </label>
                  <input
                    id="blog-search"
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full px-4 py-3 pl-12 text-gray-900 bg-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-4 top-3.5 h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Category Filter */}
              <div className="mb-8">
                <h2 className="sr-only">Filter articles by category</h2>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label="Category filters"
                >
                  <button
                    onClick={() => handleCategoryFilter("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                      selectedCategory === "all"
                        ? "bg-sky-600 text-white"
                        : "bg-white text-gray-800 hover:bg-gray-200 border border-gray-300"
                    }`}
                    aria-pressed={selectedCategory === "all"}
                  >
                    All Posts
                  </button>
                  {blogCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryFilter(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                        selectedCategory === category.id
                          ? "bg-sky-600 text-white"
                          : "bg-white text-gray-800 hover:bg-gray-200 border border-gray-300"
                      }`}
                      aria-pressed={selectedCategory === category.id}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Loading State */}
              {isLoading && <LoadingSpinner />}

              {/* Featured Post */}
              {!isLoading &&
                searchQuery === "" &&
                selectedCategory === "all" && (
                  <section className="mb-12" aria-labelledby="featured-heading">
                    <h2
                      id="featured-heading"
                      className="text-2xl font-bold text-gray-900 mb-6 font-heading"
                    >
                      Featured Article
                    </h2>
                    <BlogPostCard post={featuredPost} featured={true} />
                  </section>
                )}

              {/* Regular Posts */}
              {!isLoading && (
                <section aria-labelledby="articles-heading">
                  <h2
                    id="articles-heading"
                    className="text-2xl font-bold text-gray-900 mb-6 font-heading"
                  >
                    {searchQuery
                      ? `Search Results for "${searchQuery}"`
                      : "Latest Articles"}
                  </h2>
                  <div className="grid gap-8 md:grid-cols-2">
                    {regularPosts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </div>
                  {regularPosts.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                      <p className="text-gray-800">
                        {searchQuery
                          ? `No articles found for "${searchQuery}". Try adjusting your search or filter.`
                          : "No articles found. Try adjusting your filter."}
                      </p>
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/4" aria-label="Blog sidebar">
              <div className="space-y-8">
                {/* Popular Tags */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-sky-100 text-sky-700 text-sm rounded-full hover:bg-sky-200 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                        tabIndex={0}
                        role="button"
                        aria-label={`Filter by tag: ${tag}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setSearchQuery(tag);
                          }
                        }}
                        onClick={() => setSearchQuery(tag)}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-lg border border-sky-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">
                    Stay Updated
                  </h3>
                  <p className="text-gray-800 mb-4 text-sm">
                    Get the latest tips and insights delivered to your inbox.
                  </p>
                  <form
                    className="space-y-3"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>

                {/* Contact CTA */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">
                    Need Expert Help?
                  </h3>
                  <p className="text-gray-800 mb-4 text-sm">
                    Get professional pressure washing and exterior cleaning
                    services.
                  </p>
                  <a
                    href="/quote"
                    className="block w-full px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 text-center"
                  >
                    Get Free Quote
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogListingView;
