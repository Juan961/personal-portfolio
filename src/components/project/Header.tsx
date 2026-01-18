import { ArrowLeftIcon, FolderIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="w-full border-b border-[#232f48] bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-240 items-center justify-between px-4 lg:px-0">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
            <FolderIcon className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white">{title}</h1>
        </div>
        <Link className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-slate-400 hover:bg-surface-dark hover:text-white" href="/">
          <span className="hidden sm:inline">Back to Home</span>
          <ArrowLeftIcon className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>
    </header>
  )
}