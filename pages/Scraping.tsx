import React, { useState, useEffect, useRef } from 'react';
import { PiPlayDuotone, PiStopDuotone, PiTerminalDuotone, PiGearDuotone, PiCheckCircleDuotone } from 'react-icons/pi';
import { ScraperLog } from '../types';

const Scraping: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [headless, setHeadless] = useState(true);
  const [logs, setLogs] = useState<ScraperLog[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleStart = () => {
    setIsRunning(true);
    // Use static hard data immediately instead of interval simulation
    const staticLogs: ScraperLog[] = [
      { id: 1, timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: 'Starting Scraper Pipeline...' },
      { id: 2, timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: 'Navigating to AdvoCare portal...' },
      { id: 3, timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: 'Found 12 pending orders...' },
      { id: 4, timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: 'Extracting customer details for ID #9923...' },
      { id: 5, timestamp: new Date().toLocaleTimeString(), level: 'SUCCESS', message: 'Data saved to data/customer_profiles_current.csv' },
      { id: 6, timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: 'Pipeline finished successfully.' }
    ];
    setLogs(staticLogs);
  };

  const handleStop = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, { id: Date.now(), timestamp: new Date().toLocaleTimeString(), level: 'ERROR', message: 'Process interrupted by user.' }]);
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Card */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary-alpha15 text-primary">
                <PiGearDuotone size={24} />
              </div>
              <h2 className="text-xl font-bold">Configuration</h2>
            </div>
            <p className="text-text-secondary text-sm mb-6">
              Configure the headless browser environment and execution mode before starting the pipeline.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary/50 border border-white/5">
                <span className="text-sm font-medium">Headless Mode</span>
                <button 
                  onClick={() => setHeadless(!headless)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${headless ? 'bg-primary' : 'bg-bg-tertiary'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${headless ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary/50 border border-white/5">
                <span className="text-sm font-medium">Debug Logging</span>
                <span className="text-xs text-text-tertiary uppercase">Disabled</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
             {!isRunning ? (
              <button 
                onClick={handleStart}
                className="w-full py-4 rounded-xl bg-primary text-bg-primary font-bold flex items-center justify-center gap-2 hover:bg-primary-light hover:shadow-glow transition-all"
              >
                <PiPlayDuotone size={20} />
                Run Scraper
              </button>
             ) : (
              <button 
                onClick={handleStop}
                className="w-full py-4 rounded-xl bg-success/20 text-success border border-success/50 font-bold flex items-center justify-center gap-2 hover:bg-success/30 transition-all"
              >
                <PiCheckCircleDuotone size={20} />
                Completed
              </button>
             )}
          </div>
        </div>

        {/* Status Card */}
        <div className="glass-card p-6 rounded-2xl lg:col-span-2 flex flex-col">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-bg-tertiary text-text-secondary">
                  <PiTerminalDuotone size={24} />
                </div>
                <h2 className="text-xl font-bold">Execution Logs</h2>
             </div>
             <div className="flex gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-mono border border-success/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                  CONNECTED
                </span>
             </div>
           </div>

           {/* Terminal Window */}
           <div className="flex-1 bg-[#0a0a0b] rounded-xl border border-white/10 p-4 font-mono text-xs overflow-hidden flex flex-col shadow-inner">
             <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar" ref={scrollRef}>
                {logs.length === 0 && (
                  <div className="text-text-tertiary italic p-4 text-center">Ready to initialize pipeline...</div>
                )}
                {logs.map((log) => (
                  <div key={log.id} className="flex gap-3 hover:bg-white/5 p-0.5 rounded">
                    <span className="text-text-tertiary select-none">[{log.timestamp}]</span>
                    <span className={`
                      font-bold w-12 text-center select-none
                      ${log.level === 'INFO' ? 'text-info' : ''}
                      ${log.level === 'WARN' ? 'text-warning' : ''}
                      ${log.level === 'ERROR' ? 'text-error' : ''}
                      ${log.level === 'SUCCESS' ? 'text-success' : ''}
                    `}>{log.level}</span>
                    <span className="text-text-primary break-all">{log.message}</span>
                  </div>
                ))}
                {isRunning && (
                  <div className="animate-pulse text-primary mt-2">_</div>
                )}
             </div>
           </div>
        </div>
      </div>

      {/* Recent Files */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <PiCheckCircleDuotone className="text-success" />
          Recent Exports
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-text-secondary text-sm">
                <th className="py-3 px-4">Filename</th>
                <th className="py-3 px-4">Date Generated</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Records</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-mono text-primary">customer_profiles_10_2023.csv</td>
                <td className="py-3 px-4">Oct 24, 2023 09:42 AM</td>
                <td className="py-3 px-4">2.4 MB</td>
                <td className="py-3 px-4">1,284</td>
                <td className="py-3 px-4"><span className="text-success">Complete</span></td>
                <td className="py-3 px-4 text-right">
                  <button className="text-sm text-text-secondary hover:text-white underline">Download</button>
                </td>
              </tr>
               <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-mono text-primary">customer_profiles_09_2023.csv</td>
                <td className="py-3 px-4">Sep 24, 2023 10:00 AM</td>
                <td className="py-3 px-4">2.1 MB</td>
                <td className="py-3 px-4">1,150</td>
                <td className="py-3 px-4"><span className="text-success">Complete</span></td>
                <td className="py-3 px-4 text-right">
                  <button className="text-sm text-text-secondary hover:text-white underline">Download</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Scraping;