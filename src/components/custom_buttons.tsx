import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react';
import {GestureResponderEvent, TouchableOpacity} from 'react-native';
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
  onPress: (evt: GestureResponderEvent) => void;
  size?: 'small' | 'medium' | 'large';
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  disabled?: boolean;
  iconSizeRatio?: number;
  hidden?: boolean;
  keyboardStyle?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const {width, size, iconSizeRatio, icon, text, onPress, disabled, hidden, keyboardStyle} = props;

  const fontSize = fontSizes[size ?? 'medium'];
  const cssHeight = buttonHeight[size ?? 'medium'];
  const cssWidth = width ?? (text !== undefined ? '100%' : cssHeight);
  const ratioIconSize = iconSizeRatio ?? 1;
  const ratioSeparatorWidth = 0.25;
  const buttonContent: JSX.Element[] = [];
  const opacityDisabled = 0.25;
  const opacity = disabled ? opacityDisabled : 1;

  const handleButtonPress = onPress;

  if (icon !== undefined) {
    buttonContent.push(
      <MaterialCommunityIcons
        key="icon"
        name={icon}
        size={fontSize * ratioIconSize}
        color={keyboardStyle ? keyboardColor : buttonColor}
      />
    );
    if (text !== undefined) {
      buttonContent.push(
        <Separator key="separator" style={{width: fontSize * ratioSeparatorWidth}}></Separator>
      );
    }
  }
  if (text !== undefined) {
    buttonContent.push(
      <ButtonText key="text" style={{fontSize, color: keyboardStyle ? keyboardColor : buttonColor}}>
        {text}
      </ButtonText>
    );
  }
  return (
    <TouchableOpacity
      onPress={handleButtonPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={{...elevations.medium, opacity, display: hidden ? 'none' : undefined}}
    >
      <ButtonContent
        style={{
          height: cssHeight,
          width: cssWidth,
          backgroundColor: keyboardStyle ? keyboardBackgroundColor : buttonBackgroundColor,
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
