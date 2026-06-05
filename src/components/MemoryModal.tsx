import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Heart, Calendar, Smile, Tag, Share2 } from 'lucide-react';
import { Memory } from '../types';

interface MemoryModalProps {
  memory: Memory;
  onClose: () => void;
  onLikeToggle: (id: string) => void;
}

export default function MemoryModal({ memory, onClose, onLikeToggle }: MemoryModalProps) {
  const [copied, setCopied] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  const handleShare = () => {
    navigator.clipboard.writeText(`Wow, check out this sweet memory of Modi: "${memory.caption}"!`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stickers = ['👑 Slay Queen', '🌸 Besties Forever', '🥳 Happy Days', '🎂 Star Girl', '🎈 core memory', '🧸 cutie'];

  return (
    <div className="fixed inset-0 bg-neutral-900/60 dark:bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      {/* Backdrop motion wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative bg-surface dark:bg-surface-container paper-texture w-full max-w-2xl rounded-2xl shadow-2xl border-4 border-primary dark:border-primary/40 overflow-hidden text-on-surface"
      >
        {/* Washi decor tapes at the corners */}
        <div className="absolute -top-3 left-10 washi-tape w-24 h-8 rotate-[-5deg] z-20"></div>
        <div className="absolute -top-3 right-12 washi-tape-yellow w-20 h-8 rotate-[4deg] z-20"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-surface-container-low text-on-surface hover:bg-primary-container hover:text-on-primary-container transition-all"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 pt-10">
          {/* Polaroid Image Wrapper */}
          <div className="md:col-span-6 flex flex-col items-center justify-center">
            <div className="bg-white text-neutral-800 p-3 pb-8 rounded shadow-lg border border-neutral-200/50 relative w-full max-w-[270px]">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 washi-tape w-20 h-5 rotate-[2deg] opacity-70"></div>
              
              <div className="relative overflow-hidden group select-none">
                <img
                  src={memory.imageUrl}
                  alt={memory.caption}
                  className="w-full h-64 object-cover rounded"
                />
                
                {/* Custom Overlay Sticker */}
                {selectedSticker && (
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 12 }}
                    className="absolute bottom-4 right-4 bg-yellow-100 border border-yellow-300 text-yellow-800 font-mono text-[10px] uppercase font-bold px-2 py-1 rounded shadow-md z-10"
                  >
                    {selectedSticker}
                  </motion.div>
                )}
              </div>

              <p className="mt-4 font-mono text-center text-xs text-neutral-500 tracking-tight select-none">
                {memory.caption}
              </p>
            </div>
          </div>

          {/* Diary Entry and Interactive Controls */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-primary-container/40 dark:bg-primary-container/20 text-primary dark:text-pink-300 px-2 py-0.5 rounded font-semibold">
                  {memory.category}
                </span>
                <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1">
                  <Calendar size={12} /> {memory.createdAt}
                </span>
              </div>

              <h3 className="font-headline text-2xl text-primary font-bold tracking-tight leading-tight">
                {memory.caption}
              </h3>

              <div className="border-t-2 border-dashed border-outline-variant/30 pt-3">
                <p className="font-body text-sm leading-relaxed text-on-surface-variant italic">
                  "{memory.detailedDescription || 'No diary entries yet. This moment was absolutely magical!'}"
                </p>
              </div>

              {/* Tags panel */}
              {memory.tags && memory.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {memory.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-on-surface/80 bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant/30 flex items-center gap-0.5"
                    >
                      <Tag size={8} /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Interactions */}
            <div className="mt-6 pt-4 border-t border-dashed border-outline-variant/30 space-y-4">
              {/* Sticker Selector */}
              <div>
                <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider mb-2">
                  PIN A CUTE STICKER:
                </p>
                <div className="flex flex-wrap gap-1">
                  {stickers.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSticker(selectedSticker === s ? null : s)}
                      className={`text-[10px] px-2 py-1 rounded-full transition-all border ${
                        selectedSticker === s
                          ? 'bg-primary text-on-primary border-primary'
                          : 'bg-surface-container hover:bg-primary-container/30 border-outline-variant/30'
                      }`}
                    >
                      {s.split(' ')[0]} {s.split(' ').slice(1).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onLikeToggle(memory.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    memory.liked
                      ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                      : 'bg-surface-container text-on-surface hover:bg-rose-100 hover:text-rose-600 border-outline-variant/30'
                  }`}
                >
                  <Heart size={14} fill={memory.liked ? 'currentColor' : 'none'} />
                  {memory.liked ? 'Loved!' : 'Love memory'}
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-surface-container text-on-surface hover:bg-tertiary-container hover:text-on-tertiary-container transition-all border border-outline-variant/30"
                >
                  <Share2 size={14} />
                  {copied ? 'Copied Link!' : 'Copy Info'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
