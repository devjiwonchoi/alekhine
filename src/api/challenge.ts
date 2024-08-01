import type { ChallengeAI, ChallengeOpen } from '../types'
export class Challenge {
  constructor(private readonly fetcher: Function) {}

  public async create({ username }: { username: string }) {
    const response = await this.fetcher(`/api/challenge/${username}`, 'post')
    const json = await response.json()
    return json
  }

  public async accept({ challengeId }: { challengeId: string }) {
    const response = await this.fetcher(`/api/challenge/${challengeId}/accept`, 'post')
    const json = await response.json()
    return json
  }

  public async decline({ challengeId }: { challengeId: string }) {
    const response = await this.fetcher(`/api/challenge/${challengeId}/decline`, 'post')
    const json = await response.json()
    return json
  }

  public async cancel({ challengeId }: { challengeId: string }) {
    const response = await this.fetcher(`/api/challenge/${challengeId}/cancel`, 'post')
    const json = await response.json()
    return json
  }

  // TODO: refactor
  public async ai({
    level,
    clockLimit,
    clockIncrement,
    days,
    color,
    variant,
    fen,
  }: ChallengeAI) {
    const params = new URLSearchParams()
    if (level) params.append('level', level.toString())
    if (clockLimit) params.append('clock.limit', clockLimit.toString())
    if (clockIncrement)
      params.append('clock.increment', clockIncrement.toString())
    if (days) params.append('days', days.toString())
    if (color) params.append('color', color)
    if (variant) params.append('variant', variant)
    if (fen) params.append('fen', fen)
    const response = await this.fetcher(`/api/challenge/ai`, 'post', params)
    const json = await response.json()
    return json
  }

  // TODO: refactor
  public async open({
    rated,
    clockLimit,
    clockIncrement,
    days,
    color,
    variant,
    fen,
    name,
    rules,
    users,
    expiresAt,
  }: ChallengeOpen) {
    const params = new URLSearchParams()
    if (rated) params.append('rated', rated.toString())
    if (clockLimit) params.append('clock.limit', clockLimit.toString())
    if (clockIncrement !== undefined)
      params.append('clock.increment', clockIncrement.toString())
    if (days) params.append('days', days.toString())
    if (color) params.append('color', color)
    if (variant) params.append('variant', variant)
    if (fen) params.append('fen', fen)
    if (name) params.append('name', name)
    if (rules) params.append('rules', rules)
    if (users) {
      if (Array.isArray(users)) users = users.join(',')
      users = users.replace(/\s/g, '')
      params.append('users', users.toString())
    }
    if (expiresAt) params.append('expiresAt', expiresAt.toString())
    const response = await this.fetcher(`/api/challenge/open`, 'post', params)
    const json = await response.json()
    return json
  }

  public async start({
    gameId,
    token1,
    token2,
  }: {
    gameId: string
    token1: string
    token2: string
  }) {
    const response = await this.fetcher(
      `/api/challenge/${gameId}/start-clocks?token1=${token1}&token2=${token2}`,
      'post')
    const json = await response.json()
    return json
  }

  public async grant({ gameId, seconds }: { gameId: string; seconds: number }) {
    const response = await this.fetcher(`/api/round/${gameId}/add-time/${seconds}`, 'post')
    const json = await response.json()
    return json
  }

  public async admin({
    users,
    description,
  }: {
    users: string | string[]
    description: string
  }) {
    const params = new URLSearchParams()
    if (users) {
      if (Array.isArray(users)) users = users.join(',')
      users = users.replace(/\s/g, '')
      params.append('users', users.toString())
    }
    if (description) params.append('description', description)
    const response = await this.fetcher(`/api/challenge/admin`, 'post', params)
    const json = await response.json()
    return json
  }
}
