import { lichess } from './test-utils'

describe('profile()', () => {
  it('should get account profile', async () => {
    const profile = await lichess.account.profile()
    expect(profile).toHaveProperty('id')
    expect(profile).toHaveProperty('username')
  })
})

describe('email()', () => {
  it('should get account email', async () => {
    const email = await lichess.account.email()
    expect(email).toHaveProperty('email')
  })
})

describe('preferences()', () => {
  it('should get account preferences', async () => {
    const preferences = await lichess.account.preferences()
    expect(preferences).toHaveProperty('prefs')
  })
})

describe('kidMode()', () => {
  it('should get kid mode status', async () => {
    const kidMode = await lichess.account.kidMode()
    expect(kidMode).toHaveProperty('kid')
  })

  it('should enable kid mode', async () => {
    await lichess.account.kidMode({ enable: true })
    const kidMode = await lichess.account.kidMode()
    expect(kidMode.kid).toBe(true)
  })

  it('should disable kid mode', async () => {
    await lichess.account.kidMode({ enable: false })
    const kidMode = await lichess.account.kidMode()
    expect(kidMode.kid).toBe(false)
  })
})

describe('challenges()', () => {
  it('should get challenges', async () => {
    const challenges = await lichess.account.challenges()
    expect(challenges).toHaveProperty('in')
    expect(challenges).toHaveProperty('out')
  })
})

describe('ongoing()', () => {
  it('should get ongoing games', async () => {
    const ongoing = await lichess.account.ongoing()
    expect(ongoing).toHaveProperty('nowPlaying')
  })

  it('should get ongoing games with limit', async () => {
    const ongoing = await lichess.account.ongoing({ limit: 1 })
    expect(ongoing).toHaveProperty('nowPlaying')
  })
})

describe('following()', () => {
  it('should get following users', async () => {
    const following = await lichess.account.following()
    for await (const user of following) {
      expect(user.id).toBeDefined()
    }
  })
})
