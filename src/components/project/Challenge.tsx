import { FlagIcon } from "@heroicons/react/24/solid";

interface ChallengeProps {
  challenge: string;
}

export default function Challenge({ challenge }: ChallengeProps) {
  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-2xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">
        <FlagIcon className="h-6 w-6 text-primary" />
        The Challenge
      </h2>
      <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
        {challenge}
      </p>
    </div>
  )
}
