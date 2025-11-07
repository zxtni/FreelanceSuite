"use client"

/**
 * Invoices Management Page
 * Create, track, and manage all invoices
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

import { useState, useEffect } from "react"
import { InvoicesStats } from "@/components/invoices/invoices-stats"
import { InvoicesTable } from "@/components/invoices/invoices-table"
import { AddInvoiceDialog } from "@/components/invoices/add-invoice-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Loader2 } from "lucide-react"
import { withAuth } from "@/lib/with-auth"
import { Invoice } from "@/lib/types"
import { toast } from "sonner"

// Local interface for display
interface InvoiceDisplay {
  id: number
  client: string
  clientEmail?: string
  amount: string
  amountValue: number
  status: string
  issueDate: string
  dueDate: string
  project: string
  items: any[]
  notes: string
  emailsSent?: any[]
}

function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices')
      if (response.ok) {
        const data = await response.json()
        // Sort by creation date, newest first
        const sortedData = data.sort((a: Invoice, b: Invoice) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setInvoices(sortedData)
      }
    } catch (error) {
      console.error('Failed to fetch invoices:', error)
      toast.error('Failed to load invoices')
    } finally {
      setIsLoading(false)
    }
  }

  // Convert API invoices to display format
  const invoicesDisplay: InvoiceDisplay[] = invoices.map(inv => ({
    id: parseInt(inv.id),
    client: inv.clientName,
    clientEmail: inv.clientEmail,
    amount: `₹${inv.amount.toLocaleString()}`,
    amountValue: inv.amount,
    status: inv.status,
    issueDate: inv.issueDate,
    dueDate: inv.dueDate,
    project: inv.projectName,
    items: inv.items || [],
    notes: '',
    emailsSent: inv.emailsSent,
  }))

  const filteredInvoices = invoicesDisplay.filter((invoice) => {
    const matchesSearch =
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleAddInvoice = async (newInvoice: any) => {
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: newInvoice.client, // Will be updated with actual client ID
          clientName: newInvoice.client,
          clientEmail: newInvoice.clientEmail,
          projectId: newInvoice.projectId,
          projectName: newInvoice.projectName,
          amount: parseFloat(newInvoice.amount.replace(/[₹,]/g, '')) || 0,
          status: 'pending',
          issueDate: newInvoice.issueDate || new Date().toISOString().split('T')[0],
          dueDate: newInvoice.dueDate,
          items: newInvoice.items || [],
        }),
      })

      if (response.ok) {
        await fetchInvoices()
        setIsAddDialogOpen(false)
        toast.success('Invoice added successfully')
      } else {
        toast.error('Failed to add invoice')
      }
    } catch (error) {
      console.error('Failed to add invoice:', error)
      toast.error('Failed to add invoice')
    }
  }

  const handleDeleteInvoice = async (id: number) => {
    try {
      const response = await fetch(`/api/invoices?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchInvoices()
        toast.success('Invoice deleted successfully')
      } else {
        toast.error('Failed to delete invoice')
      }
    } catch (error) {
      console.error('Failed to delete invoice:', error)
      toast.error('Failed to delete invoice')
    }
  }

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const invoice = invoices.find((i) => i.id === id.toString())
      if (!invoice) return

      const response = await fetch('/api/invoices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...invoice, 
          status: newStatus as any,
          paidDate: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : undefined
        }),
      })

      if (response.ok) {
        await fetchInvoices()
        toast.success('Invoice status updated')
      } else {
        toast.error('Failed to update invoice')
      }
    } catch (error) {
      console.error('Failed to update invoice:', error)
      toast.error('Failed to update invoice')
    }
  }

  const handleExportInvoices = () => {
    // Export as CSV
    const csvContent = [
      ['Invoice ID', 'Client', 'Email', 'Amount', 'Status', 'Issue Date', 'Due Date', 'Project'],
      ...filteredInvoices.map(inv => [
        `#${inv.id}`,
        inv.client,
        inv.clientEmail || '',
        inv.amount,
        inv.status,
        new Date(inv.issueDate).toLocaleDateString(),
        new Date(inv.dueDate).toLocaleDateString(),
        inv.project
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `invoices_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('Invoices exported successfully!')
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
          <p className="text-muted-foreground font-medium animate-pulse">Loading invoices...</p>
        </div>
      </div>
    )
  }

  // Calculate stats
  const totalRevenue = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0)
  const pendingPayments = invoices
    .filter(i => i.status === 'pending' || i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0)
  const paidInvoices = invoices.filter(i => i.status === 'paid').length

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
        <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Invoices</h1>
        <p className="text-muted-foreground text-lg">Manage and track your invoices and payments</p>
      </div>

      {/* Stats Section */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-100">
        <InvoicesStats 
          totalRevenue={totalRevenue}
          pendingPayments={pendingPayments}
          totalInvoices={invoices.length}
          paidInvoices={paidInvoices}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left duration-700 delay-200">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 bg-card/80 backdrop-blur-xl border-border text-foreground h-12 shadow-md hover:shadow-lg transition-all duration-300 focus:shadow-xl"
            />
          </div>
          <Tabs value={filterStatus} onValueChange={setFilterStatus} className="w-auto">
            <TabsList className="bg-card/80 backdrop-blur-xl border border-border shadow-md h-12">
              <TabsTrigger value="all" className="font-medium">All</TabsTrigger>
              <TabsTrigger value="paid" className="font-medium">Paid</TabsTrigger>
              <TabsTrigger value="pending" className="font-medium">Pending</TabsTrigger>
              <TabsTrigger value="overdue" className="font-medium">Overdue</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="outline"
            onClick={handleExportInvoices}
            className="border-border text-foreground gap-2 h-12 px-5 hover:shadow-md transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Export</span>
          </Button>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 h-12 px-6 shadow-md hover:shadow-lg"
          >
            <span className="hidden sm:inline">Add Invoice</span>
            <span className="sm:hidden">+</span>
          </Button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        <InvoicesTable invoices={filteredInvoices} onDelete={handleDeleteInvoice} onUpdateStatus={handleUpdateStatus} />
      </div>

      {/* Add Invoice Dialog */}
      {isAddDialogOpen && (
        <AddInvoiceDialog
          onAddInvoice={handleAddInvoice}
          isOpen={isAddDialogOpen}
          setIsOpen={setIsAddDialogOpen}
        />
      )}
    </div>
  )
}

export default withAuth(InvoicesPage)
