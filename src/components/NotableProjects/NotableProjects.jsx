import Project from "./Project/Project.jsx";

function NotableProjects() {
  const projects = [
    {
      name: "Freemage Hosting",
      title: "Anonymous Image self-hosting web service",
      description:
        "Upload images and get an unique link to your image. Has basic rate limiting.",
      link: "#",
      progressIn: true,
      progressOut: true,
      imageSrc:
        "https://raw.githubusercontent.com/clod44/freemage-hosting/main/screenshots/home.PNG",
      tags: ["nodejs", "express", "multer", "socket.io", "mongodb"],
    },
    {
      name: "Foodbox (WIP)",
      title: "Feature complete food ordering website",
      description: "yemeksepeti.com clone",
      link: "#",
      progressIn: true,
      progressOut: false,
      imageSrc:
        "https://raw.githubusercontent.com/clod44/foodbox2/main/screenshot.png",
      tags: ["php", "mysql", "bootstrap", "jquery"],
    },
    {
      name: "Shape Morphing",
      title: "Tensorflowjs shape shifting demo",
      description:
        "Creates in-between shapes using tensor flow javascript library",
      link: "#",
      progressIn: true,
      progressOut: true,
      imageSrc:
        "https://raw.githubusercontent.com/clod44/tfjs-shape-morphing/main/assets/screenshot1.png",
      tags: ["nodejs", "express", "multer", "socket.io", "mongodb"],
    },
    {
      name: "AlgoCompiler",
      title: "Pseudo-code Interpreter",
      description:
        "Write a pseudo code that supports if statements, loops and inline operations on web. See the output in realtime. This is NOT a compiler. Just an interpreter. (wrong terminology)",
      link: "#",
      progressIn: true,
      progressOut: true,
      imageSrc:
        "https://raw.githubusercontent.com/clod44/algo-compiler/main/screenshot.png",
      tags: ["javascript", "program flow"],
    },
    {
      name: "p5js-debugWindow",
      title: "Drop and go debug window for p5js canvas",
      description: "Supports auto updating values and graphs.",
      link: "#",
      progressIn: true,
      progressOut: true,
      imageSrc:
        "https://github.com/clod44/p5js-debugWindow/blob/main/gif.gif?raw=true",
      tags: ["javascript", "p5js"],
    },
    {
      name: "Evolutionary Steering",
      title: "Selective breeding ecosystem simulation",
      description: "Watch them breed. Only the skillful will do it!",
      link: "#",
      progressIn: true,
      progressOut: true,
      imageSrc:
        "https://raw.githubusercontent.com/clod44/evolutionary-steering/main/screenshot.png",
      tags: ["nodejs", "express", "multer", "socket.io", "mongodb"],
    },
  ];
  return (
    <div>
      <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical">
        {projects.map((project, index) => (
          <Project
            key={index}
            name={project.name}
            title={project.title}
            description={project.description}
            link={project.link}
            progressIn={project.progressIn}
            progressOut={project.progressOut}
            imageSrc={project.imageSrc}
            tags={project.tags}
          />
        ))}
      </ul>
    </div>
  );
}

export default NotableProjects;
