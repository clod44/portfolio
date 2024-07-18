import { useEffect, useRef } from "react";

function ScrollAnimation(refs, animationClass = "slide-in") {
  useEffect(() => {
    const handleScroll = () => {
      refs.current.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight) {
          element.classList.add(animationClass);
        } else {
          element.classList.remove(animationClass);
        }
      });
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [refs, animationClass]);
}

export default ScrollAnimation;
