import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Camera, Plus, Sparkles } from 'lucide-react';
import { Memory } from '../types';

interface AddMemoryDialogProps {
  onClose: () => void;
  onAddMemory: (memory: Memory) => void;
}

const PRESET_MOMENT_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80', label: 'Party Sparklers 🎇' },
  { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80', label: 'Pastel Balloons 🎈' },
  { url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80', label: 'Festive Confetti 🎉' },
  { url: 'https://images.unsplash.com/photo-1464349172961-10492ec8653e?auto=format&fit=crop&w=600&q=80', label: 'Birthday Cakes 🎂' }
];

export default function AddMemoryDialog({ onClose, onAddMemory }: AddMemoryDialogProps) {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('Nostalgic');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) {
      setError('Please provide a caption/title.');
      return;
    }

    const finalImage = imageUrl.trim() || PRESET_MOMENT_IMAGES[0].url;

    const newMem: Memory = {
      id: `custom-${Date.now()}`,
      caption: caption.trim(),
      imageUrl: finalImage,
      category,
      createdAt: new Date().toISOString().split('T')[0],
      rotation: (Math.random() - 0.5) * 8, // organic physical paper tilt
      liked: false,
      detailedDescription: description.trim() || 'A magical custom memory added with warmth!',
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    };

    onAddMemory(newMem);
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/60 dark:bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-surface dark:bg-surface-container paper-texture w-full max-w-lg rounded-2xl shadow-2xl border-4 border-primary dark:border-primary/40 overflow-hidden text-on-surface p-6 relative"
      >
        {/* Decorative Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 washi-tape-yellow w-32 h-8 rotate-[2deg] z-20"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-1.5 rounded-full bg-surface-container-low text-on-surface hover:bg-red-100 hover:text-red-600 transition-all"
        >
          <X size={18} />
        </button>

        <h3 className="font-headline text-2xl font-bold text-primary mb-4 flex items-center gap-2 mt-2">
          <Camera size={22} className="text-primary" /> Clip a New Memory
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-xs text-red-500 font-mono font-bold">{error}</p>}

          <div>
            <label className="block text-xs font-mono text-on-surface-variant uppercase mb-1">
              Caption/Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Gurl eating entire cake alone 🍰"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm bg-surface-container-low border border-outline-variant/55 focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder-on-surface-variant/50 text-on-surface font-body"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-on-surface-variant uppercase mb-1">
              Select or Paste Image Link:
            </label>
            <input
              type="url"
              placeholder="Paste custom photo URL (HTTPS format)..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm bg-surface-container-low border border-outline-variant/55 focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder-on-surface-variant/50 text-on-surface font-body text-xs mb-2"
            />
            
            <p className="text-[10px] text-on-surface-variant font-mono uppercase mb-1.5">Preset Party Themes:</p>
            <div className="grid grid-cols-2 gap-1.5">
              {PRESET_MOMENT_IMAGES.map((preset) => (
                <button
                  type="button"
                  key={preset.url}
                  onClick={() => setImageUrl(preset.url)}
                  className={`text-[10px] p-2 rounded-xl border text-left transition-all truncate flex items-center gap-1.5 ${
                    imageUrl === preset.url
                      ? 'bg-primary text-on-primary border-primary font-bold'
                      : 'bg-surface-container-low hover:bg-primary-container/20 border-outline-variant/35'
                  }`}
                >
                  <img src={preset.url} alt="" className="w-6 h-6 object-cover rounded-md" />
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-on-surface-variant uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm bg-surface-container-low border border-outline-variant/55 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface font-body"
              >
                <option value="Besties">🌸 Besties</option>
                <option value="Silly">🤪 Silly Days</option>
                <option value="School">🏫 School Days</option>
                <option value="Candid">📹 Candid Photos</option>
                <option value="Birthday">🎂 Birthday Party</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-on-surface-variant uppercase mb-1">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                placeholder="slay, cake, happy"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm bg-surface-container-low border border-outline-variant/55 focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder-on-surface-variant/50 text-on-surface font-body"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-on-surface-variant uppercase mb-1">
              Write a Memory Entry / Note
            </label>
            <textarea
              rows={3}
              placeholder="What happened during this beautiful moment? Write some fun gossip or nice wishes!"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm bg-surface-container-low border border-outline-variant/55 focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder-on-surface-variant/50 text-on-surface font-body"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-on-primary font-headline text-lg py-3 rounded-xl shadow-[0_5px_0_0_#6f3157] hover:shadow-[0_2px_0_0_#6f3157] hover:translate-y-[3px] active:scale-95 transition-all flex items-center justify-center gap-1.5 mt-2"
          >
            <Plus size={18} /> Pin it directly!
          </button>
        </form>
      </motion.div>
    </div>
  );
}
