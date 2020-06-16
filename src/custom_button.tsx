import {FontAwesome} from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';

export const CustomButton: React.FC = () => (
    function onPressButton= () => void {
        console.log("Test")
    }
  <TouchableHighlight onPress={this.onPressButton}>
    <ButtonContent>
      <FontAwesome className="super-crazy-colors" name="rocket" />
    </ButtonContent>
  </TouchableHighlight>
);

const ButtonContent = styled.View``;

