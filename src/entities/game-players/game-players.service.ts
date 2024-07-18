import type { GamePlayer } from './game-players.type'

export class GamePlayersService {
  // TODO: Use `async`, do not use `static`.
  public static readList(): ReadonlyArray<GamePlayer> {
    return getGamePlayers()
  }
}

function getGamePlayers(): ReadonlyArray<GamePlayer> {
  return [
    {
      id: 1,
      name: 'Alisa',
      score: 150,
    },
    {
      id: 2,
      name: 'Bred',
      score: 250,
    },
    {
      id: 3,
      name: 'Charlie',
      score: 350,
    },
    {
      id: 4,
      name: 'Donald',
      score: 450,
    },
    {
      id: 5,
      name: 'Emma',
      score: 550,
    },
  ]
}
