import { LICHESS_API_URL } from './constants'

/// Processes a text-decoded stream and tries to parse it into JSON.
export class JSONStream extends TransformStream {
    constructor() {
        super({
            start() {},
            flush() {},
            async transform(chunk: string, controller: TransformStreamDefaultController) {
                if (chunk.trim() === '') {
                    controller.enqueue({})
                } else {
                    let parsed
                    try {
                        parsed = JSON.parse(chunk)
                    } catch (e) {
                        controller.error(`Error parsing JSON: ${e}`)
                        parsed = chunk
                    }

                    controller.enqueue(parsed)
                }
            }
        })
    }
}

export async function fetcher({
  endpoint,
  token,
  method = 'GET',
  body,
}: {
  endpoint: string
  token: string
  method?: string
  body?: URLSearchParams
}) {
  try {
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body,
    }
    const response = await fetch(`${LICHESS_API_URL}${endpoint}`, fetchOptions)

    return response
  } catch (error) {
    throw error
  }
}
