import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Helmet } from "react-helmet";
import { useHeadingAnimation } from "./hooks/useHeadingAnimation";
import { Testimonials } from "./components/Testimonials";

function App() {
  useHeadingAnimation();

  return (
    <>
      <Helmet>
        <title>
          Elite Exteriors - Family-Run Exterior Services in Hampton Roads, VA
        </title>
        <meta
          name="description"
          content="Trusted family-run business offering premium pressure washing, gutter cleaning, and Christmas light installation in Hampton Roads. Founded by Ahmet and Gaby, bringing international expertise to Virginia."
        />
        <meta
          name="keywords"
          content="pressure washing Hampton Roads, gutter cleaning Virginia, Christmas light installation, family business, exterior cleaning services"
        />
        <meta
          property="og:title"
          content="Elite Exteriors - Family-Run Exterior Services in Hampton Roads"
        />
        <meta
          property="og:description"
          content="Expert pressure washing, gutter cleaning, and Christmas light installation services by a diverse, family-owned business in Hampton Roads, VA."
        />
      </Helmet>

      {/* Main navigation */}
      <Navbar />

      <main className="container mx-auto p-4 pt-40 flex flex-col items-center">
        {/* Hero section with main value proposition */}
        <Hero />

        {/* About section highlighting family business story */}
        <About />
        {/* Services section showcasing exterior services */}
        <Services />
        {/* Gallery section displaying work examples */}
        <Gallery />
        {/* Testimobials section */}
        <Testimonials />
      </main>
    </>
  );
}

export default App;
