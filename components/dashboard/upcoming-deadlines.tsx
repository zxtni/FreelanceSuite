import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Clock } from "lucide-react"
import { Project } from "@/lib/types"

interface UpcomingDeadlinesProps {
  projects: Project[]
}

export function UpcomingDeadlines({ projects }: UpcomingDeadlinesProps) {
  // Get active projects sorted by deadline
  const activeProjects = projects
    .filter(p => p.status === 'active')
    .map(p => {
      const deadline = new Date(p.deadline)
      const today = new Date()
      const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return {
        project: p.name,
        daysLeft,
        status: daysLeft <= 3 ? 'urgent' : daysLeft <= 7 ? 'warning' : 'normal'
      }
    })
    .filter(p => p.daysLeft >= 0) // Only future deadlines
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 5) // Show top 5

  if (activeProjects.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activeProjects.map((deadline, index) => {
            const isUrgent = deadline.status === "urgent"
            return (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{deadline.project}</p>
                  <p className="text-xs text-muted-foreground">{deadline.daysLeft} days left</p>
                </div>
                {isUrgent && <AlertTriangle className="w-4 h-4 text-orange-500" />}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
