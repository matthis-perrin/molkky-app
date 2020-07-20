import React, {Fragment} from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';

import {PlayerView} from '../components/player_view';
import {setApp, useApp, useGames} from '../lib/stores';

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
        <Button title="Home" onPress={() => setApp({...app, currentPage: 'accueil'})}></Button>
        <Titre>{`Playing Game ${game.id}`}</Titre>
        <Button title="Edit" onPress={() => setApp({...app, currentPage: 'editGame'})}></Button>
      </TopBar>
      <Content>
        {game.players.map((p) => (
          <PlayerView gameId={game.id} playerId={p.id}></PlayerView>
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