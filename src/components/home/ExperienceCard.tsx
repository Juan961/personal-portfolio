import { IExperience } from "@/types/experience";

interface Props {
  item: IExperience;
}

export default function ExperienceCard({ item }: Props) {
  return (
    <article className="text-white font-jakarta flex flex-col gap-4 max-w-sm border rounded p-6 bg-[#1d1d1d]">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-2xl font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-400">{item.company}</p>
        </div>
        <p className="text-sm text-gray-400 text-right whitespace-nowrap">{item.period}</p>
      </div>
      
      <ul className="flex flex-wrap gap-2 mt-3">
        {item.technologies.map((tech, techIndex) => (
          <li key={techIndex} className="bg-contrast-primary text-primary px-3 py-1 rounded-full text-sm">{tech}</li>
        ))}
      </ul>
      
      {/* Bullet point description */}
      <div className="mt-3 text-sm font-light">
        <ul className="list-disc pl-5">
          <li>{item.description.split('. ')[0]}</li>
          <li>{item.description.split('. ')[1]}</li>
          <li>{item.description.split('. ')[2]}</li>
        </ul>
      </div>
    </article>
  );
}
