class BirthdayApp {
  constructor() {
    this.openedGifts = []
    this.totalGifts = 4
    this.sparklesContainer = document.getElementById("sparkles-container")
    this.cakeSection = document.getElementById("cake-section")
    this.messageSection = document.getElementById("message-section")

    this.init()
  }

  init() {
    this.createInitialSparkles()
    this.startAutoGiftOpening()
  }

  startAutoGiftOpening() {
    setTimeout(() => {
      this.openAllGifts()
    }, 8000)
  }

  openAllGifts() {
    const giftContainers = document.querySelectorAll(".gift-container")

    giftContainers.forEach((container, index) => {
      setTimeout(() => {
        const giftId = Number.parseInt(container.dataset.giftId)
        this.openGift(giftId, container)
      }, index * 500) // Stagger the opening by 500ms each
    })
  }

  openGift(giftId, container) {
    if (this.openedGifts.includes(giftId)) return

    this.openedGifts.push(giftId)
    container.classList.add("opened")

    this.createSparkles()

    // Check if all gifts are opened
    if (this.openedGifts.length === this.totalGifts) {
      setTimeout(() => this.revealCake(), 1000)
    }
  }

  createSparkles() {
    const sparkleCount = 8

    for (let i = 0; i < sparkleCount; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div")
        sparkle.className = "sparkle"
        sparkle.textContent = "✨"

        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight

        sparkle.style.left = x + "px"
        sparkle.style.top = y + "px"

        this.sparklesContainer.appendChild(sparkle)

        // Remove sparkle after animation
        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle)
          }
        }, 2000)
      }, i * 100)
    }
  }

  createInitialSparkles() {
    // Create some initial sparkles for ambiance
    setInterval(() => {
      if (Math.random() < 0.3) {
        // 30% chance every interval
        this.createAmbientSparkle()
      }
    }, 3000)
  }

  createAmbientSparkle() {
    const sparkle = document.createElement("div")
    sparkle.className = "sparkle"
    sparkle.textContent = "✨"
    sparkle.style.opacity = "0.6"

    const x = Math.random() * window.innerWidth
    const y = Math.random() * window.innerHeight

    sparkle.style.left = x + "px"
    sparkle.style.top = y + "px"

    this.sparklesContainer.appendChild(sparkle)

    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle)
      }
    }, 2000)
  }

  revealCake() {
    this.cakeSection.classList.remove("hidden")
    this.createSparkles()

    // Show message after cake appears
    setTimeout(() => {
      this.messageSection.classList.remove("hidden")
    }, 1000)
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new BirthdayApp()
})

// Add some extra interactivity
document.addEventListener("click", (e) => {
  // Create sparkles on random clicks
  if (Math.random() < 0.5) {
    createClickSparkle(e.clientX, e.clientY)
  }
})

function createClickSparkle(x, y) {
  const sparkle = document.createElement("div")
  sparkle.className = "sparkle"
  sparkle.textContent = "✨"
  sparkle.style.left = x + "px"
  sparkle.style.top = y + "px"
  sparkle.style.fontSize = "16px"

  document.getElementById("sparkles-container").appendChild(sparkle)

  setTimeout(() => {
    if (sparkle.parentNode) {
      sparkle.parentNode.removeChild(sparkle)
    }
  }, 2000)
}
