import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-gray-200 px-4 md:px-6 py-5 filter backdrop-blur-lg shadow-lg">
        <div className="flex flex-wrap justify-between items-center mx-auto max-full">
          <Link to="/" className="flex items-center">
            <img
              src="src/assets/logos/main-logo.png"
              className="mr-3 h-12 md:h-20"
              alt="elite exteriors logo"
              loading="lazy"
            />
            <span>
              <span className="text-2xl font-semibold uppercase flex text-left">
                Elite <br /> Exteriors
              </span>
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
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
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#about"
                  className="block py-2 pr-4 pl-3 text-white uppercase rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
                  aria-current="page"
                >
                  about us
                </a>
              </li>
              <li>
                <Link
                  to="/services"
                  className="block py-2 pr-4 pl-3 text-gray-700 uppercase border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  services
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="block py-2 pr-4 pl-3 text-gray-700 uppercase border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  blog
                </Link>
              </li>
              <li>
                <a
                  href="#get-quote"
                  className="block py-2 pr-4 pl-3 text-gray-700 uppercase border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
