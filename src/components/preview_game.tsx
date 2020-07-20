import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import {getApp, setApp, useGames} from '../lib/stores';

interface PreviewGameProps {
  gameId: number;
}

export const PreviewGame: React.FC<PreviewGameProps> = (props) => {
  const [games] = useGames();
  const game = games.filter((g) => g.id === props.gameId)[0];
  const sortedPlayer = game.players.slice();
  sortedPlayer.sort((p1, p2) => p2.score - p1.score);
  const onPressGame = (): void => {
    setApp({...getApp(), currentPage: 'playGame', currentGameId: props.gameId});
  };
  return (
    <PreviewGameWrapper onPress={onPressGame}>
      <Wrapper>
        {sortedPlayer.map((p) => (
          <Text>
            {p.name}
            {p.score}
          </Text>
        ))}
        <Text>{props.gameId}</Text>
      </Wrapper>
    </PreviewGameWrapper>
  );
};
PreviewGame.displayName = 'PreviewGame';

const PreviewGameWrapper = styled.TouchableHighlight`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.View``;
