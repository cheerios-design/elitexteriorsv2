import { useEffect } from "react";

export const useHeadingAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in-h2");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    document.querySelectorAll("h2").forEach((el) => {
      el.classList.add("pre-slide-h2");
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll("h2").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
};
