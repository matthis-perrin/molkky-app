import React from 'react';
import {Alert, Button} from 'react-native';
import styled from 'styled-components/native';

import {PlayerList} from './player_list';
import {gris} from './theme';

export const App: React.FC = () => (
  <StyledSafeArea>
    <AppContainer>
      <TopBar>
        <Button title="Trust me" onPress={() => Alert.alert('I have a plan')} />
      </TopBar>
      <Content>
        <PlayerList />
      </Content>
      <BottomBar></BottomBar>
    </AppContainer>
  </StyledSafeArea>
);
App.displayName = 'App';

const StyledSafeArea = styled.SafeAreaView`
  background-color: ${gris};
`;
const AppContainer = styled.View`
  display: flex;
  background-color: ${gris};
  height: 812px;
  /* height: 100%; */
`;
const TopBar = styled.View`
  display: flex;
  flex-shrink: 0;
  background-color: ${gris};
  height: 50px;
`;
const Content = styled.View`
  display: flex;
  padding: 10px;
  flex-grow: 1;
  background-color: ${gris};
`;
const BottomBar = styled.View`
  display: flex;
  flex-shrink: 0;
  background-color: ${gris};
  height: 50px;
`;
