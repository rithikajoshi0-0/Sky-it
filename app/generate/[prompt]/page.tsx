"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Code, Eye, Edit, Download, Share } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GeneratePage() {
  const params = useParams()
  const prompt = decodeURIComponent(params.prompt as string)
  const [generatedCode, setGeneratedCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(true)
  const [editPrompt, setEditPrompt] = useState("")
  const [activeTab, setActiveTab] = useState("preview")

  useEffect(() => {
    generateWebsite()
  }, [])

  const generateWebsite = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      setGeneratedCode(data.code)
    } catch (error) {
      console.error("Generation failed:", error)
      setGeneratedCode(`
        <div style="padding: 2rem; text-align: center; font-family: system-ui;">
          <h1>Welcome to Your Website</h1>
          <p>This is a placeholder. The AI generation is being set up.</p>
          <p>Prompt: ${prompt}</p>
        </div>
      `)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleEdit = async () => {
    if (!editPrompt.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${prompt}\n\nAdditional changes: ${editPrompt}`,
          existingCode: generatedCode,
        }),
      })

      const data = await response.json()
      setGeneratedCode(data.code)
      setEditPrompt("")
    } catch (error) {
      console.error("Edit failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-light via-sky-medium to-sky-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">SkyIT Builder</h1>
            <p className="text-white/80 text-pretty">{prompt}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Code Editor */}
          <Card className="p-6 backdrop-blur-sm bg-white/10 border-white/20">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="preview" className="data-[state=active]:bg-white/20">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-white/20">
                  <Code className="w-4 h-4 mr-2" />
                  Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="flex-1 mt-4">
                <div className="h-full bg-white rounded-lg overflow-hidden">
                  {isGenerating ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                        <p className="text-muted-foreground">Generating your website...</p>
                      </div>
                    </div>
                  ) : (
                    <iframe srcDoc={generatedCode} className="w-full h-full border-0" title="Website Preview" />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="code" className="flex-1 mt-4">
                <div className="h-full bg-gray-900 rounded-lg p-4 overflow-auto">
                  <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                    {generatedCode || "Generating code..."}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Edit Panel */}
          <Card className="p-6 backdrop-blur-sm bg-white/10 border-white/20">
            <div className="h-full flex flex-col">
              <h3 className="text-xl font-semibold text-white mb-4">Make Changes</h3>

              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-white/90 text-sm font-medium mb-2 block">
                    Describe what you'd like to change:
                  </label>
                  <Textarea
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder="e.g., Make the header blue, add a contact form, change the font to serif..."
                    className="min-h-32 bg-white/90 border-white/30 text-foreground resize-none"
                  />
                </div>

                <Button
                  onClick={handleEdit}
                  disabled={!editPrompt.trim() || isGenerating}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Update Website
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
