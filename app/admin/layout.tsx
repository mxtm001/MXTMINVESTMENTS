"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { BarChart3, Users, CreditCard, MessageSquare, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)

    // Check if user is logged in as admin
    const storedUser = localStorage.getItem("admin_user")
    if (!storedUser && !pathname?.includes("/admin/login")) {
      router.push("/admin/login")
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("admin_user")
    router.push("/admin/login")
  }

  if (!isClient) {
    return null
  }

  // Skip layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Users", href: "/admin/users", icon: <Users className="h-5 w-5" /> },
    { name: "Transactions", href: "/admin/transactions", icon: <CreditCard className="h-5 w-5" /> },
    { name: "Chat Support", href: "/admin/chat", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#0a1735] text-white p-4 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image src="/logo.png" alt="MXTM Investment" fill className="object-cover" />
          </div>
          <span className="ml-2 font-medium">MXTM ADMIN</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:block bg-[#0a1735] text-white w-full md:w-64 md:min-h-screen flex-shrink-0`}
      >
        <div className="p-4 hidden md:block">
          <Link href="/admin/dashboard" className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src="/logo.png" alt="MXTM Investment" fill className="object-cover" />
            </div>
            <span className="ml-2 font-medium">MXTM ADMIN</span>
          </Link>
        </div>

        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    pathname === item.href
                      ? "bg-[#162040] text-white"
                      : "text-gray-300 hover:bg-[#162040] hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 rounded-md transition-colors text-gray-300 hover:bg-[#162040] hover:text-white"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
