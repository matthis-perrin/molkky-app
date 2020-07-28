import React, {Fragment} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {PreviewGame} from '../components/preview_game';
import {SpaceJoin} from '../components/space_join';
import {TopBar} from '../components/top_bar';
// import {clearPersistentDataStore} from '../lib/data_store';
import {createNewGame, isDone, useGames} from '../lib/stores';
import {fontSizes, spacing} from '../lib/theme';

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
        <SpaceJoin>
          {gameInProgress.concat(gameDone).map((g) => (
            <PreviewGame key={g.id} gameId={g.id} />
          ))}
        </SpaceJoin>
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
  margin: 0 ${spacing}px;
  flex-shrink: 0;
`;

const StyledScrollView = styled.ScrollView`
  flex-grow: 1;
  margin: ${spacing}px;
  margin-bottom: 0;
`;
