"use client"

/**
 * Clients Management Page
 * View, add, edit, and manage all clients
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

import { useState, useEffect } from "react"
import { ClientsTable } from "@/components/clients/clients-table"
import { AddClientDialog } from "@/components/clients/add-client-dialog"
import { ClientsStats } from "@/components/clients/clients-stats"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { withAuth } from "@/lib/with-auth"
import { Client, Invoice } from "@/lib/types"
import { toast } from "sonner"

// Client display interface - www.zxtni.dev
interface ClientDisplay {
  id: number
  name: string
  email: string
  phone: string
  company: string
  status: string
  totalSpent: string
  lastProject: string
  joinDate: string
}

function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Fetch clients on mount
  useEffect(() => {
    fetchClients()
    fetchInvoices()
  }, [])

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients')
      if (response.ok) {
        const data = await response.json()
        // Sort by creation date, newest first
        const sortedData = data.sort((a: Client, b: Client) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setClients(sortedData)
      }
    } catch (error) {
      console.error('Failed to fetch clients:', error)
      toast.error('Failed to load clients')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices')
      if (response.ok) {
        const data = await response.json()
        setInvoices(data)
      }
    } catch (error) {
      console.error('Failed to fetch invoices:', error)
    }
  }

  // Convert API clients to display format
  const clientsDisplay: ClientDisplay[] = clients.map(c => ({
    id: parseInt(c.id),
    name: c.name,
    email: c.email,
    phone: c.phone,
    company: c.company,
    status: c.status,
    totalSpent: `₹${c.totalRevenue.toLocaleString()}`,
    lastProject: c.totalProjects > 0 ? `${c.totalProjects} projects` : 'No projects',
    joinDate: new Date(c.createdAt).toISOString().split('T')[0],
  }))

  const filteredClients = clientsDisplay.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddClient = async (newClient: any) => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newClient,
          status: 'active',
        }),
      })

      if (response.ok) {
        await fetchClients() // Refresh the list
        setIsAddDialogOpen(false)
        toast.success('Client added successfully')
      } else {
        toast.error('Failed to add client')
      }
    } catch (error) {
      console.error('Failed to add client:', error)
      toast.error('Failed to add client')
    }
  }

  const handleDeleteClient = async (id: number) => {
    try {
      const response = await fetch(`/api/clients?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchClients() // Refresh the list
        toast.success('Client deleted successfully')
      } else {
        toast.error('Failed to delete client')
      }
    } catch (error) {
      console.error('Failed to delete client:', error)
      toast.error('Failed to delete client')
    }
  }

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const client = clients.find((c) => c.id === id.toString())
      if (!client) return

      const response = await fetch('/api/clients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...client, status: newStatus as 'active' | 'inactive' }),
      })

      if (response.ok) {
        await fetchClients() // Refresh the list
        toast.success('Client status updated')
      } else {
        toast.error('Failed to update client')
      }
    } catch (error) {
      console.error('Failed to update client:', error)
      toast.error('Failed to update client')
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
          <p className="text-muted-foreground font-medium animate-pulse">Loading clients...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
        <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Clients</h1>
        <p className="text-muted-foreground text-lg">Manage your client relationships and track their projects</p>
      </div>

      {/* Stats Section */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-100">
        <ClientsStats 
          totalClients={clients.length} 
          activeClients={clients.filter((c) => c.status === "active").length}
          invoices={invoices}
        />
      </div>

      {/* Controls */}
      <div className="flex gap-4 items-center animate-in fade-in slide-in-from-left duration-700 delay-200">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search clients by name, email, or company..."
            className="pl-11 bg-card/80 backdrop-blur-xl border-border h-12 shadow-md hover:shadow-lg transition-all duration-300 focus:shadow-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddClientDialog onAddClient={handleAddClient} isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} />
      </div>

      {/* Clients Table */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        <ClientsTable clients={filteredClients} onDelete={handleDeleteClient} onUpdateStatus={handleUpdateStatus} />
      </div>
    </div>
  )
}

export default withAuth(ClientsPage)