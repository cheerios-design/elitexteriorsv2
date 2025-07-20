import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
    react({
      // Enable React optimization features
      babel: {
        plugins:
          mode === "production"
            ? [
                [
                  "babel-plugin-react-remove-properties",
                  { properties: ["data-testid"] },
                ],
              ]
            : [],
      },
    }),
  ],

  // Build optimizations
  build: {
    target: "es2015",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: true,
        pure_funcs:
          mode === "production"
            ? ["console.log", "console.info", "console.debug", "console.warn"]
            : [],
      },
      mangle: {
        safari10: true,
      },
      format: {
        safari10: true,
      },
    },
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk optimization
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["react-helmet", "flowbite"],
          // Blog-specific chunk for route-based splitting
          blog: ["./src/pages/BlogPage.tsx", "./src/data/blog-posts.ts"],
        },
        // Optimize chunk file names
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".") || [];
          let extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = "fonts";
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
      },
    },
    // Compress chunks
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096,
  },

  // Performance optimizations
  server: {
    fs: {
      strict: true,
    },
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "react-helmet"],
    exclude: ["@vitejs/plugin-react"],
  },

  // Environment variables
  define: {
    __VITE_IS_PRODUCTION__: JSON.stringify(mode === "production"),
  },
}));
