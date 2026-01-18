import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface SolutionProps {
  solution: string;
}

export default function Solution({ solution }: SolutionProps) {
  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-2xl font-bold uppercase tracking-tight text-white">
        <CheckCircleIcon className="h-6 w-6 text-primary" />
        The Solution
      </h2>
      <p className="text-lg leading-relaxed text-slate-400">
        {solution}
      </p>
    </div>
  )
}
