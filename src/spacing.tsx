import React from 'react';
import {View} from 'react-native';

export const VerticalSpacing: React.FC<{height: number}> = ({height}) => (
  <View style={{width: '100%', height}} />
);
VerticalSpacing.displayName = 'VerticalSpacing';

export const HorizontalSpacing: React.FC<{width: number}> = ({width}) => (
  <View style={{height: '100%', width}} />
);
HorizontalSpacing.displayName = 'HorizontalSpacing';
