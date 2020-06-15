import {FontAwesome} from '@expo/vector-icons';
import React, {useRef, useState} from 'react';
import {Animated, LayoutAnimation, PanResponder} from 'react-native';
import {Button} from 'react-native-elements';
import styled from 'styled-components/native';

import {HorizontalSpacing} from './spacing';
import {delPlayer} from './stores';
import {red, vert, white} from './theme';

const scoreWidth = 100;
const actionWidth = 100;

const MIN_OFFSET_BEFORE_AUTO_OPEN = 50;
const MIN_OFFSET_BEFORE_AUTO_CLOSE = 10;

const OPENED_RIGHT_OFFSET = -actionWidth;
const OPENED_LEFT_OFFSET = actionWidth;
const CLOSED_OFFSET = 0;

function getNewPastilleOffsetAfterRelease(currentOffset: number, dx: number): number {
  // Pastille is closed
  if (currentOffset === 0) {
    // Swipe right
    if (dx > 0) {
      return CLOSED_OFFSET; // Keep the pastille closed, swiping to the right forbidden
    }
    // Swipe left
    else if (dx < 0) {
      // Auto open to the right if swiping more than a certain offset, otherwise stay close
      return dx < -MIN_OFFSET_BEFORE_AUTO_OPEN ? OPENED_RIGHT_OFFSET : CLOSED_OFFSET;
    }
    // No swipe
    else {
      return CLOSED_OFFSET; // Keep the pastille closed
    }
  }

  // Pastille is opened on the right
  if (currentOffset < 0) {
    // Swipe right
    if (dx > 0) {
      // Auto close if swiping more than a certain offset, otherwise stay open on the right
      return dx > MIN_OFFSET_BEFORE_AUTO_CLOSE ? CLOSED_OFFSET : OPENED_RIGHT_OFFSET;
    }
    // Swipe left
    else if (dx < 0) {
      return OPENED_RIGHT_OFFSET; // Keep the pastille open on the right
    }
    // No swipe
    else {
      return CLOSED_OFFSET; // Close the pastille
    }
  }

  // Pastille is opened on the left (should never happen)
  if (currentOffset > 0) {
    // Swipe right
    if (dx > 0) {
      return OPENED_LEFT_OFFSET; // Keep the pastille open on the left
    }
    // Swipe left
    else if (dx < 0) {
      // Auto close if swiping more than a certain offset, otherwise stay open on the left
      return dx < -MIN_OFFSET_BEFORE_AUTO_CLOSE ? CLOSED_OFFSET : OPENED_LEFT_OFFSET;
    }
    // No swipe
    else {
      return CLOSED_OFFSET; // Close the pastille
    }
  }

  throw new Error(`Unexpected offset: currentOffset = ${currentOffset}, dx = ${dx}`);
}

export const Pastille: React.FC<{name: string; score: number}> = ({name, score}) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [pastilleOffset, setPastilleOffset] = useState(CLOSED_OFFSET);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => setSwipeOffset(0),
      onPanResponderMove: (evt, gestureState) => setSwipeOffset(gestureState.dx),
      onPanResponderRelease: (evt, gestureState) => {
        LayoutAnimation.easeInEaseOut();
        const newOffset = getNewPastilleOffsetAfterRelease(pastilleOffset, gestureState.dx);
        setPastilleOffset(newOffset);
        setSwipeOffset(0);
      },
    })
  );

  return (
    <DisplayWrapper>
      <PastilleWrapper
        {...panResponder.current.panHandlers}
        style={{left: Math.min(0, pastilleOffset + swipeOffset)}}
      >
        <Content>
          <NameWrapper>
            <Name>{name}</Name>
          </NameWrapper>
          <HorizontalSpacing
            width={5}
            style={{backgroundColor: white, flexShrink: 0, height: '100%'}}
          />
          <ScoreWrapper>
            <Score>{score}</Score>
          </ScoreWrapper>
        </Content>
        <ActionsWrapper>
          <Button
            icon={<FontAwesome name="trash" size={100} style={{color: 'black'}} />}
            onPress={() => delPlayer(name)}
            buttonStyle={{height: '100%', width: '100%'}}
          />
        </ActionsWrapper>
      </PastilleWrapper>
    </DisplayWrapper>
  );
};
Pastille.displayName = 'Pastille';

const DisplayWrapper = styled.View`
  background-color: ${vert};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 25px;
  border-top-left-radius: 10px;
  border-top-right-radius: 25px;
  overflow: hidden;
`;

const PastilleWrapper = styled(Animated.View)`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  height: 100px;
  width: 100%;
`;

const Content = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const NameWrapper = styled.View`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;
const Name = styled.Text`
  color: white;
  font-size: 36px;
  padding-left: 12px;
`;

const ScoreWrapper = styled.View`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${scoreWidth}px;
`;
const Score = styled.Text`
  text-align: center;
  color: white;
  font-size: 36px;
`;

const ActionsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: ${actionWidth};
  background-color: ${vert};
`;
