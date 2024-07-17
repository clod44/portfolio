import P5Canvas from "./P5Canvas";
function Contact() {
  function handleEmailClick() {
    //copy to clipboard
    navigator.clipboard.writeText("cakmakpersonal@gmail.com");
    alert("copied to clipboard");
    window.location.href = "mailto:cakmakpersonal@gmail.com";
  }
  return (
    <div className="text-center w-full bg-content rounded-lg border border-primary flex flex-col">
      <div
        id="canvas-container"
        className="w-full aspect-[16/9] bg-error overflow-hidden"
      >
        <P5Canvas />
      </div>
      <p>contact me</p>
      <div className="p-4">
        <button className="btn btn-primary w-full" onClick={handleEmailClick}>
          cakmakpersonal@gmail.com
        </button>
      </div>
    </div>
  );
}

export default Contact;
