

import { useState, useEffect, useRef } from "react"

const features = [
  {
    id: 1,
    title: "TEXT HEADING DISPLAY",
    subtitle: "Feature No.1 -",
    gradient: "from-pink-400 via-purple-500 to-blue-600",
    points: [
      "Lorem ipsum dolor, sit amet consectetur adipiscing elit, sed do eiusmod.",
      "Ut enim minim: veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      "Sed ut perspiciatis: unde omnis iste natus error sit voluptatem accusantium doloremque",
      "Excepteur sint occaecat: cupidatat non proident sunt in culpa qui officia deserunt mollit.",
    ],
  },
  {
    id: 2,
    title: "ADVANCED ANALYTICS",
    subtitle: "Feature No.2 -",
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    points: [
      "Real-time data visualization with interactive charts and graphs.",
      "Custom dashboard creation with drag-and-drop functionality.",
      "Advanced filtering and segmentation for deeper insights.",
      "Export capabilities for reports and presentations.",
    ],
  },
  {
    id: 3,
    title: "SMART AUTOMATION",
    subtitle: "Feature No.3 -",
    gradient: "from-green-400 via-teal-500 to-blue-600",
    points: [
      "Intelligent workflow automation to streamline processes.",
      "Machine learning algorithms for predictive analytics.",
      "Custom trigger setup for automated responses.",
      "Integration with popular third-party tools and services.",
    ],
  },
  {
    id: 4,
    title: "SECURE COLLABORATION",
    subtitle: "Feature No.4 -",
    gradient: "from-orange-400 via-red-500 to-pink-600",
    points: [
      "End-to-end encryption for all communications and data.",
      "Role-based access control with granular permissions.",
      "Real-time collaboration tools with version control.",
      "Audit trails and compliance reporting features.",
    ],
  },
  {
    id: 5,
    title: "MOBILE OPTIMIZATION",
    subtitle: "Feature No.5 -",
    gradient: "from-purple-400 via-pink-500 to-red-600",
    points: [
      "Responsive design that works seamlessly across all devices.",
      "Native mobile app with offline capabilities.",
      "Touch-optimized interface for better user experience.",
      "Push notifications and real-time synchronization.",
    ],
  },
]

export default function App() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isSticky, setIsSticky] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight / 2

      setIsSticky(isInView)

      if (isInView) {
        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }

        // Auto-advance features with scroll
        const scrollProgress = Math.max(0, Math.min(1, (100 - rect.top) / (window.innerHeight * 0.8)))
        const newFeatureIndex = Math.min(4, Math.floor(scrollProgress * 5))

        if (newFeatureIndex !== activeFeature) {
          setActiveFeature(newFeatureIndex)
        }

        // Set timeout to advance to next feature
        if (newFeatureIndex < 4) {
          scrollTimeoutRef.current = setTimeout(() => {
            setActiveFeature((prev) => Math.min(4, prev + 1))
          }, 2000)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [activeFeature])

  const handlePrevious = () => {
    setActiveFeature((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setActiveFeature((prev) => Math.min(4, prev + 1))
  }

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index)
  }

  const currentFeature = features[activeFeature]

  return (
    <div className="min-h-screen bg-gray-50">
      <div ref={sectionRef} className={`${isSticky ? "sticky top-0" : ""} min-h-screen flex items-center p-4 md:p-8`}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Left Section - Dynamic Feature Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-blue-500 text-lg font-medium">{currentFeature.subtitle}</h2>

              <h3 className="text-black text-xl font-bold tracking-wide">{currentFeature.title}</h3>

              <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                {currentFeature.points.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 mt-2 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handlePrevious}
                  disabled={activeFeature === 0}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-gray-600">←</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeFeature === 4}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-gray-600">→</span>
                </button>
              </div>
            </div>

            {/* Center Section - Dynamic Phone Mockup */}
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-48 h-96 md:w-64 md:h-[520px] bg-black rounded-[2.5rem] md:rounded-[3rem] p-2">
                  <div
                    className={`w-full h-full bg-gradient-to-b ${currentFeature.gradient} rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden transition-all duration-500`}
                  >
                    <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm">
                      {currentFeature.points.map((point, index) => (
                        <div key={index} className="p-4">
                          {point}
                        </div>
                      ))}
                    </div>
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4 md:w-32 md:h-6 bg-black rounded-b-2xl"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Clickable Feature List */}
            <div className="space-y-8 order-3">
              <h2 className="text-black text-xl font-bold">Feature Showcase</h2>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <button
                    key={feature.id}
                    onClick={() => handleFeatureClick(index)}
                    className="flex items-center gap-4 w-full text-left hover:bg-gray-100 p-2 rounded transition-colors"
                  >
                    <div
                      className={`w-1 h-6 rounded-full transition-colors ${
                        activeFeature === index ? "bg-blue-500" : "bg-transparent"
                      }`}
                    ></div>
                    <div>
                      <span className="text-gray-500 text-sm font-medium">Feature {feature.id} : </span>
                      <span className="text-gray-500 text-sm">Lorem ipsum dolor</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}
