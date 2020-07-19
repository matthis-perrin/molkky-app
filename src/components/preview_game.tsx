import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import {Game, getApp, setApp} from '../lib/stores';

interface PreviewGameProps {
  game: Game;
}

export const PreviewGame: React.FC<PreviewGameProps> = (props) => {
  const sortedPlayer = props.game.players.slice();
  sortedPlayer.sort((p1, p2) => p2.score - p1.score);
  const onPressGame = (): void => {
    setApp({...getApp(), currentPage: 'playGame', currentGame: props.game});
  };
  return (
    <PreviewGameWrapper title={`Game ${props.game.id}`} onPress={onPressGame}>
      {sortedPlayer.map((p) => (
        <Text>
          {p.name}
          {p.failDesign}
          {p.score}
        </Text>
      ))}
      <Text>{props.game.id}</Text>
    </PreviewGameWrapper>
  );
};
PreviewGame.displayName = 'PreviewGame';

const PreviewGameWrapper = styled.Button`
  display: flex;
  align-items: center;
`;
