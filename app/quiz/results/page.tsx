"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QuizClient, { type Profile } from "../QuizClient";

type SavedProfile = Profile;

export default function QuizResultsPage() {
  const [profile, setProfile] = useState<SavedProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("quizProfile");
    if (raw) {
      try {
        setProfile(JSON.parse(raw));
      } catch {}
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!profile) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
        <p className="text-5xl mb-6">🗺️</p>
        <h1 className="text-2xl font-black text-[#0D0D0D] mb-3 text-center">No matches yet</h1>
        <p className="text-gray-400 text-sm mb-8 text-center max-w-xs">
          Take the 2-minute quiz to find your best immigration destinations.
        </p>
        <Link
          href="/"
          className="px-8 py-4 bg-[#0D0D0D] hover:bg-[#FF4757] text-white font-black text-sm rounded-2xl transition-colors"
        >
          Take the quiz →
        </Link>
      </main>
    );
  }

  return <QuizClient initialProfile={profile} jumpToResults />;
}
