"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, AlertCircle } from "lucide-react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    inAppNotifications: {
      invoiceReminders: true,
      projectUpdates: true,
      clientMessages: true,
      systemUpdates: true,
    },
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const toggleNotification = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      inAppNotifications: {
        ...prev.inAppNotifications,
        [key]: !prev.inAppNotifications[key as any],
      },
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaveSuccess(true)
    setIsSaving(false)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-8">
      {/* In-App Notifications */}
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
            <MessageSquare size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            <p className="text-sm text-muted-foreground">Manage in-app alerts and messages</p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications.inAppNotifications).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center gap-4 p-4 bg-background border border-border rounded-lg cursor-pointer hover:border-accent/50 transition-colors"
            >
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleNotification(key)}
                className="w-5 h-5 rounded border-border bg-background cursor-pointer accent-accent"
              />
              <span className="text-foreground font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        {saveSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
            <AlertCircle size={16} />
            Notifications updated
          </div>
        )}
        <Button onClick={handleSave} disabled={isSaving} className="bg-accent hover:bg-accent/90 text-white">
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  )
}
