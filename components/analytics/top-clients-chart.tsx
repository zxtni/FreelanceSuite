"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import invoicesData from "@/data/invoices.json"
import clientsData from "@/data/clients.json"

export function TopClientsChart() {
  const clientRevenue = clientsData.clients.map((client: any) => {
    const revenue = invoicesData.invoices
      .filter((inv: any) => inv.clientId === client.id && inv.status === "paid")
      .reduce((sum: number, inv: any) => sum + inv.amount, 0)
    return { name: client.name.length > 15 ? client.name.substring(0, 15) + `...` : client.name, revenue }
  }).sort((a: any, b: any) => b.revenue - a.revenue).slice(0, 5)

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground text-xl">Top Clients</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Highest revenue generating clients</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={clientRevenue} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" tick={{ fill: `hsl(var(--muted-foreground))` }} tickFormatter={(value) => `?${(value / 100000).toFixed(1)}L`} />
            <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fill: `hsl(var(--muted-foreground))` }} width={120} />
            <Tooltip contentStyle={{ backgroundColor: `hsl(var(--card))`, border: `1px solid hsl(var(--border))`, borderRadius: `8px`, color: `hsl(var(--foreground))` }} formatter={(value: number) => [`?${value.toLocaleString(`en-IN`)}`, `Revenue`]} />
            <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
