import React from 'react';
import {Alert, Button} from 'react-native';
import styled from 'styled-components/native';

export const App: React.FC = () => (
  <StyledSafeArea>
    <AppContainer>
      <TopBar>
        <Button title="Trust me" onPress={() => Alert.alert('I have a plan')} />
      </TopBar>
      <Content></Content>
      <BottomBar></BottomBar>
    </AppContainer>
  </StyledSafeArea>
);
App.displayName = 'App';

const StyledSafeArea = styled.SafeAreaView`
  background-color: red;
`;
const AppContainer = styled.View`
  display: flex;
  background-color: green;
  /* height: 812px; */
  height: 100%;
`;
const TopBar = styled.View`
  display: flex;
  flex-shrink: 0;
  background-color: blue;
  height: 50px;
`;
const Content = styled.View`
  display: flex;
  flex-grow: 1;
  background-color: yellow;
`;
const BottomBar = styled.View`
  display: flex;
  flex-shrink: 0;
  background-color: black;
  height: 50px;
`;
