import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

import {CustomButton} from '../components/custom_buttons';
import {PreviewGame} from '../components/preview_game';
// import {clearPersistentDataStore} from '../lib/data_store';
import {createNewGame, isDone, useGames} from '../lib/stores';
import {darkGray, fontSizes, spacing} from '../lib/theme';

export const Accueil: React.FC = () => {
  const [games] = useGames();
  const sortedGames = games.sort((g1, g2) => g2.creationTime - g1.creationTime);
  const gameInProgress = sortedGames.filter((g) => !isDone(g));
  const gameDone = sortedGames.filter((g) => isDone(g));
  const onPressNewGame = (): void => {
    createNewGame();
  };
  return (
    <Fragment>
      <TopBar>
        <Title>MOLKKY</Title>
      </TopBar>
      <Content>
        {/* <CustomButtonText
          text="Reset Data"
          onPress={() => clearPersistentDataStore('games')}
          size="small"
        ></CustomButtonText> */}
        <WrapperAdd>
          <CustomButton text="Nouvelle partie" icon="plus" size="large" onPress={onPressNewGame} />
        </WrapperAdd>
        <ScrollView>
          {gameInProgress.map((g) => (
            <PreviewGame key={g.id} gameId={g.id} />
          ))}
          {gameDone.map((g) => (
            <PreviewGame key={g.id} gameId={g.id} />
          ))}
        </ScrollView>
      </Content>
    </Fragment>
  );
};
Accueil.displayName = 'Accueil';

const TopBar = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  background-color: ${darkGray};
  padding: ${spacing / 2}px;
`;
const Title = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
`;
const Content = styled.View`
  display: flex;
  flex-direction: column;
  margin: ${spacing}px;
  margin-bottom: 0px;
`;

const WrapperAdd = styled.View`
  margin-bottom: ${spacing}px;
`;
