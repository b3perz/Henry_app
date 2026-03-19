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

export default function MealCard({ meal, index = 0 }) {
  const [expanded, setExpanded] = useState(false)
  const imageUrl = getImageForMeal(meal.name)
  const extraIngredients = meal.ingredients.filter((ing) => !ing.have)

  return (
    <div
      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50 active:scale-[0.99] animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={meal.name}
          className="w-full h-44 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg leading-tight">{meal.name}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="flex items-center gap-1 text-xs text-white/80">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              {meal.cookTime} min
            </span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-xs text-white/80">{meal.portions} serving{meal.portions > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        {/* Tags */}
        {meal.tags && meal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {meal.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Extra ingredients hint */}
        {extraIngredients.length > 0 && !expanded && (
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            +{extraIngredients.length} ingredient{extraIngredients.length > 1 ? 's' : ''} to buy
          </p>
        )}

        {/* Expandable content */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="pt-2 space-y-4">
              {/* Ingredients */}
              <div>
                <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                  Ingredients
                </h4>
                <ul className="space-y-1.5">
                  {meal.ingredients.map((ing, i) => (
                    <li key={i} className="flex justify-between text-sm">
                      <span className={`${!ing.have ? 'text-amber-600 dark:text-amber-400 font-medium' : 'text-neutral-700 dark:text-neutral-300'}`}>
                        {!ing.have && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 align-middle" />
                        )}
                        {ing.name}
                      </span>
                      <span className="text-neutral-400 dark:text-neutral-500 ml-2 shrink-0">{ing.quantity}</span>
                    </li>
                  ))}
                </ul>
                {extraIngredients.length > 0 && (
                  <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-2 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                    = need to buy
                  </p>
                )}
              </div>

              {/* Steps */}
              <div className="pb-1">
                <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                  Steps
                </h4>
                <ol className="space-y-2.5">
                  {meal.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Expand hint */}
        <div className="flex items-center justify-center gap-1 mt-2 text-xs text-neutral-400 dark:text-neutral-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
          <span>{expanded ? 'Collapse' : 'View recipe'}</span>
        </div>
      </div>
    </div>
  )
}
