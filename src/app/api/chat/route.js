import { streamMessage } from '@/lib/anthropic'

export const runtime = 'nodejs'

export async function POST(request) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const stream = await streamMessage(messages)

    const encoder = new TextEncoder()
    const customStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const text = event.delta.text
              controller.enqueue(encoder.encode(text))
            }

            if (event.type === 'message_stop') {
              controller.close()
            }
          }
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(customStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
