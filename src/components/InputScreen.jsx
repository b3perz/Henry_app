import { useState } from 'react'

const TIME_OPTIONS = [15, 30, 45, 60]

export default function InputScreen({ onSubmit, disabled }) {
  const [ingredients, setIngredients] = useState('')
  const [cookTime, setCookTime] = useState(30)
  const [dinners, setDinners] = useState(2)
  const [lunches, setLunches] = useState(3)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (disabled) return
    const parts = []
    if (dinners > 0) parts.push(`${dinners} dinner${dinners > 1 ? 's' : ''}`)
    if (lunches > 0) parts.push(`${lunches} lunch${lunches > 1 ? 'es' : ''}`)
    const portions = parts.join(', ') || '2 dinners'
    onSubmit({ ingredients: ingredients.trim(), cookTime, portions })
  }

  const totalMeals = dinners + lunches

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-5 max-w-lg mx-auto w-full">
      {/* Ingredients */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          What's in your fridge?
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="chicken, rice, onions, garlic..."
          maxLength={500}
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 dark:focus:ring-orange-400/50 dark:focus:border-orange-400 transition-shadow"
          rows={3}
        />
        <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-1.5">
          Leave empty for a full meal plan with grocery list.
        </p>
      </div>

      {/* Cook time */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Max cook time
        </label>
        <div className="grid grid-cols-4 gap-2">
          {TIME_OPTIONS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setCookTime(t)}
              className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                cookTime === t
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-[1.02]'
                  : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95'
              }`}
            >
              {t} min
            </button>
          ))}
        </div>
      </div>

      {/* Meal counts */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          How many meals?
        </label>
        <div className="flex gap-3">
          <Counter label="Dinners" value={dinners} onChange={setDinners} />
          <Counter label="Lunches" value={lunches} onChange={setLunches} />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={disabled || totalMeals === 0}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-neutral-300 disabled:to-neutral-400 dark:disabled:from-neutral-700 dark:disabled:to-neutral-800 disabled:cursor-not-allowed text-white font-bold text-base transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.98] disabled:shadow-none"
      >
        {disabled ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Cooking up ideas...
          </span>
        ) : (
          `Generate ${totalMeals} meal${totalMeals !== 1 ? 's' : ''}`
        )}
      </button>
    </form>
  )
}

function Counter({ label, value, onChange }) {
  return (
    <div className="flex-1 bg-neutral-50 dark:bg-neutral-800/80 rounded-xl p-3 border border-neutral-200 dark:border-neutral-700/50">
      <span className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">{label}</span>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value === 0}
          className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center justify-center text-lg font-medium transition-all duration-150 hover:bg-neutral-300 dark:hover:bg-neutral-600 active:scale-90 disabled:opacity-30 disabled:active:scale-100"
        >
          -
        </button>
        <span className="text-xl font-bold text-neutral-900 dark:text-white tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(10, value + 1))}
          disabled={value >= 10}
          className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center text-lg font-medium transition-all duration-150 hover:bg-orange-600 active:scale-90 disabled:opacity-30 disabled:active:scale-100"
        >
          +
        </button>
      </div>
    </div>
  )
}
