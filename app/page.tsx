import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { UploadSection } from "@/components/upload-section"
import { Footer } from "@/components/footer"
import PdfUpload from "@/components/PdfUpload"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* <Header /> */}
      <main className="flex-1">
        <Hero />
        <UploadSection />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
