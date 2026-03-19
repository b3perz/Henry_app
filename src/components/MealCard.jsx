import { useState } from 'react'

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
]

function getImageForMeal(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0
  }
  return PLACEHOLDER_IMAGES[Math.abs(hash) % PLACEHOLDER_IMAGES.length]
}

export default function MealCard({ meal }) {
  const [expanded, setExpanded] = useState(false)
  const imageUrl = getImageForMeal(meal.name)
  const extraIngredients = meal.ingredients.filter((ing) => !ing.have)

  return (
    <div
      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={meal.name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <h3 className="text-white font-semibold text-base">{meal.name}</h3>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            {meal.cookTime} min
          </span>
          <span>{meal.portions} portion{meal.portions > 1 ? 's' : ''}</span>
          {meal.tags && meal.tags.map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 text-xs">
              {tag}
            </span>
          ))}
        </div>

        {extraIngredients.length > 0 && !expanded && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
            +{extraIngredients.length} extra ingredient{extraIngredients.length > 1 ? 's' : ''} needed
          </p>
        )}

        {expanded && (
          <div className="mt-3 space-y-3" onClick={(e) => e.stopPropagation()}>
            <div>
              <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
                Ingredients
              </h4>
              <ul className="space-y-1">
                {meal.ingredients.map((ing, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className={`${!ing.have ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-800 dark:text-neutral-200'}`}>
                      {!ing.have && '* '}{ing.name}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-500">{ing.quantity}</span>
                  </li>
                ))}
              </ul>
              {extraIngredients.length > 0 && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">* = need to buy</p>
              )}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-1">
                Steps
              </h4>
              <ol className="space-y-2">
                {meal.steps.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="text-orange-500 font-semibold shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-2 text-center">
          {expanded ? 'Tap to collapse' : 'Tap for recipe'}
        </p>
      </div>
    </div>
  )
}
