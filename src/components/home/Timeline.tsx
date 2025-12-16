import { IExperience } from "@/types/experience";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
  const experiences: IExperience[] = [
    {
      title: "Software Developer",
      company: "GoDev",
      period: "Sep 2023 - Aug 2025",
      description:
        "Built and maintained scalable serverless web applications on Azure. Designed cloud infrastructure for an IoT Hub, enabling real-time telemetry ingestion and processing. Defined device-to-cloud architecture using Azure Functions and Cosmos DB.",
      technologies: ["Nuxt.js", "Azure Functions", "Cosmos DB", "IoT Hub", "Azure"]
    },
    {
      title: "FullStack Developer",
      company: "Glamper",
      period: "Feb 2022 - Aug 2023",
      description:
        "Migrated a monolithic on-premises system to a fully serverless AWS architecture. Reduced reservation latency from 15s to 1.5s through caching and data precomputation. Built a custom AI agent for personalized reservation flows.",
      technologies: ["AWS", "AI Agent", "ETL process", "Migration", "Nuxt.js", "Python"]
    }
  ];


  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-evenly gap-4">
        {experiences.map((item, index) => (
          <ExperienceCard item={item} key={index} />
        ))}
      </div>
    </div>
  )
}
