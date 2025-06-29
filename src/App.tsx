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
        <title>
          Elite Exteriors - Professional Pressure Washing & Exterior Services in
          Hampton Roads, VA
        </title>
        <meta
          name="description"
          content="Elite Exteriors - Professional pressure washing, gutter cleaning, Christmas light installation, and lawn care services in Hampton Roads, Virginia. Get your free quote today!"
        />
        <meta
          name="keywords"
          content="pressure washing, gutter cleaning, lawn care, Christmas lights, exterior cleaning, Hampton Roads, Virginia Beach, Chesapeake, Norfolk"
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              // Reset functionality if needed
            }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <div className="pt-20">
                {" "}
                {/* Add padding-top to account for fixed navbar */}
                <Hero />
                <About />
                <Services />
                <Gallery />
                <Testimonials />
                <GetQuote />
              </div>
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
