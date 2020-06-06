import React from 'react';
import styled from 'styled-components/native';

import {CustomView} from '../../lib/react';
import {charcoal} from '../../theme';

export const Tile: CustomView = (props) => <Wrapper {...props}>{props.children}</Wrapper>;
Tile.displayName = 'Tile';

const Wrapper = styled.View`
  padding: 16px;
  border-radius: 3px;
  background-color: ${charcoal};
`;
