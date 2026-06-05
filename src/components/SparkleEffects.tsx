import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export interface Sparkle {
  id: string;
  x: number;
  y: number;
  emoji: string;
  size: number;
  rotation: number;
}

interface SparkleEffectsProps {
  sparkles: Sparkle[];
  onRemove: (id: string) => void;
}

export default function SparkleEffects({ sparkles, onRemove }: SparkleEffectsProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{
              opacity: 1,
              scale: 0.2,
              x: sparkle.x,
              y: sparkle.y,
              rotate: 0,
            }}
            animate={{
              opacity: [1, 1, 0.8, 0],
              scale: [0.3, 1.2, 1, 0.6],
              x: sparkle.x + (Math.random() - 0.5) * 350,
              y: sparkle.y - 400 - Math.random() * 200,
              rotate: sparkle.rotation + (Math.random() - 0.5) * 180,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.2,
              ease: 'easeOut',
            }}
            onAnimationComplete={() => onRemove(sparkle.id)}
            style={{
              position: 'absolute',
              fontSize: sparkle.size,
              userSelect: 'none',
            }}
          >
            {sparkle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Generate sound box melodian / tune
export function playMusicBoxNote(freq: number, type: 'sine' | 'triangle' = 'triangle') {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 1.5);
  } catch (e) {
    // Audio unsupported or user interaction needed
  }
}

// Play happy birthday chords step by step
export function playHBDTune() {
  const notes = [
    261.63, 261.63, 293.66, 261.63, 349.23, 329.63, // happy birthday to you
    261.63, 261.63, 293.66, 261.63, 392.00, 349.23, // happy birthday to you
    261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, // happy birthday dear modi
    466.16, 466.16, 440.00, 349.23, 392.00, 349.23  // happy birthday to you
  ];

  const durations = [
    400, 400, 800, 800, 800, 1400,
    400, 400, 800, 800, 800, 1400,
    400, 400, 800, 800, 800, 800, 1200,
    400, 400, 800, 800, 800, 1400
  ];

  let time = 0;
  notes.forEach((note, index) => {
    setTimeout(() => {
      playMusicBoxNote(note, 'sine');
    }, time);
    time += durations[index] * 0.7; // Speed scale
  });
}
