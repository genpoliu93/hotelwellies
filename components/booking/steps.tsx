"use client"

import React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface StepsProps {
  currentStep: number
  children: React.ReactNode
}

interface StepProps {
  number: number
  title: string
  isActive?: boolean
  isCompleted?: boolean
}

export function Steps({ currentStep, children }: StepsProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center w-full max-w-3xl">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<StepProps>(child)) {
            const isActive = child.props.number === currentStep
            const isCompleted = child.props.number < currentStep
            const isLast = index === React.Children.count(children) - 1

            return (
              <>
                {React.cloneElement(child, {
                  ...child.props,
                  isActive,
                  isCompleted,
                })}

                {!isLast && (
                  <div className="flex-1 h-0.5 bg-gray-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isCompleted ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-primary"
                    ></motion.div>
                  </div>
                )}
              </>
            )
          }
          return child
        })}
      </div>
    </div>
  )
}

export function Step({
  number,
  title,
  isActive,
  isCompleted,
}: StepProps & { isActive?: boolean; isCompleted?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: isActive ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors ${
          isActive
            ? "bg-primary text-white shadow-md"
            : isCompleted
              ? "bg-primary/20 text-primary"
              : "bg-gray-200 text-gray-600"
        }`}
      >
        {isCompleted ? <Check className="h-5 w-5" /> : number}
      </motion.div>
      <span
        className={`mt-2 text-sm font-medium ${
          isActive ? "text-primary" : isCompleted ? "text-gray-800" : "text-gray-500"
        }`}
      >
        {title}
      </span>
    </div>
  )
}
