import React, {Fragment} from 'react';
import styled from 'styled-components/native';

import {CustomButton} from '../components/custom_buttons';
import {PreviewGame} from '../components/preview_game';
// import {clearPersistentDataStore} from '../lib/data_store';
import {createNewGame, isDone, useGames} from '../lib/stores';
import {fontSizes, spacing, topBarBackgroundColor} from '../lib/theme';

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
      {/* <CustomButtonText
          text="Reset Data"
          onPress={() => clearPersistentDataStore('games')}
          size="small"
        ></CustomButtonText> */}
      <WrapperAdd>
        <CustomButton text="Nouvelle partie" icon="plus" size="large" onPress={onPressNewGame} />
      </WrapperAdd>
      <StyledScrollView>
        {gameInProgress.map((g) => (
          <PreviewGame key={g.id} gameId={g.id} />
        ))}
        {gameDone.map((g) => (
          <PreviewGame key={g.id} gameId={g.id} />
        ))}
      </StyledScrollView>
    </Fragment>
  );
};
Accueil.displayName = 'Accueil';

const TopBar = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  background-color: ${topBarBackgroundColor};
  padding: ${spacing / 2}px;
`;
const Title = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
`;

const WrapperAdd = styled.View`
  margin: ${spacing}px;
  flex-shrink: 0;
`;

const StyledScrollView = styled.ScrollView`
  flex-grow: 1;
  margin: 0 ${spacing}px;
`;
