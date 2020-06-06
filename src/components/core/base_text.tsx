import React from 'react';
import {TextStyle} from 'react-native';
import styled from 'styled-components/native';

import {CustomText} from '../../lib/react';
import {LARGE_TEXT, MEDIUM_TEXT, NORMAL_TEXT, SMALL_TEXT, white} from '../../theme';

export type TextSize = 'small' | 'normal' | 'medium' | 'large';

function getFontSize(size: TextSize = 'normal'): number {
  if (size === 'large') {
    return LARGE_TEXT;
  } else if (size === 'small') {
    return SMALL_TEXT;
  } else if (size === 'medium') {
    return MEDIUM_TEXT;
  }
  return NORMAL_TEXT;
}

export const BaseText: CustomText<{size?: TextSize; color?: string}> = (props) => {
  const customStyles: TextStyle = {fontSize: getFontSize(props.size), color: props.color ?? white};
  return (
    <StyledText numberOfLines={1} {...props} style={[props.style, customStyles]}>
      {props.children}
    </StyledText>
  );
};
BaseText.displayName = 'BaseText';

const StyledText = styled.Text``;
