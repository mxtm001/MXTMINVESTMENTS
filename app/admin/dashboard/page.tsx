"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  BarChart2,
  Users,
  DollarSign,
  Clock,
  LogOut,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Shield,
  Wallet,
  LineChart,
  BarChart,
  PieChart,
} from "lucide-react"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from "@/lib/firebase-config"

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// User data
const mockUsers = [
  { id: 1, email: "user1@example.com", name: "John Doe", balance: 1250.75, status: "active", joined: "2024-05-01" },
  { id: 2, email: "user2@example.com", name: "Jane Smith", balance: 3420.5, status: "active", joined: "2024-04-15" },
  {
    id: 3,
    email: "user3@example.com",
    name: "Robert Johnson",
    balance: 750.25,
    status: "pending",
    joined: "2024-05-10",
  },
  { id: 4, email: "user4@example.com", name: "Emily Davis", balance: 0, status: "blocked", joined: "2024-03-22" },
  {
    id: 5,
    email: "user5@example.com",
    name: "Michael Wilson",
    balance: 5200.8,
    status: "active",
    joined: "2024-02-18",
  },
]

const mockDeposits = [
  { id: 1, userId: 1, amount: 1000, currency: "USD", status: "completed", date: "2024-05-05", method: "Bitcoin" },
  { id: 2, userId: 2, amount: 2500, currency: "USD", status: "completed", date: "2024-05-03", method: "Ethereum" },
  { id: 3, userId: 3, amount: 750, currency: "USD", status: "pending", date: "2024-05-10", method: "USDT" },
  { id: 4, userId: 5, amount: 3000, currency: "USD", status: "completed", date: "2024-04-28", method: "Bitcoin" },
  { id: 5, userId: 2, amount: 1200, currency: "USD", status: "completed", date: "2024-04-20", method: "USDT" },
]

const mockWithdrawals = [
  { id: 1, userId: 5, amount: 1000, currency: "USD", status: "completed", date: "2024-05-02", method: "Bitcoin" },
  { id: 2, userId: 1, amount: 500, currency: "USD", status: "pending", date: "2024-05-09", method: "Ethereum" },
  { id: 3, userId: 2, amount: 1500, currency: "USD", status: "pending", date: "2024-05-08", method: "USDT" },
]

const mockInvestments = [
  {
    id: 1,
    userId: 1,
    plan: "Bitcoin Plan",
    amount: 750,
    profit: 30,
    duration: "10 Days",
    startDate: "2024-05-05",
    status: "active",
  },
  {
    id: 2,
    userId: 2,
    plan: "Forex Advanced",
    amount: 2000,
    profit: 100,
    duration: "14 Days",
    startDate: "2024-05-01",
    status: "active",
  },
  {
    id: 3,
    userId: 5,
    plan: "Stock Growth",
    amount: 1500,
    profit: 67.5,
    duration: "21 Days",
    startDate: "2024-04-25",
    status: "active",
  },
  {
    id: 4,
    userId: 2,
    plan: "Binary Premium",
    amount: 1000,
    profit: 100,
    duration: "15 Days",
    startDate: "2024-04-20",
    status: "completed",
  },
]

export default function AdminDashboard() {
  const [adminUser, setAdminUser] = useState<{ email: string; role: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const storedAdmin = localStorage.getItem("admin_user")
    if (!storedAdmin) {
      router.push("/admin/login")
      return
    }

    try {
      const admin = JSON.parse(storedAdmin)
      if (admin.role !== "admin") {
        router.push("/admin/login")
        return
      }
      setAdminUser(admin)
    } catch (error) {
      localStorage.removeItem("admin_user")
      router.push("/admin/login")
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    // Filter users based on search term
    if (searchTerm) {
      const filtered = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(mockUsers)
    }
  }, [searchTerm])

  const handleLogout = () => {
    localStorage.removeItem("admin_user")
    router.push("/admin/login")
  }

  // Calculate statistics
  const totalUsers = mockUsers.length
  const activeUsers = mockUsers.filter((user) => user.status === "active").length
  const totalDeposits = mockDeposits.reduce((sum, deposit) => sum + deposit.amount, 0)
  const totalWithdrawals = mockWithdrawals.reduce((sum, withdrawal) => sum + withdrawal.amount, 0)
  const pendingWithdrawals = mockWithdrawals.filter((w) => w.status === "pending").length
  const totalInvestments = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalProfit = mockInvestments.reduce((sum, inv) => sum + inv.profit, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050e24] flex items-center justify-center">
        <div className="text-white">Loading admin dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050e24] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a1735] text-white hidden md:block">
        <div className="p-4 border-b border-[#253256]">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src="/logo.png" alt="MXTM Investment" fill className="object-cover" />
            </div>
            <span className="ml-2 font-medium text-sm">ADMIN PANEL</span>
          </Link>
        </div>

        <div className="p-4 border-b border-[#253256]">
          <div className="flex items-center">
            <div className="bg-[#162040] h-8 w-8 rounded-full flex items-center justify-center mr-2">
              <Shield className="h-4 w-4 text-[#0066ff]" />
            </div>
            <div>
              <p className="text-sm font-medium">{adminUser?.email}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/admin/dashboard" className="flex items-center p-2 rounded-md bg-[#162040] text-white">
                <BarChart2 className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <Users className="mr-2 h-5 w-5" />
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/deposits"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <ArrowUpRight className="mr-2 h-5 w-5" />
                Deposits
              </Link>
            </li>
            <li>
              <Link
                href="/admin/withdrawals"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <ArrowDownRight className="mr-2 h-5 w-5" />
                Withdrawals
              </Link>
            </li>
            <li>
              <Link
                href="/admin/investments"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Investments
              </Link>
            </li>
            <li>
              <Link
                href="/admin/chat"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <Clock className="mr-2 h-5 w-5" />
                Support Chat
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white w-full text-left"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="bg-[#0a1735] p-4 flex justify-between items-center md:hidden">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src="/logo.png" alt="MXTM Investment" fill className="object-cover" />
            </div>
          </Link>
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="mr-2">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, Administrator</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-xs text-gray-400">{activeUsers} active users</p>
              </CardContent>
            </Card>
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalDeposits.toLocaleString()}</div>
                <p className="text-xs text-gray-400">{mockDeposits.length} transactions</p>
              </CardContent>
            </Card>
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalWithdrawals.toLocaleString()}</div>
                <p className="text-xs text-gray-400">{pendingWithdrawals} pending requests</p>
              </CardContent>
            </Card>
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
                <Wallet className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalInvestments.toLocaleString()}</div>
                <p className="text-xs text-gray-400">${totalProfit.toLocaleString()} profit generated</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2" />
                  Platform Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Loading activity data...</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Investment Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Loading investment data...</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="users">
                  <TabsList className="bg-[#162040] border-[#253256]">
                    <TabsTrigger value="users" className="data-[state=active]:bg-[#0a1735]">
                      Users
                    </TabsTrigger>
                    <TabsTrigger value="deposits" className="data-[state=active]:bg-[#0a1735]">
                      Deposits
                    </TabsTrigger>
                    <TabsTrigger value="withdrawals" className="data-[state=active]:bg-[#0a1735]">
                      Withdrawals
                    </TabsTrigger>
                    <TabsTrigger value="investments" className="data-[state=active]:bg-[#0a1735]">
                      Investments
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-4 mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search..."
                        className="pl-9 bg-[#162040] border-[#253256] text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <TabsContent value="users" className="mt-0">
                    <div className="rounded-md border border-[#253256]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#162040] border-b border-[#253256]">
                              <th className="py-3 px-4 text-left">Name</th>
                              <th className="py-3 px-4 text-left">Email</th>
                              <th className="py-3 px-4 text-left">Balance</th>
                              <th className="py-3 px-4 text-left">Status</th>
                              <th className="py-3 px-4 text-left">Joined</th>
                              <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredUsers.map((user) => (
                              <tr key={user.id} className="border-b border-[#253256] hover:bg-[#162040]">
                                <td className="py-3 px-4">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">${user.balance.toLocaleString()}</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                      user.status === "active"
                                        ? "bg-green-500/20 text-green-500"
                                        : user.status === "pending"
                                          ? "bg-yellow-500/20 text-yellow-500"
                                          : "bg-red-500/20 text-red-500"
                                    }`}
                                  >
                                    {user.status === "active" ? (
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                    ) : user.status === "pending" ? (
                                      <AlertCircle className="h-3 w-3 mr-1" />
                                    ) : (
                                      <XCircle className="h-3 w-3 mr-1" />
                                    )}
                                    {user.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{user.joined}</td>
                                <td className="py-3 px-4">
                                  <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" className="h-8 px-2 py-0">
                                      View
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 px-2 py-0 bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20"
                                    >
                                      Block
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="deposits" className="mt-0">
                    <div className="rounded-md border border-[#253256]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#162040] border-b border-[#253256]">
                              <th className="py-3 px-4 text-left">User</th>
                              <th className="py-3 px-4 text-left">Amount</th>
                              <th className="py-3 px-4 text-left">Method</th>
                              <th className="py-3 px-4 text-left">Status</th>
                              <th className="py-3 px-4 text-left">Date</th>
                              <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockDeposits.map((deposit) => {
                              const user = mockUsers.find((u) => u.id === deposit.userId)
                              return (
                                <tr key={deposit.id} className="border-b border-[#253256] hover:bg-[#162040]">
                                  <td className="py-3 px-4">{user?.name || "Unknown"}</td>
                                  <td className="py-3 px-4">
                                    ${deposit.amount.toLocaleString()} {deposit.currency}
                                  </td>
                                  <td className="py-3 px-4">{deposit.method}</td>
                                  <td className="py-3 px-4">
                                    <span
                                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                        deposit.status === "completed"
                                          ? "bg-green-500/20 text-green-500"
                                          : deposit.status === "pending"
                                            ? "bg-yellow-500/20 text-yellow-500"
                                            : "bg-red-500/20 text-red-500"
                                      }`}
                                    >
                                      {deposit.status === "completed" ? (
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                      ) : deposit.status === "pending" ? (
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                      ) : (
                                        <XCircle className="h-3 w-3 mr-1" />
                                      )}
                                      {deposit.status}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">{deposit.date}</td>
                                  <td className="py-3 px-4">
                                    <Button variant="outline" size="sm" className="h-8 px-2 py-0">
                                      View
                                    </Button>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="withdrawals" className="mt-0">
                    <div className="rounded-md border border-[#253256]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#162040] border-b border-[#253256]">
                              <th className="py-3 px-4 text-left">User</th>
                              <th className="py-3 px-4 text-left">Amount</th>
                              <th className="py-3 px-4 text-left">Method</th>
                              <th className="py-3 px-4 text-left">Status</th>
                              <th className="py-3 px-4 text-left">Date</th>
                              <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockWithdrawals.map((withdrawal) => {
                              const user = mockUsers.find((u) => u.id === withdrawal.userId)
                              return (
                                <tr key={withdrawal.id} className="border-b border-[#253256] hover:bg-[#162040]">
                                  <td className="py-3 px-4">{user?.name || "Unknown"}</td>
                                  <td className="py-3 px-4">
                                    ${withdrawal.amount.toLocaleString()} {withdrawal.currency}
                                  </td>
                                  <td className="py-3 px-4">{withdrawal.method}</td>
                                  <td className="py-3 px-4">
                                    <span
                                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                        withdrawal.status === "completed"
                                          ? "bg-green-500/20 text-green-500"
                                          : withdrawal.status === "pending"
                                            ? "bg-yellow-500/20 text-yellow-500"
                                            : "bg-red-500/20 text-red-500"
                                      }`}
                                    >
                                      {withdrawal.status === "completed" ? (
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                      ) : withdrawal.status === "pending" ? (
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                      ) : (
                                        <XCircle className="h-3 w-3 mr-1" />
                                      )}
                                      {withdrawal.status}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">{withdrawal.date}</td>
                                  <td className="py-3 px-4">
                                    <div className="flex space-x-2">
                                      <Button variant="outline" size="sm" className="h-8 px-2 py-0">
                                        View
                                      </Button>
                                      {withdrawal.status === "pending" && (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="h-8 px-2 py-0 bg-green-500/10 hover:bg-green-500/20 text-green-500 border-green-500/20"
                                        >
                                          Approve
                                        </Button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="investments" className="mt-0">
                    <div className="rounded-md border border-[#253256]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#162040] border-b border-[#253256]">
                              <th className="py-3 px-4 text-left">User</th>
                              <th className="py-3 px-4 text-left">Plan</th>
                              <th className="py-3 px-4 text-left">Amount</th>
                              <th className="py-3 px-4 text-left">Profit</th>
                              <th className="py-3 px-4 text-left">Duration</th>
                              <th className="py-3 px-4 text-left">Start Date</th>
                              <th className="py-3 px-4 text-left">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockInvestments.map((investment) => {
                              const user = mockUsers.find((u) => u.id === investment.userId)
                              return (
                                <tr key={investment.id} className="border-b border-[#253256] hover:bg-[#162040]">
                                  <td className="py-3 px-4">{user?.name || "Unknown"}</td>
                                  <td className="py-3 px-4">{investment.plan}</td>
                                  <td className="py-3 px-4">${investment.amount.toLocaleString()}</td>
                                  <td className="py-3 px-4">${investment.profit.toLocaleString()}</td>
                                  <td className="py-3 px-4">{investment.duration}</td>
                                  <td className="py-3 px-4">{investment.startDate}</td>
                                  <td className="py-3 px-4">
                                    <span
                                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                        investment.status === "active"
                                          ? "bg-green-500/20 text-green-500"
                                          : "bg-blue-500/20 text-blue-500"
                                      }`}
                                    >
                                      {investment.status === "active" ? (
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                      ) : (
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                      )}
                                      {investment.status}
                                    </span>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* System Settings */}
          <div className="grid grid-cols-1 gap-6 mt-8">
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardHeader>
                <CardTitle>Quick Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance-mode" className="text-base">
                        Maintenance Mode
                      </Label>
                      <p className="text-sm text-gray-400">
                        Enable maintenance mode to temporarily disable user access to the platform
                      </p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-registrations" className="text-base">
                        Allow New Registrations
                      </Label>
                      <p className="text-sm text-gray-400">Enable or disable new user registrations</p>
                    </div>
                    <Switch id="new-registrations" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-approve" className="text-base">
                        Auto-Approve Withdrawals
                      </Label>
                      <p className="text-sm text-gray-400">
                        Automatically approve withdrawal requests without manual review
                      </p>
                    </div>
                    <Switch id="auto-approve" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="text-base">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-400">
                        Send email notifications for important platform activities
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
