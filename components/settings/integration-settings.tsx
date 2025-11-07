"use client"

import { Link2 } from "lucide-react"

export function IntegrationSettings() {
  return (
    <div className="bg-card border border-border rounded-lg p-12 flex items-center justify-center min-h-96">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <Link2 className="w-12 h-12 text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h3>
        <p className="text-muted-foreground">Integrations will be available soon.</p>
      </div>
    </div>
  )
}
