import React, {ReactNode} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import {buttonHeight, elevations, spacing, topBarBackgroundColor} from '../lib/theme';

interface TopBarProps {
  left?: ReactNode;
  middle?: ReactNode;
  right?: ReactNode;
  children?: never;
}

export const TopBar: React.FC<TopBarProps> = (props) => {
  const {left, middle, right} = props;
  const insets = useSafeAreaInsets();
  return (
    <TopBarWrapper
      style={{
        ...elevations.medium,
        height: buttonHeight.medium + spacing + insets.top,
        paddingTop: spacing + insets.top,
      }}
    >
      <Left>{left}</Left>
      <Middle>{middle}</Middle>
      <Right>{right}</Right>
    </TopBarWrapper>
  );
};

const TopBarWrapper = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  background-color: ${topBarBackgroundColor};
  padding: ${spacing}px;
`;

const Left = styled.View`
  flex-shrink: 0;
`;
const Middle = styled.View`
  flex-grow: 1;
`;
const Right = styled.View`
  flex-shrink: 0;
`;
