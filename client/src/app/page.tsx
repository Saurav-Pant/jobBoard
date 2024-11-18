import Hero from "@/app/(landing)/hero"
import Features from "@/app/(landing)/Features"

export default function LandingPage() {
  return (
      <div className="min-h-screen bg-background text-foreground">
        <main>
          <Hero />
          <Features />
        </main>
      </div>
  )
}
