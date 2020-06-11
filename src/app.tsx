import React from 'react';
import {Alert, Button} from 'react-native';
import styled from 'styled-components/native';

import {HorizontalSpacing, VerticalSpacing} from './spacing';

export const App: React.FC = () => (
  <StyledSafeArea>
    <AppContainer>
      <TopBar>
        <Button title="Trust me" onPress={() => Alert.alert('I have a plan')} />
      </TopBar>
      <Content>
        <Pastille>
          <Name>Audric</Name>
          <HorizontalSpacing width={10} />
          <Score>22</Score>
        </Pastille>
        <VerticalSpacing height={10} />
        <Pastille>
          <Name>Matthis</Name>
          <HorizontalSpacing width={10} />
          <Score>12</Score>
        </Pastille>
      </Content>
      <BottomBar></BottomBar>
    </AppContainer>
  </StyledSafeArea>
);
App.displayName = 'App';

const StyledSafeArea = styled.SafeAreaView`
  background-color: white;
`;
const AppContainer = styled.View`
  display: flex;
  background-color: white;
  height: 812px;
  /* height: 100%; */
`;
const TopBar = styled.View`
  display: flex;
  flex-shrink: 0;
  background-color: white;
  height: 50px;
`;
const Content = styled.View`
  display: flex;
  padding: 10px;
  flex-grow: 1;
  background-color: white;
`;
const Pastille = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  height: 100px;
  background-color: black;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 25px;
  border-top-left-radius: 10px;
  border-top-right-radius: 25px;
`;
const Name = styled.Text`
  flex-grow: 1;
  color: white;
  font-size: 36px;
  padding-left: 10px;
`;
const Score = styled.Text`
  flex-shrink: 0;
  text-align: center;
  color: white;
  font-size: 36px;
  width: 100px;
`;
const BottomBar = styled.View`
  display: flex;
  flex-shrink: 0;
  background-color: white;
  height: 50px;
`;
