import {clearPersistentDataStore, createDataStore, createPersistentDataStore} from './data_store';
export interface Player {
  id: number;
  name: string;
  fail: number;
  failDesign?: string;
  score: number;
}

export interface Game {
  id: number;
  creationTime: number;
  players: Player[];
}

interface App {
  currentGameId?: number;
  currentPage: 'accueil' | 'playGame' | 'editGame';
}

const gameDataStore = createPersistentDataStore<Game[]>('games', []);
export const getGames = gameDataStore.getData;
export const setGames = gameDataStore.setData;
export const useGames = gameDataStore.useData;

const appStore = createDataStore<App>({currentGameId: undefined, currentPage: 'accueil'});
export const getApp = appStore.getData;
export const setApp = appStore.setData;
export const useApp = appStore.useData;

export const createNewGame = (): void => {
  const newGame: Game = {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    id: Math.round(Math.random() * 1000000),
    creationTime: Date.now(),
    players: [],
  };
  setGames(getGames().concat([newGame]));
  setApp({...getApp(), currentPage: 'editGame', currentGameId: newGame.id});
};

export const removeGame = (id: number): void => {
  setGames(getGames().filter((g) => g.id !== id));
};

export const removePersistentStore = (): void => {
  clearPersistentDataStore('games');
};

export const addPlayer = (game: Game): void => {
  const newPlayer: Player = {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    id: Math.round(Math.random() * 1000000),
    name: 'New Player',
    fail: 0,
    score: 0,
  };
  game.players = game.players.concat([newPlayer]);
  setGames(getGames().slice());
};

export const delPlayer = (game: Game, player: Player): void => {
  game.players = game.players.filter((p) => p.id !== player.id);
  setGames(getGames().slice());
};

export const checkPerfect = (player: Player, game: Game): void => {
  if (player.score === 0) {
    return;
  }
  game.players.forEach((p) => {
    if (p.id !== player.id && p.score === player.score) {
      p.score = Math.floor(p.score / 2);
      checkPerfect(p, game);
    }
  });
};

export const overtaking = (player: Player, game: Game): void => {
  player.score = 25;
  checkPerfect(player, game);
};

export const overFail = (player: Player, game: Game): void => {
  const objectiveScore = 50;
  if (player.score >= objectiveScore / 2) {
    player.score = objectiveScore / 2;
  } else {
    player.score = 0;
  }
  player.fail = 0;
  checkPerfect(player, game);
};

export const addPlay = (num: number, player: Player, game: Game): void => {
  player.score = player.score + num;
  const objectiveScore = 50;
  if (player.score > objectiveScore) {
    overtaking(player, game);
  }
  checkPerfect(player, game);
  setGames(getGames().slice());
};

export const addFail = (player: Player, game: Game): void => {
  player.fail += 1;
  const maxFail = 3;
  if (player.fail >= maxFail) {
    overFail(player, game);
  }
  checkPerfect(player, game);
  setGames(getGames().slice());
};
