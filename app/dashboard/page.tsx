"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  LineChart,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  BarChart2,
  Clock,
  LogOut,
  HelpCircle,
  Menu,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Dashboard() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
      return
    }

    try {
      const userData = JSON.parse(storedUser)
      setUser(userData)

      // Get registered users to find the current user's full data
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const currentUserData = registeredUsers.find((u: any) => u.email === userData.email)

      if (currentUserData) {
        // Update user with additional data if available
        setUser((prev) => ({
          ...prev,
          balance: currentUserData.balance || 0,
          name: currentUserData.name || userData.email,
        }))
      }
    } catch (error) {
      localStorage.removeItem("user")
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050e24] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050e24] flex">
      {/* Sidebar for desktop */}
      <aside className="w-64 bg-[#0a1735] text-white hidden md:block">
        <div className="p-4 border-b border-[#253256]">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src="/logo.png" alt="MXTM Investment" fill className="object-cover" />
            </div>
            <span className="ml-2 font-medium text-sm">MXTM INVESTMENT</span>
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="flex items-center p-2 rounded-md bg-[#162040] text-white">
                <BarChart2 className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/deposit"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <ArrowUpRight className="mr-2 h-5 w-5" />
                Deposit
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/withdraw"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <ArrowDownRight className="mr-2 h-5 w-5" />
                Withdraw
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/investments"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Investments
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/history"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <Clock className="mr-2 h-5 w-5" />
                History
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/support"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <HelpCircle className="mr-2 h-5 w-5" />
                Support
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
        {/* Mobile Header with Slide-out Menu */}
        <header className="bg-[#0a1735] p-4 flex justify-between items-center md:hidden sticky top-0 z-10">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src="/logo.png" alt="MXTM Investment" fill className="object-cover" />
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handleLogout} className="h-9 w-9">
              <LogOut className="h-5 w-5" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0a1735] text-white border-[#253256] p-0 w-[250px]">
                <div className="p-4 border-b border-[#253256]">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image src="/logo.png" alt="MXTM Investment" fill className="object-cover" />
                    </div>
                    <span className="ml-2 font-medium text-sm">MXTM INVESTMENT</span>
                  </div>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <Link href="/dashboard" className="flex items-center p-2 rounded-md bg-[#162040] text-white">
                        <BarChart2 className="mr-2 h-5 w-5" />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/deposit"
                        className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
                      >
                        <ArrowUpRight className="mr-2 h-5 w-5" />
                        Deposit
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/withdraw"
                        className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
                      >
                        <ArrowDownRight className="mr-2 h-5 w-5" />
                        Withdraw
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/investments"
                        className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
                      >
                        <DollarSign className="mr-2 h-5 w-5" />
                        Investments
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/history"
                        className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
                      >
                        <Clock className="mr-2 h-5 w-5" />
                        History
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/support"
                        className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
                      >
                        <HelpCircle className="mr-2 h-5 w-5" />
                        Support
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
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Welcome, {user?.name || user?.email}</h1>
            <p className="text-gray-400">Here's an overview of your investments</p>
          </div>

          {/* Account Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <Wallet className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${user?.balance?.toFixed(2) || "0.00"}</div>
                <p className="text-xs text-gray-400">Available for withdrawal</p>
              </CardContent>
            </Card>
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
                <BarChart className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0.00</div>
                <p className="text-xs text-gray-400">Across 0 plans</p>
              </CardContent>
            </Card>
            <Card className="bg-[#0a1735] border-[#253256] text-white sm:col-span-2 md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                <LineChart className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0.00</div>
                <p className="text-xs text-gray-400">Lifetime earnings</p>
              </CardContent>
            </Card>
          </div>

          {/* Investment Plans */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Investment Plans</h2>
            <Tabs defaultValue="forex" className="w-full overflow-x-auto">
              <TabsList className="bg-[#0a1735] border-[#253256] w-full justify-start mb-2">
                <TabsTrigger value="forex" className="data-[state=active]:bg-[#162040]">
                  Forex
                </TabsTrigger>
                <TabsTrigger value="crypto" className="data-[state=active]:bg-[#162040]">
                  Crypto
                </TabsTrigger>
                <TabsTrigger value="stocks" className="data-[state=active]:bg-[#162040]">
                  Stocks
                </TabsTrigger>
                <TabsTrigger value="binary" className="data-[state=active]:bg-[#162040]">
                  Binary
                </TabsTrigger>
              </TabsList>

              <TabsContent value="forex" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { name: "Starter", return: "3% Daily", duration: "7 Days", min: "$100", max: "$999" },
                    { name: "Advanced", return: "5% Daily", duration: "14 Days", min: "$1,000", max: "$4,999" },
                    { name: "Professional", return: "7% Daily", duration: "30 Days", min: "$5,000", max: "Unlimited" },
                  ].map((plan, index) => (
                    <Card key={index} className="bg-[#0a1735] border-[#253256] text-white">
                      <CardHeader>
                        <CardTitle>{plan.name} Plan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Return:</span>
                            <span className="font-medium">{plan.return}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Duration:</span>
                            <span className="font-medium">{plan.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Min Deposit:</span>
                            <span className="font-medium">{plan.min}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Max Deposit:</span>
                            <span className="font-medium">{plan.max}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-[#0066ff] hover:bg-[#0066ff]/90">Invest Now</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="crypto" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { name: "Bitcoin", return: "4% Daily", duration: "10 Days", min: "$200", max: "$1,999" },
                    { name: "Ethereum", return: "6% Daily", duration: "15 Days", min: "$2,000", max: "$9,999" },
                    { name: "Altcoin", return: "8% Daily", duration: "30 Days", min: "$10,000", max: "Unlimited" },
                  ].map((plan, index) => (
                    <Card key={index} className="bg-[#0a1735] border-[#253256] text-white">
                      <CardHeader>
                        <CardTitle>{plan.name} Plan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Return:</span>
                            <span className="font-medium">{plan.return}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Duration:</span>
                            <span className="font-medium">{plan.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Min Deposit:</span>
                            <span className="font-medium">{plan.min}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Max Deposit:</span>
                            <span className="font-medium">{plan.max}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-[#0066ff] hover:bg-[#0066ff]/90">Invest Now</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="stocks" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { name: "Blue Chip", return: "2.5% Daily", duration: "14 Days", min: "$500", max: "$4,999" },
                    { name: "Growth", return: "4.5% Daily", duration: "21 Days", min: "$5,000", max: "$19,999" },
                    { name: "Value", return: "6.5% Daily", duration: "30 Days", min: "$20,000", max: "Unlimited" },
                  ].map((plan, index) => (
                    <Card key={index} className="bg-[#0a1735] border-[#253256] text-white">
                      <CardHeader>
                        <CardTitle>{plan.name} Plan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Return:</span>
                            <span className="font-medium">{plan.return}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Duration:</span>
                            <span className="font-medium">{plan.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Min Deposit:</span>
                            <span className="font-medium">{plan.min}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Max Deposit:</span>
                            <span className="font-medium">{plan.max}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-[#0066ff] hover:bg-[#0066ff]/90">Invest Now</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="binary" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { name: "Basic", return: "5% Daily", duration: "5 Days", min: "$50", max: "$499" },
                    { name: "Standard", return: "7% Daily", duration: "10 Days", min: "$500", max: "$4,999" },
                    { name: "Premium", return: "10% Daily", duration: "15 Days", min: "$5,000", max: "Unlimited" },
                  ].map((plan, index) => (
                    <Card key={index} className="bg-[#0a1735] border-[#253256] text-white">
                      <CardHeader>
                        <CardTitle>{plan.name} Plan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Return:</span>
                            <span className="font-medium">{plan.return}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Duration:</span>
                            <span className="font-medium">{plan.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Min Deposit:</span>
                            <span className="font-medium">{plan.min}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Max Deposit:</span>
                            <span className="font-medium">{plan.max}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-[#0066ff] hover:bg-[#0066ff]/90">Invest Now</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Recent Transactions */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Recent Transactions</h2>
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center py-6 sm:py-8">
                  <p className="text-gray-400">No transactions found</p>
                  <p className="text-sm text-gray-500 mt-2">Make your first deposit to start investing</p>
                  <Button className="mt-4 bg-[#0066ff] hover:bg-[#0066ff]/90">
                    <Link href="/dashboard/deposit">Deposit Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
