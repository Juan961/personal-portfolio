import Link from "next/link";

import Header from "@/components/project/Header";
import Challenge from "@/components/project/Challenge";
import Solution from "@/components/project/Solution";
import Stack from "@/components/project/Stack";
import Role from "@/components/project/Role";
import Code from "@/components/project/Code";
import Gallery from "@/components/project/Gallery";
import Footer from "@/components/project/Footer";

import { getProjectBySlug } from "@/data/projects";

interface PageProps {
  params: Promise<{
    project: string;
  }>;
}

export default async function Project({ params }: PageProps) {
  const { project: projectId } = await params;

  const project = getProjectBySlug(projectId);

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
            <div className="aspect-video w-full bg-cover bg-center bg-no-repeat bg-slate-200 dark:bg-[#1a2332]" data-alt="High fidelity dashboard interface showing charts and data tables" style={{ backgroundImage: `url(${project?.image})` }}></div>
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
              </a> : <p className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white text-center">Currently developing it. Stay tuned for demo</p> }
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
