import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Music, Volume2, Sparkles } from 'lucide-react';
import { playHBDTune } from './SparkleEffects';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tuneTimer, setTuneTimer] = useState<NodeJS.Timeout | null>(null);

  const handlePlayToggle = () => {
    if (isPlaying) {
      if (tuneTimer) clearInterval(tuneTimer);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // Play tune first
      playHBDTune();
      // Repeat the tune every 16 seconds if playing
      const interval = setInterval(() => {
        playHBDTune();
      }, 16000);
      setTuneTimer(interval);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant shadow-sm text-on-surface"
    >
      <div className="flex items-center gap-1.5">
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { repeat: Infinity, duration: 4, ease: 'linear' } : { duration: 0.5 }}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20"
        >
          <Music size={14} className="animate-pulse" />
        </motion.div>
        
        <div className="hidden sm:block text-left select-none">
          <p className="text-[11px] font-mono leading-none tracking-tight opacity-70">CURRENT SOUND</p>
          <p className="text-xs font-bold font-headline leading-tight truncate max-w-[120px] text-primary">
            {isPlaying ? 'Golden Music Box 🎵' : 'Muted. Tap Play!'}
          </p>
        </div>
      </div>

      <button
        onClick={handlePlayToggle}
        className="p-1.5 rounded-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center border border-primary"
        title={isPlaying ? 'Pause nostalgic tunes' : 'Play cute birthday music box!'}
      >
        {isPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-0.5 h-3 pr-1.5">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-[2px] bg-primary rounded-full"
              animate={{
                height: ['4px', '12px', '6px', '10px', '4px'][i % 5],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8 + i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
