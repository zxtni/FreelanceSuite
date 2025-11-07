"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

interface PageTransitionContextType {
  isTransitioning: boolean
  startTransition: () => void
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
})

export const usePageTransition = () => useContext(PageTransitionContext)

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Start transition animation
    setIsTransitioning(true)
    setShowLoader(true)

    // Hide loader after 3 seconds
    const loaderTimer = setTimeout(() => {
      setShowLoader(false)
    }, 3000)

    // End transition after animation completes
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false)
    }, 3200)

    return () => {
      clearTimeout(loaderTimer)
      clearTimeout(transitionTimer)
    }
  }, [pathname])

  const startTransition = () => {
    setIsTransitioning(true)
    setShowLoader(true)
  }

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {/* Loading Screen Overlay */}
      {showLoader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-500">
            <div className="relative">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full bg-primary/20" />
            </div>
            <div className="text-center space-y-1 animate-in slide-in-from-bottom-4 duration-700">
              <p className="text-lg font-semibold text-foreground">Loading...</p>
              <p className="text-sm text-muted-foreground">Please wait a moment</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Page Content with Fade Animation */}
      <div 
        className={`transition-opacity duration-300 ${
          showLoader ? 'opacity-0' : 'opacity-100 animate-in fade-in slide-in-from-bottom-4 duration-700'
        }`}
      >
        {children}
      </div>
    </PageTransitionContext.Provider>
  )
}
