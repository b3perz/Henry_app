import { useState } from 'react'
import { getPreferences, savePreferences } from '../utils/storage'

const DIETARY_OPTIONS = ['Low carb', 'High protein', 'No dairy', 'No gluten', 'Vegetarian', 'Vegan', 'Keto', 'No pork']
const CUISINE_OPTIONS = ['Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'Indian', 'Japanese', 'Korean']

export default function Settings() {
  const [prefs, setPrefs] = useState(getPreferences)
  const [excludeInput, setExcludeInput] = useState('')
  const [saved, setSaved] = useState(false)

  const addExcluded = () => {
    const item = excludeInput.trim().toLowerCase()
    if (item && !prefs.excludedIngredients.includes(item)) {
      const updated = { ...prefs, excludedIngredients: [...prefs.excludedIngredients, item] }
      setPrefs(updated)
      savePreferences(updated)
    }
    setExcludeInput('')
  }

  const removeExcluded = (item) => {
    const updated = { ...prefs, excludedIngredients: prefs.excludedIngredients.filter((i) => i !== item) }
    setPrefs(updated)
    savePreferences(updated)
  }

  const toggleDietary = (rule) => {
    const has = prefs.dietaryRules.includes(rule)
    const updated = {
      ...prefs,
      dietaryRules: has
        ? prefs.dietaryRules.filter((r) => r !== rule)
        : [...prefs.dietaryRules, rule],
    }
    setPrefs(updated)
    savePreferences(updated)
  }

  const toggleCuisine = (cuisine) => {
    const has = prefs.cuisinePreferences.includes(cuisine)
    const updated = {
      ...prefs,
      cuisinePreferences: has
        ? prefs.cuisinePreferences.filter((c) => c !== cuisine)
        : [...prefs.cuisinePreferences, cuisine],
    }
    setPrefs(updated)
    savePreferences(updated)
  }

  const handleSave = () => {
    savePreferences(prefs)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-7 p-5 max-w-lg mx-auto w-full animate-fade-in">
      {/* Excluded Ingredients */}
      <div>
        <h2 className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1">
          Excluded Ingredients
        </h2>
        <p className="text-xs text-neutral-400 dark:text-neutral-600 mb-3">
          These will never appear in your recipes.
        </p>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addExcluded())}
            placeholder="e.g., peas, broccoli"
            className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-shadow"
          />
          <button
            onClick={addExcluded}
            disabled={!excludeInput.trim()}
            className="px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 disabled:opacity-40 transition-all active:scale-95"
          >
            Add
          </button>
        </div>
        {prefs.excludedIngredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {prefs.excludedIngredients.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-medium border border-red-200/50 dark:border-red-900/30"
              >
                {item}
                <button onClick={() => removeExcluded(item)} className="hover:text-red-800 dark:hover:text-red-200 transition-colors">
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dietary Rules */}
      <div>
        <h2 className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3">
          Dietary Rules
        </h2>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((rule) => (
            <button
              key={rule}
              onClick={() => toggleDietary(rule)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                prefs.dietaryRules.includes(rule)
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/25 scale-[1.02]'
                  : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95'
              }`}
            >
              {rule}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine Preferences */}
      <div>
        <h2 className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3">
          Cuisine Preferences
        </h2>
        <div className="flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => toggleCuisine(cuisine)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                prefs.cuisinePreferences.includes(cuisine)
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/25 scale-[1.02]'
                  : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 active:scale-[0.98] ${
          saved
            ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
            : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20'
        }`}
      >
        {saved ? 'Saved!' : 'Save Preferences'}
      </button>
    </div>
  )
}
