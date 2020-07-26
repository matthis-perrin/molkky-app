import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import {Player} from '../lib/stores';

interface FailIconProps {
  failDesign: string;
  disable: boolean;
}

export const FailIcon: React.FC<FailIconProps> = (props) => (
  <FailIconWrapper>
    <Text style={props.disable ? {opacity: 0.5} : {}}>{props.failDesign}</Text>
  </FailIconWrapper>
);
FailIcon.displayName = 'FailIcon';

const FailIconWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  height: 48px;
  width: 48px;
`;

interface PlayerFailIconProps {
  player: Player;
  maxFail: number;
}

export const PlayerFailIcon: React.FC<PlayerFailIconProps> = (props) => {
  const fails: JSX.Element[] = [];
  for (let i = 0; i < props.maxFail; i++) {
    fails.push(<FailIcon failDesign={props.player.failDesign} disable={i >= props.player.fail} />);
  }
  return <PlayerFailIconWrapper>{fails}</PlayerFailIconWrapper>;
};
PlayerFailIcon.displayName = 'PlayerFailIcon';

const PlayerFailIconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: green;
`;
