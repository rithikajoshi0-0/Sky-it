"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Battery as Gallery, Home } from "lucide-react"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/10 border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Sky<span className="text-secondary">IT</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link href="/examples">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Gallery className="w-4 h-4 mr-2" />
                Examples
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
