"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
  priority?: boolean
}

export function ParallaxImage({ src, alt, className = "", speed = 0.2, priority = false }: ParallaxImageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // 计算视差效果的Y位移
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" priority={priority} />
      </motion.div>
    </div>
  )
}
