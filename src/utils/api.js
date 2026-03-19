export async function generateMeals({ ingredients, cookTime, portions, preferences }) {
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

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
