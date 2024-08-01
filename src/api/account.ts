export class Account {
  constructor(private readonly fetcher: Function, private readonly streamer: Function) {}

  public profile() {
    return this.fetcher(`/account`)
  }

  public email() {
    return this.fetcher(`/account/email`)
  }

  public preferences() {
    return this.fetcher(`/account/preferences`)
  }

  public kidMode({ enable }: { enable?: boolean } = {}) {
    return this.fetcher(
      `/account/kid?v=${enable}`,
      enable !== undefined ? 'post' : 'get',
    )
  }

  public challenges() {
    return this.fetcher(`/challenge`)
  }

  public ongoing({ limit }: { limit?: number } = {}) {
    return this.fetcher(`/account/playing?nb=${limit}`)
  }

  public following() {
      return this.streamer(`/rel/following`)
  }
}
