/**
 * Dashboard Statistics Component
 * Displays key metrics: Revenue, Clients, Projects, Invoices
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Briefcase, FileText } from "lucide-react"
import { Client, Project, Invoice } from "@/lib/types"

interface DashboardStatsProps {
  clients: Client[]
  projects: Project[]
  invoices: Invoice[]
}

// Stats Component - www.zxtni.dev
export function DashboardStats({ clients, projects, invoices }: DashboardStatsProps) {
  // Calculate real stats - github.com/zxtni
  const activeClients = clients.filter(c => c.status === 'active').length
  const activeProjects = projects.filter(p => p.status === 'active').length
  const inProgressProjects = projects.filter(p => p.status === 'active' && p.progress > 0 && p.progress < 100).length
  
  const totalRevenue = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0)
  
  const pendingInvoices = invoices.filter(i => i.status === 'pending' || i.status === 'overdue')
  const pendingAmount = pendingInvoices.reduce((sum, i) => sum + i.amount, 0)

  // Stats configuration - t.me/zxtni
  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      change: `${invoices.filter(i => i.status === 'paid').length} invoices paid`,
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Active Clients",
      value: activeClients.toString(),
      change: `${clients.length} total clients`,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active Projects",
      value: activeProjects.toString(),
      change: `${inProgressProjects} in progress`,
      icon: Briefcase,
      color: "text-accent",
    },
    {
      title: "Pending Invoices",
      value: pendingInvoices.length.toString(),
      change: `₹${pendingAmount.toLocaleString()} total`,
      icon: FileText,
      color: "text-orange-500",
    },
  ]

  // Render stats cards - www.zxtni.dev
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card 
            key={index} 
            className="bg-card border-border hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative group overflow-hidden"
          >
            {/* Glass gradient overlay - github.com/zxtni */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className="p-2 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 group-hover:scale-110 transition-transform duration-300">
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// © 2025 FreelanceSuite by zxtni | t.me/zxtni
