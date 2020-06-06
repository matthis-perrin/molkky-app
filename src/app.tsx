import React, {useState} from 'react';
import {Alert, Button} from 'react-native';
import styled from 'styled-components/native';

import {VerticalSpacing} from './components/core/spacing';
import {ScoreTile} from './components/score_tile';
import {MAX_SCORE, MIN_SCORE} from './lib/constants';
import {PlayerScore} from './model/score';
import {APP_BACKGROUND_COLOR, APP_HORIZONTAL_PADDING, APP_VERTICAL_PADDING} from './theme';

export function rand(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function randomPlayerScores(): PlayerScore[] {
  return ['Audric', 'Raphi', 'Matthis']
    .sort(() => Math.random() - 0.5) // eslint-disable-line @typescript-eslint/no-magic-numbers
    .map((player) => ({player, score: rand(MIN_SCORE, MAX_SCORE)}));
}

export const App: React.FC = () => {
  const [playerdScores, setPlayerdScores] = useState(randomPlayerScores());
  return (
    <StyledSafeArea>
      <AppContainer>
        {playerdScores.map((score) => (
          <React.Fragment>
            <ScoreTile score={score} />
            <VerticalSpacing height={8} />
          </React.Fragment>
        ))}
        <VerticalSpacing height={32} />
        <Button
          title="Afficher alerte"
          onPress={() => {
            Alert.alert('Salut !', 'Ceci est une alerte', [{text: 'Cool'}]);
          }}
        />
        <VerticalSpacing height={32} />
        <Button title="Random scores" onPress={() => setPlayerdScores(randomPlayerScores())} />
      </AppContainer>
    </StyledSafeArea>
  );
};
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
