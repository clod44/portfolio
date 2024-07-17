import P5Canvas from "./P5Canvas";
function Hero() {
  return (
    <div className="diff h-screen">
      <div className="diff-item-1">
        {/*
        <div
          className="bg-primary text-6xl font-black grid place-content-center bg-fixed"
          style={{
            backgroundImage: "url('/alita_hand.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
        */}
        <div id="canvas-container-hero">
          <P5Canvas />
          <span className="drop-shadow-[0px_0px_0.1em_rgba(0,0,0,0.5)] p-10 text-black">
            Art
          </span>
        </div>
        {/*</div>*/}
      </div>
      <div className="diff-item-2 bg-primary">
        <div
          className="text-6xl font-black text-primary grid place-content-center bg-fixed"
          style={{
            backgroundImage: "url('/coding-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="drop-shadow-[0px_0px_0.1em_rgba(255,255,100,0.5)] p-10 text-white">
            Dev
          </span>
        </div>
      </div>
      <div className="diff-resizer"></div>
    </div>
  );
}

export default Hero;
