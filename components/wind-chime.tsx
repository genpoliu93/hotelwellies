"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function WindChime() {
  const [isAnimating, setIsAnimating] = useState(false)

  // 随机触发动画
  useEffect(() => {
    const startAnimation = () => {
      if (!isAnimating) {
        setIsAnimating(true)

        // 动画持续时间后重置状态
        setTimeout(() => {
          setIsAnimating(false)
        }, 3000)
      }
    }

    // 初始延迟后开始动画
    const initialTimeout = setTimeout(() => {
      startAnimation()
    }, 1000)

    // 设置随机间隔触发动画
    const interval = setInterval(
      () => {
        startAnimation()
      },
      Math.random() * 10000 + 5000,
    ) // 5-15秒随机间隔

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [isAnimating])

  return (
    <div className="absolute bottom-0 right-10 transform translate-y-[calc(100%-2px)] z-10">
      <motion.div
        animate={isAnimating ? "animate" : "rest"}
        variants={{
          rest: { rotate: 0 },
          animate: {
            rotate: [0, 8, -8, 5, -5, 3, -3, 0],
            transition: {
              duration: 3,
              ease: "easeInOut",
            },
          },
        }}
        className="origin-top"
      >
        {/* 使用更精致的风铃图像 */}
        <svg width="40" height="80" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 顶部挂绳 */}
          <path d="M19 0V5" stroke="#594A3C" strokeWidth="1.5" strokeLinecap="round" />

          {/* 风铃顶部木框 */}
          <rect x="14" y="5" width="12" height="3" rx="1" fill="#8D6E63" />

          {/* 玻璃钟体 - 半透明效果 */}
          <path
            d="M12 8H28C28 8 29 8 29 9C29 18 20 24 20 24C20 24 11 18 11 9C11 8 12 8 12 8Z"
            fill="#B2DFDB"
            fillOpacity="0.7"
            stroke="#80CBC4"
            strokeWidth="0.5"
          />

          {/* 风铃内部纹理 */}
          <path d="M16 12C16 12 20 14 24 12" stroke="#4DB6AC" strokeWidth="0.5" strokeLinecap="round" />
          <path d="M15 16C15 16 20 19 25 16" stroke="#4DB6AC" strokeWidth="0.5" strokeLinecap="round" />

          {/* 风铃中心垂下的短棒 */}
          <line x1="20" y1="24" x2="20" y2="32" stroke="#5D4037" strokeWidth="1" />

          {/* 风铃底部小铃铛 */}
          <circle cx="20" cy="34" r="2" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="0.5" />

          {/* 垂下的和纸条 */}
          <rect x="18.5" y="38" width="3" height="30" rx="1.5" fill="#EFEBE9" stroke="#D7CCC8" strokeWidth="0.3" />

          {/* 和纸上的简约图案 */}
          <path d="M20 45C20 45 19 47 20 49C21 47 20 45 20 45Z" fill="#4DB6AC" />
          <path d="M20 55C20 55 19 57 20 59C21 57 20 55 20 55Z" fill="#4DB6AC" />

          {/* 风铃周围的光晕效果 */}
          <circle cx="20" cy="16" r="8" fill="url(#paint0_radial)" fillOpacity="0.2" />

          {/* 定义渐变 */}
          <defs>
            <radialGradient
              id="paint0_radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(20 16) rotate(90) scale(8)"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  )
}
