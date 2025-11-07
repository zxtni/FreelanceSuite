"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trash2 } from "lucide-react"

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
  [key: string]: any
}

interface ProjectsTableProps {
  projects: Project[]
  onDelete: (id: number) => void
  onUpdateStatus: (id: number, status: string) => void
  onUpdateProgress: (id: number, progress: number) => void
}

export function ProjectsTable({ projects, onDelete, onUpdateStatus }: ProjectsTableProps) {
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
        return "bg-green-500/20 text-green-600 dark:text-green-500 border-green-500/50"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">All Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Project</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Client</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Priority</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Progress</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Budget</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Due Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-medium text-foreground">{project.name}</p>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{project.client}</td>
                  <td className="py-4 px-4">
                    <Badge className={`${getStatusColor(project.status)}`} variant="outline">
                      {project.status === "in-progress"
                        ? "In Progress"
                        : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={`${getPriorityColor(project.priority)}`} variant="outline">
                      {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <Progress value={project.progress} className="h-2 w-32 bg-secondary" />
                      <p className="text-xs text-muted-foreground">{project.progress}%</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">{project.spent}</p>
                    <p className="text-xs">of {project.budget}</p>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {new Date(project.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {project.status !== "completed" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onUpdateStatus(project.id, "completed")}
                          className="text-green-500 hover:text-green-400"
                        >
                          Complete
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
