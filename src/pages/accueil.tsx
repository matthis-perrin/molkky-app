import {MaterialCommunityIcons} from '@expo/vector-icons';
import React, {Fragment, useCallback, useState} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {PreviewGame} from '../components/preview_game';
import {SpaceJoin} from '../components/space_join';
import {TopBar} from '../components/top_bar';
// import {clearPersistentDataStore} from '../lib/data_store';
import {createNewGame, isDone, useGames} from '../lib/stores';
import {
  appBackgroundColor,
  buttonBackgroundColor,
  fontSizes,
  spacing,
  topBarBackgroundColor,
  topBarColor,
} from '../lib/theme';

export const Accueil: React.FC = () => {
  const [modalShown, setModalShown] = useState(true);

  const [games] = useGames();
  const sortedGames = games.sort((g1, g2) => g2.creationTime - g1.creationTime);
  const gameInProgress = sortedGames.filter((g) => !isDone(g));
  const gameDone = sortedGames.filter((g) => isDone(g));

  const handleNewGamePress = useCallback(() => createNewGame(), []);
  const handleShowPositionsPress = useCallback(() => setModalShown(true), []);
  const handleModalTouch = useCallback(() => setModalShown(false), []);

  return (
    <Fragment>
      <TopBar
        left={
          <MaterialCommunityIcons
            name="crosshairs-question"
            size={24}
            color={'white'}
            onPress={handleShowPositionsPress}
          />
        }
        middle={<Title>MOLKKY</Title>}
        right={<MaterialCommunityIcons name="cog-outline" size={24} color={'white'} />}
      />
      {/* <CustomButtonText
          text="Reset Data"
          onPress={() => clearPersistentDataStore('games')}
          size="small"
        ></CustomButtonText> */}
      <WrapperAdd>
        <CustomButton
          text="Nouvelle partie"
          icon="plus"
          size="large"
          onPress={handleNewGamePress}
        />
      </WrapperAdd>
      <StyledScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <SpaceJoin>
          {[...gameInProgress, ...gameDone].map((g) => (
            <PreviewGame key={g.id} gameId={g.id} />
          ))}
        </SpaceJoin>
        <BottomBar />
      </StyledScrollView>
      {modalShown ? (
        <ModalWrapper onTouchStart={handleModalTouch}>
          <Modal>
            <ModalLine>
              <ModalCell>
                <ModalCellText>7</ModalCellText>
              </ModalCell>
              <ModalCell>
                <ModalCellText>9</ModalCellText>
              </ModalCell>
              <ModalCell>
                <ModalCellText>8</ModalCellText>
              </ModalCell>
            </ModalLine>
            <ModalLine>
              <ModalCell>
                <ModalCellText>5</ModalCellText>
              </ModalCell>
              <ModalCell>
                <ModalCellText>11</ModalCellText>
              </ModalCell>
              <ModalCell>
                <ModalCellText>12</ModalCellText>
              </ModalCell>
              <ModalCell>
                <ModalCellText>6</ModalCellText>
              </ModalCell>
            </ModalLine>
            <ModalLine>
              <ModalCell>
                <ModalCellText>3</ModalCellText>
              </ModalCell>
              <ModalCell>
                <ModalCellText>10</ModalCellText>
              </ModalCell>
              <ModalCell>
                <ModalCellText>4</ModalCellText>
              </ModalCell>
            </ModalLine>
            <ModalLine>
              <ModalCell>
                <ModalCellText>1</ModalCellText>
              </ModalCell>
              <ModalCell>
                <ModalCellText>2</ModalCellText>
              </ModalCell>
            </ModalLine>
          </Modal>
        </ModalWrapper>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};
Accueil.displayName = 'Accueil';

const Title = styled.Text`
  font-size: ${fontSizes.medium}px;
  text-align: center;
  color: ${topBarColor};
`;

const WrapperAdd = styled.View`
  margin: 0 ${spacing}px;
  flex-shrink: 0;
`;

const StyledScrollView = styled.ScrollView`
  flex-grow: 1;
  margin: ${spacing}px;
  margin-bottom: 0;
`;

const ModalWrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000000aa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const modalWidth = 300;
const modalHeight = 300;

const Modal = styled.View`
  position: absolute;
  width: ${modalWidth}px;
  height: ${modalHeight}px;
  display: flex;
  justify-content: center;
  border-radius: 16px;
  background-color: ${appBackgroundColor};
`;

const ModalLine = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: -9px;
`;

const ModalCell = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  width: 64px;
  height: 64px;
  background-color: ${topBarBackgroundColor};
`;

const ModalCellText = styled.Text`
  font-size: 30px;
  font-weight: 500;
  color: ${buttonBackgroundColor};
`;
