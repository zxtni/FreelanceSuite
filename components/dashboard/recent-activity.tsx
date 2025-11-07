import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle, FileText, Briefcase } from "lucide-react"
import { Project, Invoice } from "@/lib/types"

interface RecentActivityProps {
  projects: Project[]
  invoices: Invoice[]
}

export function RecentActivity({ projects, invoices }: RecentActivityProps) {
  // Create activity items from projects and invoices
  const projectActivities = projects.map(p => {
    const createdDate = new Date(p.createdAt)
    const daysSince = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
    
    let timeText = daysSince === 0 ? 'Today' : daysSince === 1 ? '1 day ago' : `${daysSince} days ago`
    
    return {
      type: p.status === 'completed' ? 'project_completed' : 'project_active',
      title: p.name,
      description: p.status === 'completed' ? 'Project completed' : `${p.progress}% complete`,
      timestamp: timeText,
      icon: p.status === 'completed' ? CheckCircle2 : Briefcase,
      color: p.status === 'completed' ? 'text-green-500' : 'text-blue-500',
      date: createdDate,
    }
  })

  const invoiceActivities = invoices.map(i => {
    const createdDate = new Date(i.createdAt)
    const daysSince = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
    
    let timeText = daysSince === 0 ? 'Today' : daysSince === 1 ? '1 day ago' : `${daysSince} days ago`
    
    return {
      type: i.status === 'paid' ? 'invoice_paid' : i.status === 'overdue' ? 'invoice_overdue' : 'invoice_pending',
      title: `Invoice ${i.invoiceNumber}`,
      description: i.status === 'paid' ? `Paid by ${i.clientName}` : i.status === 'overdue' ? 'Payment overdue' : `Pending - ${i.clientName}`,
      timestamp: timeText,
      icon: i.status === 'overdue' ? AlertCircle : FileText,
      color: i.status === 'paid' ? 'text-green-500' : i.status === 'overdue' ? 'text-orange-500' : 'text-blue-500',
      date: createdDate,
    }
  })

  // Combine and sort by date
  const allActivities = [...projectActivities, ...invoiceActivities]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 6) // Show most recent 6

  if (allActivities.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recent activity</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allActivities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div key={index} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className={`mt-1 ${activity.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{activity.title}</p>
                  <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                  <p className="text-xs text-muted-foreground/60">{activity.timestamp}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
