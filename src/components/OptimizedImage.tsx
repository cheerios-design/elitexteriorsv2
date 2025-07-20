// src/components/OptimizedImage.tsx
import React, { useState, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// Function to check if browser supports WebP
const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
};

// Function to check if browser supports AVIF
const supportsAVIF = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src =
      "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=";
  });
};

// Generate optimized source URLs
const generateOptimizedSources = (src: string, width?: number) => {
  const baseName = src.replace(/\.[^/.]+$/, "");
  const extension = src.split(".").pop();

  const sources = [];

  // Generate sizes if width is provided
  const sizes = width
    ? [width, Math.floor(width * 0.75), Math.floor(width * 0.5)]
    : [800, 600, 400];

  // AVIF sources (best compression)
  const avifSources = sizes
    .map((size) => `${baseName}-${size}w.avif ${size}w`)
    .join(", ");
  if (avifSources) {
    sources.push({
      type: "image/avif",
      srcSet: avifSources,
    });
  }

  // WebP sources (good compression)
  const webpSources = sizes
    .map((size) => `${baseName}-${size}w.webp ${size}w`)
    .join(", ");
  if (webpSources) {
    sources.push({
      type: "image/webp",
      srcSet: webpSources,
    });
  }

  // Fallback to original format
  const fallbackSources = sizes
    .map((size) => `${baseName}-${size}w.${extension} ${size}w`)
    .join(", ");

  return { sources, fallback: fallbackSources || src };
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  onLoad,
  onError,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [supportedFormats, setSupportedFormats] = useState({
    webp: false,
    avif: false,
  });

  // Check format support on mount
  useEffect(() => {
    const checkSupport = async () => {
      const [webp, avif] = await Promise.all([supportsWebP(), supportsAVIF()]);
      setSupportedFormats({ webp, avif });
    };
    checkSupport();
  }, []);

  // Generate optimized sources
  const { sources, fallback } = generateOptimizedSources(src, width);

  // Filter sources based on browser support
  const filteredSources = sources.filter((source) => {
    if (source.type === "image/avif") return supportedFormats.avif;
    if (source.type === "image/webp") return supportedFormats.webp;
    return true;
  });

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  // Preload critical images
  useEffect(() => {
    if (priority) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      if (supportedFormats.avif && filteredSources[0]) {
        link.href = filteredSources[0].srcSet.split(" ")[0];
      }
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, src, supportedFormats.avif, filteredSources]);

  // Intersection Observer for lazy loading enhancement
  useEffect(() => {
    if (loading === "lazy" && !priority) {
      const img = document.querySelector(
        `img[alt="${alt}"]`
      ) as HTMLImageElement;
      if (img && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                img.loading = "eager";
                observer.unobserve(img);
              }
            });
          },
          { rootMargin: "50px" }
        );
        observer.observe(img);

        return () => observer.disconnect();
      }
    }
  }, [loading, priority, alt]);

  return (
    <picture className={`optimized-image ${className}`}>
      {filteredSources.map((source, index) => (
        <source
          key={index}
          type={source.type}
          srcSet={source.srcSet}
          sizes={sizes}
        />
      ))}
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : loading}
        decoding="async"
        className={`
          transition-opacity duration-300
          ${imageLoaded ? "opacity-100" : "opacity-0"}
          ${imageError ? "bg-gray-200" : ""}
          ${className}
        `}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : undefined,
        }}
      />

      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse rounded ${className}`}
          style={{
            width: width || "100%",
            height: height || "auto",
            aspectRatio: width && height ? `${width} / ${height}` : undefined,
          }}
          aria-hidden="true"
        />
      )}

      {/* Error fallback */}
      {imageError && (
        <div
          className={`absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}
          style={{
            width: width || "100%",
            height: height || "auto",
            aspectRatio: width && height ? `${width} / ${height}` : undefined,
          }}
          role="img"
          aria-label={alt}
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </picture>
  );
};

export default OptimizedImage;
