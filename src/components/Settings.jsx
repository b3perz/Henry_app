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
    <div className="flex flex-col gap-6 p-4 max-w-lg mx-auto w-full">
      <div>
        <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
          Excluded Ingredients
        </h2>
        <p className="text-xs text-neutral-400 dark:text-neutral-600 mb-3">
          These will never appear in your recipes.
        </p>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addExcluded())}
            placeholder="e.g., peas, broccoli"
            className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            onClick={addExcluded}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {prefs.excludedIngredients.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs"
            >
              {item}
              <button onClick={() => removeExcluded(item)} className="hover:text-red-900 dark:hover:text-red-200">
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
          Dietary Rules
        </h2>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((rule) => (
            <button
              key={rule}
              onClick={() => toggleDietary(rule)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                prefs.dietaryRules.includes(rule)
                  ? 'bg-orange-500 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {rule}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
          Cuisine Preferences
        </h2>
        <div className="flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => toggleCuisine(cuisine)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                prefs.cuisinePreferences.includes(cuisine)
                  ? 'bg-orange-500 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors"
      >
        {saved ? 'Saved!' : 'Save Preferences'}
      </button>
    </div>
  )
}
