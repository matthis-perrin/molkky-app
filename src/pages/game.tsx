import React, {Fragment} from 'react';
import {Button, Text, View} from 'react-native';
import styled from 'styled-components/native';

import {PlayerView} from '../components/player_view';
import {loadingPreviusPlay, setApp, useApp, useGames} from '../lib/stores';

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
        <Button title="Accueil" onPress={() => setApp({...app, currentPage: 'accueil'})}></Button>
        <Titre>{`Partie ${game.id} en cours`}</Titre>
        <Button title="Edition" onPress={() => setApp({...app, currentPage: 'editGame'})}></Button>
      </TopBar>
      <Content>
        <View>
          <Button title="Précédent" onPress={() => loadingPreviusPlay(game)}></Button>
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
  flex-direction: row;
`;

const Content = styled.View`
  flex-direction: column;
`;

const Titre = styled.Text`
  flex-grow: 1;
  text-align: center;
`;

const LastPlay = styled.View`
  display: flex;
  align-items: center;
  background-color: #ccc;
  padding: 16px;
`;
