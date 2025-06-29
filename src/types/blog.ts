// src/types/blog.ts

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  authorBio: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage: string;
  metaDescription: string;
  views: number;
  likes: number;
  comments: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  count: number;
}

export interface RelatedPost extends BlogPost {
  relevanceScore?: number;
}

export interface PopularPost extends BlogPost {
  popularityScore?: number;
}
