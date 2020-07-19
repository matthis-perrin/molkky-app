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
      <Button title="Home" onPress={() => setApp({...app, currentPage: 'accueil'})}></Button>
      <Title>{`Playing Game ${game.id}`}</Title>
      <Button title="Edit" onPress={() => setApp({...app, currentPage: 'editGame'})}></Button>
    </Wrapper>
  );
};
GamePage.displayName = 'Game';

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  background-color: red;
`;

const Title = styled.Text`
  flex-grow: 1;
  text-align: center;
`;
