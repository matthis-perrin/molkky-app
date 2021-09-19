import React from 'react';
import {View, ViewStyle} from 'react-native';

export const Spacing: React.FC<{height?: number; width?: number; style?: ViewStyle}> = ({
  width = '100%',
  height = '100%',
  style = {},
  ...rest
}) => <View style={{width, height, ...style}} {...rest} />;
Spacing.displayName = 'Spacing';
