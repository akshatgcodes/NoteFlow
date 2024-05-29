import Nav from "./components/Nav";
import Hero from "./components/Hero";
import XFactor from "./components/XFactor";
import Preview from "./components/Preview";
import TechStack from "./components/TechStack";
import RunIt from "./components/RunIt";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <XFactor />
        <Preview />
        <TechStack />
        <RunIt />
      </main>
      <Footer />
    </div>
  );
}
