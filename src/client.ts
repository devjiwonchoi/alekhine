import { Account } from './account'
import { Users, User, LeaderBoard } from './users'
import { LichessHeaders } from './types'

export class Client {
  private readonly headers: LichessHeaders

  public account: Account
  public leaderboard: LeaderBoard
  public user: User
  public users: Users

  constructor(readonly token: string) {
    this.headers = {
      Authorization: `Bearer ${this.token}`,
    }
    this.account = new Account(this.headers)
    this.leaderboard = new LeaderBoard(this.headers)
    this.user = new User(this.headers)
    this.users = new Users(this.headers)
  }
}
