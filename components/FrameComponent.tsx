"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface FrameComponentProps {
  title: string
  href: string
  gifUrl?: string
  backgroundImage?: string
  width: number | string
  height: number | string
  className?: string
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  onMediaSizeChange: (value: number) => void
  onBorderThicknessChange: (value: number) => void
  onBorderSizeChange: (value: number) => void
  showControls: boolean
  label: string
  showFrame: boolean
  autoplayMode: "all" | "hover"
  isHovered: boolean
  hasAnyHover: boolean
}

export function FrameComponent({
  title,
  href,
  gifUrl,
  backgroundImage,
  width,
  height,
  className = "",
  corner,
  edgeHorizontal,
  edgeVertical,
  mediaSize,
  borderThickness,
  borderSize,
  onMediaSizeChange,
  onBorderThicknessChange,
  onBorderSizeChange,
  showControls,
  label,
  showFrame,
  autoplayMode,
  isHovered,
  hasAnyHover,
}: FrameComponentProps) {
  const gifRef = useRef<HTMLImageElement>(null)
  const [isLocalHovered, setIsLocalHovered] = useState(false)

  // Reset GIF when hover ends
  useEffect(() => {
    if (!isLocalHovered && gifRef.current && gifUrl) {
      // Reset GIF to first frame by reloading
      const currentSrc = gifRef.current.src
      gifRef.current.src = ''
      setTimeout(() => {
        if (gifRef.current) {
          gifRef.current.src = currentSrc
        }
      }, 100)
    }
  }, [isLocalHovered, gifUrl])

  return (
    <Link 
      href={href}
      className={`relative ${className} block`}
      style={{
        width,
        height,
        transition: "all 0.4s ease",
        transform: "scale(1)",
        zIndex: 1,
      }}
      onMouseEnter={() => setIsLocalHovered(true)}
      onMouseLeave={() => setIsLocalHovered(false)}
    >
      {/* Placeholder Box with Tab Name */}
      <div 
        className={`absolute inset-0 bg-royal-dark border-2 rounded-lg overflow-hidden transition-all duration-300 ${
          isHovered ? "border-royal-red shadow-2xl shadow-royal-red/30" : "border-royal-cream/20 hover:border-royal-red"
        }`}
        style={{
          opacity: isHovered ? 1 : (hasAnyHover ? 0.2 : 1),
        }}
      >
        {/* Background Image - always visible */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 z-0"
            style={{
              opacity: 1,
              pointerEvents: "none"
            }}
          >
            <img
              src={backgroundImage}
              alt={title}
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-royal-dark/40"></div>
          </div>
        )}
        
        {/* Show GIF if available, otherwise show placeholder */}
        {gifUrl ? (
          <div className="relative w-full h-full z-10">
            {/* GIF/Image */}
            <img
              ref={gifRef}
              src={gifUrl}
              alt={title}
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
            />
            {/* Title overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-royal-dark/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <h3 className="font-playfair text-2xl md:text-3xl text-royal-cream font-bold text-center px-4">
                {title}
              </h3>
            </div>
          </div>
        ) : (
          /* Placeholder with tab name - visible on top of background image */
          <div className="relative w-full h-full flex items-center justify-center z-20">
            <div className="text-center px-4">
              <h3 className={`font-playfair text-2xl md:text-3xl font-bold transition-all duration-300 ${
                backgroundImage 
                  ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                  : "text-royal-cream"
              }`}>
                {title}
              </h3>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
