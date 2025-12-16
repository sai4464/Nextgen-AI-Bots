"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FrameComponent } from "./FrameComponent"

const GRID_SIZE = 12
const GRID_COLUMNS = 3
const GRID_ROWS = 2

interface Frame {
  id: number
  title: string
  href: string
  gifUrl?: string  // Add this for GIF placeholder
  backgroundImage?: string  // Background image for expanded state
  defaultPos: { x: number; y: number; w: number; h: number }
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  autoplayMode: "all" | "hover"
  isHovered: boolean
}

// Tab navigation matching your navbar - only 6 tabs, arranged in 3x2 grid
const initialFrames: Frame[] = [
  {
    id: 1,
    title: "Mission",
    href: "/mission",
    gifUrl: "",  // Add your GIF URL here later
    backgroundImage: "/assets/child.png",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 2,
    borderSize: 95,
    autoplayMode: "hover",
    isHovered: false,
  },
  {
    id: 2,
    title: "Sponsors",
    href: "/sponsors",
    gifUrl: "",  // Add your GIF URL here later
    backgroundImage: "/assets/nextteam.jpg",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 2,
    borderSize: 95,
    autoplayMode: "hover",
    isHovered: false,
  },
  {
    id: 3,
    title: "Programs",
    href: "/programs",
    gifUrl: "",  // Add your GIF URL here later
    backgroundImage: "/assets/programs.JPG",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 2,
    borderSize: 95,
    autoplayMode: "hover",
    isHovered: false,
  },
  {
    id: 4,
    title: "NextGen Team",
    href: "/vex",
    gifUrl: "",  // Add your GIF URL here later
    backgroundImage: "/assets/teamcubed.JPG",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 2,
    borderSize: 95,
    autoplayMode: "hover",
    isHovered: false,
  },
  {
    id: 5,
    title: "Get Involved",
    href: "/get-involved",
    gifUrl: "",  // Add your GIF URL here later
    backgroundImage: "/assets/involved.jpg",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 2,
    borderSize: 95,
    autoplayMode: "hover",
    isHovered: false,
  },
  {
    id: 6,
    title: "Contact",
    href: "/contact",
    gifUrl: "",  // Add your GIF URL here later
    backgroundImage: "/assets/beautybot.JPG",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: "",
    edgeHorizontal: "",
    edgeVertical: "",
    mediaSize: 1,
    borderThickness: 2,
    borderSize: 95,
    autoplayMode: "hover",
    isHovered: false,
  },
]

export default function DynamicFrameLayout() {
  const [frames, setFrames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(6)
  const [gapSize, setGapSize] = useState(4)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const getRowSizes = () => {
    // On mobile, just return static grid
    if (isMobile) {
      return "1fr 1fr"
    }
    if (hovered === null) {
      return "1fr 1fr"
    }
    const { row } = hovered
    // For 2 rows: total is 2 units, hovered row expands to 1.5, other shrinks to 0.5
    const nonHoveredSize = (2 - 1.5) / 1
    return [0, 1].map((r) => (r === row ? "1.5fr" : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    // On mobile, just return static grid
    if (isMobile) {
      return "1fr 1fr 1fr"
    }
    if (hovered === null) {
      return "1fr 1fr 1fr"
    }
    const { col } = hovered
    // For 3 columns: total is 3 units, hovered column expands to 1.5, others split the remaining 1.5
    const nonHoveredSize = (3 - 1.5) / 2
    return [0, 1, 2].map((c) => (c === col ? "1.5fr" : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  return (
    <div className="w-full h-full">
      <div
        className="relative w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: isMobile ? "none" : "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {frames.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / 4)
          const col = Math.floor(frame.defaultPos.x / 4)
          const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

          return (
            <motion.div
              key={frame.id}
              className="relative"
              onMouseEnter={() => !isMobile && setHovered({ row, col })}
              onMouseLeave={() => !isMobile && setHovered(null)}
            >
              <FrameComponent
                title={frame.title}
                href={frame.href}
                gifUrl={frame.gifUrl}
                backgroundImage={frame.backgroundImage}
                width="100%"
                height="100%"
                className="absolute inset-0"
                corner={frame.corner}
                edgeHorizontal={frame.edgeHorizontal}
                edgeVertical={frame.edgeVertical}
                mediaSize={frame.mediaSize}
                borderThickness={frame.borderThickness}
                borderSize={frame.borderSize}
                onMediaSizeChange={() => {}}
                onBorderThicknessChange={() => {}}
                onBorderSizeChange={() => {}}
                showControls={false}
                label={frame.title}
                showFrame={false}
                autoplayMode={frame.autoplayMode}
                isHovered={
                  hovered?.row === Math.floor(frame.defaultPos.y / 4) &&
                  hovered?.col === Math.floor(frame.defaultPos.x / 4)
                }
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
