import React from 'react';
import styled from 'styled-components/native';

import {HorizontalSpacing} from './spacing';
import {vert, white} from './theme';

export const Pastille: React.FC<{name: string; score: number}> = ({name, score}) => (
  <PastilleWrapper>
    <Name>{name}</Name>
    <HorizontalSpacing width={5} style={{backgroundColor: white}} />
    <Score>{score}</Score>
  </PastilleWrapper>
);
Pastille.displayName = 'Pastille';

const PastilleWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  height: 100px;
  background-color: ${vert};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 25px;
  border-top-left-radius: 10px;
  border-top-right-radius: 25px;
`;
const Name = styled.Text`
  flex-grow: 1;
  color: white;
  font-size: 36px;
  padding-left: 10px;
`;
const Score = styled.Text`
  flex-shrink: 0;
  text-align: center;
  color: white;
  font-size: 36px;
  width: 100px;
`;
