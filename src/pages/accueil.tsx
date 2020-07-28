import React, {Fragment} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {PreviewGame} from '../components/preview_game';
import {TopBar} from '../components/top_bar';
// import {clearPersistentDataStore} from '../lib/data_store';
import {createNewGame, isDone, useGames} from '../lib/stores';
import {buttonHeight, elevations, fontSizes, spacing, topBarBackgroundColor} from '../lib/theme';

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
      <TopBar middle={<Title>MOLKKY</Title>} />
      {/* <CustomButtonText
          text="Reset Data"
          onPress={() => clearPersistentDataStore('games')}
          size="small"
        ></CustomButtonText> */}
      <WrapperAdd>
        <CustomButton text="Nouvelle partie" icon="plus" size="large" onPress={onPressNewGame} />
      </WrapperAdd>
      <StyledScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {gameInProgress.map((g) => (
          <Fragment key={g.id}>
            <PreviewGame gameId={g.id} />
            <GameSpacing />
          </Fragment>
        ))}
        {gameDone.map((g, i) => (
          <Fragment key={g.id}>
            <PreviewGame gameId={g.id} />
            {i < gameDone.length ? <GameSpacing /> : <Fragment />}
          </Fragment>
        ))}
        <BottomBar />
      </StyledScrollView>
    </Fragment>
  );
};
Accueil.displayName = 'Accueil';

const Title = styled.Text`
  font-size: ${fontSizes.medium}px;
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

const GameSpacing = styled.View`
  height: ${spacing}px;
`;
