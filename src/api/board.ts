export class Board {
  constructor(private readonly fetcher: Function, private readonly streamer: Function) {}

  public events() {
    return this.streamer(`/stream/event`)
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

  public stream({ gameId }: { gameId: string }) {
    return this.streamer(`/board/game/stream/${gameId}`)
  }

  public move({ gameId, move }: { gameId: string; move: string }) {
    const offerDraw = move === 'draw'
    return this.fetcher(
      `/board/game/${gameId}/move/${move}?offeringDraw=${offerDraw}`,
      'post',
    )
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
      `/board/game/${gameId}/chat`,
      isSendingChat ? 'post' : 'get',
      isSendingChat ? new URLSearchParams({ room, text }) : undefined,
    )
  }

  public abort({ gameId }: { gameId: string }) {
    return this.fetcher(`/board/game/${gameId}/abort`, 'post')
  }

  public resign({ gameId }: { gameId: string }) {
    return this.fetcher(`/board/game/${gameId}/resign`, 'post')
  }

  public draw({ gameId, accept }: { gameId: string; accept: boolean }) {
    return this.fetcher(`/board/game/${gameId}/draw/${accept}`, 'post')
  }

  public takeback({ gameId, accept }: { gameId: string; accept: boolean }) {
    return this.fetcher(`/board/game/${gameId}/takeback/${accept}`, 'post')
  }

  public victory({ gameId }: { gameId: string }) {
    return this.fetcher(`/board/game/${gameId}/claim-victory`, 'post')
  }

  public berserk({ gameId }: { gameId: string }) {
    return this.fetcher(`/board/game/${gameId}/berserk`, 'post')
  }
}
