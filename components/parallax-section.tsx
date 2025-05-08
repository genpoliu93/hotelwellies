"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
  offset?: number
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
  offset = 100,
}: ParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // 根据方向计算变换
  const defaultTransform = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  let transform

  switch (direction) {
    case "up":
      transform = useTransform(scrollYProgress, [0, 1], [offset, -offset])
      break
    case "down":
      transform = useTransform(scrollYProgress, [0, 1], [-offset, offset])
      break
    case "left":
      transform = useTransform(scrollYProgress, [0, 1], [offset, -offset])
      break
    case "right":
      transform = useTransform(scrollYProgress, [0, 1], [-offset, offset])
      break
    default:
      transform = defaultTransform
  }

  const style = direction === "left" || direction === "right" ? { x: transform } : { y: transform }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={style} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}
