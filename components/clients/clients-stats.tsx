/**
 * Clients Statistics Component
 * Overview cards for client metrics
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, DollarSign } from "lucide-react"
import { Invoice } from "@/lib/types"

interface ClientsStatsProps {
  totalClients: number
  activeClients: number
  invoices: Invoice[]
}

// Client stats component - www.zxtni.dev
export function ClientsStats({ totalClients, activeClients, invoices }: ClientsStatsProps) {
  // Calculate total revenue from paid invoices
  const totalRevenue = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0)
  
  const paidInvoicesCount = invoices.filter(i => i.status === 'paid').length

  const stats = [
    {
      title: "Total Clients",
      value: totalClients.toString(),
      change: `${activeClients} active`,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active Clients",
      value: activeClients.toString(),
      change: `${totalClients - activeClients} inactive`,
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      change: `${paidInvoicesCount} invoices paid`,
      icon: DollarSign,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card 
            key={index} 
            className="bg-card border-border hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative group overflow-hidden"
          >
            {/* Glass gradient overlay */}
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
