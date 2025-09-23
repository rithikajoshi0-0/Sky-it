"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Sparkles, Zap, Code, Palette, Mic, MicOff, Battery as Gallery } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export default function HomePage() {
  const [prompt, setPrompt] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "en-US"

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setPrompt(transcript)
          setIsListening(false)
        }

        recognition.onerror = () => {
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        setRecognition(recognition)
      }
    }
  }, [])

  const handleVoiceInput = () => {
    if (!recognition) return

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
    }
  }

  const handleGenerate = () => {
    if (!prompt.trim()) return
    router.push(`/generate/${encodeURIComponent(prompt)}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGenerate()
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />

      <div className="absolute inset-0 pointer-events-none">
        <div className="cloud w-20 h-12 absolute top-20 left-10 drift-animation" style={{ animationDelay: "0s" }} />
        <div className="cloud w-16 h-10 absolute top-32 right-20 drift-animation" style={{ animationDelay: "5s" }} />
        <div className="cloud w-24 h-14 absolute top-48 left-1/4 drift-animation" style={{ animationDelay: "10s" }} />
        <div className="cloud w-18 h-11 absolute top-64 right-1/3 drift-animation" style={{ animationDelay: "15s" }} />
        <div className="cloud w-22 h-13 absolute bottom-32 left-1/2 drift-animation" style={{ animationDelay: "8s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 pt-32">
        {/* Header */}
        <div className="text-center mb-16 float-animation">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-white text-balance">
              Sky<span className="text-secondary">IT</span>
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto text-pretty leading-relaxed">
            Transform your ideas into stunning websites with AI. Just describe what you want, and watch your vision come
            to life in the clouds.
          </p>
        </div>

        {/* Main Prompt Interface */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 backdrop-blur-sm bg-white/10 border-white/20 pulse-glow">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white mb-2">What would you like to build?</h2>
                <p className="text-white/80">Describe your website idea and let AI bring it to life</p>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., Create a modern portfolio website for a photographer with a dark theme and image gallery..."
                    className="text-lg py-4 px-6 bg-white/90 border-white/30 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {recognition && (
                  <Button
                    onClick={handleVoiceInput}
                    variant="outline"
                    size="lg"
                    className={`px-4 bg-white/20 border-white/30 text-white hover:bg-white/30 ${
                      isListening ? "animate-pulse bg-red-500/20" : ""
                    }`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>
                )}
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim()}
                  size="lg"
                  className="px-8 bg-primary hover:bg-primary/90 text-white font-semibold"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <Card
            className="p-6 backdrop-blur-sm bg-white/10 border-white/20 text-center float-animation"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="p-3 rounded-full bg-white/20 w-fit mx-auto mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Generation</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Advanced AI understands your requirements and generates clean, modern code instantly
            </p>
          </Card>

          <Card
            className="p-6 backdrop-blur-sm bg-white/10 border-white/20 text-center float-animation"
            style={{ animationDelay: "1s" }}
          >
            <div className="p-3 rounded-full bg-white/20 w-fit mx-auto mb-4">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Live Preview</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              See your website come to life in real-time with instant preview and editing capabilities
            </p>
          </Card>

          <Card
            className="p-6 backdrop-blur-sm bg-white/10 border-white/20 text-center float-animation"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="p-3 rounded-full bg-white/20 w-fit mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">One-Click Deploy</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Deploy your website instantly to the cloud with professional hosting and performance
            </p>
          </Card>
        </div>

        {/* Examples Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h3 className="text-xl font-semibold text-white mb-6">Try these examples:</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "Modern restaurant website with online menu",
              "Personal portfolio for a designer",
              "E-commerce store for handmade crafts",
              "Landing page for a SaaS product",
              "Blog website with dark theme",
            ].map((example, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setPrompt(example)}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-sm"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h3 className="text-xl font-semibold text-white mb-6">Or browse our gallery:</h3>
          <Link href="/examples">
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Gallery className="w-4 h-4 mr-2" />
              View Example Gallery
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
