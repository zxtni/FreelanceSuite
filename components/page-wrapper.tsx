"use client"

import { ReactNode } from "react"
import { Sidebar } from "@/components/sidebar"

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="animate-in fade-in slide-in-from-right-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  )
}
