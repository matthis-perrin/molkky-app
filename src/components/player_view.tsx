/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from 'react';
import {Button, Text, View} from 'react-native';
import styled from 'styled-components/native';

import {addFail, addPlay, useGames} from '../lib/stores';

interface PlayerViewProps {
  gameId: number;
  playerId: number;
  isCurrentPlayer: boolean;
}

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
  const fails: JSX.Element[] = [];
  for (let i = 0; player.fail > i; i++) {
    fails.push(<Text key={i}>X</Text>);
  }
  return (
    <PlayerViewWrapper
      style={{
        backgroundColor: props.isCurrentPlayer ? '#0000ff20' : 'transparent',
      }}
    >
      <Wrapper>
        <Name>{player.name}</Name>
        <View>{fails}</View>
        <Score>{player.score}</Score>
      </Wrapper>
      <KeyboardWrapper style={{display: props.isCurrentPlayer ? undefined : 'none'}}>
        <Line>
          <ScoreButton title="1" onPress={() => onPressNumber(1)} />
          <ScoreButton title="2" onPress={() => onPressNumber(2)} />
          <ScoreButton title="3" onPress={() => onPressNumber(3)} />
          <ScoreButton title="4" onPress={() => onPressNumber(4)} />
          <ScoreButton title="5" onPress={() => onPressNumber(5)} />
          <ScoreButton title="6" onPress={() => onPressNumber(6)} />
        </Line>
        <Line>
          <ScoreButton title="7" onPress={() => onPressNumber(7)} />
          <ScoreButton title="8" onPress={() => onPressNumber(8)} />
          <ScoreButton title="9" onPress={() => onPressNumber(9)} />
          <ScoreButton title="10" onPress={() => onPressNumber(10)} />
          <ScoreButton title="11" onPress={() => onPressNumber(11)} />
          <ScoreButton title="12" onPress={() => onPressNumber(12)} />
        </Line>
        <Line3>
          <Button title={player.failDesign ?? '💣'} onPress={onPressFail}></Button>
        </Line3>
      </KeyboardWrapper>
    </PlayerViewWrapper>
  );
};
PlayerView.displayName = 'PlayerView';

const PlayerViewWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const Name = styled.Text`
  flex-grow: 1;
  font-size: 20px;
`;

const Score = styled.Text`
  width: 50px;
  font-size: 20px;
  font-weight: 500;
  text-align: right;
`;

const KeyboardWrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

const Line = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const Line3 = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ScoreButton = styled.Button`
  text-align: center;
  font-size: 20px;
  padding: 8px;
`;
