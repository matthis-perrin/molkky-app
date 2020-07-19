import React, {Fragment} from 'react';
import {Button, ScrollView} from 'react-native';
import styled from 'styled-components/native';

import {PreviewGame} from '../components/preview_game';
import {createNewGame, removePersistentStore, useGames} from '../lib/stores';

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
        <Button title="Reset Data" onPress={removePersistentStore}></Button>
        <NewGameButton title="NEW GAME" onPress={onPressNewGame}></NewGameButton>
        <ScrollView>
          {games.map((g) => (
            <PreviewGame game={g} />
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
