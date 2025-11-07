"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Eye, Mail, CheckCircle2, PartyPopper, DollarSign, Package, MoreVertical, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface EmailSentRecord {
  template: string
  sentAt: string
  sentTo: string
}

interface Invoice {
  id: number
  client: string
  clientEmail?: string
  amount: string
  status: string
  issueDate: string
  dueDate: string
  items: any[]
  notes: string
  emailsSent?: EmailSentRecord[]
}

interface InvoicesTableProps {
  invoices: Invoice[]
  onDelete: (id: number) => void
  onUpdateStatus: (id: number, status: string) => void
}

export function InvoicesTable({ invoices, onDelete, onUpdateStatus }: InvoicesTableProps) {
  const [sendingEmail, setSendingEmail] = useState<{ id: number; template: string } | null>(null)
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-600 dark:text-green-500 border-green-500/50"
      case "pending":
        return "bg-blue-500/20 text-blue-600 dark:text-blue-500 border-blue-500/50"
      case "overdue":
        return "bg-red-500/20 text-red-600 dark:text-red-500 border-red-500/50"
      case "draft":
        return "bg-muted text-muted-foreground border-border"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "overdue":
        return "Overdue"
      case "in-progress":
        return "Pending"
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  const handleSendEmail = async (invoice: Invoice, template: 'welcome' | 'payment-received' | 'project-delivery') => {
    if (!invoice.clientEmail) {
      toast.error('No email address', {
        description: 'This invoice does not have a client email address.',
      })
      return
    }

    setSendingEmail({ id: invoice.id, template })

    try {
      const response = await fetch('/api/invoices/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: invoice.id.toString(),
          template,
          clientEmail: invoice.clientEmail,
          clientName: invoice.client,
          projectName: `Invoice #${invoice.id}`,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Email sent!', {
          description: `${template.replace('-', ' ')} email sent to ${invoice.clientEmail}`,
        })
        // Update the invoice locally to show the email was sent
        const emailRecord = {
          template,
          sentAt: new Date().toISOString(),
          sentTo: invoice.clientEmail || '',
        }
        if (!invoice.emailsSent) {
          invoice.emailsSent = []
        }
        invoice.emailsSent.push(emailRecord)
      } else {
        toast.error('Failed to send email', {
          description: result.error || 'Something went wrong',
        })
      }
    } catch (error) {
      toast.error('Failed to send email', {
        description: 'Please check your connection and try again',
      })
    } finally {
      setSendingEmail(null)
    }
  }

  const hasEmailBeenSent = (invoice: Invoice, template: string) => {
    return invoice.emailsSent?.some(record => record.template === template) || false
  }

  const getEmailSentDate = (invoice: Invoice, template: string) => {
    const record = invoice.emailsSent?.find(record => record.template === template)
    return record ? new Date(record.sentAt).toLocaleDateString() : null
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">All Invoices ({invoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground w-[100px]">Invoice ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground w-[180px]">Client</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground w-[120px]">Amount</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground w-[100px]">Status</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground w-[120px]">Due Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground w-[200px]">Emails</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground w-[200px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-4 w-[100px]">
                    <p className="font-semibold text-foreground">#{invoice.id}</p>
                  </td>
                  <td className="py-4 px-4 w-[180px]">
                    <p className="text-sm text-foreground font-medium">{invoice.client}</p>
                    {invoice.clientEmail && (
                      <p className="text-xs text-muted-foreground truncate max-w-[160px]">{invoice.clientEmail}</p>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right w-[120px]">
                    <p className="font-semibold text-foreground">{invoice.amount}</p>
                  </td>
                  <td className="py-4 px-4 text-center w-[100px]">
                    <div className="flex justify-center">
                      <Badge className={`${getStatusColor(invoice.status)}`} variant="outline">
                        {getStatusLabel(invoice.status)}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-muted-foreground w-[120px]">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 w-[200px]">
                    <div className="flex flex-col gap-1">
                      {hasEmailBeenSent(invoice, 'welcome') && (
                        <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-500">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">Welcome ({getEmailSentDate(invoice, 'welcome')})</span>
                        </div>
                      )}
                      {hasEmailBeenSent(invoice, 'payment-received') && (
                        <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-500">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">Payment ({getEmailSentDate(invoice, 'payment-received')})</span>
                        </div>
                      )}
                      {hasEmailBeenSent(invoice, 'project-delivery') && (
                        <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-500">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">Delivery ({getEmailSentDate(invoice, 'project-delivery')})</span>
                        </div>
                      )}
                      {!invoice.emailsSent?.length && (
                        <span className="text-xs text-muted-foreground">No emails sent</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 w-[200px]">
                    <div className="flex items-center justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64">
                          <DropdownMenuLabel className="font-semibold">Invoice Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          
                          {/* View Invoice */}
                          <DropdownMenuItem 
                            onClick={() => setViewingInvoice(invoice)}
                            className="cursor-pointer"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            <span>View Invoice</span>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />
                          <DropdownMenuLabel className="font-semibold text-xs">Send Email</DropdownMenuLabel>
                          
                          {/* Email Templates */}
                          <DropdownMenuItem 
                            onClick={() => handleSendEmail(invoice, 'welcome')}
                            disabled={!invoice.clientEmail || sendingEmail?.id === invoice.id}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <PartyPopper className="w-4 h-4 text-purple-500" />
                                <span>Welcome Email</span>
                              </div>
                              {hasEmailBeenSent(invoice, 'welcome') && (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            onClick={() => handleSendEmail(invoice, 'payment-received')}
                            disabled={!invoice.clientEmail || sendingEmail?.id === invoice.id}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-green-500" />
                                <span>Payment Received</span>
                              </div>
                              {hasEmailBeenSent(invoice, 'payment-received') && (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            onClick={() => handleSendEmail(invoice, 'project-delivery')}
                            disabled={!invoice.clientEmail || sendingEmail?.id === invoice.id}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <Package className="w-4 h-4 text-pink-500" />
                                <span>Project Delivery</span>
                              </div>
                              {hasEmailBeenSent(invoice, 'project-delivery') && (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          </DropdownMenuItem>

                          {sendingEmail?.id === invoice.id && (
                            <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                              <Mail className="w-4 h-4 mr-2 animate-pulse" />
                              Sending {sendingEmail.template}...
                            </DropdownMenuItem>
                          )}

                          {!invoice.clientEmail && (
                            <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                              <Mail className="w-4 h-4 mr-2" />
                              No email address
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />
                          
                          {/* Mark Paid */}
                          {invoice.status === "pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => onUpdateStatus(invoice.id, "paid")}
                                className="cursor-pointer text-green-600"
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                <span>Mark as Paid</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}

                          {/* Delete Invoice */}
                          <DropdownMenuItem
                            onClick={() => onDelete(invoice.id)}
                            className="cursor-pointer text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            <span>Delete Invoice</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    {/* View Invoice Dialog */}
    <Dialog open={!!viewingInvoice} onOpenChange={(open) => !open && setViewingInvoice(null)}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-2xl">Invoice #{viewingInvoice?.id}</DialogTitle>
          <DialogDescription>
            Invoice details and information
          </DialogDescription>
        </DialogHeader>
        {viewingInvoice && (
          <div className="px-6 py-6 space-y-6 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* Client Info */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">Client Information</h3>
              <div className="bg-secondary/50 rounded-lg p-4 space-y-1">
                <p className="font-semibold text-lg break-words">{viewingInvoice.client}</p>
                {viewingInvoice.clientEmail && (
                  <p className="text-sm text-muted-foreground break-all">{viewingInvoice.clientEmail}</p>
                )}
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Amount</h3>
                <p className="text-2xl font-bold text-foreground break-words">{viewingInvoice.amount}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Status</h3>
                <Badge className={`${getStatusColor(viewingInvoice.status)} text-sm`} variant="outline">
                  {getStatusLabel(viewingInvoice.status)}
                </Badge>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Issue Date</h3>
                <p className="text-lg font-semibold text-foreground break-words">{new Date(viewingInvoice.issueDate).toLocaleDateString()}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Due Date</h3>
                <p className="text-lg font-semibold text-foreground break-words">{new Date(viewingInvoice.dueDate).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Items */}
            {viewingInvoice.items && viewingInvoice.items.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase">Items</h3>
                <div className="border rounded-lg overflow-hidden w-full">
                  <table className="w-full table-fixed">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left p-3 text-sm font-semibold w-[40%]">Description</th>
                        <th className="text-right p-3 text-sm font-semibold w-[20%]">Quantity</th>
                        <th className="text-right p-3 text-sm font-semibold w-[20%]">Rate</th>
                        <th className="text-right p-3 text-sm font-semibold w-[20%]">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewingInvoice.items.map((item: any, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="p-3 break-words">{item.description}</td>
                          <td className="p-3 text-right">{item.quantity}</td>
                          <td className="p-3 text-right">₹{item.rate}</td>
                          <td className="p-3 text-right font-semibold">₹{item.quantity * item.rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Notes */}
            {viewingInvoice.notes && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase">Notes</h3>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <p className="text-sm text-foreground whitespace-pre-wrap break-words">{viewingInvoice.notes}</p>
                </div>
              </div>
            )}

            {/* Email History */}
            {viewingInvoice.emailsSent && viewingInvoice.emailsSent.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase">Email History</h3>
                <div className="space-y-2">
                  {viewingInvoice.emailsSent.map((email, index) => (
                    <div key={index} className="flex flex-wrap items-center gap-2 text-sm bg-secondary/50 rounded-lg p-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="font-medium break-words">{email.template.replace('-', ' ')}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground break-words">{new Date(email.sentAt).toLocaleString()}</span>
                      <span className="text-muted-foreground">to</span>
                      <span className="text-muted-foreground break-all">{email.sentTo}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
    </>
  )
}
