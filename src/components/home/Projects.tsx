import TitleSection from "./TitleSection"
import ProjectCard from "@/components/home/ProjectCard";

import { IProject } from "@/types/project"

export default function Projects () {

  const projects:IProject[] = [
    {
      title: "Control Systems Project",
      points: [
        "Designed a cascade control structure for tank level, using a PID controller for the inner loop (valve position) and an RST controller for the outer loop (desired level).", 
        "System was modeled and simulated in MATLAB/Simulink to validate performance under varying outflow conditions.",
        "Controllers were implemented in C/C++ and deployed on a microcontroller, demonstrating full hardware-software integration."
      ],
      technologies: ["PID", "RST", "MATLAB", "Simulink", "C/C++", "Microcontrollers"],
      icon: "paper",
      link: "https://drive.google.com/file/d/1gb6vf0GpKotml4h6jEp_vjyyWE84wg-B/view?usp=sharing"
    },
    {
      title: "Email searching engine",
      points: [
        "Developed a high-speed search application using a VueJS interface for querying a dataset of 1 million emails.",
        "Backend/API: Designed and implemented a custom REST API using Go to manage user queries, focusing on security and query optimization.",
        "Implementation/Result: Utilized ZincSearch as the index backend, optimizing the data pipeline for fast, low-footprint indexing, and achieving query response times under 100ms."
      ],
      technologies: ["AWS", "Go", "Nuxt.js", "ZincSearch"],
      icon: "code",
      link: "https://github.com/Juan961/FullStackChallenge"
    },
    {
      title: "CNN for plant classification",
      points: [
        "Developed a Convolutional Neural Network (CNN) using the PyTorch framework for multi-class classification of 32 plant species based on leaf imagery.",
        "Data/Training: Trained the model on a labeled dataset of 30.000+ images over several epochs, managing dataset augmentation and validation.",
        "Result/Metric: Achieved a final classification accuracy of 92%, validating the model's reliability for real-world identification."
      ],
      technologies: ["PyTorch", "Python", "AWS", "Nuxt.js"],
      icon: "brain"
    },
  ]

  return (
    <section className="w-full text-white font-jakarta">
      <TitleSection title="Projects" />

      <div className="flex flex-wrap items-center justify-evenly gap-4">
        {projects.map((item, index) => ( <ProjectCard item={item} key={index} />))}
      </div>
    </section>
  )
}
