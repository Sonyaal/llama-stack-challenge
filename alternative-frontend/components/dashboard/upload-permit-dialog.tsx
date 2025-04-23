"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Loader2 } from "lucide-react"

import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// Handle PDF
async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const content = await page.getTextContent();
    const text = content.items.map((item: any) => item.str).join(" ");
    fullText += text + "\n";
  }
  return fullText.slice(0, 16000); // Truncate if needed
}

export function UploadPermitDialog() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)

    // Handle PDF input
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      
      // PDF parsing
      const text = await extractTextFromPDF(file);

      // API Call
      const response = await fetch("/api/ollama/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      console.log("Response:", data);

      // Clean up raw data and read JSON
      const raw = data.raw.trim();
      const cleaned = raw.startsWith("```json") ? raw.slice(7, -3).trim() : raw;
      const parsed = JSON.parse(cleaned);

      // Progress bar
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 300)

      // Send data to analysis results
      localStorage.setItem("analysisResults", JSON.stringify(parsed));
      router.push("/dashboard/analysis-results");
    } catch (err) {
      console.error("Failed to parse LLM JSON:", err);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#0F2251] hover:bg-[#0F2251]/90">
          <Upload className="mr-2 h-4 w-4" /> Upload Permit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload New Permit</DialogTitle>
            <DialogDescription>
              Upload a permit document for compliance checking. We'll analyze it and provide feedback.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Permit Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Residential Renovation Permit"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the permit request"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">Permit Document (PDF)</Label>
              <Input id="file" type="file" accept=".pdf" onChange={handleFileChange} className="border hover:bg-gray" required />
              {file && (
                <p className="text-sm text-gray-500">
                  Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isUploading || !file} className="bg-[#0F2251] hover:bg-[#0F2251]/90">
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing ({uploadProgress}%)
                </>
              ) : (
                "Upload & Check Compliance"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}