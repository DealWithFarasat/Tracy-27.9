"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Music, Sparkles, Gift, Cake } from "lucide-react"

export default function BirthdayPage() {
  const [openedGifts, setOpenedGifts] = useState<number[]>([])
  const [showCake, setShowCake] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  const gifts = [
    { id: 1, color: "bg-pink-300", content: "💝", message: "You make every day brighter!" },
    { id: 2, color: "bg-blue-300", content: "🌟", message: "You are absolutely amazing!" },
    { id: 3, color: "bg-yellow-300", content: "🦋", message: "Beautiful inside and out!" },
    { id: 4, color: "bg-green-300", content: "🌸", message: "Hope your day is magical!" },
  ]

  const openGift = (giftId: number) => {
    if (!openedGifts.includes(giftId)) {
      setOpenedGifts([...openedGifts, giftId])
      createSparkles()
    }
  }

  const createSparkles = () => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }))
    setSparkles((prev) => [...prev, ...newSparkles])

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id)))
    }, 2000)
  }

  const revealCake = () => {
    setShowCake(true)
    createSparkles()
    setTimeout(() => setShowMessage(true), 1000)
  }

  useEffect(() => {
    if (openedGifts.length === gifts.length && !showCake) {
      setTimeout(revealCake, 1000)
    }
  }, [openedGifts.length, gifts.length, showCake])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none sparkle"
          style={{ left: sparkle.x, top: sparkle.y }}
        >
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </div>
      ))}

      {/* Header */}
      <header className="text-center py-8 relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4 text-balance">Happy Birthday!</h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-serif">{"To someone incredibly special ✨"}</p>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 pb-16">
        {/* Gifts section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">{"Click the gifts to open them! 🎁"}</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {gifts.map((gift, index) => (
              <div
                key={gift.id}
                className="relative cursor-pointer transform transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => openGift(gift.id)}
              >
                <Card
                  className={`relative h-32 md:h-40 ${gift.color} border-2 border-white shadow-lg overflow-hidden ${
                    openedGifts.includes(gift.id) ? "gift-opened" : ""
                  }`}
                >
                  {/* Gift lid */}
                  <div
                    className={`gift-lid absolute inset-0 ${gift.color} border-b-4 border-white flex items-center justify-center`}
                  >
                    <Gift className="w-8 h-8 text-white" />
                  </div>

                  {/* Gift content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
                    <div className="text-4xl mb-2">{gift.content}</div>
                    <p className="text-xs text-center px-2 font-medium text-foreground">{gift.message}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Birthday cake section */}
        {showCake && (
          <section className="text-center mb-16">
            <div className="float-animation inline-block">
              <div className="relative">
                {/* Cake */}
                <div className="w-48 h-32 mx-auto mb-8 relative">
                  {/* Cake base */}
                  <div className="absolute bottom-0 w-full h-20 bg-amber-700 rounded-lg shadow-lg"></div>
                  {/* Frosting */}
                  <div className="absolute bottom-16 w-full h-12 bg-pink-200 rounded-lg shadow-md"></div>
                  {/* Candles */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="relative">
                        <div className="w-1 h-8 bg-yellow-400 rounded-full"></div>
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-orange-400 rounded-full sparkle"></div>
                      </div>
                    ))}
                  </div>
                  {/* Decorations */}
                  <div className="absolute bottom-20 left-4 w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="absolute bottom-20 right-4 w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-400 rounded-full"></div>
                </div>

                <Cake className="w-16 h-16 text-primary mx-auto mb-4 heart-beat" />
              </div>
            </div>
          </section>
        )}

        {/* Special message */}
        {showMessage && (
          <section className="text-center mb-16">
            <Card className="max-w-2xl mx-auto p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
              <Heart className="w-12 h-12 text-red-400 mx-auto mb-4 heart-beat" />
              <h3 className="text-2xl font-bold mb-4 text-primary">{"A Special Message Just for You"}</h3>
              <p className="text-lg leading-relaxed text-foreground mb-6 text-pretty">
                {"I know it's late, but I couldn't let this day pass without celebrating you. "}
                {"You bring so much joy and light into this world, and I feel incredibly lucky "}
                {"to know someone as wonderful as you. I hope your birthday was filled with "}
                {"love, laughter, and all your favorite things. Here's to another year of "}
                {"amazing adventures and beautiful memories! 🎉"}
              </p>
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Heart className="w-4 h-4 text-red-400" />
                <span>{"Made with love"}</span>
                <Heart className="w-4 h-4 text-red-400" />
              </div>
            </Card>
          </section>
        )}

        {/* Music section placeholder */}
        <section className="text-center">
          <Card className="max-w-md mx-auto p-6 bg-secondary/50 border-2 border-dashed border-secondary">
            <Music className="w-12 h-12 text-secondary-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-secondary-foreground">{"Your Favorite Song"}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {"This space is reserved for your favorite song - coming soon!"}
            </p>
            <Button variant="outline" className="w-full bg-transparent">
              {"Add Song Later"}
            </Button>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-muted-foreground">
        <p className="text-sm">{"Happy Birthday! 🎂 Hope this brings a smile to your face"}</p>
      </footer>
    </div>
  )
}
