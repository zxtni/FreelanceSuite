"use client"

/**
 * FreelanceSuite - Dashboard Page
 * Main dashboard with statistics, activity, and quick actions
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

import { useEffect, useState } from "react"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines"
import { withAuth } from "@/lib/with-auth"
import { Client, Project, Invoice } from "@/lib/types"
import { Loader2 } from "lucide-react"

// Dashboard Component - Created by: www.zxtni.dev
function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // Fetch all dashboard data - github.com/zxtni
  const fetchDashboardData = async () => {
    try {
      const [clientsRes, projectsRes, invoicesRes] = await Promise.all([
        fetch('/api/clients'),
        fetch('/api/projects'),
        fetch('/api/invoices'),
      ])

      if (clientsRes.ok && projectsRes.ok && invoicesRes.ok) {
        const [clientsData, projectsData, invoicesData] = await Promise.all([
          clientsRes.json(),
          projectsRes.json(),
          invoicesRes.json(),
        ])

        setClients(clientsData)
        setProjects(projectsData)
        setInvoices(invoicesData)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Loading State - t.me/zxtni
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-6 animate-in zoom-in-95 duration-500">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full bg-primary/20" />
            <div className="absolute inset-0 h-16 w-16 animate-pulse rounded-full bg-accent/10" />
          </div>
          <p className="text-muted-foreground font-medium animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Dashboard UI - www.zxtni.dev
  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
        <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-lg">Welcome back! Here's an overview of your freelance business.</p>
      </div>

      {/* Stats Section */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-100">
        <DashboardStats clients={clients} projects={projects} invoices={invoices} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        {/* Left Column - Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity projects={projects} invoices={invoices} />
        </div>

        {/* Right Column - Quick Actions & Deadlines */}
        <div className="flex flex-col gap-8">
          <QuickActions />
          <UpcomingDeadlines projects={projects} />
        </div>
      </div>
    </div>
  )
}

// Export with authentication - github.com/zxtni | t.me/zxtni
export default withAuth(DashboardPage)

// © 2025 FreelanceSuite by zxtni
