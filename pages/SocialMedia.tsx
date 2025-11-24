import React, { useState } from 'react';
import { PiMagicWandDuotone, PiYoutubeLogoDuotone, PiTiktokLogoDuotone, PiInstagramLogoDuotone, PiFloppyDiskDuotone, PiTrashDuotone, PiCheckCircleDuotone } from 'react-icons/pi';
import { SavedScript } from '../types';

const SocialMedia: React.FC = () => {
  const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'youtube'>('instagram');
  const [topic, setTopic] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [savedScripts, setSavedScripts] = useState<SavedScript[]>([]);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleGenerate = () => {
    // Instant generation using static data
    setGeneratedScript(`**Hook:** (0:00-0:03)
Visual: Hold up the Spark canister.
Audio: "Stop crashing at 2pm. Here's my secret weapon."

**Body:** (0:03-0:12)
Visual: Mixing Spark with water, ice clinking.
Audio: "This isn't just caffeine. It's vitamins, minerals, and sustained focus without the jitters. I switched 3 months ago and haven't looked back."

**CTA:** (0:12-0:15)
Visual: Drinking and smiling. Text overlay: Link in Bio.
Audio: "Grab yours at the link in my bio!"`);
  };

  const handleSave = () => {
    if (!generatedScript) return;

    const newScript: SavedScript = {
      id: Date.now().toString(),
      platform,
      topic: topic || 'Untitled Script',
      content: generatedScript,
      timestamp: new Date().toLocaleDateString()
    };

    setSavedScripts([newScript, ...savedScripts]);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  const handleDelete = (id: string) => {
    setSavedScripts(savedScripts.filter(s => s.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Input Section */}
      <div className="glass-card p-6 rounded-2xl flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <PiMagicWandDuotone className="text-accent" />
            Script Generator
          </h2>
          <p className="text-text-secondary text-sm">
            Generate viral scripts optimized for short-form video platforms using AI.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Platform</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'instagram', icon: PiInstagramLogoDuotone, label: 'Reels' },
                { id: 'tiktok', icon: PiTiktokLogoDuotone, label: 'TikTok' },
                { id: 'youtube', icon: PiYoutubeLogoDuotone, label: 'Shorts' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id as any)}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-xl border transition-all
                    ${platform === p.id 
                      ? 'bg-primary-alpha15 border-primary text-primary shadow-glow' 
                      : 'bg-bg-tertiary border-transparent text-text-secondary hover:bg-white/5'}
                  `}
                >
                  <p.icon size={24} className="mb-1" />
                  <span className="text-xs font-bold">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Focus Product / Topic</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Spark Energy, Morning Routine, Workout Recovery"
              className="w-full bg-bg-tertiary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Tone</label>
            <select className="w-full bg-bg-tertiary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none">
              <option>Energetic & Motivational</option>
              <option>Educational & Calm</option>
              <option>Casual & Relatable</option>
            </select>
          </div>
        </div>

        <div className="mt-auto">
          <button 
            onClick={handleGenerate}
            disabled={!topic}
            className={`
              w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
              ${!topic 
                ? 'bg-white/5 text-text-tertiary cursor-not-allowed' 
                : 'bg-gradient-to-r from-primary-dark to-primary text-bg-primary shadow-glow hover:translate-y-[-2px]'}
            `}
          >
            <PiMagicWandDuotone size={20} />
            Generate Script
          </button>
        </div>
      </div>

      {/* Output & Library Section */}
      <div className="flex flex-col gap-6 h-full overflow-hidden">
        {/* Editor Area */}
        <div className="glass-card p-6 rounded-2xl flex flex-col flex-1 bg-black/40 min-h-[300px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white">Generated Output</h3>
            {generatedScript && (
              <button 
                onClick={handleSave}
                disabled={showSaveSuccess}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                  ${showSaveSuccess 
                    ? 'bg-success/20 text-success border border-success/30' 
                    : 'bg-white/5 text-text-secondary hover:bg-white/10 border border-white/10'}
                `}
              >
                {showSaveSuccess ? (
                  <>
                    <PiCheckCircleDuotone size={16} />
                    Saved!
                  </>
                ) : (
                  <>
                    <PiFloppyDiskDuotone size={16} />
                    Save to Library
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex-1 bg-bg-primary rounded-xl p-4 border border-white/5 font-mono text-sm overflow-y-auto whitespace-pre-wrap text-text-secondary leading-relaxed custom-scrollbar">
            {generatedScript || (
              <div className="h-full flex flex-col items-center justify-center text-text-tertiary opacity-50">
                <PiMagicWandDuotone size={48} className="mb-4" />
                <p>Ready to generate content</p>
              </div>
            )}
          </div>
        </div>

        {/* Saved Library (Mini) */}
        {savedScripts.length > 0 && (
          <div className="glass-card p-4 rounded-2xl max-h-[200px] overflow-hidden flex flex-col">
            <h3 className="font-bold text-white text-sm mb-3 px-1">Recent Saves</h3>
            <div className="overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {savedScripts.map((script) => (
                <div key={script.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-colors flex justify-between items-center group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`
                      p-2 rounded-lg 
                      ${script.platform === 'instagram' ? 'bg-gradient-to-tr from-purple-500/20 to-orange-500/20 text-pink-500' : ''}
                      ${script.platform === 'tiktok' ? 'bg-cyan-500/10 text-cyan-400' : ''}
                      ${script.platform === 'youtube' ? 'bg-red-500/10 text-red-500' : ''}
                    `}>
                      {script.platform === 'instagram' && <PiInstagramLogoDuotone />}
                      {script.platform === 'tiktok' && <PiTiktokLogoDuotone />}
                      {script.platform === 'youtube' && <PiYoutubeLogoDuotone />}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-white truncate">{script.topic}</p>
                      <p className="text-xs text-text-tertiary">{script.timestamp}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(script.id)}
                    className="p-2 text-text-tertiary hover:text-error hover:bg-error/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <PiTrashDuotone />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMedia;