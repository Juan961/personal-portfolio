import { IProject } from "@/types/project";

import { CodeBracketIcon, PaperClipIcon, ViewfinderCircleIcon } from '@heroicons/react/24/solid'

interface Props {
  item: IProject
}

export default function ProjectCard({ item }: Props) {
  return (
    <article className="text-white font-jakarta flex flex-col gap-4 max-w-sm border rounded p-6 bg-[#1d1d1d]">
      <a href={item.link || "#"} className="hover:underline mb-2" target="_blank" rel="noopener noreferrer">
        <span className="flex gap-2 items-center">
          { item.icon === "code" && <CodeBracketIcon className="w-6 text-white" /> }
          { item.icon === "paper" && <PaperClipIcon className="w-6 text-white" /> }
          { item.icon === "brain" && <ViewfinderCircleIcon className="w-6 text-white" /> }
          <h3 className="text-2xl font-semibold">{item.title}</h3>
        </span>
      </a>
      <ul className="flex flex-wrap gap-2">
        {item.technologies.map((tech, techIndex) => (
          <li key={techIndex} className="bg-contrast-primary text-primary px-3 py-1 rounded-full text-sm">{tech}</li>
        ))}
      </ul>
      <ul className="list-disc pl-5 mt-3 text-sm font-light">
        {item.points && item.points.map((point, pointIndex) => (
          <li key={pointIndex}>{point}</li>
        ))}
      </ul>
    </article>
  )
}
