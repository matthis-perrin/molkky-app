import {createPersistentDataStore} from './data_store';
interface Player {
  name: string;
  score: number;
}

const playerDataStore = createPersistentDataStore('players', [] as Player[]);
export const getPlayers = playerDataStore.getData;
export const setPlayers = playerDataStore.setData;
export const usePlayers = playerDataStore.useData;
export function addPlayer(player: Player): void {
  const initialPlayers = getPlayers();
  const newPlayers = initialPlayers.concat([player]);
  setPlayers(newPlayers);
}
// addPlayer({name: 'Audric', score: 48});
// addPlayer({name: 'Matthis', score: 1});
// addPlayer({name: 'Raphaelle', score: 0});
