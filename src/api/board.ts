export class Board {
  constructor(private readonly fetcher: Function) {}

  public events() {
    return this.fetcher(`/api/stream/event`)
  }

  // TODO: seek()
  // public seek({
  //   mode,
  //   options: {
  //     rated = false,
  //     variant = 'standard',
  //     color = 'random',
  //     ratingRange = '',
  //     time,
  //     increment,
  //     days,
  //   },
  // }: BoardSeek) {
  //   const ratedString = new Boolean(rated).toString()
  //   if (mode === 'realtime' && time && increment) {
  //     return fetch(`${LICHESS_API_URL}/board/seek`, {
  //       headers: this.headers,
  //       method: 'POST',
  //       body: new URLSearchParams({
  //         rated: ratedString,
  //         variant,
  //         color,
  //         ratingRange,
  //         time: time.toString(),
  //         increment: increment.toString(),
  //       }),
  //     })
  //   }
  //   if (mode === 'correspondence' && days) {
  //     return fetch(`${LICHESS_API_URL}/board/seek`, {
  //       headers: this.headers,
  //       method: 'POST',
  //       body: new URLSearchParams({
  //         rated: ratedString,
  //         variant,
  //         color,
  //         ratingRange,
  //         days: days.toString(),
  //       }),
  //     })
  //   }
  //   return undefined
  // }

  public async stream({ gameId }: { gameId: string }) {
    const response = await this.fetcher(`/api/board/game/stream/${gameId}`)
    const json = await response.json()
    return json
  }

  public async move({ gameId, move }: { gameId: string; move: string }) {
    const offerDraw = move === 'draw'
    const response = await this.fetcher(
      `/api/board/game/${gameId}/move/${move}?offeringDraw=${offerDraw}`,
      'post')
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
      `/api/board/game/${gameId}/chat`,
      isSendingChat ? 'post' : 'get',
      isSendingChat ? new URLSearchParams({ room, text }) : undefined)
    const json = await response.json()
    return json
  }

  public async abort({ gameId }: { gameId: string }) {
    const response = await this.fetcher(`/api/board/game/${gameId}/abort`, 'post')
    const json = await response.json()
    return json
  }

  public async resign({ gameId }: { gameId: string }) {
    const response = await this.fetcher(`/api/board/game/${gameId}/resign`, 'post')
    const json = await response.json()
    return json
  }

  public async draw({ gameId, accept }: { gameId: string; accept: boolean }) {
    const response = await this.fetcher(`/api/board/game/${gameId}/draw/${accept}`, 'post')
    const json = await response.json()
    return json
  }

  public async takeback({ gameId, accept }: { gameId: string; accept: boolean }) {
    const response = await this.fetcher(`/api/board/game/${gameId}/takeback/${accept}`, 'post')
    const json = await response.json()
    return json
  }

  public async victory({ gameId }: { gameId: string }) {
    const response = await this.fetcher(`/api/board/game/${gameId}/claim-victory`, 'post')
    const json = await response.json()
    return json
  }

  public async berserk({ gameId }: { gameId: string }) {
    const response = await this.fetcher(`/api/board/game/${gameId}/berserk`, 'post')
    const json = await response.json()
    return json
  }
}
