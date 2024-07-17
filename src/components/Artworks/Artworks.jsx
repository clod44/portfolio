function Artworks() {
  const placeholderUrl = "https://www.deviantart.com/sayochi3";
  const images = [
    [
      {
        src: "/alita.png",
        url: placeholderUrl,
      },
      {
        src: "/furry.png",
        url: placeholderUrl,
      },
      {
        src: "/pony.png",
        url: placeholderUrl,
      },
      {
        src: "/sosig.png",
        url: placeholderUrl,
      },
    ],
    [
      {
        src: "/sculpture1.png",
        url: placeholderUrl,
      },
      {
        src: "/sculpture2.png",
        url: placeholderUrl,
      },
      {
        src: "/zootopia.png",
        url: placeholderUrl,
      },
      {
        src: "/kid.jpg",
        url: placeholderUrl,
      },
    ],
  ];
  return (
    <div className="mockup-browser border border-primary bg-base-300">
      <div className="mockup-browser-toolbar">
        <div className="input">deviantart.com/sayochi3</div>
      </div>
      <div className="flex justify-center bg-base-200">
        <div className="grid grid-flow-col-dense gap-4"></div>

        <div className="grid grid-cols-2 gap-5 px-4 py-4">
          {images.map((imageSet, index) => (
            <div key={index} className="grid gap-4">
              {imageSet.map((image, index) => (
                <a href={image.url} key={index}>
                  <img
                    className="h-auto max-w-full rounded-lg shadow-md hover:shadow-lg duration-300 ease-in-out hover:scale-105 brightness-90 hover:brightness-100"
                    src={image.src}
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Artworks;
