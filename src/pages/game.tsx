import React, {Fragment} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {PlayerView} from '../components/player_view';
import {SpaceJoin} from '../components/space_join';
import {TopBar} from '../components/top_bar';
import {loadingPreviusPlay, setApp, useApp, useGames} from '../lib/stores';
import {
  bannerBackgroundColor,
  bannerColor,
  fontSizes,
  spacing,
  topBarButtonWidth,
  topBarColor,
} from '../lib/theme';

interface GameProps {
  gameId: number;
}

export const GamePage: React.FC<GameProps> = (props) => {
  const [app] = useApp();
  const [games] = useGames();
  const game = games.filter((g) => g.id === props.gameId)[0];
  if (game === undefined) {
    return <Fragment />;
  }
  return (
    <Fragment>
      <TopBar
        left={
          <CustomButton
            text="Accueil"
            icon="home"
            onPress={() => setApp({...app, currentPage: 'accueil'})}
            width={topBarButtonWidth}
          />
        }
        middle={<Titre>{`Partie`}</Titre>}
        right={
          <CustomButton
            text="Edition"
            icon="pencil-outline"
            onPress={() => setApp({...app, currentPage: 'editGame'})}
            width={topBarButtonWidth}
          />
        }
      />
      <LastPlay>
        <TextLastPlay>{game.lastPlay}</TextLastPlay>
      </LastPlay>
      <WrapperCancel>
        <CustomButton
          text="Annuler le dernier lancé"
          icon="undo"
          size="large"
          onPress={() => loadingPreviusPlay(game)}
          hidden={game.lastGame === undefined}
        />
      </WrapperCancel>
      <PlayerScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <SpaceJoin>
          {game.players.map((p) => (
            <PlayerView
              key={p.id}
              gameId={game.id}
              playerId={p.id}
              isCurrentPlayer={p.id === game.currentPlayerId}
            />
          ))}
        </SpaceJoin>
        <BottomBar />
      </PlayerScrollView>
    </Fragment>
  );
};
GamePage.displayName = 'Game';

const Titre = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
  color: ${topBarColor};
`;

const LastPlay = styled.View`
  display: flex;
  align-items: center;
  background-color: ${bannerBackgroundColor};
  margin-top: ${spacing}px;
  padding: ${spacing}px;
`;

const PlayerScrollView = styled.ScrollView`
  margin: ${spacing}px;
  margin-bottom: 0;
`;

const WrapperCancel = styled.View`
  margin: ${spacing}px;
  margin-bottom: 0px;
`;

const TextLastPlay = styled.Text`
  color: ${bannerColor};
`;
