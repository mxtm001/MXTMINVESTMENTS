import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050e24] text-white">
      {/* Header/Navbar */}
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image src="/logo.png" alt="MXTM Investment" fill className="object-cover" />
            </div>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/register">
            <Button className="bg-[#f9a826] hover:bg-[#f9a826]/90 text-black font-medium">Register</Button>
          </Link>
          <Link href="/login">
            <Button className="bg-[#1a2747] hover:bg-[#1a2747]/90 text-white font-medium">Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative w-full h-[300px] md:h-[400px] order-2 md:order-1">
          <Image src="/bitcoin-network.png" alt="Bitcoin Network" fill className="object-contain" />
        </div>
        <div className="space-y-6 order-1 md:order-2">
          <p className="text-lg">
            <span className="text-white">FOREX, STOCK, CRYPTO</span> <span className="text-[#f9a826]">AND BINARY</span>
          </p>
          <h1 className="text-5xl md:text-6xl font-bold">
            GROW YOUR <span className="text-[#f9a826]">FINANCIAL</span> STABILITY!
          </h1>
          <p className="text-gray-300 max-w-xl">
            the Forex market presents endless income earning opportunities for savvy investors who are able to buy and
            sell the world's major currencies 24 hours a day throughout Monday to Friday. Our trading services are
            designed to help our clients make the most of this opportunity.
          </p>
          <Link href="/register">
            <Button className="bg-[#0066ff] hover:bg-[#0066ff]/90 text-white font-medium px-8 py-6">
              Create Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Divider Lines */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-6 gap-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-1 bg-gray-700 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <section className="container mx-auto py-16 px-4" id="about">
        <h2 className="text-3xl font-bold text-[#0066ff] mb-8">ABOUT US</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-300">
              MXTM INVESTMENT PLATFORM is a leading online trading and investment platform that offers a wide range of
              financial instruments including Forex, Stocks, Cryptocurrencies, and Binary Options.
            </p>
            <p className="text-gray-300">
              Our mission is to provide our clients with the best trading experience possible, with advanced trading
              tools, competitive spreads, and exceptional customer service.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300">
              With years of experience in the financial markets, our team of experts is dedicated to helping you achieve
              your financial goals through smart investments and strategic trading.
            </p>
            <p className="text-gray-300">
              We believe in transparency, security, and reliability, which is why thousands of traders worldwide trust
              MXTM INVESTMENT PLATFORM for their trading needs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#030917] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-medium mb-4">About MXTM</h3>
              <p className="text-gray-400 text-sm">
                MXTM INVESTMENT PLATFORM is a leading online trading and investment platform offering a wide range of
                financial instruments including Forex, Stocks, Cryptocurrencies, and Binary Options.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/register" className="text-gray-400 hover:text-white">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Support Team</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 text-[#f9a826] mr-2" />
                  <span className="text-gray-400 hover:text-white">+49 1521 1026452</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 text-[#f9a826] mr-2" />
                  <span className="text-gray-400 hover:text-white break-all">mxtmcontaverificacaocentro@gmail.com</span>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-6">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2024 MXTM INVESTMENT PLATFORM. All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
