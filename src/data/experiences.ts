import { IExperience } from '@/types/experience';

export const experiences: IExperience[] = [
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
