import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Helmet } from "react-helmet";
import residentialImg from "../assets/images/services/residential-house-washing.jpg";
import commercialImg from "../assets/images/services/commercial-pressure-washing.webp";
import drivewayImg from "../assets/images/services/driveway-cleaning.jpg";
import gutterImg from "../assets/images/services/gutter-cleaning.jpg";
import lawncareImg from "../assets/images/services/lawncare.jpg";
import deckpatioImg from "../assets/images/services/deckpatio.jpg";

export const ServicesPage = () => (
  <>
    <Helmet>
      <title>Our Services | Elite Exteriors</title>
      <meta
        name="description"
        content="Discover all the professional exterior services offered by Elite Exteriors in Hampton Roads, VA."
      />
    </Helmet>
    <Navbar />
    <main>
      {/* Hero Section */}
      <section className="mt-35" id="hero">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-15">
          <div className="max-w-screen-lg text-gray-800 font-paragraph sm:text-lg">
            <h2 className="mb-4 text-4xl tracking-tight font-bold uppercase font-heading text-sky-800">
              Explore Our Expert{" "}
              <span className="font-extrabold">Home Care Solutions</span>
            </h2>
            <p className="mb-4 font-light">
              Discover the perfect solution for your home or business needs with
              our wide range of professional services. From pressure washing to
              lawn care, we are committed to delivering exceptional results that
              enhance your property's appeal and functionality.
            </p>
            <p className="mb-4 font-medium">
              Explore our services today and find the one that best suits your
              requirements.
            </p>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services">
        <div className="py-8 px-4 mx-auto font-paragraph max-w-screen-xl lg:py-16 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
              {
                <img
                  src={residentialImg}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                  alt="Residential House Washing"
                />
              }
              <h3 className="text-xl text-sky-700 font-accent font-semibold mb-4">
                Residential House Washing
              </h3>
              <p className="text-gray-700 mb-4">
                Revitalize your property's exterior with our professional
                pressure washing services. We remove dirt, grime, and stains
                from surfaces, leaving them looking fresh and clean.
              </p>
              <a href="/#get-quote" className="text-blue-500 hover:underline">
                Get a Quote
              </a>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
              <img
                src={commercialImg}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
                alt="Commercial Pressure Washing"
              />
              <h3 className="text-xl text-sky-700 font-accent font-semibold mb-4">
                Commercial Pressure Washing
              </h3>
              <p className="text-gray-700 mb-4">
                Keep your gutters in top condition with our thorough gutter
                cleaning services. We ensure proper water drainage and prevent
                damage to your property.
              </p>
              <a href="/#get-quote" className="text-blue-500 hover:underline">
                Get a Quote
              </a>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
              <img
                src={drivewayImg}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
                alt="Driveway Cleaning"
              />
              <h3 className="text-xl text-sky-700 font-accent font-semibold mb-4">
                Driveway Cleaning
              </h3>
              <p className="text-gray-700 mb-4">
                Achieve a lush and healthy lawn with our expert lawn care
                services. We provide mowing, fertilization, and maintenance to
                keep your yard looking its best.
              </p>
              <a href="/#get-quote" className="text-blue-500 hover:underline">
                Get a Quote
              </a>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
              <img
                src={gutterImg}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
                alt="Gutter Cleaning"
              />
              <h3 className="text-xl text-sky-700 font-accent font-semibold mb-4">
                Gutter Cleaning
              </h3>
              <p className="text-gray-700 mb-4">
                Keep your gutters in top condition with our thorough gutter
                cleaning services. We ensure proper water drainage and prevent
                damage to your property.
              </p>
              <a href="/#get-quote" className="text-blue-500 hover:underline">
                Get a Quote
              </a>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
              <img
                src={lawncareImg}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
                alt="Lawn Care Services"
              />
              <h3 className="text-xl text-sky-700 font-accent font-semibold mb-4">
                Lawn Care Services
              </h3>
              <p className="text-gray-700 mb-4">
                Achieve a lush and healthy lawn with our expert lawn care
                services. We provide mowing, fertilization, and maintenance to
                keep your yard looking its best.
              </p>
              <a href="/#get-quote" className="text-blue-500 hover:underline">
                Get a Quote
              </a>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
              <img
                src={deckpatioImg}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
                alt="Deck & Patio Cleaning"
              />
              <h3 className="text-xl text-sky-700 font-accent font-semibold mb-4">
                Deck & Patio Cleaning
              </h3>
              <p className="text-gray-700 mb-4">
                Restore the beauty of your outdoor spaces with our deck and
                patio cleaning services. We remove dirt, mold, and stains,
                ensuring a clean and inviting area for relaxation or
                entertainment.
              </p>
              <a href="/#get-quote" className="text-blue-500 hover:underline">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    <div id="get-quote" className="py-8 px-4 mx-auto max-w-screen-xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-sky-800 mb-4">
          Ready to Transform Your Property?
        </h2>
        <p className="mb-6 text-gray-700">
          Contact us today for a free quote and let us help you enhance your
          home's exterior.
        </p>
        <button
          className="font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
          onClick={() => {
            const el = document.getElementById("get-quote");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          type="button"
        >
          Get a Quote
        </button>
      </div>
    </div>
    <div id="contact" className="py-8 px-4 mx-auto max-w-screen-xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-sky-800 mb-4">Contact Us</h2>
        <p className="mb-6 text-gray-700">
          Have questions or need more information? Reach out to us anytime!
        </p>
        <button
          className="font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
          onClick={() => {
            const el = document.getElementById("contact-form");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          type="button"
        >
          Contact Form
        </button>
      </div>
    </div>
    <Footer />
  </>
);

export default ServicesPage;
