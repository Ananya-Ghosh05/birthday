import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  Camera,
  Plus,
  Sun,
  Moon,
  MessageSquare,
  Gift,
  Send,
  Trash2,
  BookmarkCheck,
  RotateCcw,
  Info
} from 'lucide-react';

import { Memory, HugLetter, GiftType } from './types';
import { INITIAL_MEMORIES, GRID_SAMPLES, EXTRA_TILT_PORTRAIT, TRIPLE_COLLAGE_IMAGES, PRESET_HUG_LETTERS, GIFT_CATALOG } from './initialData';
import SparkleEffects, { Sparkle } from './components/SparkleEffects';
import AudioPlayer from './components/AudioPlayer';
import MemoryModal from './components/MemoryModal';
import AddMemoryDialog from './components/AddMemoryDialog';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('scrapbook_theme');
    return saved === 'dark';
  });

  // Scrapbook memories state
  const [memories, setMemories] = useState<Memory[]>(() => {
    const saved = localStorage.getItem('scrapbook_memories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_MEMORIES;
      }
    }
    return INITIAL_MEMORIES;
  });

  // Hug/letter state
  const [hugLetters, setHugLetters] = useState<HugLetter[]>(() => {
    const saved = localStorage.getItem('scrapbook_letters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return PRESET_HUG_LETTERS;
      }
    }
    return PRESET_HUG_LETTERS;
  });

  // Modals & UI states
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Sparkle burst particles state
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Hug Form Inputs
  const [senderName, setSenderName] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [selectedGiftType, setSelectedGiftType] = useState<GiftType>('hug');

  // Success message toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Apply dark mode class to HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('scrapbook_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('scrapbook_theme', 'light');
    }
  }, [isDark]);

  // Persist memories to localStorage
  useEffect(() => {
    localStorage.setItem('scrapbook_memories', JSON.stringify(memories));
  }, [memories]);

  // Persist letters to localStorage
  useEffect(() => {
    localStorage.setItem('scrapbook_letters', JSON.stringify(hugLetters));
  }, [hugLetters]);

  // Handle Burst of sparkling emojis at clicking node
  const triggerSparkleBurst = (clientX: number, clientY: number, giftEmoji: string = '❤️') => {
    const freshSparkles: Sparkle[] = Array.from({ length: 14 }).map((_, i) => ({
      id: `${Date.now()}-${i}-${Math.random()}`,
      x: clientX,
      y: clientY,
      emoji: i % 2 === 0 ? giftEmoji : ['✨', '🎈', '💖', '🍿', '🌸', '⭐'][Math.floor(Math.random() * 6)],
      size: Math.random() * 24 + 18,
      rotation: Math.random() * 360
    }));

    setSparkles((prev) => [...prev, ...freshSparkles]);
  };

  const handleSparkleRemove = (id: string) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id));
  };

  // Autodetect scroll to content
  const handleStartScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const elem = document.getElementById('scrapbook-content');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Like Toggle handler
  const handleLikeToggle = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, liked: !m.liked } : m))
    );
    if (selectedMemory && selectedMemory.id === id) {
      setSelectedMemory((prev) => prev ? { ...prev, liked: !prev.liked } : null);
    }
  };

  // Delete custom memories if desired
  const handleDeleteMemory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this memory entry?')) {
      setMemories((prev) => prev.filter((m) => m.id !== id));
    }
  };

  // Set default initial state again
  const handleResetScrapbook = () => {
    if (window.confirm('Do you want to reset scrapbook memories and virtual hugs back to original cozy defaults?')) {
      setMemories(INITIAL_MEMORIES);
      setHugLetters(PRESET_HUG_LETTERS);
      showToast('Scrapbook reset to pristine beautiful defaults!');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handle Hug Letter Submit
  const handleSendHug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderMessage.trim()) {
      showToast('Please fill out both your sweet name and custom message!');
      return;
    }

    const giftConfig = GIFT_CATALOG.find((g) => g.type === selectedGiftType);
    const giftEmoji = giftConfig ? giftConfig.emoji : '❤️';

    // Spawn sparkles at center
    triggerSparkleBurst(window.innerWidth / 2, window.innerHeight * 0.75, giftEmoji);

    const newLetter: HugLetter = {
      id: `letter-${Date.now()}`,
      sender: senderName.trim(),
      message: senderMessage.trim(),
      giftType: selectedGiftType,
      createdAt: new Date().toISOString()
    };

    setHugLetters((prev) => [newLetter, ...prev]);
    setSenderName('');
    setSenderMessage('');
    showToast(`Yay! Sweet gift & warm letter posted for Modi! 💖`);
  };

  // Remove individual virtual hug letter
  const handleDeleteLetter = (id: string) => {
    setHugLetters((prev) => prev.filter((l) => l.id !== id));
    showToast('Warm letter removed safely.');
  };

  const filteredMemories = activeCategory === 'All'
    ? memories
    : memories.filter((m) => m.category.toLowerCase() === activeCategory.toLowerCase() || m.tags?.some(t => t.toLowerCase() === activeCategory.toLowerCase()));

  // List of tags / categories for tabs bar
  const categoriesList = ['All', 'Candid', 'Therapy', 'School', 'Besties', 'Birthday'];

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container font-body transition-colors duration-300 relative">
      
      {/* Interactive particle particle layers */}
      <SparkleEffects sparkles={sparkles} onRemove={handleSparkleRemove} />

      {/* Floating Success Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 right-6 bg-primary text-on-primary paper-texture font-bold px-6 py-4 rounded-xl shadow-2xl z-[99999] border-2 border-primary-container max-w-sm flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
              ✨
            </div>
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest leading-none text-pink-200">System Notification</p>
              <p className="text-sm mt-0.5 leading-snug">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Splash Section (Light pastel pink) */}
      <section
        className="bg-primary-container min-h-screen flex items-center justify-center relative overflow-hidden paper-texture"
        id="welcome"
      >
        {/* Absolute decorative items from SCRAPBOOK screens */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-12 doodle-float opacity-50">
            <span className="material-symbols-outlined text-primary text-6xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
          </div>
          <div className="absolute bottom-24 right-14 doodle-float opacity-45" style={{ animationDelay: '1.5s' }}>
            <span className="material-symbols-outlined text-tertiary text-7xl select-none">
              auto_awesome
            </span>
          </div>
          <div className="absolute top-1/4 right-24 doodle-float opacity-45" style={{ animationDelay: '0.8s' }}>
            <span className="material-symbols-outlined text-secondary text-5xl select-none">
              celebration
            </span>
          </div>
          {/* Subtle instructions sticker */}
          <div className="absolute bottom-6 left-6 flex items-center gap-1.5 p-2 bg-white/40 dark:bg-black/30 backdrop-blur-md rounded-xl text-[10px] font-mono border border-white/20">
            <Info size={12} className="text-primary" />
            CLICK SCREEN FOR SPARKLING HEART BURSTS!
          </div>
        </div>

        {/* Global Click Sparkle Burst trigger node */}
        <div
          className="absolute inset-0 z-0"
          onClick={(e) => triggerSparkleBurst(e.clientX, e.clientY)}
        />

        <main className="relative z-10 flex flex-col items-center justify-center text-center p-4 max-w-4xl">
          {/* Large Retro Camera Frame Mock */}
          <div className="relative mb-6 max-w-2xl px-2 doodle-float">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border-2 border-neutral-200/50 p-2.5">
              <img
                alt="Sweet vintage memories canon camera"
                className="w-full h-auto max-h-[380px] object-contain floating-image"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0UPREMFeH9pP--GnJWQ14mEgo6PXW3KgPlQ-SfVYtUkcBoWMJ-0uMJDhtynYOtiqVOn9DSReBQa-n52lvfGI9KsynemermXUzqiC0MYX5DBDmJib7xgpfbOa1w2t9UWNY3w_Swz4jYOTELm1AsQMs0C4DXvxgwZh_HwhZLqIUXO07FSj7jWyjN3yfa2ebagHhu7Mh9atU56kE5XTUkwdcbHuPji57-ExQYBhtpKIDCBtGTsm2fK88UQMS9Ti3mov0NqU"
              />
              {/* Retro Lens highlight overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            </div>
            
            {/* Wooden clip decor tape floating background */}
            <div className="absolute -top-4 left-1/3 washi-tape-yellow w-28 h-7 rotate-[-6deg] z-10 opacity-80" />
          </div>

          {/* Slogan Headline */}
          <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl text-on-primary-fixed-variant md:leading-tight mb-4 drop-shadow-sm px-2 font-extrabold tracking-tight">
            arey arey kuch toh special hai aaj
          </h1>
          <p className="font-body text-base sm:text-lg text-on-primary-container/85 mb-8 max-w-xl px-4 leading-relaxed font-semibold">
            Flip the pages of our digital scrapbook and relive every beautiful, silly moment we've shared.
          </p>

          {/* Interactive Start Button */}
          <a
            onClick={handleStartScroll}
            className="group relative inline-flex items-center justify-center px-12 py-4.5 font-headline text-xl sm:text-2xl bg-tertiary-fixed text-on-tertiary-fixed rounded-2xl shadow-[0_8px_0_0_rgba(0,102,134,0.35)] hover:shadow-[0_4px_0_0_rgba(0,102,134,0.35)] hover:translate-y-[4px] active:shadow-none active:translate-y-[8px] transition-all duration-150 ease-out border-4 border-on-tertiary-fixed"
            href="#scrapbook-content"
          >
            <span className="relative z-10 tracking-widest font-extrabold uppercase">START EXPLORING</span>
            <span className="absolute -top-7 -left-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="material-symbols-outlined text-secondary text-4xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            </span>
            <span className="absolute -bottom-7 -right-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="material-symbols-outlined text-primary text-4xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </span>
          </a>
        </main>
      </section>

      {/* Sweet Color Transition Gradient Section */}
      <div className="h-44 stitch-gradient-transition paper-texture relative">
        <div className="absolute inset-0 opacity-10 bg-radial-gradient from-white to-transparent" />
      </div>

      {/* Main Scrapbook Yellow Section */}
      <section className="stitch-yellow-section paper-texture pb-32 transition-colors duration-300 relative" id="scrapbook-content">
        
        {/* STICKY NAV */}
        <nav className="w-full top-0 sticky z-[100] stitch-yellow-nav backdrop-blur-md shadow-sm border-b border-outline-variant/20">
          <div className="flex justify-between items-center px-4 sm:px-6 py-3.5 max-w-6xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                💝
              </div>
              <h1 className="font-headline text-lg sm:text-2xl text-primary font-bold tracking-tight select-none">
                Modi's Scrapbook
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Customized autogenerated nostalgic chiptune block */}
              <AudioPlayer />

              {/* Reset to pristine defaults anchor button */}
              <button
                onClick={handleResetScrapbook}
                title="Reset database to cozy default memories"
                className="p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary-container/20 transition-all border border-outline-variant/20 bg-surface/60 dark:bg-black/20"
              >
                <RotateCcw size={16} />
              </button>

              {/* Cute Dark/Light Switch */}
              <button
                onClick={() => {
                  setIsDark(!isDark);
                  // Trigger interactive sparkly night burst
                  triggerSparkleBurst(window.innerWidth / 2, 120, '⭐');
                }}
                className="p-2 rounded-xl text-primary border border-outline-variant/30 hover:bg-primary-container/30 transition-all flex items-center justify-center shadow-inner"
                title={isDark ? 'Switch to Sunny Pastels' : 'Switch to Candlelit Starry Night'}
              >
                {isDark ? (
                  <Sun size={17} className="text-amber-400 rotate-12 transition-transform duration-500" />
                ) : (
                  <Moon size={17} className="text-indigo-600 -rotate-12 transition-transform duration-500" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Global Memory Section Workspace Container */}
        <div className="max-w-5xl mx-auto px-4 pt-12 relative">
          
          {/* Header design elements */}
          <header className="text-center mb-16 relative">
            <div className="absolute -top-10 left-1/3 doodle-float">
              <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </div>
            
            {/* Happy birthday banner mockup from design */}
            <div className="relative inline-block mx-auto max-w-full rounded-2xl bg-white p-3 shadow-2xl rotate-[-1deg] border border-neutral-200">
              <img
                alt="Happy Birthday Modi"
                className="mx-auto rounded-lg max-h-[380px] w-full object-cover shadow-inner floating-image"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ4jhLYuiSsRdG30Ie_m1N32_Hy9F5p4Fo-wgieT_HNR8AxBTv5RDO9F8xFuedKGe2RAp0BO9lA8tr915GVGZ8dkqLFVECDqOLwwIo_5zydsuCIKLjsAda1bPoNf51Euy8AP8T0nVMPpuIRv4W3uLoSAFRPVcBaQiZnBTB3LpcW7uijvfC8a6NpJRHqBF9xbE8c4MMLG5FvRt_PtV4Folz7_lFoWJWQVmfk-hgqwAxa3MO_OC8IN6R5F6z67H02PRFMug"
              />
              {/* Cute heart stickers */}
              <div className="absolute top-3 left-4 washi-tape-yellow w-24 h-6 rotate-[-12deg]" />
              <div className="absolute bottom-6 right-6 flex items-center gap-1.5 p-2 rounded-lg bg-red-100 text-red-700 shadow border border-red-200 font-bold font-mono text-xs rotate-[5deg] z-10 uppercase">
                👑 Birthday Queen !
              </div>
            </div>

            <div className="absolute -bottom-6 right-1/4 doodle-float" style={{ animationDelay: '1.5s' }}>
              <span className="material-symbols-outlined text-tertiary text-5xl">
                star
              </span>
            </div>
          </header>

          {/* Interactive Memories Controls - Clip & Filter Tabs */}
          <div className="bg-surface/90 dark:bg-surface-container/90 backdrop-blur border-2 border-primary/20 dark:border-primary/10 rounded-2xl p-4 sm:p-6 mb-12 shadow-md max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left w-full md:w-auto">
              <h3 className="font-headline text-lg font-bold text-primary flex items-center gap-1">
                <Sparkles size={18} className="text-amber-500" /> Relive Every Candid Second
              </h3>
              <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
                Filter memories or pin a fresh memory of your own!
              </p>
            </div>

            {/* Polaroid category selector tabs */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto justify-start md:justify-end">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all border ${
                    activeCategory === cat
                      ? 'bg-primary text-on-primary border-primary font-bold font-mono uppercase text-[11px] shadow'
                      : 'bg-surface-container-low text-on-surface hover:bg-primary-container/20 border-outline-variant/30 font-medium'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick action add memory */}
            <button
              onClick={() => setShowAddMemory(true)}
              className="w-full md:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-headline font-bold text-sm shadow-[0_4px_0_0_#6f3157] hover:shadow-[0_1px_0_0_#6f3157] hover:translate-y-[3px] active:scale-95 transition-all"
            >
              <Plus size={16} /> Clip Memory
            </button>
          </div>

          {/* ACTIVE CLOTHESLINE GRAPHICS */}
          <div className="relative py-12">
            
            {/* Simulated Clothesline Cord Pattern */}
            <div className="string-line" />

            {/* List memories dynamically pinned to string lines */}
            <div className="flex flex-wrap justify-around gap-y-16 gap-x-10 min-h-[420px] pt-12 relative z-10 transition-all duration-300">
              <AnimatePresence mode="popayout">
                {filteredMemories.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full text-center py-16 bg-white/20 dark:bg-black/10 rounded-2xl border-4 border-dashed border-outline-variant/40"
                  >
                    <p className="text-lg font-bold text-on-surface">No memories pinned under "{activeCategory}" tag!</p>
                    <button
                      onClick={() => setActiveCategory('All')}
                      className="mt-2 text-sm text-primary underline font-bold"
                    >
                      Show All Memories Instead
                    </button>
                  </motion.div>
                ) : (
                  filteredMemories.map((mem) => {
                    return (
                      <motion.div
                        key={mem.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedMemory(mem)}
                        style={{ transform: `rotate(${mem.rotation}deg)` }}
                        className="polaroid-card relative bg-white text-neutral-800 p-3.5 pb-10 rounded shadow-xl border border-neutral-200/50 max-w-[250px] w-full"
                      >
                        {/* Interactive Delete custom memories badge */}
                        {mem.id.startsWith('custom-') && (
                          <button
                            onClick={(e) => handleDeleteMemory(mem.id, e)}
                            className="absolute -top-2.5 -right-2.5 bg-red-100 hover:bg-red-500 hover:text-white text-red-700 p-1.5 rounded-full border border-red-300 shadow z-50 transition-all"
                            title="Delete memory block"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}

                        {/* Top washi adhesive overlay strip */}
                        <div className="absolute -top-3 left-1/4 washi-tape w-16 h-5.5 rotate-[-12deg] z-10" />

                        {/* Traditional peg clip in row 1 elements */}
                        {mem.id === 'therapy-2' ? (
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                            <div className="w-6 h-6 bg-neutral-800/90 text-white rounded text-[8px] font-mono font-bold flex items-center justify-center uppercase tracking-widest shadow-md">
                              CLIP
                            </div>
                            <div className="w-1.5 h-3 bg-neutral-500/30 rounded" />
                          </div>
                        ) : null}

                        {/* Liked heart marker overlay */}
                        {mem.liked && (
                          <div className="absolute top-2 right-2 z-20 bg-rose-50 text-rose-500 w-7 h-7 rounded-full flex items-center justify-center shadow border border-rose-100">
                            <Heart size={14} fill="currentColor" />
                          </div>
                        )}

                        {/* Custom Polaroid photo */}
                        <div className="overflow-hidden bg-neutral-200 rounded aspect-[4/5] object-cover relative group select-none">
                          <img
                            src={mem.imageUrl}
                            alt={mem.caption}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Category Label */}
                        <div className="mt-3.5 flex items-center justify-between">
                          <span className="text-[9px] font-mono uppercase bg-neutral-100 text-neutral-500 font-bold px-1.5 py-0.5 rounded">
                            {mem.category}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400">
                            {mem.createdAt}
                          </span>
                        </div>

                        {/* Polaroid hand-written caption block */}
                        <p className="font-mono text-xs text-center text-neutral-700 font-bold mt-2 truncate max-w-full">
                          {mem.caption}
                        </p>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* LARGE PHOTO COLLAGE SLAY STATEMENT (Exactly matching design) */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-20 relative">
            <div className="absolute -top-10 left-10 hidden md:block opacity-10">
              <span className="material-symbols-outlined text-[180px] text-primary">
                auto_stories
              </span>
            </div>

            {/* Left polaroid frame - Sourced as "Pure joy caught on tape" (Row 2 design image) */}
            <div className="md:col-span-4 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 0 }}
                style={{ rotate: '2.5deg' }}
                onClick={() => setSelectedMemory(memories[2] || INITIAL_MEMORIES[2])}
                className="polaroid-card bg-white text-neutral-800 p-4 pb-10 shadow-2xl rounded border border-neutral-100 max-w-[270px] w-full relative"
              >
                <div className="absolute -top-4 right-6 washi-tape-yellow w-24 h-7 rotate-[4deg] z-10" />
                <img
                  alt="Pure joy"
                  className="w-full h-64 object-cover rounded shadow-inner"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC52RLae-yOnXlwCJhvjVbl52COU8W96SgapzvaCD10fXRpXsKsUZBAlULYm5EGvT0DBrQ2JRtROYPTavPxXzigWhLl1JXUEQess6EWdNZzkcuKMPTwxDCpM5-YiKUXZHZvsJ1QgGk8eNJWhRI175EYUSKTpYpv1nIbgj45hxpPcW-spmzL4M9cC54Cb5tU8Dw4PvLEK-RAVF4RQvPbLq-c34GoLMa7ILiwWyIn9Yr8Yy5cKepeto75pjEFMDL-gKwSWx4"
                  referrerPolicy="no-referrer"
                />
                <p className="font-mono text-xs mt-3.5 text-neutral-600 font-bold">Pure joy caught on tape</p>
              </motion.div>
            </div>

            {/* Large design statement font block */}
            <div className="md:col-span-4 flex items-center justify-center relative select-none">
              <div className="rotate-[-2.5deg] scale-105 p-3 text-center">
                <p className="font-headline text-5xl md:text-6xl text-primary font-extrabold leading-[0.95] tracking-tighter drop-shadow-[0_4px_6px_rgba(138,72,111,0.15)] animate-bounce" style={{ animationDuration: '4.5s' }}>
                  GURL I LOVE YOU AND YOU SLAY
                </p>
              </div>
            </div>

            {/* Right polaroid frame - Sourced as "Favorite Memories #2024" (Row 2 design image) */}
            <div className="md:col-span-4 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 0 }}
                style={{ rotate: '-1.5deg' }}
                onClick={() => setSelectedMemory(memories[3] || INITIAL_MEMORIES[3])}
                className="polaroid-card bg-white text-neutral-800 p-4 pb-12 shadow-2xl rounded border border-neutral-100 max-w-[270px] w-full relative z-20"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 washi-tape w-24 h-6 opacity-80 z-10" />
                <img
                  alt="Favorite Memories"
                  className="w-full h-72 object-cover rounded shadow-inner animate-pulse"
                  style={{ animationDuration: '6s' }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFJtSQGVNzabRRAtn5bKSqeSh6PeM-7j1LXZXi0nf7UfZUkOf9i4vRykmxmnWvJmQ-Y4TgmqpnOpk_QcoXfYY4_aztQ9sh3gL6JvAy_KdLjELrjHmzH1d_AB6AB4SwvMRX4_3OAXtvZyq1VFEGXhdrWJdq09K856f0P_v-OSgbPsiLcR94mml-d-ZIQsdYvT2Gv05q9cPs2iJ9plT9s3_ZFT8iK_xRWzoWEYe08JmrCaDjupfibmbwrvgT4_4ix8brcwU"
                  referrerPolicy="no-referrer"
                />
                <p className="font-mono text-xs mt-4 italic text-neutral-600 font-bold">Favorite Memories #2024</p>
              </motion.div>
            </div>
          </section>

          {/* LOWER SCHOOL GALLERY SECTION (Exactly matching design row 3) */}
          <section className="relative min-h-[460px] pt-12">
            <div className="string-line" style={{ top: '25px' }} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 items-start justify-items-center">
              
              {/* Grid block cluster of school photographs */}
              <div className="rotate-[-2deg] bg-surface-container dark:bg-surface-container-low p-4 rounded-2xl shadow-inner border border-dashed border-outline-variant/60 max-w-[340px] w-full flex flex-col gap-3">
                <p className="text-[11px] font-mono text-center uppercase tracking-widest text-on-surface-variant font-bold">
                  🎒 School Days Polaroid Cluster
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {GRID_SAMPLES.map((src, i) => (
                    <motion.div
                      whileHover={{ scale: 1.08, zIndex: 10 }}
                      key={src + i}
                      className="relative rounded-lg overflow-hidden border border-neutral-200 shadow-sm aspect-square bg-neutral-100 cursor-pointer"
                      onClick={() => setSelectedMemory({
                        id: `grid-${i}`,
                        imageUrl: src,
                        caption: `Unified Memory #${i + 1}`,
                        category: 'School',
                        createdAt: '2023-09-12',
                        rotation: 0,
                        liked: false,
                        detailedDescription: 'One of our mini snap grid collections! In school, everything was louder: the gossip, the bells, the food run, and the laughs!'
                      })}
                    >
                      <img src={src} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Middle Skinny Card (Extra tilted portrait) */}
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{ rotate: '4deg' }}
                  onClick={() => setSelectedMemory({
                    id: 'grid-extra',
                    imageUrl: EXTRA_TILT_PORTRAIT,
                    caption: 'Mirror magic!',
                    category: 'Besties',
                    createdAt: '2024-02-18',
                    rotation: 4,
                    liked: false,
                    detailedDescription: 'Perfect matching outfit moments with Modi. Gurl, we literally look like absolute stars in this clicks! Super gorgeous memory!'
                  })}
                  className="polaroid-card bg-white text-neutral-800 p-3 pb-8 shadow-xl max-w-[210px] w-full relative"
                >
                  <div className="absolute -top-3 left-1/4 washi-tape-yellow w-14 h-5 rotate-[-8deg] z-10" />
                  <img
                    src={EXTRA_TILT_PORTRAIT}
                    className="w-full h-64 object-cover rounded"
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-[10px] font-mono text-center mt-3 text-neutral-400">candid mirror snap</p>
                </motion.div>
              </div>

              {/* Right polarity tag - miss school */}
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{ rotate: '-3deg' }}
                  onClick={() => setSelectedMemory(memories[4] || INITIAL_MEMORIES[4])}
                  className="polaroid-card bg-white text-neutral-800 p-3.5 pb-10 shadow-xl max-w-[260px] w-full relative"
                >
                  <div className="absolute -top-3 right-1/4 washi-tape w-16 h-5 rotate-[12deg] z-10" />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfl79YrvMSMBdFDmFvy-gKzURXrilKEZWDMB89y4u5aZaOoOd4hOvW02Anhtoxt1tAXA4in238sNAMlOFRLyG7iUOeR3M8sxEmK2fJHeyM0LMykBddL5u34S9Z69MisuPHcP0uZ5JUF0DOWwfyMQheWCSr4rH-PwfKHVUOnLIl_HNswfLuXR8C4gZIIMkQmhVKo0XgW2GMk2oT2ry40gHMZdv6kuxOqrznxASkx2CLiYKifbgGz-yQkkrhZsb4zIIgvHk"
                    className="w-full h-56 object-cover rounded shadow-inner"
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                  <p className="font-mono text-xs text-center mt-3.5 text-neutral-700 font-bold">miss school</p>
                </motion.div>
              </div>

            </div>
          </section>

          {/* TRIPLE COLLAGE (Exactly matching design bottom row of 3) */}
          <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-20 justify-items-center">
            
            {/* Background design elements watermark */}
            <div className="absolute -z-10 inset-0 flex items-center justify-center opacity-5 pointer-events-none text-neutral-900 dark:text-white">
              <span className="material-symbols-outlined text-[380px]">
                celebration
              </span>
            </div>

            {TRIPLE_COLLAGE_IMAGES.map((src, idx) => {
              const rotationAngle = idx === 0 ? -5 : idx === 1 ? 1 : 4;
              const topOffset = idx === 0 ? 'mt-8' : idx === 1 ? 'mt-0' : 'mt-12';
              return (
                <motion.div
                  key={src + idx}
                  whileHover={{ scale: 1.05 }}
                  style={{ rotate: `${rotationAngle}deg` }}
                  onClick={() => setSelectedMemory({
                    id: `collage-${idx}`,
                    imageUrl: src,
                    caption: idx === 0 ? 'Candid Laughs' : idx === 1 ? 'Besties Walk 🚶‍♀️' : 'Pure Slayage',
                    category: 'Besties',
                    createdAt: '2024-04-12',
                    rotation: rotationAngle,
                    liked: false,
                    detailedDescription: 'One of the beautiful visual collections that represent how happy we are! Hand-picked for the ultimate scrapbook tribute.'
                  })}
                  className={`polaroid-card bg-white text-neutral-800 p-2.5 pb-8 shadow-2xl rounded border border-neutral-100 max-w-[250px] w-full ${topOffset}`}
                >
                  {idx === 0 && <div className="absolute -top-3 left-4 washi-tape-yellow w-14 h-5 rotate-[-5deg]" />}
                  {idx === 2 && <div className="absolute -top-3 right-6 washi-tape w-16 h-5.5 rotate-[8deg]" />}
                  <img
                    alt=""
                    className="w-full aspect-[2/3] object-cover rounded shadow-inner"
                    src={src}
                    referrerPolicy="no-referrer"
                  />
                  <p className="font-mono text-[10px] text-center mt-3 text-neutral-400">Tribute snapshot #{idx + 1}</p>
                </motion.div>
              );
            })}
          </section>

          {/* INTERACTIVE SEND VIRTUAL HUG FORM PANEL (Satisfies UI and animations) */}
          <div className="mt-24 bg-surface dark:bg-surface-container paper-texture border-4 border-primary dark:border-primary/50 rounded-2xl p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto relative overflow-hidden" id="virtual-hug-wall">
            <div className="absolute top-12 -right-10 text-[100px] opacity-[0.03] select-none text-primary pointer-events-none">
              💖
            </div>

            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase bg-primary-container/50 dark:bg-primary-container/20 text-primary dark:text-pink-300 px-3 py-1 rounded-full font-bold">
                Guest Wish Book & Gift Box
              </span>
              <h3 className="font-headline text-3xl font-extrabold text-primary mt-2">
                Send Modi a Virtual Hug
              </h3>
              <p className="text-sm text-on-surface-variant font-body leading-relaxed max-w-md mx-auto mt-1">
                Post your sweet birthday wishes, pin a cozy gift, and trigger interactive sparkles on her screen!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSendHug} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-on-surface-variant uppercase mb-1 font-bold">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshi 🌸"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-surface-container-low border border-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface font-body"
                />
              </div>

              {/* Gift Item Picker */}
              <div>
                <label className="block text-xs font-mono text-on-surface-variant uppercase mb-2 font-bold flex items-center gap-1">
                  <Gift size={13} className="text-primary" /> Choose a cozy gift to send:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {GIFT_CATALOG.map((g) => (
                    <button
                      type="button"
                      key={g.type}
                      onClick={() => setSelectedGiftType(g.type as GiftType)}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        selectedGiftType === g.type
                          ? 'bg-primary text-on-primary border-primary scale-102 font-bold shadow-md'
                          : 'bg-surface-container-low hover:bg-primary-container/20 border-outline-variant/35 text-on-surface'
                      }`}
                    >
                      <span className="text-2xl">{g.emoji}</span>
                      <span className="text-[10px] font-mono leading-none tracking-tight">{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-on-surface-variant uppercase mb-1 font-bold">
                  Your Letter / Birthday Message
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Happy birthday Modi! You are the absolute queen of hearts. Slay today and forever and remember I am always here to hug you tightly... 💕"
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-surface-container-low border border-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface font-body"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary font-headline text-lg py-3.5 rounded-xl shadow-[0_6px_0_0_#6f3157] hover:shadow-[0_2px_0_0_#6f3157] hover:translate-y-[4px] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Send virtual warm memories!
                </button>
              </div>
            </form>

            {/* Doodles inside triggers */}
            <div className="mt-8 flex justify-center gap-4 text-primary">
              <span className="material-symbols-outlined doodle-float text-3xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <span className="material-symbols-outlined doodle-float text-3xl select-none" style={{ animationDelay: '1s' }}>auto_fix_high</span>
              <span className="material-symbols-outlined doodle-float text-3xl select-none" style={{ animationDelay: '1.8s' }}>celebration</span>
            </div>
          </div>

          {/* Live letter desk shelf showing previous letters to display dynamically */}
          <div className="mt-16 max-w-2xl mx-auto space-y-4">
            <h4 className="font-headline text-lg font-bold text-center text-primary flex items-center justify-center gap-1.5 uppercase font-mono tracking-wider">
              💖 Letters Inbox ({hugLetters.length})
            </h4>

            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              {hugLetters.map((letter) => {
                const giftObj = GIFT_CATALOG.find((g) => g.type === letter.giftType);
                return (
                  <motion.div
                    key={letter.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-surface dark:bg-surface-container paper-texture rounded-2xl border border-outline-variant/30 shadow-md flex items-start gap-3 justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 p-1 font-bold ${giftObj ? giftObj.bg : 'bg-pink-100'}`}>
                        {giftObj ? giftObj.emoji : '🤗'}
                      </div>
                      
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <p className="font-headline font-bold text-primary">{letter.sender}</p>
                          <span className="text-[9px] font-mono uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-500 px-1.5 py-0.5 rounded">
                            {giftObj ? g_label(giftObj.label) : 'Hug'}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface/90 italic leading-relaxed mt-1 font-mono">
                          "{letter.message}"
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteLetter(letter.id)}
                      className="text-on-surface-variant hover:text-red-500 rounded p-1 transition-colors shrink-0"
                      title="Remove letter safely"
                    >
                      <Trash2 size={13} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Footer block matching design */}
      <footer className="w-full stitch-yellow-section dark:bg-neutral-900 border-t border-dashed border-outline-variant/40 py-16 transition-colors duration-300">
        <div className="flex flex-col items-center gap-6 px-4 text-center max-w-4xl mx-auto">
          <h3 className="font-headline text-3xl text-primary font-bold">Modi's Scrapbook</h3>
          
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <a href="#welcome" className="font-mono text-xs text-on-surface-variant hover:text-primary transition-colors hover:scale-103">
              Our Story
            </a>
            <a href="#scrapbook-content" className="font-mono text-xs text-primary underline font-bold hover:scale-103">
              The Gallery
            </a>
            <a href="#virtual-hug-wall" className="font-mono text-xs text-on-surface-variant hover:text-primary transition-colors hover:scale-103">
              Send Love
            </a>
          </div>

          <p className="font-mono text-xs text-on-surface-variant/75 mt-4">
            Hand-crafted with love for Modi © 2024
          </p>
        </div>
      </footer>

      {/* RENDER MODAL DIALOGS WITH ANIMATION */}
      <AnimatePresence>
        {selectedMemory && (
          <MemoryModal
            memory={selectedMemory}
            onClose={() => setSelectedMemory(null)}
            onLikeToggle={handleLikeToggle}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddMemory && (
          <AddMemoryDialog
            onClose={() => setShowAddMemory(false)}
            onAddMemory={(newMem) => {
              setMemories((prev) => [newMem, ...prev]);
              setShowAddMemory(false);
              showToast(`Memory pinned to "${newMem.category}" section! ✨`);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// Helpers for gift labels
function g_label(fullLabel: string): string {
  return fullLabel.replace('Warm ', '').replace('Sweet ', '').replace('Nostalgic ', '').replace('Birthday ', '').replace('Cozy ', '').replace('Wish Upon a ', '');
}
