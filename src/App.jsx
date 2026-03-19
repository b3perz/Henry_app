import { useState } from 'react'
import Header from './components/Header'
import InputScreen from './components/InputScreen'
import ResultsScreen from './components/ResultsScreen'
import SkeletonLoader from './components/SkeletonLoader'
import Settings from './components/Settings'
import { generateMeals } from './utils/api'
import { getPreferences, getApiKey } from './utils/storage'

function App() {
  const [screen, setScreen] = useState('input') // input | loading | results | settings
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async ({ ingredients, cookTime, portions }) => {
    setScreen('loading')
    setError(null)
    try {
      const preferences = getPreferences()
      const data = await generateMeals({ ingredients, cookTime, portions, preferences })
      setResults(data)
      setScreen('results')
    } catch (err) {
      setError(err.message)
      setScreen('input')
    }
  }

  const isSubScreen = screen === 'settings' || screen === 'results'

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      <Header
        onSettingsClick={() => setScreen('settings')}
        showBack={isSubScreen}
        onBackClick={() => setScreen('input')}
      />

      <main className="flex-1 flex flex-col">
        {error && (
          <div className="mx-4 mt-4 max-w-lg self-center w-full p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {screen === 'input' && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center px-4 pt-8 pb-2">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                What are we eating?
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                Quick meals, zero hassle.
              </p>
            </div>
            {!getApiKey() && (
              <div className="mx-4 mb-2 max-w-lg self-center w-full p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm">
                Add your <button onClick={() => setScreen('settings')} className="underline font-medium">Anthropic API key</button> in Settings to get started.
              </div>
            )}
            <InputScreen onSubmit={handleSubmit} loading={false} />
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
