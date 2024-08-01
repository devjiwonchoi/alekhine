import { GetUsers, GetUser } from '../types'
import { JSONStream } from '../utils.ts'

class LeaderBoard {
  constructor(private readonly fetcher: Function) {}

  public async info({ nb, perfType }: { nb: number; perfType: string }) {
    const response = await this.fetcher(`/api/player/top/${nb}/${perfType}`)
    const json = await response.json()
    return json
  }

  // TODO: define perfTypes
  public async topTens() {
    const response = await this.fetcher(`/api/player`)
    const json = await response.json()
    return json
  }
}

export class Users {
  public leaderboard: LeaderBoard

  constructor(private readonly fetcher: Function) {
    this.leaderboard = new LeaderBoard(this.fetcher)
  }

  public async info({ ids }: GetUsers) {
    if (Array.isArray(ids)) ids = ids.join(',')
    ids = ids.replace(/\s/g, '')
    const response = await this.fetcher(`/api/users`, 'post', ids)
    const json = await response.json()
    return json
  }

  public async status({ ids }: GetUsers) {
    if (Array.isArray(ids)) ids = ids.join(',')
    ids = ids.replace(/\s/g, '')
    const response = await this.fetcher(`/api/users/status?ids=${ids}`)
    const json = await response.json()
    return json
  }

  public async crosstable({
    user1,
    user2,
    matchup = false,
  }: {
    user1: string
    user2: string
    matchup?: boolean
  }) {
    const response = await this.fetcher(`/api/crosstable/${user1}/${user2}?matchup=${matchup}`)
    const json = await response.json()
    return json
  }

  public async streaming() {
    const response = await this.fetcher(`/api/streamer/live`)
    const json = await response.json()
    return json
  }
}

export class User {
  constructor(private readonly fetcher: Function) {}

  public async info({ username }: { username: string }) {
    const response = await this.fetcher(`/api/user/${username}`)
    const json = await response.json()
    return json
  }

  public async history({ username }: { username: string }) {
    const response = await this.fetcher(`/api/user/${username}/rating-history`)
    const json = await response.json()
    return json
  }

  public async performance({
    username,
    perfType,
  }: {
    username: string
    perfType: string
  }) {
    const response = await this.fetcher(`/api/user/${username}/perf/${perfType}`)
    const json = await response.json()
    return json
  }

  public async activity({ username }: { username: string }) {
    const response = await this.fetcher(`/api/user/${username}/activity`)
    const json = await response.json()
    return json
  }

  public async autocomplete({ term, details = false, friendPrior = false }: GetUser) {
    const response = await this.fetcher(
      `/api/player/autocomplete?term=${term}&object=${details}&friend=${friendPrior}`)
    const json = await response.json()
    return json
  }

  public async note({ username, text }: { username: string; text?: string }) {
    const hasText = typeof text === 'string' && text.length > 0
    const response = await this.fetcher(
      `/api/user/${username}/note`,
      hasText ? 'post' : 'get',
      hasText ? new URLSearchParams({ text }) : undefined)
    const json = await response.json()
    return json
  }

  public async follow({ username }: { username: string }) {
    const response = await this.fetcher(`/api/rel/follow/${username}`, 'post')
    const json = await response.json()
    return json
  }

  public async unfollow({ username }: { username: string }) {
    const response = await this.fetcher(`/api/rel/unfollow/${username}`, 'post')
    const json = await response.json()
    return json
  }

  public async studies({ username }: { username: string }) {
    const response = await this.fetcher(`/api/study/by/${username}`)
    // Decode stream and parse it into JSON
    const stream = response.body
    const text = await stream.pipeThrough(new TextDecoderStream())
    const json = await text.pipeThrough(new JSONStream())
    return json
  }
}
