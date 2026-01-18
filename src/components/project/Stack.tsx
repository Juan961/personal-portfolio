interface StackProps {
  techStack: string[];
}

export default function Stack({ techStack }: StackProps) {
  return (
    <div className="rounded-xl border p-6 shadow-sm border-[#232f48] bg-surface-dark/50">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Tech Stack</h3>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span key={tech} className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium border-primary/20 bg-primary/10 text-primary">{tech}</span>
        ))}
      </div>
    </div>
  )
}
