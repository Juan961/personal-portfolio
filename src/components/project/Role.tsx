interface RoleProps {
  role: string;
}

export default function Role({ role }: RoleProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#232f48] dark:bg-surface-dark/50">
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">My Role</h3>
        <p className="text-base font-medium text-slate-900 dark:text-white">{role}</p>
      </div>
    </div>
  )
}
