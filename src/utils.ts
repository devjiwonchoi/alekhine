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

export async function streamer({
    endpoint,
    token,
    method = 'GET',
    body,
    json = true
}: {
    endpoint: string
    token: string
    method?: string
    body?: URLSearchParams
    json?: boolean
}) {
    return new Promise(async (resolve, reject) => {
        const fetchOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            }, 
            method,
            body,
        }
        fetch(`${LICHESS_API_URL}${endpoint}`, fetchOptions)
        .then(response => response.body)
        .then(stream => {
            if (stream == null) {
                return reject('Endpoint is not a stream, use fetcher instead.')
            }
            return stream.pipeThrough(new TextDecoderStream())
        })
        .then(stream => {
            if (!stream) {
                return reject('Error decoding stream')
            }
            if (json) {
                return stream.pipeThrough(new JSONStream())
            }
            return stream
        })
        .then(stream => resolve(stream))
        .catch(e => {
            return reject(`Error fetching API: ${e}`)
        })
    })
}

export async function fetcher({
    endpoint,
    token,
    method = 'GET',
    body,
    json = true
}: {
    endpoint: string
    token: string
    method?: string
    body?: URLSearchParams
    json?: boolean
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
        if (json) {
            const data = await response.json()
            return data
        } else {
            return response
        }
    } catch (error) {
        throw error
    }
}
