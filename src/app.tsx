import React from 'react';
import {Alert, Button} from 'react-native';
import styled from 'styled-components/native';

import {VerticalSpacing} from './spacing';

export const App: React.FC = () => (
  <StyledSafeArea>
    <AppContainer>
      <TopBar>
        <Button title="Trust me" onPress={() => Alert.alert('I have a plan')} />
      </TopBar>
      <Content>
        <Pastille>
          <Name>Audric</Name>
          <Score>22</Score>
        </Pastille>
        <VerticalSpacing height={10} />
        <Pastille>
          <Name>Matthis</Name>
          <Score>12</Score>
        </Pastille>
      </Content>
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
  height: 812px;
  /* height: 100%; */
`;
const TopBar = styled.View`
  display: flex;
  flex-shrink: 0;
  background-color: blue;
  height: 50px;
`;
const Content = styled.View`
  display: flex;
  padding: 10px;
  flex-grow: 1;
  background-color: yellow;
`;
const Pastille = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  height: 100px;
  background-color: black;
`;
const Name = styled.Text`
  flex-grow: 1;
  color: white;
  font-size: 36px;
  padding-left: 10px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
`;
const Score = styled.Text`
  flex-shrink: 0;
  color: white;
  font-size: 36px;
  width: 100px;
  border-left-color: white;
  border-left-style: solid;
  border-left-width: 5px;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
`;
const BottomBar = styled.View`
  display: flex;
  flex-shrink: 0;
  background-color: black;
  height: 50px;
`;
