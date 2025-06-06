import { useEffect } from "react";

export const Testimonials = () => {
  useEffect(() => {
    const slides = document.querySelectorAll(".testimonial-slide");
    let current = 0;

    function showSlide(index: number) {
      slides.forEach((slide, i) => {
        (slide as HTMLElement).style.opacity = i === index ? "1" : "0";
        (slide as HTMLElement).style.zIndex = i === index ? "1" : "0";
      });
    }

    function nextSlide() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }

    // Initialize first slide
    showSlide(current);

    // Set up the interval
    const interval = setInterval(nextSlide, 5000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section
      id="testimonial"
      className="relative h-screen  py-8 antialiased w-full md:py-16 overflow-hidden"
    >
      <div className="mx-auto max-w-screen-xl text-center px-4 flex flex-col items-center 2xl:px-0">
        <h2 className=" mb-4 text-4xl font-accent font-extrabold tracking-tight leading-none md:text-5xl uppercase xl:text-6xl break-words">
          What Our Clients Say
        </h2>
        <p className="mb-6 font-paragraph font-light  lg:mb-8 md:text-lg lg:text-xl max-w-full">
          Hear from our satisfied clients about their experiences with Elite
          Exteriors. We take pride in delivering exceptional service and
          outstanding results that exceed expectations.
        </p>
      </div>

      {/* Testimonial Carousel */}
      <div className="relative max-w-screen-md mx-auto h-auto mt-10 px-4">
        {/* Testimonial Slides */}
        <div className="relative h-full">
          {/* Each testimonial slide */}
          <div className="testimonial-slide absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out">
            <figure className="text-center">
              <svg
                className="h-12 mx-auto mb-3 text-gray-400 "
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="font-paragraph text-4xl font-medium  ">
                  "Excellent service!! And a job well done - Ahmet and Gaby
                  really go all out to provide an excellent service. The house
                  and drive way never looked better!"
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <div className="flex items-center divide-x-2 divide-gray-500 ">
                  <div className="font-accent pr-3 font-medium text-gray-900 ">
                    ANTHONY
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="testimonial-slide absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out">
            <figure className="text-center">
              <svg
                className="h-12 mx-auto mb-3 text-gray-400 "
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="font-paragraph text-4xl font-medium text-gray-900 ">
                  "Wonderful service!! Gaby made our appointments, and Ahmet
                  took such good care of our newly planted flowers. So kind and
                  professional!"
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <div className="flex items-center divide-x-2 divide-gray-500 ">
                  <div className="font-accent pr-3 font-medium text-gray-900 ">
                    Mrs. FILIBE
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="testimonial-slide absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out">
            <figure className="text-center">
              <svg
                className="h-12 mx-auto mb-3 text-gray-400 "
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="font-paragraph text-4xl font-medium  ">
                  "Outstanding service! They did a fantastic job removing algae
                  from our roof. Highly recommended."
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <div className="flex items-center divide-x-2 divide-gray-500 ">
                  <div className="font-accent pr-3 font-medium text-gray-900 e">
                    Mrs. SMITH
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
