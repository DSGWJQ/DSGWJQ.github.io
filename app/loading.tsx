export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* 中心微光 */}
      <div className="relative">
        {/* 主微光点 - 柔和脉动 */}
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 rounded-full bg-foreground/90 animate-pulse-glow" />
          <div
            className="absolute inset-0 rounded-full bg-foreground/60 blur-sm animate-pulse-glow"
            style={{ animationDelay: "0.3s" }}
          />
        </div>

        {/* 同心圆波纹 - 出现又消失 */}
        <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-foreground/10 animate-ripple"
              style={{
                width: `${(i + 1) * 60}px`,
                height: `${(i + 1) * 60}px`,
                left: `calc(50% - ${(i + 1) * 30}px)`,
                top: `calc(50% - ${(i + 1) * 30}px)`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        {/* 粒子尘埃效果 */}
        <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const distance = 80 + (i % 3) * 20
            const x = Math.cos(angle) * distance
            const y = Math.sin(angle) * distance

            return (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 rounded-full bg-foreground/20 animate-particle-fade"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            )
          })}
        </div>
      </div>

      {/* 可选的加载文字 - 极其细微 */}
      <div className="absolute bottom-12 text-foreground/30 text-xs tracking-widest animate-fade-in-out">
        {"微光初现"}
      </div>
    </div>
  )
}
