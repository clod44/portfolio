import { AnimationOnScroll } from "react-animation-on-scroll";

function Introduction() {
  const emojis = ["🖌️", "💻", "🎮", "🏋️‍♂️", "📚"];

  return (
    <div className="h-screen relative pt-20 rounded-lg rounded-t-none overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/terraingenerator.mp4"
        controls={false}
        autoPlay={true}
        loop={true}
        muted={true}
      ></video>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-content to-transparent z-10"></div>
      <div className="relative container p-5 mx-auto text-center max-w-3xl z-20">
        <AnimationOnScroll
          animateIn="animate__fadeInUp"
          delay={100}
          animateOnce={true}
        >
          <div className="bg-primary-content border-base-300 border p-10 rounded-lg shadow">
            <h2 className="text-3xl font-black mb-3">Me</h2>
            <p className="mb-3">
              I like art, science, cool machines and incomprehensible things
              humans achieved in the last thousand years. I simply like creating
              something. This lead me unknowingly educating myself in various
              separate fields which ultimately allows me to learn anything{" "}
              <span className="font-black hover:underline hover:tracking-wide hover:text-warning duration-300">
                fast
              </span>{" "}
              .
            </p>
          </div>
        </AnimationOnScroll>
        <div className="flex flex-wrap align-middle justify-center text-3xl gap-4 my-40">
          {emojis.map((emoji, index) => (
            <span
              key={index}
              className="hover:scale-125 duration-300 animate-pulse hover:animate-none rounded p-2 hover:bg-primary-content"
            >
              {emoji}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-500">
          a terrain generator made in p5/java back in the day
        </p>
      </div>
    </div>
  );
}

export default Introduction;
