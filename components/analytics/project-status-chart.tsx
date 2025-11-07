"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import projectsData from "@/data/projects.json"

export function ProjectStatusChart() {
  const projects = projectsData?.projects || []

  const counts = projects.reduce(
    (acc: Record<string, number>, p: any) => {
      const status = (p.status || "").toLowerCase()
      if (p.progress >= 100 || status === "completed") acc["Completed"] = (acc["Completed"] || 0) + 1
      else if (status === "pending") acc["Pending"] = (acc["Pending"] || 0) + 1
      else if (status === "on-hold" || status === "hold") acc["On Hold"] = (acc["On Hold"] || 0) + 1
      else acc["In Progress"] = (acc["In Progress"] || 0) + 1
      return acc
    },
    { "Completed": 0, "In Progress": 0, "Pending": 0, "On Hold": 0 },
  )

  const data = [
    { name: "Completed", value: counts["Completed"] },
    { name: "In Progress", value: counts["In Progress"] },
    { name: "Pending", value: counts["Pending"] },
    { name: "On Hold", value: counts["On Hold"] },
  ]

  const COLORS = [
    "oklch(0.55 0.28 262)",
    "oklch(0.6 0.118 184.704)",
    "oklch(0.769 0.188 70.08)",
    "oklch(0.828 0.189 84.429)",
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Project Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
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
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
