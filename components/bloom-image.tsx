"use client"

import { useState, useEffect, memo } from "react"
import Image from "next/image"

interface BloomImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: "video" | "square" | "wide"
  priority?: boolean
}

export const BloomImage = memo(function BloomImage({
  src,
  alt,
  className = "",
  aspectRatio = "video",
  priority = false,
}: BloomImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const aspectRatioClass = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[21/9]",
  }[aspectRatio]

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setRevealed(true), 100)
      return () => clearTimeout(timer)
    }
  }, [loaded])

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} ${className}`}>
      {/* 深灰色占位符 */}
      <div className="absolute inset-0 bg-white/[0.03]" />

      {/* 占位符中心光点 */}
      {!revealed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" />
        </div>
      )}

      <div className="absolute inset-0">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          className={`object-cover transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />

        {/* 光绽遮罩 */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-[2500ms] ease-out ${
            revealed ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background: revealed
              ? "transparent"
              : `radial-gradient(circle at center, transparent 0%, rgba(5,5,5,0.3) 10%, rgba(5,5,5,0.7) 30%, rgba(5,5,5,0.95) 50%, rgb(5,5,5) 70%)`,
          }}
        />
      </div>

      {/* 光核效果 */}
      {loaded && !revealed && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="relative">
            <div className="w-3 h-3 bg-white rounded-full blur-[2px]" />
            <div className="absolute inset-0 w-3 h-3 bg-white/50 rounded-full blur-md animate-ping" />
            <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl" />
          </div>
        </div>
      )}

      {/* 永久晕影 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.3) 60%, rgba(5,5,5,0.6) 75%, rgba(5,5,5,0.85) 90%, rgb(5,5,5) 100%)`,
        }}
      />
    </div>
  )
})
