import React from 'react';
import styled from 'styled-components/native';

import {PlayerScore} from '../model/score';
import {amber, deepOrange, green, lightGreen, lime, orange, red} from '../theme';
import {BaseText} from './core/base_text';
import {Tile} from './core/tile';

/* eslint-disable @typescript-eslint/no-magic-numbers */
function getColorFromScore(score: number): string {
  if (score < 10) {
    return red;
  }
  if (score <= 23) {
    return deepOrange;
  }
  if (score <= 36) {
    return orange;
  }
  if (score <= 50) {
    return amber;
  }
  if (score <= 63) {
    return lime;
  }
  if (score <= 76) {
    return lightGreen;
  }
  return green;
}
/* eslint-enable @typescript-eslint/no-magic-numbers */

export const ScoreTile: React.FC<{score: PlayerScore}> = ({score}) => (
  <ScoreTileContainer style={{borderLeftColor: getColorFromScore(score.score)}}>
    <PlayerContainer>
      <BaseText>{score.player}</BaseText>
    </PlayerContainer>
    <ScoreContainer>
      <BaseText>{score.score.toLocaleString()}</BaseText>
    </ScoreContainer>
  </ScoreTileContainer>
);
ScoreTile.displayName = 'ScoreTile';

const ScoreTileContainer = styled(Tile)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-left-width: 4px;
`;
const PlayerContainer = styled.View`
  flex-grow: 1;
`;
const ScoreContainer = styled.View`
  flex-shrink: 0;
`;
