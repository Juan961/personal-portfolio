import { CodeBracketIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Code() {
  return (
    <div className="mb-16 overflow-hidden rounded-xl bg-[#0d1117] ring-1 ring-white/10">
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <CodeBracketIcon className="h-6 w-6 text-primary" />
          Technical Deep Dive: Custom Data Hook
        </h2>
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Optimized Fetching Logic</h3>
          <p className="text-slate-400 mb-6 leading-relaxed">
            To handle frequent data updates without layout thrashing, we implemented a custom hook `useStaleWhileRevalidate`. This pattern allows the UI to show cached data instantly while fetching fresh content in the background.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-slate-300 text-sm">
              <CheckCircleIcon className="h-6 w-6 text-primary" />
              Reduces perceived latency to near-zero.
            </li>
            <li className="flex items-start gap-3 text-slate-300 text-sm">
              <CheckCircleIcon className="h-6 w-6 text-primary" />
              Handles race conditions automatically via AbortController.
            </li>
            <li className="flex items-start gap-3 text-slate-300 text-sm">
              <CheckCircleIcon className="h-6 w-6 text-primary" />
              Built-in retry logic for unstable connections.
            </li>
          </ul>
        </div>
        <div className="relative bg-black/50 p-6 font-mono text-sm overflow-x-auto">
          <pre className="text-slate-300 leading-relaxed">
            <span className="text-purple-400">const</span> <span className="text-blue-400">useStaleWhileRevalidate</span> = <span className="text-yellow-300">(key, fetcher)</span> {`=> {`}
            {'\n  '}<span className="text-purple-400">const</span> [data, setData] = <span className="text-blue-400">useState</span>(<span className="text-purple-400">null</span>);
            {'\n'}
            {'\n  '}<span className="text-blue-400">useEffect</span>{`(() => {`}
            {'\n    '}<span className="text-slate-500">{`// Check cache first`}</span>
            {'\n    '}<span className="text-purple-400">const</span> cached = cache.<span className="text-blue-400">get</span>(key);
            {'\n    '}<span className="text-purple-400">if</span> (cached) <span className="text-blue-400">setData</span>(cached);
            {'\n'}
            {'\n    '}<span className="text-purple-400">const</span> controller = <span className="text-purple-400">new</span> <span className="text-yellow-300">AbortController</span>();
            {'\n'}
            {'\n    '}<span className="text-slate-500">{`// Fetch fresh data`}</span>
            {'\n    '}<span className="text-blue-400">fetcher</span>{`({ signal: controller.signal })`}
            {'\n      '}.<span className="text-blue-400">then</span>(newData {`=> {`}
            {'\n        '}cache.<span className="text-blue-400">set</span>(key, newData);
            {'\n        '}<span className="text-blue-400">setData</span>(newData);
            {'\n      '}{`});`}
            {'\n'}
            {'\n    '}<span className="text-purple-400">return</span> {`() =>`} controller.<span className="text-blue-400">abort</span>();
            {'\n  '}{`}, [key]);`}
            {'\n'}
            {'\n  '}<span className="text-purple-400">return</span> data;
            {'\n'}{`};`}
          </pre>
          <div className="absolute bottom-4 right-4 text-xs text-slate-600">src/hooks/useSWR.ts</div>
        </div>
      </div>
    </div>
  )
}