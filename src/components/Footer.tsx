export const Footer = () => {
  return (
    <footer className="bg-sky-100 mt-auto py-12">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <a href="/" className="flex justify-center items-center mb-6">
              <img
                src="src/assets/logos/main-logo.png"
                className="h-16 w-auto"
                alt="Elite Exteriors Logo"
              />
              <span className="ml-3 text-2xl flex text-left font-heading font-semibold">
                Elite
                <br />
                Exteriors
              </span>
            </a>
            <div className="flex justify-center">
              <iframe
                className="h-[100px] w-[138px] lg:w-[138px] lg:h-[80px]"
                title="BBB Seal"
                src="https://seal-norfolk.bbb.org/frame/blue-seal-120-61-bbb-90553538.png?chk=3213FA74AA"
                style={{ border: 0 }}
              />
            </div>
          </div>

          {/* Service Locations */}
          <div>
            <h2 className="text-lg font-heading font-semibold mb-4">
              Service Locations
            </h2>
            <ul className="space-y-2 font-paragraph text-gray-600">
              {[
                "Chesapeake",
                "Virginia Beach",
                "Hampton",
                "Norfolk",
                "Suffolk",
                "Newport News",
                "Williamsburg",
              ].map((location) => (
                <li key={location}>{location}</li>
              ))}
            </ul>
          </div>

          {/* Services & Legal */}
          <div>
            <h2 className="text-lg font-heading font-semibold mb-4">
              Services
            </h2>
            <ul className="space-y-2 font-paragraph text-gray-600 mb-8">
              {["Pressure Washing", "Gutter Cleaning", "Lawn Care", "FAQ"].map(
                (service) => (
                  <li key={service}>
                    <a
                      href={`#${service.toLowerCase().replace(" ", "-")}`}
                      className="hover:text-sky-600 transition-colors"
                    >
                      {service}
                    </a>
                  </li>
                )
              )}
            </ul>

            <h2 className="text-lg font-heading font-semibold mb-4">Legal</h2>
            <ul className="space-y-2 font-paragraph text-gray-600">
              <li>
                <a
                  href="/privacy"
                  className="hover:text-sky-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-sky-600 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-heading font-semibold mb-4">
              Contact Us
            </h2>
            <div className="space-y-4 font-paragraph text-gray-600">
              <p>
                <a
                  href="tel:+1757-796-7240"
                  className="hover:text-sky-600 transition-colors"
                >
                  +1 (757)-796-7240
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@elitxteriors.com"
                  className="hover:text-sky-600 transition-colors"
                >
                  info@elitxteriors.com
                </a>
              </p>
              <p className="lg:hidden">
                <a
                  href="https://maps.app.goo.gl/vMpAaLWDQ5U6sxaZ7"
                  className="hover:text-sky-600 transition-colors"
                >
                  109G Gainsborough Square #711
                  <br />
                  Chesapeake, VA 23320
                </a>
              </p>
              <div className="hidden lg:block">
                <iframe
                  title="Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.265121292952!2d-76.24579072429445!3d36.74020687226422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89babb661e00d56b%3A0x2bb614b028c312f9!2s109%20G%20Gainsborough%20Square%20%23711%2C%20Chesapeake%2C%20VA%2023320%2C%20USA!5e0!3m2!1sen!2str!4v1745269875950!5m2!1sen!2str"
                  className="w-full h-[150px] rounded-lg"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="pt-4">
                <p className="font-medium">Hours of Operation</p>
                <p>Mon - Sat: 8am – 6pm</p>
                <p className="text-sky-600">Closed on Sundays</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2025 Elite Exteriors™. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              {[
                {
                  href: "https://www.facebook.com/people/Elite-Exteriors-Pressure-Washing-Services/61571075571156/",
                  label: "Facebook",
                  icon: "M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z",
                },
                {
                  href: "https://www.linkedin.com/company/elite-exteriors-pressure-washing-services",
                  label: "LinkedIn",
                  icon: "M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z",
                },
                {
                  href: "https://www.instagram.com/elit_xteriors/",
                  label: "Instagram",
                  icon: "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={social.icon} />
                  </svg>
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
