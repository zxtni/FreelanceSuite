"use client"

import { MouseTrackerProvider, Pointer } from "@/components/ui/mouse-tracker"

export function CustomCursor({ children }: { children: React.ReactNode }) {
  return (
    <MouseTrackerProvider className="h-full w-full">
      {children}
      <Pointer>
        <div className="flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-accent/80 backdrop-blur-sm border-2 border-white/50 shadow-lg" />
        </div>
      </Pointer>
    </MouseTrackerProvider>
  )
}
