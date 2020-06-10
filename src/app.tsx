import React from 'react';
import styled from 'styled-components/native';

export const App: React.FC = () => (
  <StyledSafeArea>
    <AppContainer>
      <TopBar></TopBar>
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
  height: 100%;
`;
const TopBar = styled.View`
  display: flex;
  background-color: blue;
  height: 100px;
`;
const Content = styled.View`
  display: flex;
  background-color: yellow;
  height: 100%;
`;
const BottomBar = styled.View`
  display: flex;
  background-color: black;
  height: 100px;
`;
