import { IProject } from '@/types/project';

export const projects: IProject[] = [
  {
    slug: 'tank',
    title: 'Control Systems Project',
    shortDescription: 'Designed a cascade control structure for tank level using PID and RST controllers.',
    image: '/images/tank.png',
    challenge: 'Stabilize a non-linear hydraulic plant with significant transport delays. The primary difficulty lay in characterizing the digital valve actuator and managing the dynamic coupling between valve position and tank fill rate under experimental disturbances.',
    solution: 'Engineered a cascaded digital control architecture. First, I modeled and validated the plant dynamics (Gp(s) to Gp(z)) using MATLAB. I then implemented a discrete position controller for the valve and a robust level regulator, validating the system strictly against theoretical response curves.',
    techStack: ['MATLAB/Simulink', 'C++', 'System Identification', 'Digital Control'],
    role: 'Co-Author',
    typeResource: 'article',
    resourceLink: 'https://drive.google.com/file/d/1gb6vf0GpKotml4h6jEp_vjyyWE84wg-B/view?usp=sharing'
  },
  {
    slug: 'email',
    title: 'Email searching engine',
    shortDescription: 'High-speed search app with VueJS querying 1 million emails, optimized for < 100ms response.',
    image: '/images/email.png',
    challenge: 'Create a system to search through the Enron Corp email database (423MB). The task involved writing a program to index contents into ZincSearch, profiling the indexer for performance analysis, and building a frontend interface for searching. Additional goals included code optimization and deployment to AWS using Terraform.',
    solution: 'Developed a high-performance backend using Go and the Chi router, integrated with ZincSearch for efficient data indexing and retrieval. The frontend was built with Vue 3 and Tailwind CSS. The solution includes profiling for optimization and is deployable on Linux and AWS.',
    techStack: ['Go', 'ZincSearch', 'VueJS', 'Tailwind', 'AWS'],
    role: 'Full Stack Software Developer',
    typeResource: 'repository',
    resourceLink: 'https://github.com/Juan961/FullStackChallenge'
  },
  {
    slug: 'robot',
    title: 'Autonomous Robot Fleet Simulation',
    shortDescription: 'Simulation platform for autonomous delivery robots in urban settings with real-time telemetry and control.',
    image: '/images/robot.png',
    challenge: 'Build an autonomous robot fleet management system capable of navigating urban environments with real-time obstacle detection, path planning, and coordinated multi-robot operations through cloud-based telemetry and control.',
    solution: 'Currently developing a full-stack simulation platform integrating Webots for physics-based robot modeling, YOLO-based computer vision for obstacle detection, A* and Dynamic Window Approach for path planning, and AWS IoT Core for real-time fleet coordination. The system features a React dashboard displaying live telemetry from multiple robots, including position tracking, obstacle detection visualization, and delivery task assignment. Currently implementing reinforcement learning (PyTorch) for adaptive navigation behaviors in dynamic environments with pedestrians and traffic',
    techStack: ['AWS', 'IoT', 'React', 'Python', 'Typescript', 'Webots', 'PyTorch', 'MQTT'],
    role: 'Software & Mechatronic Engineering',
    // typeResource: 'demo',
    // resourceLink: 'https://....vercel.app'
  }
];

export const getProjectBySlug = (slug: string): IProject | undefined => {
  return projects.find(project => project.slug === slug);
};
