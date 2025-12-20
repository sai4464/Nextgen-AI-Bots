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
    // On mobile, return 6 rows (one for each frame) with half height
    if (isMobile) {
      return "repeat(6, 0.5fr)"
    }
    // Always return static grid - no size changes on hover
    return "1fr 1fr"
  }

  const getColSizes = () => {
    // On mobile, return single column; otherwise 3 columns
    if (isMobile) {
      return "1fr"
    }
    // Always return static grid - no size changes on hover
    return "1fr 1fr 1fr"
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  return (
    <div className={`w-full ${isMobile ? 'h-auto' : 'h-full'}`}>
      <div
        className={`relative w-full ${isMobile ? 'h-auto' : 'h-full'}`}
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "none",
        }}
      >
        {frames.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / 4)
          const col = Math.floor(frame.defaultPos.x / 4)
          const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

          return (
            <motion.div
              key={frame.id}
              className={`relative ${isMobile ? 'min-h-[200px]' : ''}`}
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
                hasAnyHover={hovered !== null}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
