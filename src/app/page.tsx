import Header from "@/components/home/Header";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="animated-bg min-h-screen">
      <main className="container pt-14 mx-auto px-40 flex flex-col gap-14">
        <Header />

        <Experience />

        <Projects />

        <Contact />

        <Footer />
      </main>
    </div>
  );
}
