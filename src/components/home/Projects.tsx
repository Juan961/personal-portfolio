import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <section className="py-24 px-6 lg:px-12" id="work">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Projects</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group relative aspect-4/3 w-full overflow-hidden rounded-lg bg-surface-dark cursor-pointer">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
              alt={`${project.title} visualization`}
              src={project.image}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 transition-transform duration-500 group-hover:-translate-y-2">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {project.techStack.slice(0, 3).join(' / ')}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white leading-tight">{project.title}</h3>
              <p className="mt-2 text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {project.shortDescription}
              </p>
            </div>
            <div className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-primary opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300">
              <ArrowRightIcon className="h-5 w-5" />
            </div>
          </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
