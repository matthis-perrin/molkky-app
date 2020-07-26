import React, {Fragment} from 'react';
import {Button, Text, View} from 'react-native';
import styled from 'styled-components/native';

import {CustomButton} from '../components/custom_buttons';
import {PlayerView} from '../components/player_view';
import {loadingPreviusPlay, setApp, useApp, useGames} from '../lib/stores';
import {fontSizes, topBarButtonWidth} from '../lib/theme';

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
    <Wrapper>
      <TopBar>
        <CustomButton
          text="Accueil"
          icon="home"
          onPress={() => setApp({...app, currentPage: 'accueil'})}
          width={topBarButtonWidth}
        ></CustomButton>
        <Titre>{`Partie`}</Titre>
        <CustomButton
          text="Edition"
          icon="pencil-outline"
          onPress={() => setApp({...app, currentPage: 'editGame'})}
          width={topBarButtonWidth}
        ></CustomButton>
      </TopBar>
      <Content>
        <View>
          <CustomButton
            text="Annuler le dernier lancé"
            icon="undo"
            size="large"
            onPress={() => loadingPreviusPlay(game)}
            hidden={game.lastGame === undefined}
          ></CustomButton>
          <LastPlay>
            <Text>{game.lastPlay}</Text>
          </LastPlay>
        </View>
        {game.players.map((p) => (
          <PlayerView
            key={p.id}
            gameId={game.id}
            playerId={p.id}
            isCurrentPlayer={p.id === game.currentPlayerId}
          ></PlayerView>
        ))}
      </Content>
    </Wrapper>
  );
};
GamePage.displayName = 'Game';

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Content = styled.View`
  flex-direction: column;
`;

const Titre = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
`;

const LastPlay = styled.View`
  display: flex;
  align-items: center;
  background-color: #ccc;
  padding: 16px;
`;
