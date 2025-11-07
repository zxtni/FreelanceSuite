"use client"

/**
 * Projects Management Page
 * Track and manage all freelance projects
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

import { useState, useEffect } from "react"
import { ProjectsStats } from "@/components/projects/projects-stats"
import { ProjectsGrid } from "@/components/projects/projects-grid"
import { ProjectsTable } from "@/components/projects/projects-table"
import { AddProjectDialog } from "@/components/projects/add-project-dialog"
import { EditProjectDialog } from "@/components/projects/edit-project-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, LayoutGrid, List, Loader2 } from "lucide-react"
import { withAuth } from "@/lib/with-auth"
import { Project, Client } from "@/lib/types"
import { toast } from "sonner"

// Local interface for display
interface ProjectDisplay {
  id: number
  name: string
  client: string
  clientId?: string
  status: string
  priority: string
  progress: number
  dueDate: string
  budget: string
  spent: string
  description: string
  team: string[]
}

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectDisplay | null>(null)

  useEffect(() => {
    fetchProjects()
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients')
      if (response.ok) {
        const data = await response.json()
        setClients(data)
      }
    } catch (error) {
      console.error('Failed to fetch clients:', error)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        // Sort by creation date, newest first
        const sortedData = data.sort((a: Project, b: Project) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setProjects(sortedData)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      toast.error('Failed to load projects')
    } finally {
      setIsLoading(false)
    }
  }

  // Convert API projects to display format
  const projectsDisplay: ProjectDisplay[] = projects.map(p => ({
    id: parseInt(p.id),
    name: p.name,
    client: p.clientName,
    clientId: p.clientId,
    status: p.status,
    priority: p.budget > 50000 ? 'high' : p.budget > 20000 ? 'medium' : 'low',
    progress: p.progress,
    dueDate: p.deadline,
    budget: `₹${p.budget.toLocaleString()}`,
    spent: `₹${p.spent.toLocaleString()}`,
    description: p.description,
    team: [], // We don't have team data in the API yet
  }))

  const filteredProjects = projectsDisplay.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || project.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleAddProject = async (newProject: any) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProject.name,
          clientId: "1", // You'd need to select a client
          clientName: newProject.client,
          status: newProject.status || 'active',
          progress: 0,
          budget: parseFloat(newProject.budget.replace(/[₹,]/g, '')) || 0,
          spent: 0,
          deadline: newProject.dueDate,
          startDate: new Date().toISOString().split('T')[0],
          description: newProject.description || '',
        }),
      })

      if (response.ok) {
        await fetchProjects()
        setIsAddDialogOpen(false)
        toast.success('Project added successfully')
      } else {
        toast.error('Failed to add project')
      }
    } catch (error) {
      console.error('Failed to add project:', error)
      toast.error('Failed to add project')
    }
  }

  const handleDeleteProject = async (id: number) => {
    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchProjects()
        toast.success('Project deleted successfully')
      } else {
        toast.error('Failed to delete project')
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
      toast.error('Failed to delete project')
    }
  }

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const project = projects.find((p) => p.id === id.toString())
      if (!project) return

      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...project, 
          status: newStatus as any,
          progress: newStatus === 'completed' ? 100 : project.progress
        }),
      })

      if (response.ok) {
        await fetchProjects()
        toast.success('Project status updated')
      } else {
        toast.error('Failed to update project')
      }
    } catch (error) {
      console.error('Failed to update project:', error)
      toast.error('Failed to update project')
    }
  }

  const handleUpdateProgress = async (id: number, newProgress: number) => {
    try {
      const project = projects.find((p) => p.id === id.toString())
      if (!project) return

      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...project, progress: newProgress }),
      })

      if (response.ok) {
        await fetchProjects()
        toast.success('Progress updated')
      } else {
        toast.error('Failed to update progress')
      }
    } catch (error) {
      console.error('Failed to update progress:', error)
      toast.error('Failed to update progress')
    }
  }

  const handleEditProject = (project: ProjectDisplay) => {
    setSelectedProject(project)
    setIsEditDialogOpen(true)
  }

  const handleUpdateProject = async (updatedProject: ProjectDisplay) => {
    try {
      const project = projects.find((p) => p.id === updatedProject.id.toString())
      if (!project) return

      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...project,
          name: updatedProject.name,
          clientId: updatedProject.clientId,
          clientName: updatedProject.client,
          status: updatedProject.status,
          progress: updatedProject.progress,
          budget: parseFloat(updatedProject.budget.replace(/[₹,]/g, '')),
          spent: parseFloat(updatedProject.spent.replace(/[₹,]/g, '')),
          deadline: updatedProject.dueDate,
          description: updatedProject.description,
        }),
      })

      if (response.ok) {
        await fetchProjects()
        toast.success('Project updated successfully')
      } else {
        toast.error('Failed to update project')
      }
    } catch (error) {
      console.error('Failed to update project:', error)
      toast.error('Failed to update project')
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-6 animate-in zoom-in-95 duration-500">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full bg-primary/20" />
            <div className="absolute inset-0 h-16 w-16 animate-pulse rounded-full bg-accent/10" />
          </div>
          <p className="text-muted-foreground font-medium animate-pulse">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
        <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Projects</h1>
        <p className="text-muted-foreground text-lg">Track and manage your client projects</p>
      </div>

      {/* Stats Section */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-100">
        <ProjectsStats projects={filteredProjects} />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left duration-700 delay-200">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 bg-card/80 backdrop-blur-xl border-border text-foreground h-12 shadow-md hover:shadow-lg transition-all duration-300 focus:shadow-xl"
            />
          </div>
          <Tabs value={filterStatus} onValueChange={setFilterStatus} className="w-auto">
            <TabsList className="bg-card/80 backdrop-blur-xl border border-border shadow-md h-12">
              <TabsTrigger value="all" className="font-medium">All</TabsTrigger>
              <TabsTrigger value="active" className="font-medium">Active</TabsTrigger>
              <TabsTrigger value="completed" className="font-medium">Completed</TabsTrigger>
              <TabsTrigger value="on-hold" className="font-medium">On Hold</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon-lg"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-accent shadow-md" : "border-border hover:shadow-md"}
            >
              <LayoutGrid className="w-5 h-5" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon-lg"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-accent shadow-md" : "border-border hover:shadow-md"}
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 h-12 px-6 shadow-md hover:shadow-lg"
          >
            <span className="hidden sm:inline font-medium">Add Project</span>
            <span className="sm:hidden text-lg">+</span>
          </Button>
        </div>
      </div>

      {/* Projects Display */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        {viewMode === "grid" ? (
          <ProjectsGrid
            projects={filteredProjects}
            onDelete={handleDeleteProject}
            onUpdateStatus={handleUpdateStatus}
            onUpdateProgress={handleUpdateProgress}
            onEdit={handleEditProject}
          />
        ) : (
          <ProjectsTable
            projects={filteredProjects}
            onDelete={handleDeleteProject}
            onUpdateStatus={handleUpdateStatus}
            onUpdateProgress={handleUpdateProgress}
          />
        )}
      </div>

      {/* Add Project Dialog */}
      {isAddDialogOpen && (
        <AddProjectDialog
          onAddProject={handleAddProject}
          isOpen={isAddDialogOpen}
          setIsOpen={setIsAddDialogOpen}
        />
      )}

      {/* Edit Project Dialog */}
      {isEditDialogOpen && selectedProject && (
        <EditProjectDialog
          project={selectedProject}
          clients={clients}
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          onUpdateProject={handleUpdateProject}
        />
      )}
    </div>
  )
}

export default withAuth(ProjectsPage)
