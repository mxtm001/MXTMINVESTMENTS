"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

      // Check if credentials match any registered user
      const user = registeredUsers.find(
        (user: any) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
      )

      // Special case for admin login
      if (email.toLowerCase() === "admin@mxtminvestment.com" && password === "Admin123!") {
        localStorage.setItem("user", JSON.stringify({ email: "admin@mxtminvestment.com", role: "admin" }))
        router.push("/admin/dashboard")
        return
      }

      if (!user) {
        throw new Error("Invalid email or password")
      }

      // Store user info in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          name: user.name,
          balance: user.balance || 0,
        }),
      )

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050e24] flex flex-col relative overflow-hidden">
      {/* Bitcoin Logo Background Elements */}
      <div className="absolute top-20 right-10 md:right-20 opacity-10 animate-float hidden md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="180"
          height="180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#f7931a]"
        >
          <path d="M11.767 19.089c4.924.868 9.593-2.535 10.461-7.603.868-5.069-2.535-9.738-7.603-10.606-5.068-.868-9.737 2.535-10.605 7.603-.869 5.068 2.535 9.738 7.603 10.606z" />
          <path d="M15.536 11.482c.215-1.256-.738-1.935-1.993-2.386l.4-1.663-1.035-.187-.415 1.686-.828-.15.416-1.674-1.036-.187-.408 1.663-.673-.122v-.012l-1.43-.26-.193.814s.738.16.722.17c.404.073.477.268.464.422l-.468 1.878c.028.007.064.017.104.033l-.106-.02-.652 2.634c-.05.122-.176.305-.46.236.01.014-.722-.17-.722-.17l-.492.875 1.35.244.74.134-.416 1.685 1.035.187.415-1.664.827.15-.408 1.664 1.036.187.416-1.686c1.764.334 3.09.2 3.65-1.4.452-1.29-.023-2.03-.954-2.512.68-.156 1.195-.602 1.33-1.522zm-2.377 3.324c-.32 1.292-2.49.594-3.195.418l.57-2.314c.704.176 2.97.525 2.624 1.896zm.32-3.356c-.293 1.176-2.1.578-2.684.432l.517-2.097c.583.146 2.47.42 2.166 1.665z" />
        </svg>
      </div>

      <div className="absolute bottom-10 left-10 md:left-20 opacity-10 animate-float-delayed hidden md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#f7931a]"
        >
          <path d="M11.767 19.089c4.924.868 9.593-2.535 10.461-7.603.868-5.069-2.535-9.738-7.603-10.606-5.068-.868-9.737 2.535-10.605 7.603-.869 5.068 2.535 9.738 7.603 10.606z" />
          <path d="M15.536 11.482c.215-1.256-.738-1.935-1.993-2.386l.4-1.663-1.035-.187-.415 1.686-.828-.15.416-1.674-1.036-.187-.408 1.663-.673-.122v-.012l-1.43-.26-.193.814s.738.16.722.17c.404.073.477.268.464.422l-.468 1.878c.028.007.064.017.104.033l-.106-.02-.652 2.634c-.05.122-.176.305-.46.236.01.014-.722-.17-.722-.17l-.492.875 1.35.244.74.134-.416 1.685 1.035.187.415-1.664.827.15-.408 1.664 1.036.187.416-1.686c1.764.334 3.09.2 3.65-1.4.452-1.29-.023-2.03-.954-2.512.68-.156 1.195-.602 1.33-1.522zm-2.377 3.324c-.32 1.292-2.49.594-3.195.418l.57-2.314c.704.176 2.97.525 2.624 1.896zm.32-3.356c-.293 1.176-2.1.578-2.684.432l.517-2.097c.583.146 2.47.42 2.166 1.665z" />
        </svg>
      </div>

      <header className="container mx-auto py-4 px-4">
        <Link href="/" className="flex items-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image src="/logo.png" alt="MXTM Investment" fill className="object-cover" />
          </div>
          <span className="ml-2 text-white font-medium">MXTM INVESTMENT PLATFORM</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-[#0a1735] rounded-lg shadow-lg p-6 sm:p-8 relative">
            {/* Bitcoin Logo in Login Form */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#0a1735] rounded-full p-4 border-4 border-[#050e24]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#f7931a]"
              >
                <path d="M11.767 19.089c4.924.868 9.593-2.535 10.461-7.603.868-5.069-2.535-9.738-7.603-10.606-5.068-.868-9.737 2.535-10.605 7.603-.869 5.068 2.535 9.738 7.603 10.606z" />
                <path d="M15.536 11.482c.215-1.256-.738-1.935-1.993-2.386l.4-1.663-1.035-.187-.415 1.686-.828-.15.416-1.674-1.036-.187-.408 1.663-.673-.122v-.012l-1.43-.26-.193.814s.738.16.722.17c.404.073.477.268.464.422l-.468 1.878c.028.007.064.017.104.033l-.106-.02-.652 2.634c-.05.122-.176.305-.46.236.01.014-.722-.17-.722-.17l-.492.875 1.35.244.74.134-.416 1.685 1.035.187.415-1.664.827.15-.408 1.664 1.036.187.416-1.686c1.764.334 3.09.2 3.65-1.4.452-1.29-.023-2.03-.954-2.512.68-.156 1.195-.602 1.33-1.522zm-2.377 3.324c-.32 1.292-2.49.594-3.195.418l.57-2.314c.704.176 2.97.525 2.624 1.896zm.32-3.356c-.293 1.176-2.1.578-2.684.432l.517-2.097c.583.146 2.47.42 2.166 1.665z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6 text-center mt-6">Login to Your Account</h2>

            {error && (
              <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500 text-red-500">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#162040] border-[#253256] text-white"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#162040] border-[#253256] text-white"
                  autoComplete="current-password"
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-600 bg-[#162040] text-[#0066ff] focus:ring-[#0066ff]"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#0066ff] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#0066ff] hover:bg-[#0066ff]/90 text-white font-medium py-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Don't have an account?{" "}
                <Link href="/register" className="text-[#0066ff] hover:underline">
                  Register now
                </Link>
              </p>
            </div>

            {/* Demo credentials - Remove this in production */}
            <div className="mt-8 p-3 border border-dashed border-gray-600 rounded-md">
              <p className="text-sm text-gray-400 mb-2">Admin Access:</p>
              <p className="text-xs text-gray-500">Email: admin@mxtminvestment.com</p>
              <p className="text-xs text-gray-500">Password: Admin123!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
