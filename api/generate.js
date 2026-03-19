import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, systemPrompt } = req.body

  if (!prompt || !systemPrompt) {
    return res.status(400).json({ error: 'Missing prompt or systemPrompt' })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    })

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

    return res.status(200).json(parsed)
  } catch (err) {
    console.error('Claude API error:', err)
    return res.status(500).json({ error: err.message || 'Failed to generate meals' })
  }
}
