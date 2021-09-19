import React from 'react';
import styled from 'styled-components/native';

import {fontSizes} from '../lib/theme';

interface FailIconProps {
  failDesign: string;
  disable: boolean;
}

export const FailIcon: React.FC<FailIconProps> = ({disable, failDesign}) => (
  <FailIconWrapper>
    <Icon style={disable ? {opacity: 0.3} : {}}>{failDesign}</Icon>
  </FailIconWrapper>
);
FailIcon.displayName = 'FailIcon';

const FailIconWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Text`
  font-size: ${fontSizes.large}px;
`;
