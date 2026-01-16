import Header from "@/components/home/Header";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
import About from "@/components/home/About";

export default function Home() {
  return (
    <div className="bg-background-dark min-h-screen font-space">
      <Header />

      <main className="">
        <About />
        
        <Experience />

        <Projects />

        <Contact />

        <Footer />
      </main>
    </div>
  );
}
