"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trash2, CheckCircle2, Clock, AlertCircle, Edit } from "lucide-react"

interface Project {
  id: number
  name: string
  client: string
  status: string
  priority: string
  progress: number
  dueDate: string
  budget: string
  spent: string
  description: string
  [key: string]: any
}

interface ProjectsGridProps {
  projects: Project[]
  onDelete: (id: number) => void
  onUpdateStatus: (id: number, status: string) => void
  onUpdateProgress: (id: number, progress: number) => void
  onEdit?: (project: any) => void
}

export function ProjectsGrid({ projects, onDelete, onUpdateStatus, onEdit }: ProjectsGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-600 dark:text-green-500 border-green-500/50"
      case "active":
      case "in-progress":
        return "bg-blue-500/20 text-blue-600 dark:text-blue-500 border-blue-500/50"
      case "on-hold":
        return "bg-orange-500/20 text-orange-600 dark:text-orange-500 border-orange-500/50"
      case "pending":
        return "bg-muted text-muted-foreground border-border"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-600 dark:text-red-500 border-red-500/50"
      case "medium":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-500 border-yellow-500/50"
      case "low":
        return "bg-muted text-muted-foreground border-border"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="bg-card border-border hover:border-accent/50 transition-all hover:shadow-lg flex flex-col"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground flex-1">{project.name}</h3>
              <div className="flex gap-1">
                {onEdit && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(project)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(project.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{project.client}</p>
            <p className="text-xs text-muted-foreground mt-1">{project.description}</p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between gap-4">
            {/* Status & Priority */}
            <div className="flex gap-2 flex-wrap">
              <Badge className={`${getStatusColor(project.status)}`} variant="outline">
                <span className="mr-1">{getStatusIcon(project.status)}</span>
                {project.status === "in-progress"
                  ? "In Progress"
                  : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
              <Badge className={`${getPriorityColor(project.priority)}`} variant="outline">
                {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
              </Badge>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-foreground">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2 bg-secondary" />
            </div>

            {/* Budget */}
            <div className="flex items-center justify-between text-sm border-t border-border pt-3">
              <span className="text-muted-foreground">Budget</span>
              <div className="text-right">
                <p className="font-semibold text-foreground">{project.spent}</p>
                <p className="text-xs text-muted-foreground">of {project.budget}</p>
              </div>
            </div>

            {/* Due Date */}
            <p className="text-xs text-muted-foreground text-center">
              Due: {new Date(project.dueDate).toLocaleDateString()}
            </p>

            {/* Status Button */}
            {project.status !== "completed" && (
              <Button
                size="sm"
                onClick={() => onUpdateStatus(project.id, "completed")}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-2"
              >
                Mark Complete
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
