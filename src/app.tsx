import React, {Fragment} from 'react';
import styled from 'styled-components/native';

import {useApp} from './lib/stores';
import {Accueil} from './pages/accueil';
import {Edit} from './pages/edit';
import {GamePage} from './pages/game';

export const App: React.FC = () => {
  const [app] = useApp();

  let content = <Fragment />;
  if (app.currentPage === 'accueil') {
    content = <Accueil />;
  } else if (app.currentPage === 'playGame' && app.currentGame) {
    content = <GamePage game={app.currentGame} />;
  } else if (app.currentPage === 'editGame' && app.currentGame) {
    content = <Edit game={app.currentGame} />;
  }

  return (
    <StyledSafeArea>
      <AppContainer>{content}</AppContainer>
    </StyledSafeArea>
  );
};
App.displayName = 'App';

const StyledSafeArea = styled.SafeAreaView``;
const AppContainer = styled.View``;
