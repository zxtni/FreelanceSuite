import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Zap, Award } from "lucide-react"
import clientsData from "@/data/clients.json"
import projectsData from "@/data/projects.json"
import invoicesData from "@/data/invoices.json"

function safeNumber(n: any) {
  const v = Number(n)
  return Number.isFinite(v) ? v : 0
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)
}

export function AnalyticsOverview() {
  const clients = clientsData?.clients || []
  const projects = projectsData?.projects || []
  const invoices = invoicesData?.invoices || []

  const totalRevenue = invoices.reduce((s, inv) => s + safeNumber(inv.amount), 0)
  const averageProjectValue = projects.length > 0 ? Math.round(totalRevenue / projects.length) : 0

  // Project efficiency: percent of projects with progress >= 100 or status completed
  const completedCount = projects.filter((p: any) => p.progress >= 100 || p.status === "completed").length
  const projectEfficiency = projects.length > 0 ? Math.round((completedCount / projects.length) * 100) : 0

  // Revenue growth: compare latest month to previous month based on invoice.issueDate
  const byMonth = invoices.reduce((map: Record<string, number>, inv: any) => {
    try {
      const d = new Date(inv.issueDate)
      if (isNaN(d.getTime())) return map
  const key = d.getFullYear() + "-" + (d.getMonth() + 1)
      map[key] = (map[key] || 0) + safeNumber(inv.amount)
    } catch (e) {
      // ignore
    }
    return map
  }, {})

  const months = Object.keys(byMonth).sort()
  let revenueGrowthLabel = "+0%"
  if (months.length >= 2) {
    const last = byMonth[months[months.length - 1]] || 0
    const prev = byMonth[months[months.length - 2]] || 0
    const pct = prev === 0 ? (last === 0 ? 0 : 100) : Math.round(((last - prev) / Math.abs(prev)) * 100)
  revenueGrowthLabel = (pct >= 0 ? "+" : "") + String(pct) + "%"
  }

  const metrics = [
    {
      title: "Revenue Growth",
      value: revenueGrowthLabel,
      change: "vs last month",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Average Project Value",
      value: formatCurrency(averageProjectValue),
      change: projects.length > 0 ? "+0%" : "",
      icon: Target,
      color: "text-blue-500",
    },
    {
      title: "Client Satisfaction",
      value: "4.8/5",
      change: "Based on feedback",
      icon: Award,
      color: "text-accent",
    },
    {
      title: "Project Efficiency",
      value: String(projectEfficiency) + "%",
      change: "On-time delivery",
      icon: Zap,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card key={index} className="bg-card border-border hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 group-hover:scale-110 transition-transform duration-300">
                <Icon className={"w-5 h-5 " + metric.color} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
