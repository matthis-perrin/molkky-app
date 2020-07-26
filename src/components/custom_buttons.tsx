import {Feather} from '@expo/vector-icons';
import React from 'react';
import {TouchableHighlight} from 'react-native';
import styled from 'styled-components/native';

import {black, borderRadius, charcoal, fontSize, white} from '../lib/theme';

interface FailIconProps {
  text: string;
  onPress: () => void;
  fontSize?: 'small' | 'medium' | 'large';
  icon?: string;
}

export const CustomButtonText: React.FC<FailIconProps> = (props) => (
  <TouchableHighlight onPress={props.onPress} underlayColor={black}>
    <ButtonContent>
      <Feather name="alert-circle" size={fontSize[props.fontSize ?? 'medium']} color={white} />
      <ButtonText style={{fontSize: fontSize[props.fontSize ?? 'medium']}}>{props.text}</ButtonText>
    </ButtonContent>
  </TouchableHighlight>
);

const ButtonContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: ${borderRadius}px;
  background-color: ${charcoal};
`;

const ButtonText = styled.Text`
  color: ${white};
`;
