"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Trash2, CheckCircle2, XCircle } from "lucide-react"

interface Client {
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

interface ClientsTableProps {
  clients: Client[]
  onDelete: (id: number) => void
  onUpdateStatus: (id: number, status: string) => void
}

export function ClientsTable({ clients, onDelete, onUpdateStatus }: ClientsTableProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">All Clients ({clients.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Client</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Company</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Total Spent</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Last Project</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-medium text-foreground">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.joinDate}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Mail className="w-4 h-4" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-foreground">{client.company}</td>
                  <td className="py-4 px-4">
                    <Badge
                      className={
                        client.status === "active"
                          ? "bg-green-500/20 text-green-600 dark:text-green-500 border-green-500/50"
                          : "bg-muted text-muted-foreground border-border"
                      }
                      variant="outline"
                    >
                      {client.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-foreground">{client.totalSpent}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{client.lastProject}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onUpdateStatus(client.id, client.status === "active" ? "inactive" : "active")}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {client.status === "active" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(client.id)}
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
