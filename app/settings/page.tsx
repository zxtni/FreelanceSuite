"use client"

/**
 * Settings Page
 * User preferences, profile, security, and integrations
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { AccountSecuritySettings } from "@/components/settings/account-security-settings"
import { EmailTemplateSettings } from "@/components/settings/email-template-settings"
import { User, Shield, Mail } from "lucide-react"
import { withAuth } from "@/lib/with-auth"

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-in fade-in slide-in-from-top duration-500">
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-3">Settings</h1>
          <p className="text-muted-foreground text-lg">Manage your account preferences and security</p>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card/80 backdrop-blur-xl border border-border rounded-xl p-1.5 mb-10 h-14 shadow-lg">
              <TabsTrigger 
                value="profile" 
                className="flex items-center justify-center gap-2.5 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md transition-all duration-300"
              >
                <User size={20} />
                <span className="hidden sm:inline font-medium">Profile</span>
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="flex items-center justify-center gap-2.5 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md transition-all duration-300"
              >
                <Shield size={20} />
                <span className="hidden sm:inline font-medium">Security</span>
              </TabsTrigger>
              <TabsTrigger 
                value="email-templates" 
                className="flex items-center justify-center gap-2.5 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md transition-all duration-300"
              >
                <Mail size={20} />
                <span className="hidden sm:inline font-medium">Email Templates</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="profile" className="space-y-6">
              <ProfileSettings />
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <AccountSecuritySettings />
            </TabsContent>

            <TabsContent value="email-templates" className="space-y-6">
              <EmailTemplateSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default withAuth(SettingsPage)