export const About = () => {
  return (
    <section
      id="about"
      className="bg-white pt-4 antialiased w-full h-fit block  md:pt-6"
    >
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 text-center md:text-left ">
          <h2 className="mb-4 text-6xl font-accent uppercase  tracking-tight font-extrabold text-blue-950 ">
            Who are we?
          </h2>
          <p className="mb-4 font-paragraph ">
            Elite Exteriors is a trusted family-run business in Virginia,
            dedicated to providing top-notch pressure washing, gutter cleaning,
            and lawn care services in the Hampton Roads area.
          </p>
          <a
            href="about.html"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium font-accent text-sky-500 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
          >
            Read More
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <img
            className="mt-4 w-full hidden md:inline-flex md:mt-10 rounded-lg"
            src="src/assets/images/gallery1(2).JPG"
            alt="us at work"
          />
          <img
            className="mt-8 w-full lg:mt-14 rounded-lg"
            src="src/assets/images/about-us.jpg"
            alt="us"
          />
        </div>
      </div>
    </section>
  );
};
