import Scene3D from './Scene3D';

import { MapPinIcon } from '@heroicons/react/24/solid'

export default function Header() {
  return (
    <header className="w-full text-white font-jakarta flex items-center gap-4">
      <div className="w-1/2 flex flex-col gap-4 py-20">
        <h1 className="text-5xl font-medium">Juan José García - Software & Mechatronic</h1>

        <span className="flex gap-2 mt-2">
          <MapPinIcon className="w-4" /> Bogotá D.C., Colombia
        </span>

        <p className='mt-2 font-light'>Software Developer and Mechatronics Engineering student with hands-on experience in cloud architecture, serverless applications, and IoT solutions. Skilled in building scalable systems using Nuxt.js, Python, and AWS services.</p>
      </div>

      <Scene3D />

    </header>
  );
}
