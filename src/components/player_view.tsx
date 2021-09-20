import {MaterialCommunityIcons} from '@expo/vector-icons';
import React, {FC, Fragment, useCallback} from 'react';
import styled from 'styled-components/native';

import {addFail, addPlay, isDone, useGames} from '../lib/stores';
import {
  borderColor,
  borderRadius,
  elevations,
  fontSizes,
  pastilleBackgroundColor,
  pastilleColor,
  scoreButtonWidth,
  spacing,
} from '../lib/theme';
import {CustomButton} from './custom_buttons';
import {PlayerFailIcon} from './player_fail_icon';

interface PlayerViewProps {
  gameId: number;
  playerId: number;
  isCurrentPlayer: boolean;
}

const maxFail = 3;
const currentPlayerOpacity = 1;
const otherPlayersOpacity = 0.8;

// Generate all the possible scores by lines of 4
const maxScore = 12;
const scoresPerLine = 4;
const scores: number[][] = [];
for (let i = 1; i <= maxScore; i++) {
  const line = scores.at(-1);
  if (line === undefined || line.length === scoresPerLine) {
    scores.push([i]);
  } else {
    line.push(i);
  }
}

export const PlayerView: FC<PlayerViewProps> = (props) => {
  const {gameId, playerId, isCurrentPlayer} = props;

  const [games] = useGames();
  const game = games.find((g) => g.id === gameId);
  const player = game?.players.find((p) => p.id === playerId);

  const handleScorePress = useCallback(
    (score: number) => {
      if (player === undefined || game === undefined) {
        return;
      }
      addPlay(score, player, game);
    },
    [game, player]
  );
  const handleFailPress = useCallback(() => {
    if (player === undefined || game === undefined) {
      return;
    }
    addFail(player, game);
  }, [game, player]);

  if (game === undefined || player === undefined) {
    return <Fragment />;
  }

  return (
    <PlayerViewWrapper
      style={{
        opacity: isCurrentPlayer && !isDone(game) ? currentPlayerOpacity : otherPlayersOpacity,
        ...elevations.medium,
      }}
    >
      <Wrapper>
        <MaterialCommunityIcons
          name={'play'}
          size={fontSizes.medium}
          color={pastilleColor}
          style={{display: isCurrentPlayer && !isDone(game) ? undefined : 'none'}}
        />
        <Name numberOfLines={1} ellipsizeMode="tail">
          {player.name}
        </Name>
        <PlayerFailIcon player={player} maxFail={maxFail} />
        <Score>{player.score}</Score>
      </Wrapper>
      <KeyboardWrapper style={{display: isCurrentPlayer && !isDone(game) ? undefined : 'none'}}>
        <BorderSeparator></BorderSeparator>
        {scores.map((line) => (
          <Line key={line.join(',')}>
            {line.map((score) => (
              <CustomButton
                key={score}
                keyboardStyle
                width={scoreButtonWidth}
                text={String(score)}
                data-score={score}
                // eslint-disable-next-line react/jsx-no-bind
                onPress={() => handleScorePress(score)}
              />
            ))}
          </Line>
        ))}
        <CustomButton keyboardStyle text={`${player.failDesign} Raté`} onPress={handleFailPress} />
      </KeyboardWrapper>
    </PlayerViewWrapper>
  );
};
PlayerView.displayName = 'PlayerView';

const PlayerViewWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: ${spacing}px;
  border-radius: ${borderRadius * 2}px;
  background-color: ${pastilleBackgroundColor};
  color: ${pastilleColor};
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  font-size: ${fontSizes.extraLarge}px;
  font-weight: 500;
  text-align: right;
  color: ${pastilleColor};
`;

const KeyboardWrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

const BorderSeparator = styled.View`
  height: 1px;
  background-color: ${borderColor};
  margin-top: ${spacing}px;
  margin-bottom: ${spacing}px;
`;

const Line = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
`;
