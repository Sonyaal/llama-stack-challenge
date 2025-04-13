import Link from "next/link"
import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-navy-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-navy-900">
              Streamline Your Construction Permit Compliance
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Upload your construction permit PDF and get instant analysis for compliance issues, regulatory concerns,
              and an overall compliance score.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6 justify-center">
            <Link
              href="#upload"
              className="inline-flex h-10 items-center justify-center rounded-md bg-navy-700 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Analyze Your Permit
            </Link>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Learn More
            </Link>
          </div>
          <div className="mt-12 animate-bounce">
            <ArrowDown className="h-6 w-6 text-navy-700" />
          </div>
        </div>
      </div>
    </section>
  )
}
