import { AnimatedRobot } from "@/components/AnimatedRobot"
import { ChatPanel } from "@/components/ChatPanel"
import { Dock } from "@/components/Dock"
import { OSOverlay } from "@/components/OSOverlay"

export default function HomePage() {
  return (
    <>
      {/* Landing Page - Fixed height, no scroll */}
      <div className="h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Neo-brutal grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: "8px 8px",
          }}
        />

        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 max-w-lg w-full">
          {/* AI Robot */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            <AnimatedRobot />
            <h1 className="text-4xl font-black text-center">Привет.</h1>
          </div>

          {/* Chat Panel */}
          <ChatPanel />
        </div>

        <div className="relative z-10 pb-4">
          <Dock />
        </div>
      </div>

      {/* OS Overlay */}
      <OSOverlay />
    </>
  )
}
