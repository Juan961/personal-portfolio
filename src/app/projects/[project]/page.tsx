import Link from "next/link";

import Header from "@/components/project/Header";
import Challenge from "@/components/project/Challenge";
import Solution from "@/components/project/Solution";
import Stack from "@/components/project/Stack";
import Role from "@/components/project/Role";
import Code from "@/components/project/Code";
import Gallery from "@/components/project/Gallery";
import Footer from "@/components/project/Footer";

import { IProject } from "@/types/project";

const projects: { [key: string]: IProject } = {
  tank: {
    title: 'Digital Hydraulic Level Control',
    challenge: 'Stabilize a non-linear hydraulic plant with significant transport delays. The primary difficulty lay in characterizing the digital valve actuator and managing the dynamic coupling between valve position and tank fill rate under experimental disturbances.',
    solution: 'Engineered a cascaded digital control architecture. First, I modeled and validated the plant dynamics (Gp(s) to Gp(z)) using MATLAB. I then implemented a discrete position controller for the valve and a robust level regulator, validating the system strictly against theoretical response curves.',
    techStack: ['MATLAB/Simulink', 'C++', 'System Identification', 'Digital Control'],
    role: 'Co-Author',
    typeResource: 'article',
    resourceLink: 'https://drive.google.com/file/d/1gb6vf0GpKotml4h6jEp_vjyyWE84wg-B/view?usp=sharing'
  },
  email: {
    title: 'Email search engine',
    challenge: 'Create a system to search through the Enron Corp email database (423MB). The task involved writing a program to index contents into ZincSearch, profiling the indexer for performance analysis, and building a frontend interface for searching. Additional goals included code optimization and deployment to AWS using Terraform.',
    solution: 'Developed a high-performance backend using Go and the Chi router, integrated with ZincSearch for efficient data indexing and retrieval. The frontend was built with Vue 3 and Tailwind CSS. The solution includes profiling for optimization and is deployable on Linux and AWS.',
    techStack: ['Go', 'ZincSearch', 'VueJS', 'Tailwind', 'AWS'],
    role: 'Full Stack Developer',
    typeResource: 'repository',
    resourceLink: 'https://github.com/Juan961/FullStackChallenge'
  },
  robot: {
    title: 'Autonomous Delivery Robot Fleet Simulation',
    challenge: 'Build an autonomous robot fleet management system capable of navigating urban environments with real-time obstacle detection, path planning, and coordinated multi-robot operations through cloud-based telemetry and control',
    solution: 'Currently developing a full-stack simulation platform integrating Webots for physics-based robot modeling, YOLO-based computer vision for obstacle detection, A* and Dynamic Window Approach for path planning, and AWS IoT Core for real-time fleet coordination. The system features a React dashboard displaying live telemetry from multiple robots, including position tracking, obstacle detection visualization, and delivery task assignment. Currently implementing reinforcement learning (PyTorch) for adaptive navigation behaviors in dynamic environments with pedestrians and traffic',
    techStack: ['AWS', 'IoT', 'React', 'Python', 'Typescript', 'Webots', 'PyTorch', 'MQTT'],
    role: 'Software & Mechatronic Engineering',
  }
}

interface PageProps {
  params: Promise<{
    project: string;
  }>;
}

export default async function Project({ params }: PageProps) {
  const { project: projectId } = await params;

  const project = projects[projectId];

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-dark text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <Link href="/" className="mt-4 inline-block text-primary hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark font-space">
      <Header title={project.title} />

      <main className="flex-1">
        <div className="mx-auto max-w-240 px-4 py-8 lg:px-0">
          {false ? <div className="mb-12 overflow-hidden rounded-xl border border-gray-200 dark:border-[#232f48] shadow-2xl">
            <div className="aspect-video w-full bg-cover bg-center bg-no-repeat bg-slate-200 dark:bg-[#1a2332]" data-alt="High fidelity dashboard interface showing charts and data tables" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmS04hdCqEcWP1gqFslF-ODMfVHz1QYvfiPSnqOHlMykqwMZOZG6eRh5PnJrrIqrtdzeX69Mx-woRfcmz9iewU25Z5ha8IOhzf_iBmOoqtuXTgduY29j6BHajWfw2pOAy_8YiquZQbIWa40zuBvsU8Uh5bIlyEWn78zz2DYquIwoKkOEHXvNrCvwMYbGMoJamT0R7R9dzdoIKW3knu5eDdFj_A-1nA1EK0TYjwxKkzVda1MHZAVJKQ6eFCMfJT0QFQ2G8nDurWgAI")' }}></div>
          </div> : null}
          <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8 flex flex-col gap-10">
              <Challenge challenge={project.challenge} />
              <Solution solution={project.solution} />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-8">
              <Stack techStack={project.techStack} />
              <Role role={project.role} />
              { project.resourceLink ? <a className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-primary/25" href={project.resourceLink || '#'} target="_blank" rel="noopener noreferrer">
                Check the {project.typeResource}
              </a> : <p className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white text-center">Currently developing it. Check tune for demo</p> }
            </div>
          </div>
          {false ? <Code /> : null }
          {false ? <Gallery /> : null }
        </div>
      </main>
      { false ? <Footer /> : null }
    </div >
  );
}
