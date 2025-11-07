import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText, MessageSquare, Settings } from "lucide-react"

export function QuickActions() {
  const actions = [
    { icon: Plus, label: "New Project", href: "/projects" },
    { icon: FileText, label: "New Invoice", href: "/invoices" },
    { icon: MessageSquare, label: "Send Message", href: "#" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-auto flex-col gap-2 py-3 border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
                asChild
              >
                <a href={action.href}>
                  <Icon className="w-4 h-4" />
                  <span className="text-xs text-center">{action.label}</span>
                </a>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
