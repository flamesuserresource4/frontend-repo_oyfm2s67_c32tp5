import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Studio from "./components/Studio";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-fuchsia-500/30 selection:text-white">
      <Navbar />
      <Hero />
      <Studio />
      <Contact />
    </div>
  );
}

export default App;
