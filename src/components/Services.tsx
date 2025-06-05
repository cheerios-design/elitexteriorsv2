export const Services = () => {
  return (
    <section
      id="services"
      className="bg-sky-100 pb-4 antialiased w-full h-fit block 0 md:pb-8"
    >
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="grid grid-cols-1 gap-4 mt-8">
          <video
            className="mt-4 w-full lg:mt-10 rounded-lg filter shadow-lg"
            src="src/assets/videos/overview.mov"
            autoPlay
            loop
            muted
          ></video>
        </div>
        <div className="font-light text-center md:text-left mt-5 text-gray-500 ">
          <h2 className="mb-4 text-6xl tracking-tight font-accent uppercase font-extrabold text-blue-950 ">
            Our Services
          </h2>
          <p className="font-paragraph mb-4">
            Discover the perfect solution for your home or business needs with
            our wide range of professional services. From pressure washing to
            lawn care, we are committed to delivering exceptional results that
            enhance your property's appeal and functionality. Explore our
            services today and find the one that best suits your requirements.
          </p>
          <a
            href="services.html"
            className="inline-flex items-center justify-center px-5 py-3 text-end font-medium font-accent rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
          >
            Explore Services
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
// This component can be used in the main App component to display the services offered by the business.
