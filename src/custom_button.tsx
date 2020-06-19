import {FontAwesome} from '@expo/vector-icons';
import React from 'react';
import {TouchableHighlight} from 'react-native';
import styled from 'styled-components/native';

import {delPlayer} from './stores';
import {blanc, rouge} from './theme';

export const CustomButton: React.FC<{name: string}> = ({name}) => {
  function onPressButton(): void {
    delPlayer(name);
  }
  return (
    <TouchableHighlight onPress={onPressButton}>
      <ButtonContent>
        <FontAwesome className="poubelle" name="trash" size={48} color={blanc} />
      </ButtonContent>
    </TouchableHighlight>
  );
};

const ButtonContent = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100px;
  background-color: ${rouge};
`;
