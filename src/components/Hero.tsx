import { useEffect } from "react";

export const Hero = () => {
  useEffect(() => {
    const container = document.getElementById("slider-container");
    const beforeImage = document.getElementById("before-image");
    const slider = document.getElementById("slider");
    const beforeLabel = document.getElementById("before-label");

    if (!container || !beforeImage || !slider || !beforeLabel) return;

    const updateSlider = (clientX: number) => {
      const rect = container.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      offsetX = Math.max(0, Math.min(offsetX, rect.width));
      beforeImage.style.width = `${offsetX}px`;
      slider.style.left = `${offsetX}px`;
    };

    // Cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      updateSlider(e.clientX);
    };

    // Touch tracking
    const handleTouchMove = (e: TouchEvent) => {
      updateSlider(e.touches[0].clientX);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove);

    // Intro animation
    let progress = 0;
    const animate = setInterval(() => {
      if (progress >= 50) {
        clearInterval(animate);
        return;
      }
      progress += 1.5;
      const widthPx = (container.offsetWidth * progress) / 100;
      beforeImage.style.width = `${widthPx}px`;
      slider.style.left = `${widthPx}px`;
    }, 16);

    // Cleanup function
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
      clearInterval(animate);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <section
      id="hero"
      className="  h-fit w-full py-10 antialiased flex items-center justify-center"
    >
      <div className="max-w-screen mx-0  flex flex-col md:flex-row md:items-left md:text-left items-center text-center justify-between gap-12">
        {/* Text Content */}
        <div className="max-w-xl text-center lg:text-left">
          <p className="font-paragraph rounded-xl text-sm mb-4 text-slate-800 ring-1 ring-sky-400 bg-sky-300 inline-block hover:ring-sky-700 w-[300px] py-1 px-2 font-thin">
            Check out our
            <span className="font-semibold">
              <a
                className="hover:text-white hover:cursor-pointer"
                href="https://www.elitxteriors.com/spring-cleaning-campaign"
                target="_blank"
                rel="noopener noreferrer"
              >
                Spring Cleaning Campaign &gt;
              </a>
            </span>
          </p>

          <h1 className=" mb-4 text-7xl font-accent font-extrabold tracking-tight leading-none md:text-6xl ">
            EXCELLENCE
            <br />
            IN EVERY DETAIL
          </h1>

          <p className="mb-6 font-paragraph font-light text-slate-400 lg:mb-8 md:text-lg lg:text-xl ">
            Our goal is to exceed your expectations with reliable, high-quality
            pressure washing services tailored to your needs.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="services.html"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium font-accent text-sky-500 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 "
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
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("get-quote");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium font-accent "
            >
              Get a Quote
            </button>
          </div>
        </div>

        {/* Slider Content */}
        <div className="w-[500px]">
          <div id="slider-container" className="my-8">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md shadow-lg group">
              {/* After Image */}
              <img
                src="src/assets/images/after1.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                alt="After Image"
              />

              {/* Before Image */}
              <div
                id="before-image"
                className="absolute inset-0 overflow-hidden"
                style={{ width: "0%" }}
              >
                <img
                  src="src/assets/images/before1.jpg"
                  className="w-full h-full object-cover"
                  alt="Before Image"
                />

                {/* Fixed Before Label (does NOT move with slider) */}
                <span
                  id="before-label"
                  className="absolute top-4 left-4 z-30 text-white font-bold text-sm uppercase bg-sky-400/50 px-3 py-1 rounded pointer-events-none"
                >
                  Before
                </span>
              </div>

              {/* After Label */}
              <span className="absolute top-4 right-4 z-30 text-white font-bold text-sm uppercase bg-sky-400/50 px-3 py-1 rounded">
                After
              </span>

              {/* Slider Handle */}
              <div
                id="slider"
                className="absolute top-0 bottom-0 w-1 bg-sky-500 z-40 cursor-ew-resize"
                style={{ left: "0%" }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -left-2 bg-sky-500 rounded-full w-5 h-5 border-2 border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
