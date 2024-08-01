export class Bot {
  constructor(private readonly fetcher: Function, private readonly streamer: Function) {}

  public online({ nb }: { nb?: number } = {}) {
    return this.fetcher(`/bot/online?nb=${nb}`)
  }

  public upgrade() {
    return this.fetcher(`/bot/account/upgrade`, 'post')
  }

  public stream({ gameId }: { gameId: string }) {
    return this.streamer(`/bot/game/stream/${gameId}`)
  }

  public move({ gameId, move }: { gameId: string; move: string }) {
    return this.fetcher(`/bot/game/${gameId}/move/${move}`, 'post')
  }

  public chat({
    gameId,
    room,
    text,
  }: {
    gameId: string
    room?: 'player' | 'spectator'
    text?: string
  }) {
    const isSendingChat = !!(room && text)
    return this.fetcher(
      `/bot/game/${gameId}/chat`,
      isSendingChat ? 'post' : 'get',
      isSendingChat ? new URLSearchParams({ room, text }) : undefined,
    )
  }

  public abort({ gameId }: { gameId: string }) {
    return this.fetcher(`/bot/game/${gameId}/abort`, 'post')
  }

  public resign({ gameId }: { gameId: string }) {
    return this.fetcher(`/bot/game/${gameId}/resign`, 'post')
  }
}
