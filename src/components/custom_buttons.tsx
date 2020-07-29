import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import {
  borderRadius,
  buttonBackgroundColor,
  buttonColor,
  buttonHeight,
  elevations,
  fontSizes,
  keyboardBackgroundColor,
  keyboardColor,
} from '../lib/theme';

interface CustomButtonProps {
  text?: string;
  width?: number;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  disabled?: boolean;
  iconSizeRatio?: number;
  hidden?: boolean;
  keyboardStyle?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const fontSize = fontSizes[props.size ?? 'medium'];
  const height = buttonHeight[props.size ?? 'medium'];
  const width = props.width ?? (props.text !== undefined ? '100%' : height);
  const ratioIconSize = props.iconSizeRatio ?? 1;
  const ratioSeparatorWidth = 0.25;
  const buttonContent: JSX.Element[] = [];
  const opacityDisabled = 0.25;
  const opacity = props.disabled ? opacityDisabled : 1;
  if (props.icon !== undefined) {
    buttonContent.push(
      <MaterialCommunityIcons
        key="icon"
        name={props.icon}
        size={fontSize * ratioIconSize}
        color={props.keyboardStyle ? keyboardColor : buttonColor}
      />
    );
    if (props.text !== undefined) {
      buttonContent.push(
        <Separator key="separator" style={{width: fontSize * ratioSeparatorWidth}}></Separator>
      );
    }
  }
  if (props.text !== undefined) {
    buttonContent.push(
      <ButtonText
        key="text"
        style={{fontSize, color: props.keyboardStyle ? keyboardColor : buttonColor}}
      >
        {props.text}
      </ButtonText>
    );
  }
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      disabled={props.disabled}
      style={{...elevations.medium, opacity, display: props.hidden ? 'none' : undefined}}
    >
      <ButtonContent
        style={{
          height,
          width,
          backgroundColor: props.keyboardStyle ? keyboardBackgroundColor : buttonBackgroundColor,
        }}
      >
        {buttonContent}
      </ButtonContent>
    </TouchableOpacity>
  );
};
CustomButton.displayName = 'CustomButton';

const ButtonContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${borderRadius}px;
`;

const Separator = styled.View``;

const ButtonText = styled.Text``;
