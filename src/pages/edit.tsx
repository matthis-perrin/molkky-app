import React, {Fragment} from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';

import {addPlayer, delPlayer, Player, removeGame, setApp, useApp, useGames} from '../lib/stores';

interface EditProps {
  gameId: number;
}

export const Edit: React.FC<EditProps> = (props) => {
  const [app] = useApp();
  const [games] = useGames();
  const game = games.filter((g) => g.id === props.gameId)[0];
  const onPressDelete = (): void => {
    removeGame(game.id);
    setApp({...app, currentPage: 'accueil'});
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
  return (
    <Wrapper>
      <TopBar>
        <Button title="Delete" onPress={onPressDelete}></Button>
        <Titre>{`New Game (id: ${game.id})`}</Titre>
        <Button title="Play" onPress={() => setApp({...app, currentPage: 'playGame'})}></Button>
      </TopBar>
      <Content>
        {sortedPlayer.map((p) => (
          <PlayerWrapper>
            <TextInputPlayer onChangeText={(text: string) => onTextChange(text, p)}>
              {p.name}
            </TextInputPlayer>
            <Button title="Delete player" onPress={() => onPressDeletePlayer(p)}></Button>
          </PlayerWrapper>
        ))}
        <Button title="Add Player" onPress={onPressAddPlayer}></Button>
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
`;

const TextInputPlayer = styled.TextInput`
  flex-grow: 1;
`;

const Titre = styled.Text`
  flex-grow: 1;
  text-align: center;
`;
