import {Alert} from 'react-native';

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
  currentPlayerId: number;
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
export const setGame = (game: Game): void => {
  setGames(getGames().map((g) => (g.id === game.id ? {...game} : g)));
};
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
    currentPlayerId: 0,
    lastGame: undefined,
    lastPlay: 'La partie commence!',
  };
  setGames([...getGames(), newGame]);
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
    name: `Nouveau joueur ${game.players.length + 1}`,
    fail: 0,
    score: 0,
    failDesign: '💣',
  };
  game.players = [...game.players, newPlayer];
  setGame(game);
};

export const delPlayer = (game: Game, player: Player): void => {
  game.players = game.players.filter((p) => p.id !== player.id);
  setGame(game);
};

const checkPerfectInternal = (player: Player, game: Game): Player[] => {
  if (player.score === 0) {
    return [];
  }
  for (const p of game.players) {
    if (p.id !== player.id && p.score === player.score) {
      p.score = Math.floor(p.score / 2);
      return [...checkPerfectInternal(p, game), p];
    }
  }
  return [];
};

export const checkPerfect = (player: Player, game: Game): void => {
  const playerPowned = checkPerfectInternal(player, game);
  if (playerPowned.length > 0) {
    Alert.alert(
      'Powned !',
      playerPowned
        .reverse()
        .map(
          (p) =>
            `${p.name} is powned (${
              game.lastGame?.players.find((lastp) => p.id === lastp.id).score
            } => ${p.score})`
        )
        .join('\n'),
      [{text: 'Haha'}]
    );
  }
};

export const overtaking = (player: Player, game: Game): void => {
  player.score = 25;
  checkPerfect(player, game);
  Alert.alert('Dépassement !', `${player.name} à dépassé la limite`, [{text: 'Haha'}]);
};

export const overFail = (player: Player, game: Game): void => {
  const objectiveScore = 50;
  if (player.score >= objectiveScore / 2) {
    player.score = objectiveScore / 2;
    Alert.alert(String(player.failDesign), `${player.name} tombe à ${objectiveScore / 2}`, [
      {text: 'Haha'},
    ]);
  } else {
    player.score = 0;
    Alert.alert(String(player.failDesign), `${player.name} tombe à 0`, [{text: 'Haha'}]);
  }
  player.fail = 0;
  checkPerfect(player, game);
};

export const memorizeGame = (game: Game): Game => ({
  id: game.id,
  creationTime: game.creationTime,
  players: game.players.map((p) => ({...p})),
  currentPlayerId: game.currentPlayerId,
  lastGame: game,
  lastPlay: game.lastPlay,
});

function getNextPlayerId(game: Game): number {
  for (let index = 0; index < game.players.length; index++) {
    const p = game.players[index];
    if (p.id === game.currentPlayerId) {
      if (index === game.players.length - 1) {
        return game.players[0].id;
      }
      return game.players[index + 1].id;
    }
  }
  return -1;
}

export const isDone = (game: Game): boolean => {
  const objectiveScore = 50;
  for (const p of game.players) {
    if (p.score === objectiveScore) {
      return true;
    }
  }
  return false;
};

export const addPlay = (num: number, player: Player, game: Game): void => {
  const newGame = memorizeGame(game);
  const newPlayer = newGame.players.find((p) => p.id === player.id);
  newGame.lastPlay =
    num === 1 ? `${newPlayer.name} marque ${num} point` : `${newPlayer.name} marque ${num} points`;
  newPlayer.score += num;
  newPlayer.fail = 0;
  const objectiveScore = 50;
  if (newPlayer.score > objectiveScore) {
    overtaking(newPlayer, newGame);
  }
  if (newPlayer.score === objectiveScore) {
    Alert.alert(`Victoire`, `${player.name} à gagné`, [{text: 'Good job'}]);
    newGame.lastPlay += ` et gagne la partie!`;
  }
  checkPerfect(newPlayer, newGame);
  newGame.currentPlayerId = getNextPlayerId(newGame);
  setGame(newGame);
};

export const addFail = (player: Player, game: Game): void => {
  const newGame = memorizeGame(game);
  const newPlayer = newGame.players.find((p) => p.id === player.id);
  newGame.lastPlay = `${newPlayer.name} a raté`;
  newPlayer.fail += 1;
  const maxFail = 3;
  if (newPlayer.fail >= maxFail) {
    overFail(newPlayer, newGame);
  }
  checkPerfect(newPlayer, newGame);
  newGame.currentPlayerId = getNextPlayerId(newGame);
  setGame(newGame);
};

export const loadingPreviusPlay = (game: Game): void => {
  const newGame = game.lastGame;
  if (newGame) {
    setGame(newGame);
  }
};

export const movePlayerDown = (player: Player, game: Game): void => {
  for (let index = 0; index < game.players.length; index++) {
    const p = game.players[index];
    if (p.id === player.id) {
      [game.players[index], game.players[index + 1]] = [
        game.players[index + 1],
        game.players[index],
      ];
      setGame(game);
      return;
    }
  }
};

export const setPlayerFailDesign = (text: string, player: Player, game: Game): void => {
  game.players = game.players.map((p) => (p.id === player.id ? {...p, failDesign: text} : p));
  setGame(game);
};
