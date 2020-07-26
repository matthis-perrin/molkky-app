import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

import {Player} from '../lib/stores';

interface FailIconProps {
  failDesign: string;
  disable: boolean;
}

export const FailIcon: React.FC<FailIconProps> = (props) => (
  <FailIconWrapper>
    <Text style={props.disable ? {opacity: 0.3} : {}}>{props.failDesign}</Text>
  </FailIconWrapper>
);
FailIcon.displayName = 'FailIcon';

const FailIconWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface PlayerFailIconProps {
  player: Player;
  maxFail: number;
}

export const PlayerFailIcon: React.FC<PlayerFailIconProps> = (props) => {
  const spacing = 4;
  const fails: JSX.Element[] = [];
  for (let i = 0; i < props.maxFail; i++) {
    fails.push(
      <View key={`spacing-${i}`} style={{width: i === 0 ? 0 : spacing}}></View>,
      <FailIcon
        key={`icon-${i}`}
        failDesign={props.player.failDesign}
        disable={i >= props.player.fail}
      />
    );
  }
  return <PlayerFailIconWrapper>{fails}</PlayerFailIconWrapper>;
};
PlayerFailIcon.displayName = 'PlayerFailIcon';

const PlayerFailIconWrapper = styled.View`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
`;
