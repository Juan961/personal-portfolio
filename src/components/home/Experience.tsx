import { IExperience } from '@/types/experience';

const experiences: IExperience[] = [
  {
    company: 'GoDev',
    period: 'Sep 2023 - Aug 2025',
    title: 'Software Developer',
    description: 'Built and maintained scalable serverless web applications on Azure. Designed cloud infrastructure for an IoT Hub, enabling real-time telemetry ingestion and processing. Defined device-to-cloud architecture using Azure Functions and Cosmos DB.',
    technologies: ['NUXT.JS', 'AZURE FUNCTIONS', 'COSMOS DB', 'IOT HUB', 'AZURE']
  },
  {
    company: 'Glamper',
    period: 'Feb 2022 - Aug 2023',
    title: 'FullStack Developer',
    description: 'Migrated a monolithic on-premises system to a fully serverless AWS architecture. Reduced reservation latency from 15s to 1.5s through caching and data precomputation. Built a custom AI agent for personalized reservation flows.',
    technologies: ['AWS', 'AI AGENT', 'ETL PROCESS', 'MIGRATION', 'NUXT.JS', 'PYTHON']
  }
];

export default function Experience() {
  return (
    <section className="border-t border-[#232f48] bg-background-dark py-24 px-6 lg:px-12" id="experience">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Professional Experience</h2>
          <p className="text-gray-400 max-w-md text-right md:text-left">A timeline of technical challenges and engineered solutions.</p>
        </div>
        <div className="flex flex-col">
          {experiences.map((experience, index) => (
            <div key={index} className="group relative flex flex-col border-b border-[#232f48] py-10 transition-all hover:bg-surface-dark md:flex-row md:items-center md:justify-between px-4 -mx-4 rounded-lg">
              <div className="flex flex-col gap-1 md:w-1/3">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{experience.company}</h3>
                <p className="text-sm text-gray-500">{experience.period}</p>
              </div>
              <div className="mb-4 md:mb-0 md:w-1/3">
                <h4 className="text-lg font-medium text-gray-200">{experience.title}</h4>
                <p className="mt-1 text-sm text-gray-400">{experience.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:w-1/3 md:justify-end content-start">
                {experience.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="flex items-center justify-center rounded bg-primary/10 px-3 py-1 text-xs font-bold tracking-wider text-primary border border-primary/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
