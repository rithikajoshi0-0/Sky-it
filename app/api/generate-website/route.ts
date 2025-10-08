import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) { 
  try {
    const { prompt, existingCode } = await req.json()

    const systemPrompt = `You are an expert web developer who creates beautiful, modern websites. Generate complete HTML with inline CSS and JavaScript that creates a stunning, responsive website based on the user's requirements.

Requirements:
- Use modern HTML5 semantic elements
- Include beautiful, responsive CSS with modern design principles
- Use CSS Grid and Flexbox for layouts
- Include smooth animations and transitions
- Make it mobile-responsive
- Use a cohesive color scheme
- Include placeholder content that matches the theme
- Add interactive elements where appropriate
- Use modern typography and spacing
- Ensure accessibility with proper ARIA labels and semantic HTML

${existingCode ? `Here's the existing code to modify:\n${existingCode}\n\nModify it based on the new requirements.` : "Create a complete website from scratch."}`

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      maxOutputTokens: 4000,
      temperature: 0.7,
    })

    // Extract HTML from the response if it's wrapped in markdown
    let code = text
    const htmlMatch = text.match(/```html\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/)
    if (htmlMatch) {
      code = htmlMatch[1]
    }

    return Response.json({ code })
  } catch (error) {
    console.error("Website generation failed:", error)
    return Response.json({ error: "Failed to generate website" }, { status: 500 })
  }
}
