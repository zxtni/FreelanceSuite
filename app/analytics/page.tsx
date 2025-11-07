"use client"

/**
 * Analytics Dashboard Page
 * Revenue trends, charts, and business insights
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { RevenueChart } from "@/components/analytics/revenue-chart"
import { ClientGrowthChart } from "@/components/analytics/client-growth-chart"
import { ProjectStatusChart } from "@/components/analytics/project-status-chart"
import { TopClientsChart } from "@/components/analytics/top-clients-chart"
import { PerformanceMetrics } from "@/components/analytics/performance-metrics"
import { withAuth } from "@/lib/with-auth"

function AnalyticsPage() {
  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* Header */}
      <div className="mb-10 animate-in fade-in slide-in-from-top duration-500">
        <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Analytics</h1>
        <p className="text-muted-foreground text-lg">Monitor your business performance and key metrics</p>
      </div>

      {/* Overview Stats */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-100">
        <AnalyticsOverview />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-left duration-700 delay-200">
        {/* Revenue Chart */}
        <RevenueChart />

        {/* Project Status Chart */}
        <ProjectStatusChart />
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right duration-700 delay-300">
        {/* Client Growth Chart */}
        <ClientGrowthChart />

        {/* Top Clients Chart */}
        <TopClientsChart />
      </div>

      {/* Performance Metrics */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-400">
        <PerformanceMetrics />
      </div>
    </div>
  )
}

export default withAuth(AnalyticsPage)