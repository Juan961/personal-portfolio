interface Props {
  title:string
}

export default function TitleSection({ title }: Props) {
  return (
    <div className="flex gap-2 justify-center items-center mb-14">
      <div className="hidden md:block grow animate-rotate-border rounded-lg bg-conic/[from_var(--border-angle)] from-transparent via-white/20 to-transparent p-px">
        <div className="bg-white h-px rounded grow"></div>
      </div>
      <h2 className="text-white text-4xl font-jakarta text-center">{title}</h2>
      <div className="hidden md:block grow animate-rotate-border rounded-lg bg-conic/[from_var(--border-angle)] from-transparent via-white/20 to-transparent p-px">
        <div className="bg-white h-px rounded grow"></div>
      </div>
    </div>
  )
}
