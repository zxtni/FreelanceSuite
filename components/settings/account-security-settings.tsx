"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Shield, Mail, Lock, Phone } from "lucide-react"
import { toast } from "sonner"

export function AccountSecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [accountDetails, setAccountDetails] = useState({
    email: "",
    phone: ""
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  useEffect(() => {
    // Load user data from users.json
    import('@/data/users.json')
      .then((data) => {
        const user = data.users[0] // Get first user (Rahul Mondal)
        setAccountDetails({
          email: user.email,
          phone: user.phone || ""
        })
      })
      .catch(err => console.error('Error loading user data:', err))
  }, [])

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAccountDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveAccount = async () => {
    setIsSaving(true)
    
    try {
      const response = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: "1",
          email: accountDetails.email,
          phone: accountDetails.phone
        })
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("Account Updated", {
          description: "Your account details have been successfully updated.",
        })
      } else {
        throw new Error(result.error || 'Failed to update')
      }
    } catch (error) {
      toast.error("Update Failed", {
        description: error instanceof Error ? error.message : "Failed to update account details. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Missing Information", {
        description: "Please fill in all password fields.",
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Password Mismatch", {
        description: "New password and confirm password don't match!",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Weak Password", {
        description: "Password must be at least 8 characters long.",
      })
      return
    }

    setIsSaving(true)
    
    try {
      const response = await fetch('/api/users/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: "1",
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      const result = await response.json()

      if (response.ok) {
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
        toast.success("Password Changed", {
          description: "Your password has been successfully updated.",
        })
      } else {
        throw new Error(result.error || 'Failed to update password')
      }
    } catch (error) {
      toast.error("Update Failed", {
        description: error instanceof Error ? error.message : "Failed to update password. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Account Details */}
      <Card className="bg-card border-border hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 shadow-inner">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <CardTitle className="text-foreground text-xl">Account Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2.5">Email Address</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input
                name="email"
                type="email"
                value={accountDetails.email}
                onChange={handleAccountChange}
                className="bg-background border-border text-foreground pl-10 h-11 transition-all duration-300 focus:shadow-lg"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2.5">Phone Number</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Phone className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input
                name="phone"
                type="tel"
                value={accountDetails.phone}
                onChange={handleAccountChange}
                className="bg-background border-border text-foreground pl-10 h-11 transition-all duration-300 focus:shadow-lg"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSaveAccount}
              disabled={isSaving}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 px-6 h-11 shadow-md hover:shadow-lg"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="bg-card border-border hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 shadow-inner">
              <Lock className="w-5 h-5 text-accent" />
            </div>
            <CardTitle className="text-foreground text-xl">Change Password</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2.5">Current Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="bg-background border-border text-foreground pl-10 pr-10 h-11 transition-all duration-300 focus:shadow-lg"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2.5">New Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="bg-background border-border text-foreground pl-10 pr-10 h-11 transition-all duration-300 focus:shadow-lg"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2.5">Confirm New Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="bg-background border-border text-foreground pl-10 pr-10 h-11 transition-all duration-300 focus:shadow-lg"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button
              onClick={handleChangePassword}
              disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 px-6 h-11 shadow-md hover:shadow-lg"
            >
              {isSaving ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Recommendations */}
      <Card className="bg-card border-border hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5">
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <CardTitle className="text-foreground">Security Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and symbols</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Never share your password with anyone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Change your password regularly (every 3-6 months)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Enable two-factor authentication for extra security</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
