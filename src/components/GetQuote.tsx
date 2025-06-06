import { useEffect, useState } from "react";

interface GetQuoteProps {
  onLoadComplete?: () => void;
}

export const GetQuote = ({ onLoadComplete }: GetQuoteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadForm = async () => {
      try {
        // Load CSS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css";
        link.media = "screen";
        document.head.appendChild(link);

        // Load scripts
        await Promise.all([
          loadScript(
            "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js"
          ),
          loadScript(
            "https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.js"
          ),
        ]);

        setIsLoading(false);
        onLoadComplete?.();
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load form"));
        setIsLoading(false);
      }
    };

    loadForm();

    return () => {
      // Cleanup code...
    };
  }, [onLoadComplete]);

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600">
          Failed to load the quote form. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section
      id="GetQuote"
      className="py-8 antialiased w-full min-h-screen block md:py-16"
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : (
        <div
          id="7f4a0183-7e4d-49e1-9625-ab6ab52e2883"
          className="mx-auto max-w-4xl px-4"
        />
      )}
    </section>
  );
};

// Helper function to load scripts
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};

// This component can be used in the main App component to provide a call-to-action for users to request a quote for services.
