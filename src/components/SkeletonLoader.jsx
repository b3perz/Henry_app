import { useState, useEffect } from 'react'

const TIPS = [
  'Finding the perfect recipes...',
  'Checking your ingredients...',
  'Balancing nutrition...',
  'Almost ready...',
]

export default function SkeletonLoader() {
  const [tipIndex, setTipIndex] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipIndex((i) => (i + 1) % TIPS.length)
    }, 3000)
    return () => clearInterval(tipTimer)
  }, [])

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'))
    }, 400)
    return () => clearInterval(dotTimer)
  }, [])

  return (
    <div className="flex flex-col gap-4 p-5 max-w-lg mx-auto w-full animate-fade-in">
      {/* Progress bar */}
      <div className="h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-progress" />
      </div>

      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <div className="skeleton h-36 w-full" />
          <div className="p-4 space-y-2.5">
            <div className="skeleton h-5 w-3/4 rounded-lg" />
            <div className="flex gap-2">
              <div className="skeleton h-4 w-16 rounded-full" />
              <div className="skeleton h-4 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ))}

      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 font-medium transition-opacity duration-300">
        {TIPS[tipIndex]}{dots}
      </p>
    </div>
  )
}
