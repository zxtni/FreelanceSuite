"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Key, Smartphone, Clock, AlertCircle } from "lucide-react"

export function SecuritySettings() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordSave = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match")
      return
    }
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaveSuccess(true)
    setPasswords({ current: "", new: "", confirm: "" })
    setIsSaving(false)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
            <Key size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
            <p className="text-sm text-muted-foreground">Update your password regularly for better security</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
            <Input
              name="current"
              type={passwordVisible ? "text" : "password"}
              value={passwords.current}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              className="bg-background border-border text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
            <div className="relative">
              <Input
                name="new"
                type={passwordVisible ? "text" : "password"}
                value={passwords.new}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className="bg-background border-border text-foreground pr-10"
              />
              <button
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Minimum 8 characters, include uppercase and numbers</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
            <Input
              name="confirm"
              type={passwordVisible ? "text" : "password"}
              value={passwords.confirm}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              className="bg-background border-border text-foreground"
            />
          </div>

          <Button onClick={handlePasswordSave} disabled={isSaving} className="bg-accent hover:bg-accent/90 text-white">
            {isSaving ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
            <Smartphone size={20} className="text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-4 mb-4">
          <p className="text-sm text-foreground mb-4">
            Current Status: <span className="text-yellow-400 font-semibold">Disabled</span>
          </p>
          <Button className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto">Enable 2FA</Button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
            <Clock size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Active Sessions</h3>
            <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { device: "Chrome on MacOS", location: "San Francisco, CA", lastActive: "Now" },
            { device: "Safari on iPhone", location: "San Francisco, CA", lastActive: "2 hours ago" },
            { device: "Chrome on Windows", location: "New York, NY", lastActive: "1 day ago" },
          ].map((session, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-background border border-border rounded-lg"
            >
              <div>
                <p className="font-medium text-foreground">{session.device}</p>
                <p className="text-sm text-muted-foreground">
                  {session.location} • Last active {session.lastActive}
                </p>
              </div>
              <Button variant="ghost" className="text-destructive hover:bg-destructive/10">
                Revoke
              </Button>
            </div>
          ))}
        </div>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
          <AlertCircle size={16} />
          Security settings updated successfully
        </div>
      )}
    </div>
  )
}
