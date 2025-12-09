"use client"

import { useEffect, useRef, useState, memo, useCallback } from "react"

interface Point {
  x: number
  y: number
  opacity: number
  size: number
  id: number
}

export const StarTrailCursor = memo(function StarTrailCursor() {
  const [points, setPoints] = useState<Point[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const idCounter = useRef(0)
  const lastScrollY = useRef(0)
  const trailPoints = useRef<Point[]>([])
  const rafId = useRef<number>()

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
    setIsVisible(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        rafId.current = requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollDelta = Math.abs(currentScrollY - lastScrollY.current)

          if (scrollDelta > 5) {
            // 提高阈值减少粒子生成频率
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercent = currentScrollY / scrollHeight
            const trailY = scrollPercent * window.innerHeight

            const newPoint: Point = {
              x: window.innerWidth - 8,
              y: trailY,
              opacity: 0.6,
              size: 1 + Math.random(),
              id: idCounter.current++,
            }

            trailPoints.current = [...trailPoints.current, newPoint].slice(-20)
            setPoints([...trailPoints.current])
          }

          lastScrollY.current = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    const fadeInterval = setInterval(() => {
      trailPoints.current = trailPoints.current
        .map((p) => ({ ...p, opacity: p.opacity * 0.9 }))
        .filter((p) => p.opacity > 0.08)
      setPoints([...trailPoints.current])
    }, 80)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", handleScroll)
      clearInterval(fadeInterval)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <>
      {/* 光球指针 - 添加 will-change */}
      <div
        className="pointer-events-none fixed z-[9999] transition-opacity duration-300 will-change-transform"
        style={{
          left: mousePos.x - 12,
          top: mousePos.y - 12,
          opacity: isVisible ? 1 : 0,
          transform: "translateZ(0)", // 强制 GPU 加速
        }}
      >
        <div className="relative h-6 w-6">
          <div className="absolute inset-0 rounded-full bg-white/10 blur-md" />
          <div className="absolute inset-1 rounded-full bg-white/20 blur-sm" />
          <div className="absolute inset-2 rounded-full bg-white/40" />
        </div>
      </div>

      {/* 星轨粒子 */}
      <div className="pointer-events-none fixed inset-0 z-[9998]">
        {points.map((point) => (
          <div
            key={point.id}
            className="absolute rounded-full bg-white will-change-transform"
            style={{
              left: point.x,
              top: point.y,
              width: point.size,
              height: point.size,
              opacity: point.opacity,
              transform: "translateZ(0)",
              boxShadow: `0 0 ${point.size * 2}px ${point.size}px rgba(255,255,255,${point.opacity * 0.5})`,
            }}
          />
        ))}
      </div>
    </>
  )
})
