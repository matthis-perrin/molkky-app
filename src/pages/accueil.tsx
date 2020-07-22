import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

import {PreviewGame} from '../components/preview_game';
import {createNewGame, useGames} from '../lib/stores';

export const Accueil: React.FC = () => {
  const [games] = useGames();
  const onPressNewGame = (): void => {
    createNewGame();
  };
  return (
    <Fragment>
      <TopBar>
        <Title>"MOLKKY"</Title>
      </TopBar>
      <Content>
        <NewGameButton title="Nouvelle partie" onPress={onPressNewGame}></NewGameButton>
        <ScrollView>
          {games.map((g) => (
            <PreviewGame key={g.id} gameId={g.id} />
          ))}
        </ScrollView>
      </Content>
    </Fragment>
  );
};
Accueil.displayName = 'Accueil';

const TopBar = styled.View``;
const Title = styled.Text`
  background-color: red;
`;
const Content = styled.View`
  display: flex;
  flex-direction: column;
`;
const NewGameButton = styled.Button``;
