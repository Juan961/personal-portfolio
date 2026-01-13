import { ArrowLeftIcon, FolderIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="w-full border-b border-gray-200 dark:border-[#232f48] bg-background-light dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-240 items-center justify-between px-4 lg:px-0">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
            <FolderIcon className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
        </div>
        <Link className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-surface-dark dark:hover:text-white" href="/">
          <span className="hidden sm:inline">Back to Home</span>
          <ArrowLeftIcon className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>
    </header>
  )
}