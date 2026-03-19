const PREFS_KEY = 'quickplate-preferences'
const THEME_KEY = 'quickplate-theme'

const DEFAULT_PREFS = {
  excludedIngredients: [],
  dietaryRules: [],
  cuisinePreferences: [],
}

export function getPreferences() {
  try {
    const stored = localStorage.getItem(PREFS_KEY)
    return stored ? { ...DEFAULT_PREFS, ...JSON.parse(stored) } : DEFAULT_PREFS
  } catch {
    return DEFAULT_PREFS
  }
}

export function savePreferences(prefs) {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
}

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark'
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
