"use client"

import { useEffect, useState, memo, useMemo } from "react"

export const HeroSection = memo(function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const callback = () => setIsVisible(true)
    if ("requestIdleCallback" in window) {
      requestIdleCallback(callback, { timeout: 100 })
    } else {
      setTimeout(callback, 50)
    }
  }, [])

  // 背景星星
  const stars = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        cx: 5 + Math.random() * 90,
        cy: 5 + Math.random() * 60,
        r: Math.random() > 0.7 ? 1.2 : Math.random() > 0.4 ? 0.8 : 0.5,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      })),
    [],
  )

  return (
    <section className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* 极简小王子 SVG */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-[3000ms] ease-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <svg
          viewBox="0 0 400 500"
          className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 闪烁的星星 */}
          {stars.map((star) => (
            <circle
              key={star.id}
              cx={`${star.cx}%`}
              cy={`${star.cy}%`}
              r={star.r}
              fill="white"
              className="animate-star-twinkle"
              style={{
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}

          {/* 小星球 - 简化为一个带纹理的圆 */}
          <g className="animate-planet-float">
            {/* 星球主体 */}
            <ellipse cx="200" cy="380" rx="85" ry="35" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
            {/* 星球表面纹理 - 极简线条 */}
            <path
              d="M125 375 Q160 365, 200 368 Q240 370, 275 378"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M140 385 Q170 390, 200 388 Q230 386, 260 382"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
              fill="none"
            />
            {/* 一朵小玫瑰 - 极简三笔 */}
            <g className="animate-rose-sway" style={{ transformOrigin: "155px 365px" }}>
              <line x1="155" y1="365" x2="155" y2="348" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" />
              <circle cx="155" cy="345" r="4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
              <path d="M152 346 Q155 342, 158 346" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none" />
            </g>
          </g>

          {/* 小王子 - 极简线条人物 */}
          <g className="animate-prince-breathe" style={{ transformOrigin: "220px 340px" }}>
            {/* 头部 - 简单的圆 */}
            <circle cx="220" cy="305" r="14" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
            {/* 头发 - 几根简单的线 */}
            <path
              d="M210 295 Q208 288, 212 285 M218 293 Q218 284, 222 282 M226 294 Q230 286, 228 283 M232 298 Q238 292, 234 288"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.7"
              fill="none"
            />
            {/* 围巾 - 飘动的线条 */}
            <g className="animate-scarf-flow">
              <path
                d="M212 318 Q205 325, 195 330 Q185 335, 178 332"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                d="M212 320 Q203 328, 190 335 Q180 340, 172 336"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="0.6"
                fill="none"
              />
            </g>
            {/* 身体 - 简单的线条 */}
            <line x1="220" y1="319" x2="220" y2="355" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
            {/* 双腿 */}
            <line x1="220" y1="355" x2="212" y2="375" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" />
            <line x1="220" y1="355" x2="228" y2="375" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" />
            {/* 手臂 - 一只手插口袋，一只微微抬起 */}
            <line x1="220" y1="328" x2="208" y2="345" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" />
            <path d="M220 330 Q232 335, 240 330" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" fill="none" />
          </g>

          {/* 一颗流星 */}
          <g className="animate-shooting-star-svg">
            <line
              x1="80"
              y1="80"
              x2="110"
              y2="100"
              stroke="url(#meteor-gradient)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </g>

          {/* 渐变定义 */}
          <defs>
            <linearGradient id="meteor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 边缘渐变遮罩 */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-background" />

      {/* 滚动提示 */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div
          className={`flex flex-col items-center gap-1 transition-opacity duration-1000 delay-700 ${
            isVisible ? "opacity-30" : "opacity-0"
          }`}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-[2px] h-[2px] rounded-full bg-white/30 animate-particle-fall"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
})
