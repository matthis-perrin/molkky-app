import React from 'react';
import {View, ViewStyle} from 'react-native';

export const VerticalSpacing: React.FC<{height: number; style?: ViewStyle}> = ({
  height,
  style = {},
}) => <View style={{width: '100%', height, ...style}} />;
VerticalSpacing.displayName = 'VerticalSpacing';

export const HorizontalSpacing: React.FC<{width: number; style?: ViewStyle}> = ({
  width,
  style = {},
}) => <View style={{height: '100%', width, ...style}} />;
HorizontalSpacing.displayName = 'HorizontalSpacing';
