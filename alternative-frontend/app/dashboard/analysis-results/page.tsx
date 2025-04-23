"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface Issue {
  quote: string
  explanation: string
}

export default function AnalysisResultsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [analysisData, setAnalysisData] = useState<{
    complianceScore: number
    grammarIssues: Issue[]
    ambiguityIssues: Issue[]
    complianceIssues: Issue[]
  } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("analysisResults")
    console.log("Analysis: ", stored);
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setAnalysisData(parsed)
      } catch (err) {
        console.error("❌ Failed to parse analysisResults:", err)
      }
    }
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleBack = () => {
    router.push("/dashboard")
  }

  if (loading || !analysisData) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 container py-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-[#0F2251] border-t-transparent rounded-full animate-spin"></div>
            <h2 className="mt-6 text-xl font-semibold text-gray-800">Analyzing Permit Document...</h2>
            <p className="mt-2 text-gray-600">This may take a few moments</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Analysis Results</h1>

          <div className="flex justify-center mb-8">
            <div className="bg-green-50 rounded-full px-8 py-6 text-center">
              <div className="text-sm text-green-700 font-medium">Compliance Score</div>
              <div className="text-4xl font-bold text-green-600">{analysisData.complianceScore}/100</div>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-xl">Compliance Issues</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              {[
                { title: "Grammar Issues", key: "grammarIssues" },
                { title: "Ambiguity Issues", key: "ambiguityIssues" },
                { title: "Compliance Issues", key: "complianceIssues" },
              ].map(({ title, key }) => {
                const issues = analysisData[key as keyof typeof analysisData] as Issue[]
                return (
                  <div key={key}>
                    <h3 className="text-lg font-semibold mb-4">{title}</h3>
                    <ul className="space-y-4 list-disc pl-6">
                      {issues.map((issue, i) => (
                        <li key={`${key}-${i}`} className="text-gray-800">
                          <span className="font-medium">"{issue.quote}"</span>
                          <br />
                          <span className="text-sm text-gray-700">{issue.explanation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Return to Dashboard
            </Button>
            <Button className="bg-[#0F2251] hover:bg-[#0F2251]/90">Download Full Report</Button>
          </div>
        </div>
      </main>
    </div>
  )
}