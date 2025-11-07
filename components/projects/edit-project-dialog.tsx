"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Client } from "@/lib/types"

interface EditProjectDialogProps {
  project: any
  clients: Client[]
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onUpdateProject: (updatedProject: any) => void
}

export function EditProjectDialog({ 
  project, 
  clients,
  isOpen, 
  setIsOpen, 
  onUpdateProject 
}: EditProjectDialogProps) {
  const [formData, setFormData] = useState({
    name: project.name,
    clientId: project.clientId || "1",
    clientName: project.client,
    status: project.status,
    progress: project.progress,
    budget: project.budget.replace(/[₹,]/g, ''),
    spent: project.spent.replace(/[₹,]/g, ''),
    deadline: project.dueDate,
    description: project.description,
  })

  useEffect(() => {
    setFormData({
      name: project.name,
      clientId: project.clientId || "1",
      clientName: project.client,
      status: project.status,
      progress: project.progress,
      budget: project.budget.replace(/[₹,]/g, ''),
      spent: project.spent.replace(/[₹,]/g, ''),
      deadline: project.dueDate,
      description: project.description,
    })
  }, [project])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const selectedClient = clients.find(c => c.id === formData.clientId)
    
    onUpdateProject({
      ...project,
      name: formData.name,
      clientId: formData.clientId,
      client: selectedClient?.name || formData.clientName,
      clientName: selectedClient?.name || formData.clientName,
      status: formData.status,
      progress: formData.progress,
      budget: `₹${parseFloat(formData.budget).toLocaleString()}`,
      spent: `₹${parseFloat(formData.spent).toLocaleString()}`,
      dueDate: formData.deadline,
      description: formData.description,
    })
    
    setIsOpen(false)
  }

  const handleClientChange = (clientId: string) => {
    const selectedClient = clients.find(c => c.id === clientId)
    setFormData(prev => ({
      ...prev,
      clientId,
      clientName: selectedClient?.name || prev.clientName,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Project Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-secondary border-border text-foreground"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client" className="text-foreground">
                Client *
              </Label>
              <Select value={formData.clientId} onValueChange={handleClientChange}>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-foreground">
                Status *
              </Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-foreground">
                Deadline *
              </Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                className="bg-secondary border-border text-foreground"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground flex items-center justify-between">
              <span>Progress: {formData.progress}%</span>
            </Label>
            <Slider
              value={[formData.progress]}
              onValueChange={(value) => setFormData(prev => ({ ...prev, progress: value[0] }))}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-foreground">
                Budget (₹)
              </Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="bg-secondary border-border text-foreground"
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="spent" className="text-foreground">
                Spent (₹)
              </Label>
              <Input
                id="spent"
                type="number"
                value={formData.spent}
                onChange={(e) => setFormData(prev => ({ ...prev, spent: e.target.value }))}
                className="bg-secondary border-border text-foreground"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-secondary border-border text-foreground"
              placeholder="Project description..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 border-border text-foreground"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
