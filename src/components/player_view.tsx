/* eslint-disable @typescript-eslint/no-magic-numbers */
import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';

import {addFail, addPlay, isDone, useGames} from '../lib/stores';
import {
  borderColor,
  borderRadius,
  fontSizes,
  pastilleBackgroundColor,
  pastilleColor,
  scoreButtonWidth,
  spacing,
} from '../lib/theme';
import {CustomButton} from './custom_buttons';
import {PlayerFailIcon} from './fail_icon';

interface PlayerViewProps {
  gameId: number;
  playerId: number;
  isCurrentPlayer: boolean;
}

const maxFail = 3;

export const PlayerView: React.FC<PlayerViewProps> = (props) => {
  const [games] = useGames();
  const game = games.filter((g) => g.id === props.gameId)[0];
  const player = game.players.filter((p) => p.id === props.playerId)[0];
  const onPressNumber = (num: number): void => {
    addPlay(num, player, game);
  };
  const onPressFail = (): void => {
    addFail(player, game);
  };
  return (
    <PlayerViewWrapper
      style={{
        opacity: props.isCurrentPlayer && !isDone(game) ? 1 : 0.8,
      }}
    >
      <Wrapper>
        <MaterialCommunityIcons
          name={'play'}
          size={fontSizes.medium}
          color={pastilleColor}
          style={{display: props.isCurrentPlayer && !isDone(game) ? undefined : 'none'}}
        />
        <Name numberOfLines={1} ellipsizeMode="tail">
          {player.name}
        </Name>
        <PlayerFailIcon player={player} maxFail={maxFail} />
        <Score>{player.score}</Score>
      </Wrapper>
      <KeyboardWrapper
        style={{display: props.isCurrentPlayer && !isDone(game) ? undefined : 'none'}}
      >
        <BorderSeparator></BorderSeparator>
        <Line>
          <CustomButton width={scoreButtonWidth} text="1" onPress={() => onPressNumber(1)} />
          <CustomButton width={scoreButtonWidth} text="2" onPress={() => onPressNumber(2)} />
          <CustomButton width={scoreButtonWidth} text="3" onPress={() => onPressNumber(3)} />
          <CustomButton width={scoreButtonWidth} text="4" onPress={() => onPressNumber(4)} />
        </Line>
        <Line>
          <CustomButton width={scoreButtonWidth} text="5" onPress={() => onPressNumber(5)} />
          <CustomButton width={scoreButtonWidth} text="6" onPress={() => onPressNumber(6)} />
          <CustomButton width={scoreButtonWidth} text="7" onPress={() => onPressNumber(7)} />
          <CustomButton width={scoreButtonWidth} text="8" onPress={() => onPressNumber(8)} />
        </Line>
        <Line>
          <CustomButton width={scoreButtonWidth} text="9" onPress={() => onPressNumber(9)} />
          <CustomButton width={scoreButtonWidth} text="10" onPress={() => onPressNumber(10)} />
          <CustomButton width={scoreButtonWidth} text="11" onPress={() => onPressNumber(11)} />
          <CustomButton width={scoreButtonWidth} text="12" onPress={() => onPressNumber(12)} />
        </Line>
        <CustomButton text={`${player.failDesign} Raté`} onPress={onPressFail} />
      </KeyboardWrapper>
    </PlayerViewWrapper>
  );
};
PlayerView.displayName = 'PlayerView';

const PlayerViewWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: ${spacing}px;
  margin-bottom: ${spacing}px;
  border-radius: ${borderRadius * 2}px;
  background-color: ${pastilleBackgroundColor};
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
`;

const Score = styled.Text`
  width: 40px;
  flex-shrink: 0;
  font-size: ${fontSizes.extraLarge}px;
  font-weight: 500;
  text-align: right;
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
