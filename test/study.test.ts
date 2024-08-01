import { lichess } from './test-utils'

describe('study.chapter()', () => {
  it('should get chapter', async () => {
    const chapter = await lichess.study.chapter({
      studyId: 'KjivNw7F',
      chapterId: 'E9SccSB6',
    })
    expect(chapter.error).toBeUndefined()
  })
})

describe('study.chapters()', () => {
  it('should get chapters', async () => {
    const chapters = await lichess.study.chapters({ studyId: 'KjivNw7F' })
    expect(chapters.error).toBeUndefined()
  })
})

describe('study.studies()', () => {
  it('should get all studies via username', async () => {
    const studies = await lichess.study.studies({ username: 'Nickacide' })
    expect(studies.body).toBeDefined()
  })
})

describe('study.meta()', () => {
  it('should get metadata of study', async () => {
    const meta = await lichess.study.meta({ studyId: 'cRXXYfRk' })
    expect(meta.status).toBe(200)
  })
})

describe('study.import()', () => {
  it('should import chapter', async () => {
    const pgn = `[Event "San Sebastian"][Site "San Sebastian"][Date "1911.??.??"][Round "?"][White "Capablanca, Jose"][Black "Burn, Amos"][Result "1-0"] 1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.d3 { This is a very solid development, to which I was much addicted at the time, because of my ignorance of the multiple variations of the openings. } 5...d6 6.c3 Be7 ( { In this variation there is the alternative of developing this Bishop via **g7**, after } 6...g6 ) 7.Nbd2 O-O 8.Nf1 b5 9.Bc2 d5 10.Qe2 dxe4 11.dxe4 Bc5 { Evidently to make room for the Queen at **e7**, but I do not think the move advisable at this stage. } ( 11...Be6 { is a more natural and effective move. It develops a piece and threatens Bc4 which would have to be stopped. } ) 12.Bg5 Be6 { Now it is not so effective, because White\'s Queen\'s Bishop is out, and the Knight, in going to **e3** } 13.Ne3 { defends **c4** and does not block the Queen\'s Bishop. } 13...Re8 14.O-O Qe7 { # This is bad. Black\'s game was already not good. He probably had no choice but to take the Knight with the Bishop before making this move. } 15.Nd5 Bxd5 16.exd5 Nb8 { In order to bring it to **d7**, to support the other Knight and also his King\'s Pawn. White, however, does not allow time for this, and by taking advantage of his superior position is able to win a Pawn. } 17.a4 b4 ( { Since he had no way to prevent the loss of a Pawn, he should have given it up where it is, and played } 17...Nbd7 { in order to make his position more solid. The text move not only loses a Pawn, but leaves Black\'s game very much weakened. } ) 18.cxb4 Bxb4 19.Bxf6 Qxf6 20.Qe4 Bd6 21.Qxh7+ Kf8 { With a Pawn more and all his pieces ready for action, while Black is still backward in development, it only remains for White to drive home his advantage before Black can come out with his pieces, in which case, by using the open h-file, Black might be able to start a strong attack against White\'s King. White is able by his next move to eliminate all danger. # } 22.Nh4 Qh6 { This is practically forced. } ( { Black could not play } 22...g6 { because of } 23.Bxg6 { White meanwhile threatened } ) 23.Qxh6 gxh6 24.Nf5 h5 25.Bd1 Nd7 26.Bxh5 Nf6 27.Be2 Nxd5 28.Rfd1 Nf4 29.Bc4 Red8 30.h4 a5 { Black must lose time assuring the safety of this Pawn. } 31.g3 Ne6 32.Bxe6 fxe6 33.Ne3 Rdb8 34.Nc4 Ke7 { Black fights a hopeless battle. He is two Pawns down for all practical purposes, and the Pawns he has are isolated and have to be defended by pieces. } 35.Rac1 Ra7 { White threatened } 36.Re1 Kf6 37.Re4 Rb4 38.g4 Ra6 ( { If } 38...Rxa4 { then } 39.Nxd6 { would of course win a piece. } ) 39.Rc3 Bc5 40.Rf3+ Kg7 41.b3 Bd4 42.Kg2 Ra8 43.g5 Ra6 44.h5 Rxc4 45.bxc4 Rc6 46.g6 { Black resigns. } 1-0`
    const name = 'My New Chapter'
    const chapters = await lichess.study.import({
      studyId: 'cRXXYfRk',
      pgn,
      name,
    })
    expect(chapters.status).toBe(200)
  })
})
