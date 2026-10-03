"use client"

import { useState } from "react"
import Link from "next/link"
import { Play } from "lucide-react"

const BADGES = ["25+ PUNE CAMPUSES", "REAL FEES & CUTOFFS", "FREE COUNSELLING"]

// Replace with your actual YouTube video ID
const YOUTUBE_ID = "dQw4w9WgXcQ"

export default function CampusExperienceSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div>
            {/* Tagline */}
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-0.5" style={{ backgroundColor: "var(--color-accent)" }} />
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "var(--color-accent)" }}
              >
                Pehle Dekho. Samjho. Phir Choose Karo.
              </span>
            </div>

            <h2
              className="font-extrabold leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#0B1F3A" }}
            >
              Inside the CampusLelo<br />Experience.
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6 max-w-lg">
              Campus walkthroughs, honest placement talk and admission guidance from
              counsellors who do this every day — see what Pune actually looks like
              before you pick a college.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {BADGES.map(b => (
                <span
                  key={b}
                  className="px-4 py-2 rounded-full text-xs font-bold tracking-wide border"
                  style={{ borderColor: "#E5E7EB", color: "#374151" }}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/counselling"
                className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-xl text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Get Free Counselling →
              </Link>
              <Link
                href="/colleges"
                className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Browse Colleges
              </Link>
            </div>
          </div>

          {/* Right — video */}
          <div className="relative">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "16/9",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              }}
            >
              {playing ? (
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`}
                  title="CampusLelo Experience"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                    alt="CampusLelo Experience Video"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30" />
                  {/* Play button */}
                  <button
                    onClick={() => setPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                    aria-label="Play video"
                  >
                    <span
                      className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: "#FF0000" }}
                    >
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
