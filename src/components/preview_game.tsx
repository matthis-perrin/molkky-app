import {MaterialCommunityIcons} from '@expo/vector-icons';
import React, {Fragment} from 'react';
import styled from 'styled-components/native';

import {formatDate} from '../lib/format';
import {getApp, isDone, Player, setApp, useGames} from '../lib/stores';
import {
  borderRadius,
  elevations,
  fontSizes,
  pastilleBackgroundColor,
  pastilleColor,
  spacing,
} from '../lib/theme';
import {PlayerFailIcon} from './fail_icon';

interface PreviewGameProps {
  gameId: number;
}

const maxFail = 3;

export const PreviewGame: React.FC<PreviewGameProps> = (props) => {
  const [games] = useGames();
  const game = games.filter((g) => g.id === props.gameId)[0];
  const sortedPlayer = game.players.slice();
  sortedPlayer.sort((p1, p2) => p2.score - p1.score);
  const onPressGame = (): void => {
    setApp({...getApp(), currentPage: 'playGame', currentGameId: props.gameId});
  };
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const isWinner = (player: Player): boolean => player.score === 50;
  return (
    <PreviewGameWrapper style={elevations.small} activeOpacity={0.7} onPress={onPressGame}>
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
              {`${isWinner(p) ? '🏆 ' : ''}${p.name}`}
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
`;

const Score = styled.Text`
  width: 40px;
  flex-shrink: 0;
  font-size: ${fontSizes.large}px;
  font-weight: 500;
  text-align: right;
`;
