# QuickPlate

Fast meal planning for busy people. Pick your cook time, enter what's in your fridge, and get recipes in seconds.

## Setup

```bash
npm install
```

Create a `.env` file with your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

## Development

```bash
npm run dev
```

## Deploy to Vercel

1. Import this repo at [vercel.com](https://vercel.com)
2. Add `ANTHROPIC_API_KEY` to environment variables
3. Deploy — Vite + serverless function auto-detected

## Tech Stack

- React + Vite + Tailwind CSS v4
- Anthropic Claude API (claude-sonnet-4-20250514)
- Vercel serverless functions
- localStorage for preferences
