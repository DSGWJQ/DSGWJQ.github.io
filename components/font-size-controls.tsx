"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Type } from "lucide-react"

export function FontSizeControls() {
  const [fontSize, setFontSize] = useState(100)

  const adjustFontSize = (delta: number) => {
    const newSize = Math.max(80, Math.min(140, fontSize + delta))
    setFontSize(newSize)

    const content = document.getElementById("article-content")
    if (content) {
      content.style.fontSize = `${newSize}%`
    }
  }

  return (
    <div className="flex items-center gap-4 py-4 border-y border-border/50">
      <Type className="h-4 w-4 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">字体大小</span>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" className="h-7 px-3 text-xs" onClick={() => adjustFontSize(-10)}>
          A-
        </Button>
        <Button variant="ghost" size="sm" className="h-7 px-3 text-xs" onClick={() => setFontSize(100)}>
          重置
        </Button>
        <Button variant="ghost" size="sm" className="h-7 px-3 text-xs" onClick={() => adjustFontSize(10)}>
          A+
        </Button>
      </div>
    </div>
  )
}
