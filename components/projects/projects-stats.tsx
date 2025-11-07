import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Clock, CheckCircle2, AlertCircle } from "lucide-react"

interface Project {
  id: number
  status: string
  progress: number
  priority: string
  [key: string]: any
}

interface ProjectsStatsProps {
  projects: Project[]
}

export function ProjectsStats({ projects }: ProjectsStatsProps) {
  const stats = [
    {
      title: "Total Projects",
      value: projects.length.toString(),
      change: `${projects.filter((p) => p.status === "completed").length} completed`,
      icon: Briefcase,
      color: "text-blue-500",
    },
    {
      title: "In Progress",
      value: projects.filter((p) => p.status === "in-progress").length.toString(),
      change: "Currently active",
      icon: Clock,
      color: "text-accent",
    },
    {
      title: "Completed",
      value: projects.filter((p) => p.status === "completed").length.toString(),
      change: `${Math.round(
        (projects.filter((p) => p.status === "completed").length / projects.length) * 100,
      )}% completion rate`,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      title: "At Risk",
      value: projects.filter((p) => p.priority === "high" && p.progress < 100).length.toString(),
      change: "High priority pending",
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
