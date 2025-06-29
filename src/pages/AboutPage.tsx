import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Helmet } from "react-helmet";
import aboutImg from "../assets/images/about-us.jpg";
import about2Img from "../assets/images/gallery1(2).jpg";

export const AboutPage = () => (
  <>
    <Helmet>
      <title>About Us | Elite Exteriors</title>
      <meta
        name="description"
        content="Learn more about Elite Exteriors, your trusted partner for professional exterior services in Hampton Roads, VA."
      />
    </Helmet>
    <Navbar />
    <main>
      {/* Hero Section */}
      <section className="mt-35" id="hero">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-15">
          <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Heading and Paragraphs */}
            <div className="text-gray-800 font-paragraph sm:text-lg text-left">
              <h2 className="mb-4 text-4xl tracking-tight font-bold uppercase font-heading text-sky-800">
                About <span className="font-extrabold">Elite Exteriors</span>
              </h2>
              <p className="mb-4 font-light">
                At Elite Exteriors, we are dedicated to providing top-notch
                exterior services that enhance the beauty and functionality of
                your property. With years of experience and a commitment to
                excellence, we are your trusted partner in Hampton Roads, VA.
              </p>
              <p className="mb-4">
                Elite Exteriors is a trusted family-run business in Virginia,
                dedicated to providing top-notch pressure washing, gutter
                cleaning, and lawn care services in the Hampton Roads area.
              </p>

              <p className="mb-4">
                The company is founded by husband and wife, Matt from Turkey and
                Gaby from Zimbabwe. With our diverse backgrounds and skill sets,
                we pride ourselves on delivering exceptional customer service
                that sets us apart in the industry.
              </p>
              <p className="mb-4">
                Our commitment to treating every client like family ensures
                personalized attention and care for each project, big or small.
                We understand the importance of a clean environment, and our
                goal is to exceed your expectations with reliable, high-quality
                pressure washing services tailored to your needs. Your
                satisfaction is our top priority, and we look forward to making
                your space shine!
              </p>
            </div>
            {/* Right: Image */}
            <div className="flex flex-col gap-6 items-end">
              <img
                src={aboutImg}
                className="w-full max-w-md h-full object-cover rounded-lg shadow-lg"
                alt="About Us"
              />
              <img
                src={about2Img}
                className="w-full max-w-md h-full object-cover rounded-lg shadow-lg"
                alt="About Us"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);
export default AboutPage;
