"use client"

import { useEffect, useState, memo } from "react"

export const SplashScreen = memo(function SplashScreen() {
  const [phase, setPhase] = useState<"visible" | "fading" | "hidden">("visible")

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), 1500)
    const hideTimer = setTimeout(() => setPhase("hidden"), 2500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (phase === "hidden") return null

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* 中心微光点 - 使用 will-change 优化动画 */}
      <div className="relative will-change-transform">
        {/* 主光点 */}
        <div className="w-2 h-2 bg-white rounded-full animate-pulse-slow shadow-glow" />

        <div className="absolute inset-0 -m-8">
          <div className="w-16 h-16 border border-white/10 rounded-full animate-ripple-1 will-change-transform" />
        </div>
        <div className="absolute inset-0 -m-12">
          <div className="w-24 h-24 border border-white/5 rounded-full animate-ripple-2 will-change-transform" />
        </div>

        <div className="absolute inset-0 -m-32 pointer-events-none">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i * 60 * Math.PI) / 180
            const radius = 70
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full will-change-transform"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(${x}px, ${y}px)`,
                  animation: `particle-float ${3 + i * 0.3}s ease-in-out ${i * 0.2}s infinite alternate`,
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
})
