import React, {Fragment} from 'react';
import {Button, Text} from 'react-native';
import styled from 'styled-components/native';

import {Game, setApp, useApp} from '../lib/stores';

interface GameProps {
  game: Game;
}

export const GamePage: React.FC<GameProps> = (props) => {
  const [app] = useApp();
  const game = props.game;
  if (game === undefined) {
    return <Fragment />;
  }
  return (
    <Wrapper>
      <Text>{`Playing Game ${game.id}`}</Text>
      <Text>{`${game.players.length} players`}</Text>
      <Button title="accueil" onPress={() => setApp({...app, currentPage: 'accueil'})}></Button>
    </Wrapper>
  );
};
GamePage.displayName = 'Game';

const Wrapper = styled.View`
  background-color: red;
`;
