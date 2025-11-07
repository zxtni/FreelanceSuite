"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import clientsData from "@/data/clients.json"

function monthLabel(monthIndex: number) {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][monthIndex]
}

export function ClientGrowthChart() {
  const clients = clientsData?.clients || []

  const byMonth = clients.reduce((map: Record<string, number>, c: any) => {
    try {
      const d = new Date(c.createdAt)
      if (isNaN(d.getTime())) return map
      const key = `${d.getFullYear()}-${d.getMonth()}`
      map[key] = (map[key] || 0) + 1
    } catch (e) {}
    return map
  }, {})

  const data = Object.keys(byMonth)
    .sort()
    .map((k) => {
      const [, m] = k.split("-")
      return { month: monthLabel(Number(m)), clients: byMonth[k] }
    })

  const defaultData = data.length > 0 ? data : [
    { month: "Jan", clients: 0 },
    { month: "Feb", clients: 0 },
    { month: "Mar", clients: 0 },
    { month: "Apr", clients: 0 },
    { month: "May", clients: 0 },
    { month: "Jun", clients: 0 },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Client Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={defaultData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
            <XAxis dataKey="month" stroke="oklch(0.556 0 0)" />
            <YAxis stroke="oklch(0.556 0 0)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.96)",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 8,
                padding: 8,
                color: '#0f172a'
              }}
              labelStyle={{ color: "#0f172a" }}
              itemStyle={{ color: "#0f172a" }}
            />
            <Bar dataKey="clients" fill="oklch(0.55 0.28 262)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
