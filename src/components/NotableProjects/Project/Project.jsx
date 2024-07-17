import Tags from "./Tags.jsx";

function Project(props) {
  const {
    title = "Project Title",
    name = "Project name",
    description = "description",
    link = "#",
    imageSrc = "#",
    progressIn = false,
    progressOut = false,
    tags = ["default"],
  } = props;

  return (
    <li>
      <hr className={progressIn ? "bg-primary" : ""} />
      <div className="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="timeline-end mb-10 timeline-box text-start shadow-lg bg-base-200 duration-300 hover:shadow">
        <time className="font-mono italic text-xs">{name}</time>
        <div className="text-lg font-black bg-base-300 rounded-lg px-2">
          <a
            href={link}
            className="hover:text-warning hover:tracking-wide duration-300"
          >
            🔗{title}
          </a>
        </div>

        <div className="flex flex-col gap-3 mb-2 py-3">
          <p className="px-3">{description}</p>
          <div className="flex align-top justify-around">
            <img
              src={imageSrc}
              style={{ objectFit: "contain" }}
              className="rounded h-64"
            />
          </div>
          <Tags tags={tags} />
        </div>
      </div>
      <hr className={progressOut ? "bg-primary" : ""} />
    </li>
  );
}

export default Project;
