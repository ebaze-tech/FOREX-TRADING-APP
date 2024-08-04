import Footer from "./components/Footer";
import Hero from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Serv from "./components/Serv";

function App() {
  return (
    <div>
      <Navbar />
      <div className="bg-black w-full text-[#008000]">
        <Hero />
      </div>
      <Serv />
      <Footer />
    </div>
  );
}

export default App;
