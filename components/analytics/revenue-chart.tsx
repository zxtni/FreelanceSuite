"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import invoicesData from "@/data/invoices.json"

function monthLabel(monthIndex: number) {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][monthIndex]
}

export function RevenueChart() {
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({ month: monthLabel(i), revenue: 0 }))
  
  invoicesData.invoices.forEach((invoice: any) => {
    if (invoice.status === "paid" && invoice.paidDate) {
      const month = new Date(invoice.paidDate).getMonth()
      monthlyData[month].revenue += invoice.amount
    }
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground text-xl">Revenue Trend</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Monthly revenue over the year</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fill: `hsl(var(--muted-foreground))` }} />
            <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: `hsl(var(--muted-foreground))` }} tickFormatter={(value) => `?${(value / 100000).toFixed(1)}L`} />
            <Tooltip contentStyle={{ backgroundColor: `hsl(var(--card))`, border: `1px solid hsl(var(--border))`, borderRadius: `8px`, color: `hsl(var(--foreground))` }} formatter={(value: number) => [`?${value.toLocaleString(`en-IN`)}`, `Revenue`]} />
            <Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: `hsl(var(--accent))`, r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
