"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Code, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const examples = [
  {
    id: 1,
    title: "Modern Restaurant Website",
    description: "Elegant restaurant site with menu, reservations, and gallery",
    prompt:
      "Create a modern restaurant website with a hero section, online menu with prices, reservation form, photo gallery, and contact information. Use warm colors and elegant typography.",
    tags: ["Restaurant", "Business", "Modern"],
    preview: "/modern-restaurant-website-with-elegant-design.jpg",
    category: "Business",
  },
  {
    id: 2,
    title: "Creative Portfolio",
    description: "Stunning portfolio for designers and creatives",
    prompt:
      "Build a creative portfolio website for a graphic designer with a bold hero section, project showcase grid, about section, skills list, and contact form. Use a dark theme with vibrant accent colors.",
    tags: ["Portfolio", "Creative", "Dark Theme"],
    preview: "/creative-portfolio-dark.png",
    category: "Portfolio",
  },
  {
    id: 3,
    title: "SaaS Landing Page",
    description: "Professional landing page for software products",
    prompt:
      "Create a SaaS landing page with hero section, feature highlights, pricing tiers, testimonials, and CTA buttons. Use a clean, professional design with blue and white colors.",
    tags: ["SaaS", "Landing Page", "Professional"],
    preview: "/saas-landing-page-professional-blue-design.jpg",
    category: "Business",
  },
  {
    id: 4,
    title: "E-commerce Store",
    description: "Complete online store with product catalog",
    prompt:
      "Build an e-commerce website for handmade crafts with product grid, individual product pages, shopping cart, and checkout form. Use warm, earthy colors and friendly typography.",
    tags: ["E-commerce", "Shopping", "Crafts"],
    preview: "/ecommerce-store-handmade-crafts-warm-colors.jpg",
    category: "E-commerce",
  },
  {
    id: 5,
    title: "Personal Blog",
    description: "Clean blog layout with article listings",
    prompt:
      "Create a personal blog website with article listings, individual post pages, author bio, categories, and search functionality. Use a minimalist design with good typography.",
    tags: ["Blog", "Personal", "Minimalist"],
    preview: "/personal-blog-minimalist-design-clean-typography.jpg",
    category: "Blog",
  },
  {
    id: 6,
    title: "Fitness Studio",
    description: "Dynamic website for fitness and wellness",
    prompt:
      "Build a fitness studio website with class schedules, trainer profiles, membership plans, and booking system. Use energetic colors and motivational imagery.",
    tags: ["Fitness", "Health", "Booking"],
    preview: "/fitness-studio-website-energetic-design.jpg",
    category: "Health",
  },
]

const categories = ["All", "Business", "Portfolio", "E-commerce", "Blog", "Health"]

export default function ExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const router = useRouter()

  const filteredExamples =
    selectedCategory === "All" ? examples : examples.filter((example) => example.category === selectedCategory)

  const handleUseExample = (prompt: string) => {
    router.push(`/generate/${encodeURIComponent(prompt)}`)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="cloud w-20 h-12 absolute top-20 left-10 drift-animation" style={{ animationDelay: "0s" }} />
        <div className="cloud w-16 h-10 absolute top-32 right-20 drift-animation" style={{ animationDelay: "5s" }} />
        <div className="cloud w-24 h-14 absolute top-48 left-1/4 drift-animation" style={{ animationDelay: "10s" }} />
        <div className="cloud w-18 h-11 absolute top-64 right-1/3 drift-animation" style={{ animationDelay: "15s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Example Gallery</h1>
            <p className="text-white/80">Get inspired by these website examples and start building</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-white/10 border-white/30 text-white hover:bg-white/20"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Examples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredExamples.map((example, index) => (
            <Card
              key={example.id}
              className="backdrop-blur-sm bg-white/10 border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 float-animation"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video bg-white/20 relative overflow-hidden">
                <img
                  src={example.preview || "/placeholder.svg"}
                  alt={example.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white text-balance">{example.title}</h3>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {example.category}
                  </Badge>
                </div>

                <p className="text-white/80 text-sm mb-4 leading-relaxed text-pretty">{example.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {example.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-white/5 border-white/20 text-white/90 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleUseExample(example.prompt)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Use This Example
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    onClick={() => {
                      navigator.clipboard.writeText(example.prompt)
                    }}
                  >
                    <Code className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 backdrop-blur-sm bg-white/10 border-white/20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Build Your Own?</h2>
            <p className="text-white/80 mb-6 text-pretty">
              Don't see exactly what you're looking for? Describe your perfect website and let AI create it for you.
            </p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8">
                <Sparkles className="w-4 h-4 mr-2" />
                Start Building
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
