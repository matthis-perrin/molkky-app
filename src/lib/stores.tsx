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
  lastGame?: Game;
  lastPlay: string;
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
    lastGame: undefined,
    lastPlay: 'La partie commence!',
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
    name: 'Nouveau joueur',
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

export const memorizeGame = (game: Game): Game => ({
  id: game.id,
  creationTime: game.creationTime,
  players: game.players.map((p) => ({...p})),
  lastGame: game,
  lastPlay: game.lastPlay,
});

export const addPlay = (num: number, player: Player, game: Game): void => {
  const newGame = memorizeGame(game);
  const newPlayer = newGame.players.filter((p) => p.id === player.id)[0];
  if (num === 1) {
    newGame.lastPlay = `${newPlayer.name} marque ${num} point`;
  } else {
    newGame.lastPlay = `${newPlayer.name} marque ${num} points`;
  }
  newPlayer.score = newPlayer.score + num;
  newPlayer.fail = 0;
  const objectiveScore = 50;
  if (newPlayer.score > objectiveScore) {
    overtaking(newPlayer, newGame);
  }
  checkPerfect(newPlayer, newGame);
  setGames(getGames().map((g) => (g.id === newGame.id ? newGame : g)));
};

export const addFail = (player: Player, game: Game): void => {
  const newGame = memorizeGame(game);
  const newPlayer = newGame.players.filter((p) => p.id === player.id)[0];
  newGame.lastPlay = `${newPlayer.name} a raté`;
  newPlayer.fail += 1;
  const maxFail = 3;
  if (newPlayer.fail >= maxFail) {
    overFail(newPlayer, newGame);
  }
  checkPerfect(newPlayer, newGame);
  setGames(getGames().map((g) => (g.id === newGame.id ? newGame : g)));
};
