import { GetUsers, GetUser } from '../types'

class LeaderBoard {
  constructor(private readonly fetcher: Function) {}

  public info({ nb, perfType }: { nb: number; perfType: string }) {
    return this.fetcher(`/player/top/${nb}/${perfType}`)
  }

  // TODO: define perfTypes
  public topTens() {
    return this.fetcher(`/player`)
  }
}

export class Users {
  public leaderboard: LeaderBoard

  constructor(private readonly fetcher: Function) {
    this.leaderboard = new LeaderBoard(this.fetcher)
  }

  public info({ ids }: GetUsers) {
    if (Array.isArray(ids)) ids = ids.join(',')
    ids = ids.replace(/\s/g, '')
    return this.fetcher(`/users`, 'post', ids)
  }

  public status({ ids }: GetUsers) {
    if (Array.isArray(ids)) ids = ids.join(',')
    ids = ids.replace(/\s/g, '')
    return this.fetcher(`/users/status?ids=${ids}`)
  }

  public crosstable({
    user1,
    user2,
    matchup = false,
  }: {
    user1: string
    user2: string
    matchup?: boolean
  }) {
    return this.fetcher(`/crosstable/${user1}/${user2}?matchup=${matchup}`)
  }

  public streaming() {
    return this.fetcher(`/streamer/live`)
  }
}

export class User {
  constructor(private readonly fetcher: Function, private readonly streamer: Function) {}

  public info({ username }: { username: string }) {
    return this.fetcher(`/user/${username}`)
  }

  public history({ username }: { username: string }) {
    return this.fetcher(`/user/${username}/rating-history`)
  }

  public performance({
    username,
    perfType,
  }: {
    username: string
    perfType: string
  }) {
    return this.fetcher(`/user/${username}/perf/${perfType}`)
  }

  public activity({ username }: { username: string }) {
    return this.fetcher(`/user/${username}/activity`)
  }

  public autocomplete({ term, details = false, friendPrior = false }: GetUser) {
    return this.fetcher(
      `/player/autocomplete?term=${term}&object=${details}&friend=${friendPrior}`,
    )
  }

  public note({ username, text }: { username: string; text?: string }) {
    const hasText = typeof text === 'string' && text.length > 0
    return this.fetcher(
      `/user/${username}/note`,
      hasText ? 'post' : 'get',
      hasText ? new URLSearchParams({ text }) : undefined,
    )
  }

  public follow({ username }: { username: string }) {
    return this.fetcher(`/rel/follow/${username}`, 'post')
  }

  public unfollow({ username }: { username: string }) {
    return this.fetcher(`/rel/unfollow/${username}`, 'post')
  }

  public async studies({ username }: { username: string }) {
    return this.streamer(`/study/by/${username}`)
  }
}
