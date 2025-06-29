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

// Placeholder images
const PLACEHOLDER_FEATURED =
  "https://via.placeholder.com/400x250?text=Elite+Exteriors";
const PLACEHOLDER_AUTHOR = "https://via.placeholder.com/40x40?text=EA";
const PLACEHOLDER_RECENT = "https://via.placeholder.com/60x60?text=EA";
const PLACEHOLDER_LARGE =
  "https://via.placeholder.com/800x400?text=Elite+Exteriors";

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

  return (
    <article className={cardClasses}>
      <div className="relative">
        <img
          src={post.featuredImage || PLACEHOLDER_FEATURED}
          alt={post.title}
          className={`w-full object-cover ${featured ? "h-64" : "h-48"}`}
          loading="lazy"
          onError={(e) => (e.currentTarget.src = PLACEHOLDER_FEATURED)}
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
              src={post.authorImage || PLACEHOLDER_AUTHOR}
              alt={post.author}
              className="w-10 h-10 rounded-full mr-3"
              onError={(e) => (e.currentTarget.src = PLACEHOLDER_AUTHOR)}
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

  return (
    <>
      <Helmet>
        <title>{post.title} | Elite Exteriors Blog</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta
          property="og:image"
          content={post.featuredImage || PLACEHOLDER_LARGE}
        />
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
                    className="mr-4 w-16 h-16 rounded-full"
                    src={post.authorImage || PLACEHOLDER_AUTHOR}
                    alt={post.author}
                    onError={(e) => (e.currentTarget.src = PLACEHOLDER_AUTHOR)}
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
                src={post.featuredImage || PLACEHOLDER_LARGE}
                alt={post.title}
                className="w-full rounded-lg shadow-lg mb-8"
                onError={(e) => (e.currentTarget.src = PLACEHOLDER_LARGE)}
              />
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
          </article>
        </div>
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
    <main className="pt-20 pb-16 lg:pt-24 lg:pb-24 bg-white antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        <div className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
        </div>
      </div>
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
          {/* Sidebar remains unchanged */}
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
                        src={post.featuredImage || PLACEHOLDER_RECENT}
                        alt={post.title}
                        className="w-15 h-15 rounded object-cover flex-shrink-0"
                        onError={(e) =>
                          (e.currentTarget.src = PLACEHOLDER_RECENT)
                        }
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
