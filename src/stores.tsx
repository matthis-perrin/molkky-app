import {createPersistentDataStore} from './data_store';
interface Player {
  id: number;
  name: string;
  score: number;
}

const playerDataStore = createPersistentDataStore('players', [] as Player[]);
export const getPlayers = playerDataStore.getData;
export const setPlayers = playerDataStore.setData;
export const usePlayers = playerDataStore.useData;
export function addPlayer(): void {
  const initialPlayers = getPlayers();
  const newPlayer = {id: 10, name: 'New player', score: 0};
  const newPlayers = initialPlayers.concat([newPlayer]);
  setPlayers(newPlayers);
}
export function delPlayer(playerId: number): void {
  const initialPlayers = getPlayers();
  const newPlayers: Player[] = [];
  for (const p of initialPlayers) {
    if (p.id !== playerId) {
      newPlayers.push(p);
    }
  }
  setPlayers(newPlayers);
}
