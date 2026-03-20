"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ContentEntryKey } from "@/lib/content";
import { siteCopy } from "@/lib/site-copy";

type AudioManifestEntry = {
  duration: number;
  size: number;
};

type PlaybackState = "idle" | "loading" | "playing" | "paused";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer({
  locale,
  contentKey,
}: {
  locale: Locale;
  contentKey: ContentEntryKey;
}) {
  const audioFileName = `${contentKey.replace(/\//g, "--")}--${locale}.mp3`;
  const audioUrl = `/audio/${audioFileName}`;
  const storageKey = `audio-pos--${contentKey}--${locale}`;

  const audioRef = useRef<HTMLAudioElement>(null);
  const inlineRef = useRef<HTMLDivElement>(null);
  const shouldAutoPlayRef = useRef(false);

  const [available, setAvailable] = useState<boolean | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [state, setState] = useState<PlaybackState>("idle");
  const [speed, setSpeed] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const [savedPosition, setSavedPosition] = useState(0);

  const copy = siteCopy[locale].audioPlayer;

  // Check manifest for availability, duration, and restore saved position
  useEffect(() => {
    let pos = 0;
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const p = parseFloat(saved);
        if (!isNaN(p) && p > 0) pos = p;
      }
    } catch {
      // sessionStorage unavailable
    }

    fetch("/audio/manifest.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((manifest: Record<string, AudioManifestEntry> | null) => {
        if (manifest && manifest[audioFileName]) {
          setAvailable(true);
          setDuration(manifest[audioFileName].duration);
          if (pos > 0) setSavedPosition(pos);
        } else {
          setAvailable(false);
        }
      })
      .catch(() => setAvailable(false));
  }, [audioFileName, storageKey]);

  // Save position to sessionStorage during playback
  useEffect(() => {
    if (state === "playing" || state === "paused") {
      try {
        sessionStorage.setItem(storageKey, currentTime.toString());
      } catch {
        // ignore
      }
    }
  }, [currentTime, storageKey, state]);

  // IntersectionObserver for sticky bottom bar
  useEffect(() => {
    const el = inlineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      if (savedPosition > 0 && savedPosition < audioRef.current.duration) {
        audioRef.current.currentTime = savedPosition;
      }
    }
  }, [savedPosition]);

  const handleEnded = useCallback(() => {
    setState("idle");
    setCurrentTime(0);
    setSavedPosition(0);
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }, [storageKey]);

  const handleCanPlay = useCallback(() => {
    if (shouldAutoPlayRef.current) {
      shouldAutoPlayRef.current = false;
      audioRef.current?.play().catch(() => setState("paused"));
      setState("playing");
    }
  }, []);

  const play = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed;

    if (audioRef.current.readyState >= 3) {
      audioRef.current.play().catch(() => setState("paused"));
      setState("playing");
    } else {
      shouldAutoPlayRef.current = true;
      audioRef.current.load();
      setState("loading");
    }
  }, [speed]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState("paused");
  }, []);

  const togglePlay = useCallback(() => {
    if (state === "playing") {
      pause();
    } else {
      play();
    }
  }, [state, play, pause]);

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      const newTime = ratio * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [duration],
  );

  const cycleSpeed = useCallback(() => {
    const speeds = [1, 1.5, 2];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    if (audioRef.current) {
      audioRef.current.playbackRate = next;
    }
  }, [speed]);

  if (available === null || available === false) return null;

  const hasSavedPosition = savedPosition > 0 && state === "idle";
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isActive =
    state === "playing" || state === "paused" || state === "loading";

  const playerBar = (compact: boolean) => (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      <button
        onClick={togglePlay}
        className="shrink-0 cursor-pointer"
        aria-label={state === "playing" ? copy.pause : copy.play}
      >
        {state === "playing" ? (
          <svg
            className={`${compact ? "w-5 h-5" : "w-8 h-8"} text-amber-600`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
          </svg>
        ) : (
          <svg
            className={`${compact ? "w-5 h-5" : "w-8 h-8"} text-amber-600`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div
        className={`flex-1 ${compact ? "h-1.5" : "h-2"} bg-stone-200 rounded-full cursor-pointer relative`}
        onClick={seek}
        role="progressbar"
        aria-valuenow={currentTime}
        aria-valuemax={duration}
      >
        <div
          className="absolute inset-y-0 left-0 bg-amber-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span
        className={`text-stone-500 tabular-nums shrink-0 ${compact ? "text-xs" : "text-sm"}`}
      >
        {formatTime(currentTime)}
        {!compact && ` / ${formatTime(duration)}`}
      </span>

      {!compact && (
        <button
          onClick={cycleSpeed}
          className="text-xs font-medium px-2 py-1 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors shrink-0 cursor-pointer"
        >
          {speed}x
        </button>
      )}
    </div>
  );

  return (
    <div ref={inlineRef} className="not-prose">
      {/* Idle state */}
      {state === "idle" && (
        <div
          className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 cursor-pointer hover:border-stone-300 transition-colors"
          onClick={play}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && play()}
        >
          <svg
            className="w-5 h-5 text-amber-600 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          <span className="text-stone-700 text-sm font-medium">
            {hasSavedPosition ? copy.resume : copy.listen}
          </span>
          {duration > 0 && (
            <span className="text-stone-400 text-sm ml-auto">
              {hasSavedPosition
                ? `${formatTime(savedPosition)} / ${formatTime(duration)}`
                : `~${Math.ceil(duration / 60)} ${copy.minutes}`}
            </span>
          )}
          <svg
            className="w-5 h-5 text-amber-600 shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}

      {/* Active state (loading / playing / paused) */}
      {isActive && (
        <div className="bg-amber-50/50 border border-amber-200 rounded-lg px-4 py-3">
          {state === "loading" ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
              </div>
              <span className="text-stone-500 text-sm">
                {copy.listen}...
              </span>
            </div>
          ) : (
            playerBar(false)
          )}
        </div>
      )}

      {/* Sticky bottom bar — visible when inline player scrolls out of view */}
      {showSticky && (state === "playing" || state === "paused") && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-stone-200 px-4 py-2 shadow-lg">
          <div className="max-w-4xl mx-auto">
            {playerBar(true)}
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src={audioUrl}
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onCanPlay={handleCanPlay}
      />
    </div>
  );
}
