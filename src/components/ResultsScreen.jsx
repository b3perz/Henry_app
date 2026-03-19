import { useState } from 'react'
import MealCard from './MealCard'

export default function ResultsScreen({ results, onBack }) {
  const { meals, groceryList } = results
  const [groceryOpen, setGroceryOpen] = useState(true)

  return (
    <div className="flex flex-col gap-4 p-5 max-w-lg mx-auto w-full pb-8 animate-fade-in">
      {/* Grocery list */}
      {groceryList && groceryList.length > 0 && (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 border border-orange-200/70 dark:border-orange-900/50 rounded-2xl overflow-hidden">
          <button
            onClick={() => setGroceryOpen(!groceryOpen)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🛒</span>
              <h2 className="text-sm font-bold text-orange-700 dark:text-orange-400">
                Grocery List
              </h2>
              <span className="text-xs text-orange-500/70 dark:text-orange-400/50 font-medium">
                {groceryList.length} item{groceryList.length !== 1 ? 's' : ''}
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-orange-400 transition-transform duration-300 ${groceryOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${groceryOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
            <ul className="px-4 pb-4 space-y-1.5">
              {groceryList.map((item, i) => (
                <li key={i} className="flex justify-between items-center text-sm py-0.5">
                  <span className="text-neutral-800 dark:text-neutral-200">{item.name}</span>
                  <span className="text-neutral-500 dark:text-neutral-500 text-xs ml-2 shrink-0">{item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Meals header */}
      <h2 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider px-1">
        Your meals ({meals.length})
      </h2>

      {/* Meal cards */}
      <div className="flex flex-col gap-3">
        {meals.map((meal, i) => (
          <MealCard key={i} meal={meal} index={i} />
        ))}
      </div>

      {/* Start over */}
      <button
        onClick={onBack}
        className="w-full py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 font-semibold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-200 active:scale-[0.98] mt-2"
      >
        Start over
      </button>
    </div>
  )
}
