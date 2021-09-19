import {MaterialCommunityIcons} from '@expo/vector-icons';
import React, {Fragment, useCallback} from 'react';
import styled from 'styled-components/native';

import {formatDate} from '../lib/format';
import {getApp, isDone, setApp, useGames} from '../lib/stores';
import {
  borderRadius,
  elevations,
  fontSizes,
  pastilleBackgroundColor,
  pastilleColor,
  spacing,
} from '../lib/theme';
import {PlayerFailIcon} from './player_fail_icon';

interface PreviewGameProps {
  gameId: number;
}

const maxFail = 3;
const WINNER_SCORE = 50;

export const PreviewGame: React.FC<PreviewGameProps> = (props) => {
  const {gameId} = props;

  const [games] = useGames();
  const game = games.find((g) => g.id === gameId);

  const handleGamePress = useCallback(() => {
    setApp({...getApp(), currentPage: 'playGame', currentGameId: gameId});
  }, [gameId]);

  if (game === undefined) {
    return <Fragment />;
  }

  const sortedPlayer = [...game.players];
  sortedPlayer.sort((p1, p2) => p2.score - p1.score);

  return (
    <PreviewGameWrapper style={elevations.small} activeOpacity={0.7} onPress={handleGamePress}>
      <Wrapper>
        <WrapperDate>
          <CreationTime>{formatDate(game.creationTime)}</CreationTime>
          <MaterialCommunityIcons
            key="icon"
            name={isDone(game) ? 'check' : 'sync'}
            size={fontSizes.large}
            color={pastilleColor}
          />
        </WrapperDate>
        {sortedPlayer.map((p) => (
          <WrapperPlayer key={p.id}>
            <Name numberOfLines={1} ellipsizeMode="tail">
              {`${p.score === WINNER_SCORE ? '🏆 ' : ''}${p.name}`}
            </Name>
            {isDone(game) ? <Fragment /> : <PlayerFailIcon player={p} maxFail={maxFail} />}
            <Score>{p.score}</Score>
          </WrapperPlayer>
        ))}
      </Wrapper>
    </PreviewGameWrapper>
  );
};
PreviewGame.displayName = 'PreviewGame';

const PreviewGameWrapper = styled.TouchableOpacity`
  display: flex;
  padding: ${spacing}px;
  background-color: ${pastilleBackgroundColor};
  border-radius: ${borderRadius * 2}px;
  color: ${pastilleColor};
`;

const WrapperDate = styled.View`
  display: flex;
  flex-direction: row;
`;

const CreationTime = styled.Text`
  flex-grow: 1;
  text-align: left;
  margin-bottom: ${spacing}px;
  font-size: ${fontSizes.medium}px;
  color: ${pastilleColor};
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WrapperPlayer = styled.View`
  display: flex;
  flex-direction: row;
`;

const Name = styled.Text`
  flex-shrink: 1;
  flex-grow: 1;
  font-size: ${fontSizes.medium}px;
  color: ${pastilleColor};
`;

const Score = styled.Text`
  width: 40px;
  flex-shrink: 0;
  font-size: ${fontSizes.large}px;
  font-weight: 500;
  text-align: right;
  color: ${pastilleColor};
`;
