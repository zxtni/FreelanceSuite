"use client"

/**
 * Sidebar Navigation Component
 * Main navigation menu with active states
 * 
 * @author Rahul Mondal (zxtni)
 * @website https://www.zxtni.dev
 * @github https://github.com/zxtni
 * @telegram https://t.me/zxtni
 */

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Briefcase, FileText, BarChart3, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { ToggleTheme } from "@/components/ui/toggle-theme"

export function Sidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/clients", label: "Clients", icon: Users },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/invoices", label: "Invoices", icon: FileText },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col animate-in slide-in-from-left duration-500 glass-sidebar shadow-2xl">
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border animate-in fade-in slide-in-from-top duration-700 delay-100">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/logo.png"
                alt="Zxtni Logo"
                width={50}
                height={50}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground tracking-tight">Zxtni</h1>
              <p className="text-xs text-sidebar-foreground/60 font-medium">Freelance Suite</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ToggleTheme className="text-sidebar-foreground" />
            <span className="text-[8px] text-sidebar-foreground/50 font-medium">Theme</span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-1.5">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-300 hover:scale-[1.02] animate-in fade-in slide-in-from-left relative overflow-hidden group ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg hover:shadow-xl backdrop-blur-xl"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:backdrop-blur-md hover:shadow-md"
              }`}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <Icon size={20} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 relative z-10" />
              <span className="font-medium relative z-10">{item.label}</span>
              {isActive && (
                <>
                  <span className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent rounded-lg" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent-foreground rounded-l-full" />
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-sidebar-border space-y-2 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
        <div className="px-4 py-3 rounded-lg bg-sidebar-accent/50 transition-all duration-300 hover:bg-sidebar-accent/70 hover:shadow-md">
          <p className="text-xs text-sidebar-foreground/70 font-medium">Logged in as</p>
          <p className="text-sm font-semibold text-sidebar-foreground truncate mt-0.5">{user?.name}</p>
          <p className="text-xs text-sidebar-foreground/60 truncate mt-0.5">{user?.email}</p>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-300 hover:scale-[1.02] hover:shadow-md group"
        >
          <LogOut size={20} className="group-hover:translate-x-1" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 text-center border-t border-sidebar-border text-xs text-sidebar-foreground/60 animate-in fade-in duration-700 delay-700">
        <p className="font-medium">© 2025 Zxtni</p>
        <p className="text-[10px] mt-0.5">{atob('Q29kZSBVbml2ZXJzZSBieSBSYWh1bCBNb25kYWw=')}</p>
      </div>
    </aside>
  )
}
