import { useState } from 'react'

const TIME_OPTIONS = [15, 30, 45, 60]

export default function InputScreen({ onSubmit, loading }) {
  const [ingredients, setIngredients] = useState('')
  const [cookTime, setCookTime] = useState(30)
  const [dinners, setDinners] = useState(2)
  const [lunches, setLunches] = useState(3)

  const handleSubmit = (e) => {
    e.preventDefault()
    const parts = []
    if (dinners > 0) parts.push(`${dinners} dinner${dinners > 1 ? 's' : ''}`)
    if (lunches > 0) parts.push(`${lunches} lunch${lunches > 1 ? 'es' : ''}`)
    const portions = parts.join(', ') || '2 dinners'

    onSubmit({ ingredients, cookTime, portions })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-4 max-w-lg mx-auto w-full">
      <div>
        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
          What's in your fridge?
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="chicken, rice, onions, garlic... (leave empty for full meal plan)"
          className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent"
          rows={3}
        />
        <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-1">
          Comma-separated. Leave blank to get a grocery list + recipes.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
          Cook time
        </label>
        <div className="grid grid-cols-4 gap-2">
          {TIME_OPTIONS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setCookTime(t)}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                cookTime === t
                  ? 'bg-orange-500 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {t} min
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
          How many meals?
        </label>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Dinners</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDinners(Math.max(0, dinners - 1))}
                  className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center justify-center text-lg leading-none hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                  -
                </button>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white w-4 text-center">{dinners}</span>
                <button
                  type="button"
                  onClick={() => setDinners(dinners + 1)}
                  className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center justify-center text-lg leading-none hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Lunches</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLunches(Math.max(0, lunches - 1))}
                  className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center justify-center text-lg leading-none hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                  -
                </button>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white w-4 text-center">{lunches}</span>
                <button
                  type="button"
                  onClick={() => setLunches(lunches + 1)}
                  className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center justify-center text-lg leading-none hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || (dinners === 0 && lunches === 0)}
        className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-base transition-colors mt-2"
      >
        {loading ? 'Cooking up ideas...' : 'Go'}
      </button>
    </form>
  )
}
