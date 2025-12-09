"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

// 404数字的点阵数据
const digit4 = [
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
]

const digit0 = [
  [0, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 1, 1, 0],
]

interface Particle {
  id: number
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  opacity: number
  delay: number
  driftX: number
  driftY: number
  driftSpeed: number
}

function createParticles(): Particle[] {
  const particles: Particle[] = []
  let id = 0
  const digits = [digit4, digit0, digit4]
  const digitWidth = 7
  const digitSpacing = 2
  const totalWidth = digits.length * digitWidth + (digits.length - 1) * digitSpacing

  digits.forEach((digit, digitIndex) => {
    const offsetX = digitIndex * (digitWidth + digitSpacing) - totalWidth / 2

    digit.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          // 每个点位生成1-3个粒子
          const count = Math.floor(Math.random() * 2) + 1
          for (let i = 0; i < count; i++) {
            particles.push({
              id: id++,
              x: (offsetX + colIndex) * 12,
              y: (rowIndex - 3.5) * 12,
              baseX: (offsetX + colIndex) * 12,
              baseY: (rowIndex - 3.5) * 12,
              size: Math.random() * 3 + 1.5,
              opacity: Math.random() * 0.5 + 0.3,
              delay: Math.random() * 2,
              driftX: (Math.random() - 0.5) * 100,
              driftY: (Math.random() - 0.5) * 100,
              driftSpeed: Math.random() * 20 + 15,
            })
          }
        }
      })
    })
  })

  return particles
}

export default function NotFound() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    setParticles(createParticles())
    setMounted(true)

    const interval = setInterval(() => {
      setTime((t) => t + 0.05)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* 背景星尘 */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* 柔和的背景光晕 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* 404 破碎星座 */}
      <div className="relative w-full h-64 flex items-center justify-center">
        <svg viewBox="-150 -60 300 120" className="w-full max-w-2xl h-full" style={{ overflow: "visible" }}>
          {/* 发光滤镜 */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 粒子 - 飘散的星座碎片 */}
          {particles.map((particle) => {
            const progress = Math.sin(time * 0.3 + particle.delay) * 0.5 + 0.5
            const driftProgress = (time * 0.02 + particle.delay * 0.1) % 1
            const x = particle.baseX + particle.driftX * driftProgress * 0.3
            const y = particle.baseY + particle.driftY * driftProgress * 0.3
            const opacity = particle.opacity * (1 - driftProgress * 0.5) * (0.6 + progress * 0.4)

            return (
              <circle
                key={particle.id}
                cx={x}
                cy={y}
                r={particle.size * (0.8 + progress * 0.4)}
                fill={`rgba(255, 255, 255, ${opacity})`}
                filter="url(#glow)"
                style={{
                  transition: "all 0.1s ease-out",
                }}
              />
            )
          })}

          {/* 连接线 - 破碎的星座线 */}
          {particles.slice(0, 40).map((p1, i) => {
            const p2 = particles[(i + 7) % particles.length]
            if (!p2) return null
            const dist = Math.sqrt(Math.pow(p1.baseX - p2.baseX, 2) + Math.pow(p1.baseY - p2.baseY, 2))
            if (dist > 25 || dist < 8) return null

            const driftProgress1 = (time * 0.02 + p1.delay * 0.1) % 1
            const driftProgress2 = (time * 0.02 + p2.delay * 0.1) % 1
            const x1 = p1.baseX + p1.driftX * driftProgress1 * 0.3
            const y1 = p1.baseY + p1.driftY * driftProgress1 * 0.3
            const x2 = p2.baseX + p2.driftX * driftProgress2 * 0.3
            const y2 = p2.baseY + p2.driftY * driftProgress2 * 0.3
            const opacity = 0.1 * (1 - (driftProgress1 + driftProgress2) * 0.25)

            return (
              <line
                key={`line-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={`rgba(255, 255, 255, ${opacity})`}
                strokeWidth="0.3"
              />
            )
          })}
        </svg>
      </div>

      {/* 文字说明 */}
      <p
        className="text-white/30 text-xs tracking-[0.3em] uppercase mt-8 font-light"
        style={{
          animation: "fadeIn 2s ease-out forwards",
          animationDelay: "0.5s",
          opacity: 0,
        }}
      >
        你已抵达已知虚空的边缘
      </p>

      {/* 返回链接 */}
      <Link
        href="/"
        className="mt-24 relative group"
        style={{
          animation: "fadeIn 2s ease-out forwards",
          animationDelay: "1s",
          opacity: 0,
        }}
      >
        <span
          className="text-white/20 text-[10px] tracking-[0.2em] uppercase transition-all duration-700 group-hover:text-white/50"
          style={{
            animation: "pulse-return 3s ease-in-out infinite",
          }}
        >
          返回
        </span>
        {/* 微弱的光点装饰 */}
        <span
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-1 bg-white/20 rounded-full transition-all duration-700 group-hover:bg-white/50"
          style={{
            animation: "pulse-dot 2s ease-in-out infinite",
          }}
        />
      </Link>

      {/* 动画样式 */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes pulse-return {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes pulse-dot {
          0%, 100% { 
            opacity: 0.2;
            box-shadow: 0 0 4px 1px rgba(255,255,255,0.1);
          }
          50% { 
            opacity: 0.5;
            box-shadow: 0 0 8px 2px rgba(255,255,255,0.2);
          }
        }
      `}</style>
    </div>
  )
}
