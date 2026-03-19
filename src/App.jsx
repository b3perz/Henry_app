import { useState, useRef } from 'react'
import Header from './components/Header'
import InputScreen from './components/InputScreen'
import ResultsScreen from './components/ResultsScreen'
import SkeletonLoader from './components/SkeletonLoader'
import Settings from './components/Settings'
import { generateMeals } from './utils/api'
import { getPreferences } from './utils/storage'

function App() {
  const [screen, setScreen] = useState('input') // input | loading | results | settings
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const handleSubmit = async ({ ingredients, cookTime, portions }) => {
    // Prevent double-submit
    if (screen === 'loading') return

    setScreen('loading')
    setError(null)

    // Abort any previous in-flight request
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const preferences = getPreferences()
      const data = await generateMeals({ ingredients, cookTime, portions, preferences, signal: controller.signal })
      if (!controller.signal.aborted) {
        setResults(data)
        setScreen('results')
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err.message)
        setScreen('input')
      }
    }
  }

  const handleBack = () => {
    // Abort in-flight request if going back during loading
    if (abortRef.current) abortRef.current.abort()
    setScreen('input')
  }

  const isSubScreen = screen === 'settings' || screen === 'results' || screen === 'loading'

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col">
      <Header
        onSettingsClick={() => setScreen('settings')}
        showBack={isSubScreen}
        onBackClick={handleBack}
      />

      <main className="flex-1 flex flex-col">
        {/* Error banner */}
        {error && (
          <div className="mx-5 mt-4 max-w-lg self-center w-full p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 animate-fade-in">
            <div className="flex items-start gap-3">
              <span className="text-red-500 mt-0.5 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                </svg>
              </span>
              <div>
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-xs text-red-500 dark:text-red-500 hover:underline mt-1"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {screen === 'input' && (
          <div className="flex-1 flex flex-col justify-center animate-fade-in">
            <div className="text-center px-5 pt-8 pb-4">
              <div className="text-4xl mb-3">🍳</div>
              <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                What are we eating?
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1.5">
                Quick meals, zero hassle.
              </p>
            </div>
            <InputScreen onSubmit={handleSubmit} disabled={false} />
          </div>
        )}

        {screen === 'loading' && <SkeletonLoader />}

        {screen === 'results' && results && (
          <ResultsScreen results={results} onBack={() => { setResults(null); setScreen('input') }} />
        )}

        {screen === 'settings' && <Settings />}
      </main>
    </div>
  )
}

export default App
