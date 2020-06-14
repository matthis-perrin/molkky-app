import React from 'react';
import styled from 'styled-components/native';

import {Pastille} from './pastille';
import {VerticalSpacing} from './spacing';
import {usePlayers} from './stores';

export const PlayerList: React.FC = () => {
  const [players] = usePlayers();
  const content: JSX.Element[] = [];
  for (const player of players) {
    content.push(<Pastille key={player.name} name={player.name} score={player.score}></Pastille>);
    content.push(<VerticalSpacing key={`separator-${player.name}`} height={10}></VerticalSpacing>);
  }
  content.splice(-1, 1);
  return <PlayerListWrapper>{content}</PlayerListWrapper>;
};
PlayerList.displayName = 'PlayerList';

const PlayerListWrapper = styled.View``;
