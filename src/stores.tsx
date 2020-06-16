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
export function delPlayer(playerName: string): void {
  const initialPlayers = getPlayers();
  const newPlayers: Player[] = [];
  // for (const p of initialPlayers) {
  //   if (p.name !== playerName) {
  //     newPlayers.push(p);
  //   }
  // }
  setPlayers(newPlayers);
}
