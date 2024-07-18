import React, { useState } from "react";
import P5Canvas from "./P5Canvas";

function Hero() {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };

  return (
    <div className="relative h-screen" id="canvas-container-hero">
      <div className="absolute top-0 left-0 w-full h-full blur">
        <P5Canvas />
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full flex justify-center items-center transition-all duration-300 ${
          hovered ? "bg-black" : ""
        }`}
      >
        <h1
          className="text-9xl text-secondary z-10 font-black hover:tracking-widest font-sans drop-shadow transition-all duration-300 hover:text-primary"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          CKMK
        </h1>
      </div>
    </div>
  );
}

export default Hero;
