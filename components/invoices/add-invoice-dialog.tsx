"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

interface Project {
  id: string
  name: string
  clientName: string
  status: string
}

interface AddInvoiceDialogProps {
  onAddInvoice: (invoice: any) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function AddInvoiceDialog({ onAddInvoice, isOpen, setIsOpen }: AddInvoiceDialogProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    projectId: "",
    client: "",
    clientEmail: "",
    amount: "",
    issueDate: "",
    dueDate: "",
    notes: "",
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  }

  const handleProjectSelect = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    if (project) {
      setSelectedProject(project)
      setFormData(prev => ({
        ...prev,
        projectId: project.id,
        client: project.clientName,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.projectId && formData.client && formData.amount && formData.dueDate) {
      onAddInvoice({
        ...formData,
        projectName: selectedProject?.name || 'Unnamed Project',
        amountValue: Number.parseFloat(formData.amount.replace(/[₹,]/g, "")),
      })
      setFormData({
        projectId: "",
        client: "",
        clientEmail: "",
        amount: "",
        issueDate: "",
        dueDate: "",
        notes: "",
      })
      setSelectedProject(null)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
          <Plus className="w-4 h-4" />
          New Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create New Invoice</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project" className="text-foreground">
              Select Project *
            </Label>
            <Select value={formData.projectId} onValueChange={handleProjectSelect}>
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue placeholder="Choose a project..." />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{project.name}</span>
                      <span className="text-xs text-muted-foreground">{project.clientName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="client" className="text-foreground">
              Client Name
            </Label>
            <Input
              id="client"
              name="client"
              placeholder="Auto-filled from project"
              value={formData.client}
              onChange={handleChange}
              className="bg-secondary border-border text-foreground"
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientEmail" className="text-foreground">
              Client Email *
            </Label>
            <Input
              id="clientEmail"
              name="clientEmail"
              type="email"
              placeholder="e.g., client@company.com"
              value={formData.clientEmail}
              onChange={handleChange}
              className="bg-secondary border-border text-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground">
              Invoice Amount *
            </Label>
            <Input
              id="amount"
              name="amount"
              placeholder="e.g., ₹5,000"
              value={formData.amount}
              onChange={handleChange}
              className="bg-secondary border-border text-foreground"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate" className="text-foreground">
                Issue Date
              </Label>
              <Input
                id="issueDate"
                name="issueDate"
                type="date"
                value={formData.issueDate}
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
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-foreground">
              Notes
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Add payment terms, notes, or special instructions..."
              value={formData.notes}
              onChange={handleChange}
              className="bg-secondary border-border text-foreground min-h-20"
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
              Create Invoice
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
