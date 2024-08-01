import { JSONStream } from '../utils.ts'

export class Account {
  constructor(private readonly fetcher: Function) {}

  public async profile() {
    const response = await this.fetcher(`/api/account`)
    const json = await response.json()
    return json
  }

  public async email() {
    const response = await this.fetcher(`/api/account/email`)
    const json = await response.json()
    return json
  }

  public async preferences() {
    const response = await this.fetcher(`/api/account/preferences`)
    const json = await response.json()
    return json
  }

  public async kidMode({ enable }: { enable?: boolean } = {}) {
    const response = await this.fetcher(
      `/api/account/kid?v=${enable}`,
      enable !== undefined ? 'post' : 'get')
    const json = await response.json()
    return json

  }

  public async challenges() {
    const response = await this.fetcher(`/api/challenge`)
    const json = await response.json()
    return json
  }

  public async ongoing({ limit }: { limit?: number } = {}) {
    const response = await this.fetcher(`/api/account/playing?nb=${limit}`)
    const json = await response.json()
    return json
  }

  public async following() {
    const response = await this.fetcher(`/api/rel/following`)
    // Decode the stream and then parse it into JSON
    const stream = response.body
    const text = await stream.pipeThrough(new TextDecoderStream())
    const json = await text.pipeThrough(new JSONStream())
    return json
  }
}
