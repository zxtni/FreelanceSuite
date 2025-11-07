'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface AnimatedContainerProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'scale-in' | 'slide-in-right' | 'slide-in-left' | 'bounce-in'
  delay?: number
}

export function AnimatedContainer({ 
  children, 
  className = '', 
  animation = 'fade-up',
  delay = 0 
}: AnimatedContainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(`animate-${animation}`)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      ref.current.style.animationDelay = `${delay}ms`
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [animation, delay])

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  )
}
