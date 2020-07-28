import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import {buttonHeight, elevations, spacing} from '../lib/theme';

export const BottomBar: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        height: buttonHeight.medium + spacing + insets.bottom,
      }}
    />
  );
};
