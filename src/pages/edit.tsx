import React, {Fragment} from 'react';
import {Alert, Button} from 'react-native';
import styled from 'styled-components/native';

import {
  addPlayer,
  delPlayer,
  movePlayerDown,
  Player,
  removeGame,
  setApp,
  setGame,
  setPlayerFailDesign,
  useApp,
  useGames,
} from '../lib/stores';

interface EditProps {
  gameId: number;
}

export const Edit: React.FC<EditProps> = (props) => {
  const [app] = useApp();
  const [games] = useGames();
  const game = games.filter((g) => g.id === props.gameId)[0];
  const onPressDelete = (): void => {
    Alert.alert('Confirmation', 'Voulez-vous supprimer la partie?', [
      {
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Supprimer',
        onPress: () => {
          setApp({...app, currentPage: 'accueil'});
          removeGame(props.gameId);
        },
        style: 'destructive',
      },
    ]);
  };

  const onPressAddPlayer = (): void => {
    addPlayer(game);
  };
  const onPressDeletePlayer = (player: Player): void => {
    delPlayer(game, player);
  };
  const onTextChange = (text: string, player: Player): void => {
    player.name = text;
  };
  const sortedPlayer = game.players.slice();
  sortedPlayer.sort((p1, p2) => p2.score - p1.score);
  if (game === undefined) {
    return <Fragment />;
  }
  const onPressPlay = (): void => {
    if (game.currentPlayerId === 0) {
      game.currentPlayerId = game.players[0].id;
      setGame(game);
    }
    setApp({...app, currentPage: 'playGame'});
  };
  const onPressSwap = (player: Player): void => {
    movePlayerDown(player, game);
  };
  const onFailDesignChange = (text: string, player: Player): void => {
    setPlayerFailDesign(text, player, game);
  };
  return (
    <Wrapper>
      <TopBar>
        <Button title="Supprimer" onPress={onPressDelete}></Button>
        <Titre>{`Nouvelle partie (id: ${game.id})`}</Titre>
        <Button title="Jouer!" onPress={onPressPlay} disabled={game.players.length === 0}></Button>
      </TopBar>
      <Content>
        {sortedPlayer.map((p, index) => (
          <PlayerWrapper key={p.id}>
            <TextInputFailDesign
              maxLength={2}
              onChangeText={(text: string) => onFailDesignChange(text, p)}
            >
              {p.failDesign}
            </TextInputFailDesign>
            <TextInputPlayer onChangeText={(text: string) => onTextChange(text, p)}>
              {p.name}
            </TextInputPlayer>
            <Button title="Supprimer joueur" onPress={() => onPressDeletePlayer(p)}></Button>
            {index === game.players.length - 1 ? (
              <Fragment />
            ) : (
              <Button title="Ordonner" onPress={() => onPressSwap(p)}></Button>
            )}
          </PlayerWrapper>
        ))}
        <Button title="Ajouter joueur" onPress={onPressAddPlayer}></Button>
      </Content>
    </Wrapper>
  );
};
Edit.displayName = 'Edit';

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.View`
  flex-direction: row;
`;

const Content = styled.View``;

const PlayerWrapper = styled.View`
  flex-direction: row;
  padding: 16px;
`;

const TextInputPlayer = styled.TextInput`
  flex-grow: 1;
  margin: 0 16px;
`;

const TextInputFailDesign = styled.TextInput`
  text-align: center;
  width: 32px;
  height: 32px;
  border: black 2px solid;
`;

const Titre = styled.Text`
  flex-grow: 1;
  text-align: center;
`;
