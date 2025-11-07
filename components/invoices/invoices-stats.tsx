import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react"

interface InvoicesStatsProps {
  totalRevenue: number
  pendingPayments: number
  totalInvoices: number
  paidInvoices: number
}

export function InvoicesStats({ totalRevenue, pendingPayments, totalInvoices, paidInvoices }: InvoicesStatsProps) {
  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      change: `${paidInvoices} invoices paid`,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      title: "Pending Payments",
      value: `₹${pendingPayments.toLocaleString()}`,
      change: "Awaiting payment",
      icon: Clock,
      color: "text-accent",
    },
    {
      title: "Total Invoices",
      value: totalInvoices.toString(),
      change: "All time",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Collection Rate",
      value: `${totalInvoices > 0 ? Math.round((paidInvoices / totalInvoices) * 100) : 0}%`,
      change: "Successfully collected",
      icon: AlertCircle,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
