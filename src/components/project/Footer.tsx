export default function Footer() {
  return (
    <footer className="border-t border-[#232f48] bg-surface-dark">
      <div className="mx-auto flex max-w-240 flex-col items-center justify-center px-4">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-slate-500">Up Next</p>
        <a className="group flex flex-col items-center gap-2 text-center" href="#">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl group-hover:text-primary transition-colors">
            E-Commerce Analytics
          </h2>
          <div className="flex items-center gap-2 text-primary opacity-0 transform translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
            <span className="font-bold">View Case Study</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        </a>
      </div>
    </footer>
  )
}