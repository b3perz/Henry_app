import MealCard from './MealCard'

export default function ResultsScreen({ results, onBack }) {
  const { meals, groceryList } = results

  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto w-full pb-8">
      {groceryList && groceryList.length > 0 && (
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-orange-700 dark:text-orange-400 mb-2">
            Grocery List
          </h2>
          <ul className="space-y-1">
            {groceryList.map((item, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span className="text-neutral-800 dark:text-neutral-200">{item.name}</span>
                <span className="text-neutral-500 dark:text-neutral-500">{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {meals.map((meal, i) => (
          <MealCard key={i} meal={meal} />
        ))}
      </div>

      <button
        onClick={onBack}
        className="w-full py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        Start over
      </button>
    </div>
  )
}
