/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from 'react';
import {Button, Text, View} from 'react-native';
import styled from 'styled-components/native';

import {addFail, addPlay, useGames} from '../lib/stores';

interface PlayerViewProps {
  gameId: number;
  playerId: number;
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
    fails.push(<Text>X</Text>);
  }
  return (
    <PlayerViewWrapper>
      <Wrapper>
        <Name>{player.name}</Name>
        <View>{fails}</View>
        <Score>{player.score}</Score>
      </Wrapper>
      <KeyboardWrapper>
        <Line1>
          <Button title="1" onPress={() => onPressNumber(1)}></Button>
          <Button title="2" onPress={() => onPressNumber(2)}></Button>
          <Button title="3" onPress={() => onPressNumber(3)}></Button>
          <Button title="4" onPress={() => onPressNumber(4)}></Button>
          <Button title="5" onPress={() => onPressNumber(5)}></Button>
          <Button title="6" onPress={() => onPressNumber(6)}></Button>
        </Line1>
        <Line2>
          <Button title="7" onPress={() => onPressNumber(7)}></Button>
          <Button title="8" onPress={() => onPressNumber(8)}></Button>
          <Button title="9" onPress={() => onPressNumber(9)}></Button>
          <Button title="10" onPress={() => onPressNumber(10)}></Button>
          <Button title="11" onPress={() => onPressNumber(11)}></Button>
          <Button title="12" onPress={() => onPressNumber(12)}></Button>
        </Line2>
        <Line3>
          <Button title="X" onPress={onPressFail}></Button>
        </Line3>
      </KeyboardWrapper>
    </PlayerViewWrapper>
  );
};
PlayerView.displayName = 'PlayerView';

const PlayerViewWrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const Name = styled.Text`
  flex-grow: 1;
`;

const Score = styled.Text`
  width: 50px;
`;

const KeyboardWrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

const Line1 = styled.View`
  display: flex;
  flex-direction: row;
`;

const Line2 = styled.View`
  display: flex;
  flex-direction: row;
`;

const Line3 = styled.View`
  display: flex;
  flex-direction: row;
`;
