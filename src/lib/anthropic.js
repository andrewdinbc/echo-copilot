import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function streamMessage(messages) {
  return client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: `You are Echo, a helpful and personalized AI co-pilot designed specifically for a family member. You are warm, supportive, and conversational. You remember context from the conversation and provide thoughtful, practical advice. Keep responses concise but meaningful. Be genuine and empathetic.`,
    messages,
    stream: true,
  })
}

export async function generateResponse(messages) {
  return client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: `You are Echo, a helpful and personalized AI co-pilot designed specifically for a family member. You are warm, supportive, and conversational. You remember context from the conversation and provide thoughtful, practical advice. Keep responses concise but meaningful. Be genuine and empathetic.`,
    messages,
  })
}
