function Footer() {
  return (
    <>
      <footer className="footer p-10 bg-base-200 text-base-content rounded-t-lg shadow-lg">
        <nav>
          <h6 className="footer-title">Contact</h6>
          <a href="mailto:cakmakpersonal@gmail.com" className="link link-hover">
            cakmakpersonal@gmail.com
          </a>
          <a href="https://github.com/clod44" className="link link-hover">
            Github: clod44
          </a>
          <a href="https://deviantart.com/sayochi3" className="link link-hover">
            Deviantart: sayochi3
          </a>
        </nav>
        <nav>
          <h6 className="footer-title"></h6>
          <a id="scrollToTop" href="#NAV" className="link link-hover">
            Top
          </a>
        </nav>
      </footer>
      <div className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300 rounded-b-lg shadow-lg">
        <div className="w-full items-center flex align-middle justify-between font-serif">
          <p>Cakmak</p>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </>
  );
}
export default Footer;
