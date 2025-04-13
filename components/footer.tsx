import Link from "next/link"
import { Building2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/hard-hat.svg"
                alt="Structure Logo"
                className="h-8 w-8 text-navy-700" 
              />
              <span className="text-lg font-bold text-navy-700">Structure</span>
            </Link>
            <p className="text-sm text-gray-500">
              Streamlining construction permit compliance with AI-powered analysis.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-navy-900">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-500 hover:text-navy-700">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-navy-700">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-navy-700">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-navy-900">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-500 hover:text-navy-700">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-navy-700">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-navy-700">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-navy-900">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-500 hover:text-navy-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-navy-700">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Structure. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
