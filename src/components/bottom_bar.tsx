import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {topBarBackgroundColor} from '../lib/theme';

export const BottomBar: React.FC<{dark?: boolean}> = ({dark}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      key="bottom-bar"
      style={{
        height: insets.bottom,
        backgroundColor: dark ? topBarBackgroundColor : 'transparent',
      }}
    />
  );
};
