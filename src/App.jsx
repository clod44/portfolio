import "./App.css";

import "animate.css/animate.min.css";
import Hero from "./components/Hero/Hero.jsx";
import Introduction from "./components/Introduction/Introduction.jsx";
import NotableProjects from "./components/NotableProjects/NotableProjects.jsx";
import Artworks from "./components/Artworks/Artworks.jsx";
import Footer from "./components/Footer/Footer.jsx";
import MessageBox from "./components/MessageBox/MessageBox.jsx";
import Contact from "./components/Contact/Contact.jsx";
function App() {
  return (
    <>
      <Hero />

      <Introduction />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
          <div className="w-full mb-10">
            <NotableProjects />
          </div>
          <div className="w-full mb-30">
            <div className="flex flex-col w-full border-opacity-50">
              <Artworks />
              <div className="divider">More</div>
              <MessageBox />
              <div className="divider"></div>
              <Contact />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
