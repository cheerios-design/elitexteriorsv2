import { Suspense } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Helmet } from "react-helmet";
import { useHeadingAnimation } from "./hooks/useHeadingAnimation";
import { Testimonials } from "./components/Testimonials";
import { GetQuote } from "./components/GetQuote";
import { ErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";
import { Footer } from "./components/Footer";

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
  </div>
);

// Error fallback component with proper typing
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="text-center p-4 bg-red-50 rounded-lg m-4">
    <h2 className="text-xl font-bold text-red-800 mb-2">
      Something went wrong
    </h2>
    <p className="text-red-600 mb-4">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Try again
    </button>
  </div>
);

const App = () => {
  useHeadingAnimation();

  return (
    <>
      <Helmet>
        <title>Elite Exteriors - Professional Exterior Services</title>
        <meta
          name="description"
          content="Elite Exteriors - Professional pressure washing, gutter cleaning, and exterior services in Hampton Roads area."
        />
      </Helmet>

      <Navbar />

      <main className="container mx-auto p-4 pt-40 flex flex-col items-center">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // Reset functionality if needed
          }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Hero />
            <About />
            <Services />
            <Gallery />
            <Testimonials />
            <GetQuote />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

export default App;
