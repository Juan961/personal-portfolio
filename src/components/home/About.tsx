import Scene3D from "./Scene3D"

import { ArrowRightIcon } from "@heroicons/react/24/solid"

export default function About() {
  return (
    <section className="relative flex flex-wrap justify-center px-6 lg:px-12 pt-25 pb-10">
      <div className="z-10 w-full lg:w-3/5">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-0.5 w-12 bg-primary"></span>
          <span className="text-sm font-medium tracking-widest text-primary uppercase">Bogotá D.C., Colombia</span>
        </div>
        <h1 className="text-5xl font-black leading-[1.1] tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-[6rem]">
          JUAN JOSÉ <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-gray-400 to-gray-600">GARCÍA</span>
        </h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-300 sm:text-4xl md:text-5xl">
          Software &amp; Mechatronic Engineer
        </h2>
        <p className="mt-8 max-w-2xl text-lg font-normal leading-relaxed text-gray-400 md:text-xl">
          Software Developer and Mechatronics Engineering student with hands-on experience in cloud architecture, serverless applications, and IoT solutions. Skilled in building scalable systems using Nuxt.js, Python, and AWS services.
        </p>
        <div className="mt-12 flex flex-wrap gap-6">
          <a className="group flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-600" href="#work">
            VIEW PROJECTS
            <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a className="flex items-center justify-center rounded-lg border border-[#232f48] px-8 py-4 text-base font-bold text-white transition-all hover:border-white hover:bg-white/5" href="#about">
            ABOUT ME
          </a>
        </div>
      </div>
      <Scene3D />
    </section>
  )
}
