import React, {Fragment} from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';

import {Game, removeGame, setApp, useApp} from '../lib/stores';

interface EditProps {
  game: Game;
}

export const Edit: React.FC<EditProps> = (props) => {
  const [app] = useApp();
  const game = props.game;
  const onPressDelete = (): void => {
    removeGame(game.id);
    setApp({...app, currentPage: 'accueil'});
  };
  if (game === undefined) {
    return <Fragment />;
  }
  return (
    <Wrapper>
      <Button title="Delete" onPress={onPressDelete}></Button>
      <Titre>{`New Game (id: ${game.id})`}</Titre>
      <Button title="Save" onPress={() => setApp({...app, currentPage: 'playGame'})}></Button>
    </Wrapper>
  );
};
Edit.displayName = 'Edit';

const Wrapper = styled.View`
  display: flex;
  background-color: gray;
  flex-direction: row;
`;

const Titre = styled.Text`
  flex-grow: 1;
  text-align: center;
`;
