"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useEffect, useId, useState, type RefObject } from "react"
// import { cn } from "@/lib/utils"

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export interface BeamLightProps {
  className?: string
  containerRef: RefObject<HTMLElement | null>
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
  animated?: boolean
  dotted?: boolean
  glowEffect?: boolean
  pulseEffect?: boolean
}

export const BeamLight: React.FC<BeamLightProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "#333333",
  pathWidth = 2,
  pathOpacity = 0.3,
  gradientStartColor = "#ffffff",
  gradientStopColor = "#888888",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  animated = true,
  dotted = false,
  glowEffect = false,
  pulseEffect = false,
}) => {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  // Calculate gradient coordinates based on direction
  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["0%", "100%"],
        x2: ["20%", "120%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const rectA = fromRef.current.getBoundingClientRect()
        const rectB = toRef.current.getBoundingClientRect()

        const svgWidth = containerRect.width
        const svgHeight = containerRect.height
        setSvgDimensions({ width: svgWidth, height: svgHeight })

        const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset
        const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset
        const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset
        const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset

        let d: string
        if (curvature === 0) {
          // Straight line
          d = `M ${startX},${startY} L ${endX},${endY}`
        } else {
          // Curved line using quadratic bezier
          const controlY = startY - curvature
          d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
        }

        setPathD(d)
      }
    }

    // Initial path update
    updatePath()

    // Set up observers for dynamic updates
    const observer = new MutationObserver(updatePath)
    const resizeObserver = new ResizeObserver(updatePath)

    // Watch for style changes on elements
    if (fromRef.current) {
      observer.observe(fromRef.current, {
        attributes: true,
        attributeFilter: ["style", "class"],
        subtree: false,
      })
    }
    if (toRef.current) {
      observer.observe(toRef.current, {
        attributes: true,
        attributeFilter: ["style", "class"],
        subtree: false,
      })
    }

    // Watch for container size changes
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Continuous updates for smooth animations during interactions
    let animationFrameId: number
    const scheduleUpdate = () => {
      animationFrameId = requestAnimationFrame(() => {
        updatePath()
        scheduleUpdate()
      })
    }
    scheduleUpdate()

    // Cleanup
    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  // Don't render if path is not ready
  if (!pathD || svgDimensions.width === 0 || svgDimensions.height === 0) {
    return null
  }

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute left-0 top-0 transform-gpu", className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      style={{ zIndex: 0 }}
    >
      <defs>
        {/* Animated gradient for beam effect */}
        {animated && (
          <motion.linearGradient
            className="transform-gpu"
            id={`${id}-gradient`}
            gradientUnits="userSpaceOnUse"
            initial={{
              x1: reverse ? "100%" : "0%",
              x2: reverse ? "80%" : "20%",
              y1: "0%",
              y2: "0%",
            }}
            animate={{
              x1: gradientCoordinates.x1,
              x2: gradientCoordinates.x2,
              y1: gradientCoordinates.y1,
              y2: gradientCoordinates.y2,
            }}
            transition={{
              delay,
              duration,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <stop stopColor={gradientStartColor} stopOpacity="0" />
            <stop offset="0.2" stopColor={gradientStartColor} />
            <stop offset="0.5" stopColor={gradientStopColor} />
            <stop offset="1" stopColor={gradientStopColor} stopOpacity="0" />
          </motion.linearGradient>
        )}

        {/* Static gradient for non-animated beams */}
        {!animated && (
          <linearGradient id={`${id}-static-gradient`} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor={gradientStopColor} stopOpacity="1" />
            <stop offset="100%" stopColor={gradientStartColor} stopOpacity="0.8" />
          </linearGradient>
        )}

        {/* Glow effect filter */}
        {glowEffect && (
          <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}

        {/* Dotted pattern */}
        {dotted && (
          <pattern id={`${id}-dots`} patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(0)">
            <circle cx="5" cy="5" r="1" fill={pathColor} />
          </pattern>
        )}
      </defs>

      {/* Base path */}
      <motion.path
        d={pathD}
        stroke={dotted ? `url(#${id}-dots)` : pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        strokeDasharray={dotted ? "0 8" : undefined}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
      />

      {/* Animated beam overlay */}
      {animated && (
        <motion.path
          d={pathD}
          strokeWidth={pathWidth}
          stroke={`url(#${id}-gradient)`}
          strokeOpacity="1"
          strokeLinecap="round"
          fill="none"
          filter={glowEffect ? `url(#${id}-glow)` : undefined}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: delay * 0.7,
          }}
        />
      )}

      {/* Static gradient overlay for non-animated beams */}
      {!animated && (
        <motion.path
          d={pathD}
          strokeWidth={pathWidth}
          stroke={`url(#${id}-static-gradient)`}
          strokeOpacity="0.8"
          strokeLinecap="round"
          fill="none"
          filter={glowEffect ? `url(#${id}-glow)` : undefined}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay,
          }}
        />
      )}

      {/* Pulse effect */}
      {pulseEffect && (
        <motion.path
          d={pathD}
          strokeWidth={pathWidth + 2}
          stroke={gradientStartColor}
          strokeOpacity="0.3"
          strokeLinecap="round"
          fill="none"
          animate={{
            strokeOpacity: [0.1, 0.5, 0.1],
            strokeWidth: [pathWidth, pathWidth + 4, pathWidth],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            delay: delay + 1,
          }}
        />
      )}
    </svg>
  )
}

export default BeamLight