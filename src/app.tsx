import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import {APP_BACKGROUND_COLOR, APP_HORIZONTAL_PADDING, APP_VERTICAL_PADDING} from './theme';

export const App: React.FC = () => (
  <StyledSafeArea>
    <AppContainer>
      <Text>Hello</Text>
    </AppContainer>
  </StyledSafeArea>
);
App.displayName = 'App';

const AppContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${APP_BACKGROUND_COLOR};
  padding: ${APP_VERTICAL_PADDING}px ${APP_HORIZONTAL_PADDING}px;
`;
const StyledSafeArea = styled.SafeAreaView`
  background-color: ${APP_BACKGROUND_COLOR};
`;
