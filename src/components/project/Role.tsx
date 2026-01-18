interface RoleProps {
  role: string;
}

export default function Role({ role }: RoleProps) {
  return (
    <div className="rounded-xl border p-6 shadow-sm border-[#232f48] bg-surface-dark/50">
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-400">My Role</h3>
        <p className="text-base font-medium text-white">{role}</p>
      </div>
    </div>
  )
}
