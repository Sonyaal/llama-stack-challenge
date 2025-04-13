import Link from "next/link"
import { Building2 } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <img 
            src="/hard-hat.svg"
            alt="Structure Logo"
            className="h-8 w-8 text-navy-700" 
          />
          <span className="text-xl font-bold text-navy-700">Structure</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-navy-700">
            Features
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-navy-700">
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-navy-700">
            About
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-navy-700">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            href="#"
            className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-navy-700 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
