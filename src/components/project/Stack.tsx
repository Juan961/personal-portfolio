interface StackProps {
  techStack: string[];
}

export default function Stack({ techStack }: StackProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#232f48] dark:bg-surface-dark/50">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tech Stack</h3>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span key={tech} className="inline-flex items-center rounded-md border border-gray-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-primary/20 dark:bg-primary/10 dark:text-primary">{tech}</span>
        ))}
      </div>
    </div>
  )
}
