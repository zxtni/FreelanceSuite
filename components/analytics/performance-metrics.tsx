"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Target, Users, TrendingUp } from "lucide-react"
import projectsData from "@/data/projects.json"
import invoicesData from "@/data/invoices.json"
import clientsData from "@/data/clients.json"

export function PerformanceMetrics() {
  const projects = projectsData?.projects || []
  const invoices = invoicesData?.invoices || []
  const clients = clientsData?.clients || []

  const completedProjects = projects.filter((p: any) => p.progress >= 100 || p.status === "completed").length
  const projectCompletionRate = projects.length > 0 ? Math.round((completedProjects / projects.length) * 100) : 0

  const onBudgetProjects = projects.filter((p: any) => {
    const spent = Number(p.spent || 0)
    const budget = Number(p.budget || 0)
    return budget > 0 && spent <= budget
  }).length
  const budgetAccuracy = projects.length > 0 ? Math.round((onBudgetProjects / projects.length) * 100) : 0

  const activeClients = clients.filter((c: any) => c.status === "active").length
  const clientRetention = clients.length > 0 ? Math.round((activeClients / clients.length) * 100) : 0

  const paidInvoices = invoices.filter((inv: any) => inv.status === "paid").length
  const collectionRate = invoices.length > 0 ? Math.round((paidInvoices / invoices.length) * 100) : 0

  const metrics = [
    { title: "Project Completion Rate", current: projectCompletionRate, target: 90, description: "Percentage of projects delivered on time", icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-500/10", progressColor: "bg-green-500" },
    { title: "Budget Accuracy", current: budgetAccuracy, target: 85, description: "Projects completed within budget estimate", icon: Target, color: "text-blue-500", bgColor: "bg-blue-500/10", progressColor: "bg-blue-500" },
    { title: "Client Retention", current: clientRetention, target: 95, description: "Returning clients vs. one-time projects", icon: Users, color: "text-purple-500", bgColor: "bg-purple-500/10", progressColor: "bg-purple-500" },
    { title: "Invoice Collection Rate", current: collectionRate, target: 100, description: "Invoices paid on time", icon: TrendingUp, color: "text-orange-500", bgColor: "bg-orange-500/10", progressColor: "bg-orange-500" }
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground text-xl">Performance Metrics</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Track your business performance against targets</p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          const isAboveTarget = metric.current >= metric.target
          return (
            <div key={index} className="p-4 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 space-y-4 group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}><Icon className={`w-4 h-4 ${metric.color}`} /></div>
                    <h3 className="font-semibold text-foreground text-sm">{metric.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{metric.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-2xl font-bold ${isAboveTarget ? 'text-green-500' : metric.color}`}>{metric.current}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Target: {metric.target}%</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full transition-all duration-500 rounded-full ${metric.progressColor}`} style={{ width: `{Math.min(metric.current, 100)}%` }} />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">0%</span>
                  <div className="flex items-center gap-1">{isAboveTarget ? <span className="text-green-500 font-medium"> Target met</span> : <span className="text-orange-500 font-medium">{metric.target - metric.current}% to target</span>}</div>
                  <span className="text-muted-foreground">100%</span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
