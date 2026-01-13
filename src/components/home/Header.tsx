import { Bars3Icon } from "@heroicons/react/24/solid"; 

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-[#232f48]/50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 lg:px-12">
      <div className="flex items-center gap-2 text-white group cursor-pointer">
        <h2 className="text-lg font-bold tracking-tight">JUAN JOSÉ GARCÍA</h2>
      </div>
      <nav className="hidden md:flex items-center gap-10">
        <a className="text-sm font-medium tracking-wide text-gray-400 hover:text-primary transition-colors" href="#about">ABOUT</a>
        <a className="text-sm font-medium tracking-wide text-gray-400 hover:text-primary transition-colors" href="#work">PROJECTS</a>
        <a className="text-sm font-medium tracking-wide text-gray-400 hover:text-primary transition-colors" href="#experience">EXPERIENCE</a>
      </nav>
      <a className="hidden md:flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-all" href="#contact">
        <span>CONTACT</span>
      </a>
      <button className="md:hidden text-white">
        <Bars3Icon className="h-6 w-6" />
      </button>
    </header>
  );
}
