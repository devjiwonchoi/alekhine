export class Bot {
  constructor(private readonly fetcher: Function) {}

  public async online({ nb }: { nb?: number } = {}) {
    const response = await this.fetcher(`/api/bot/online?nb=${nb}`)
    const json = await response.json()
    return json
  }

  public async upgrade() {
    const response = await this.fetcher(`/api/bot/account/upgrade`, 'post')
    const json = await response.json()
    return json
  }

  public async stream({ gameId }: { gameId: string }) {
    const response = await this.fetcher(`/api/bot/game/stream/${gameId}`)
    const json = await response.json()
    return json
  }

  public async move({ gameId, move }: { gameId: string; move: string }) {
    const response = await this.fetcher(`/api/bot/game/${gameId}/move/${move}`, 'post')
    const json = await response.json()
    return json
  }

  public async chat({
    gameId,
    room,
    text,
  }: {
    gameId: string
    room?: 'player' | 'spectator'
    text?: string
  }) {
    const isSendingChat = !!(room && text)
    const response = await this.fetcher(
      `/api/bot/game/${gameId}/chat`,
      isSendingChat ? 'post' : 'get',
      isSendingChat ? new URLSearchParams({ room, text }) : undefined)
    const json = await response.json()
    return json
  }

  public async abort({ gameId }: { gameId: string }) {
    const response = await return this.fetcher(`/api/bot/game/${gameId}/abort`, 'post')
    const json = await response.json()
    return json
  }

  public async resign({ gameId }: { gameId: string }) {
    const response = await this.fetcher(`/api/bot/game/${gameId}/resign`, 'post')
    const json = await response.json()
    return json
  }
}
