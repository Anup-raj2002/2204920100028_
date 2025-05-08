"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, TrendingUp, Activity, Home } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/top-users",
      label: "Top Users",
      icon: BarChart3,
      active: pathname === "/top-users",
    },
    {
      href: "/trending-posts",
      label: "Trending Posts",
      icon: TrendingUp,
      active: pathname === "/trending-posts",
    },
    {
      href: "/feed",
      label: "Feed",
      icon: Activity,
      active: pathname === "/feed",
    },
  ]

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-1.5">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">Social Analytics</span>
        </Link>
        <div className="ml-auto flex gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary relative py-5",
                route.active ? "text-indigo-600" : "text-muted-foreground hover:text-indigo-600",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
              {route.active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
