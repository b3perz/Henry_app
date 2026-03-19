const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || ''

export async function generateMeals({ ingredients, cookTime, portions, preferences }) {
  if (!API_KEY) {
    throw new Error('App is not configured yet. The site owner needs to add their API key.')
  }

  const hasIngredients = ingredients && ingredients.trim().length > 0

  const dietaryContext = []
  if (preferences.excludedIngredients.length > 0) {
    dietaryContext.push(`Excluded ingredients (NEVER use these): ${preferences.excludedIngredients.join(', ')}`)
  }
  if (preferences.dietaryRules.length > 0) {
    dietaryContext.push(`Dietary rules: ${preferences.dietaryRules.join(', ')}`)
  }
  if (preferences.cuisinePreferences.length > 0) {
    dietaryContext.push(`Preferred cuisines: ${preferences.cuisinePreferences.join(', ')}`)
  }

  const prefsBlock = dietaryContext.length > 0
    ? `\n\nUser preferences:\n${dietaryContext.join('\n')}`
    : ''

  let prompt
  if (hasIngredients) {
    prompt = `Generate recipes using these available ingredients: ${ingredients}
Max cook time: ${cookTime} minutes.
Portions needed: ${portions}.${prefsBlock}

For each recipe, flag any extra ingredients needed that aren't in the list above.`
  } else {
    prompt = `Generate a meal plan with grocery list.
Max cook time per meal: ${cookTime} minutes.
Portions needed: ${portions}.${prefsBlock}

Include a combined grocery list for all recipes.`
  }

  const systemPrompt = `You are QuickPlate, a fast meal planning assistant for busy people who need quick, healthy meals.

IMPORTANT: Respond ONLY with valid JSON. No markdown, no code blocks, no extra text.

Response format:
{
  "meals": [
    {
      "name": "Meal Name",
      "cookTime": 15,
      "portions": 2,
      "ingredients": [
        {"name": "ingredient", "quantity": "amount", "have": true}
      ],
      "steps": ["Step 1", "Step 2"],
      "tags": ["high-protein", "quick"]
    }
  ],
  "groceryList": [
    {"name": "item", "quantity": "amount"}
  ]
}

Rules:
- Generate 3-5 recipes that are practical and easy
- Keep steps simple and concise (max 6 steps per recipe)
- Scale ingredient quantities to requested portions
- "have" field: true if ingredient was provided by user, false if extra
- groceryList: only include items user needs to buy (items with have:false, or all items if no ingredients provided)
- Focus on meals a young man / bachelor would actually make
- Prioritize speed and simplicity`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    if (response.status === 401) {
      throw new Error('API key is invalid. The site owner needs to update it.')
    }
    throw new Error(errorData.error?.message || 'Failed to generate meals')
  }

  const message = await response.json()
  const text = message.content[0].text

  let parsed
  try {
    parsed = JSON.parse(text)
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0])
    } else {
      throw new Error('Could not parse recipe response')
    }
  }

  return parsed
}
