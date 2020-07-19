import {clearPersistentDataStore, createDataStore, createPersistentDataStore} from './data_store';
export interface Player {
  id: number;
  name: string;
  fail: number;
  failDesign: string;
  score: number;
}

export interface Game {
  id: number;
  creationTime: number;
  players: Player[];
}

interface App {
  currentGame?: Game;
  currentPage: 'accueil' | 'playGame' | 'editGame';
}

const p1: Player = {
  id: 123,
  name: 'Audric',
  score: 40,
  fail: 2,
  failDesign: '🦔',
};

const p2: Player = {
  id: 124,
  name: 'Matthis',
  score: 12,
  fail: 0,
  failDesign: '🦝',
};

const p3: Player = {
  id: 14,
  name: 'Raphaelle',
  score: 0,
  fail: 2,
  failDesign: '🐄',
};

const testGames = [
  {id: 654231654, creationTime: Date.now(), players: [p1, p2]},
  {id: 654231654, creationTime: Date.now(), players: [p3, p1]},
  {id: 654231654, creationTime: Date.now(), players: [p3, p1]},
];

const gameDataStore = createPersistentDataStore<Game[]>('games', []);
export const getGames = gameDataStore.getData;
export const setGames = gameDataStore.setData;
export const useGames = gameDataStore.useData;

const appStore = createDataStore<App>({currentGame: undefined, currentPage: 'accueil'});
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
  setApp({...getApp(), currentPage: 'editGame', currentGame: newGame});
};

export const removeGame = (id: number): void => {
  setGames(getGames().filter((g) => g.id !== id));
};

export const removePersistentStore = (): void => {
  clearPersistentDataStore('games');
};
