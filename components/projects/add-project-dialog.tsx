"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

interface AddProjectDialogProps {
  onAddProject: (project: any) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function AddProjectDialog({ onAddProject, isOpen, setIsOpen }: AddProjectDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    status: "pending",
    priority: "medium",
    budget: "",
    dueDate: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.client && formData.dueDate) {
      onAddProject(formData)
      setFormData({
        name: "",
        client: "",
        status: "pending",
        priority: "medium",
        budget: "",
        dueDate: "",
        description: "",
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Project Name *
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Website Redesign"
              value={formData.name}
              onChange={handleChange}
              className="bg-secondary border-border text-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client" className="text-foreground">
              Client Name *
            </Label>
            <Input
              id="client"
              name="client"
              placeholder="e.g., ABC Corporation"
              value={formData.client}
              onChange={handleChange}
              className="bg-secondary border-border text-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Project details..."
              value={formData.description}
              onChange={handleChange}
              className="bg-secondary border-border text-foreground min-h-24"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-foreground">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="pending" className="text-foreground">
                    Pending
                  </SelectItem>
                  <SelectItem value="in-progress" className="text-foreground">
                    In Progress
                  </SelectItem>
                  <SelectItem value="completed" className="text-foreground">
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-foreground">
                Priority
              </Label>
              <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="low" className="text-foreground">
                    Low
                  </SelectItem>
                  <SelectItem value="medium" className="text-foreground">
                    Medium
                  </SelectItem>
                  <SelectItem value="high" className="text-foreground">
                    High
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-foreground">
              Budget
            </Label>
            <Input
              id="budget"
              name="budget"
              placeholder="e.g., ₹5,000"
              value={formData.budget}
              onChange={handleChange}
              className="bg-secondary border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-foreground">
              Due Date *
            </Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="bg-secondary border-border text-foreground"
              required
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
              Add Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
