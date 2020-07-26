import React, {Fragment} from 'react';
import styled from 'styled-components/native';

// import {clearPersistentDataStore} from './lib/data_store';
import {useApp} from './lib/stores';
import {Accueil} from './pages/accueil';
import {Edit} from './pages/edit';
import {GamePage} from './pages/game';

// clearPersistentDataStore('games');

export const App: React.FC = () => {
  const [app] = useApp();

  let content = <Fragment />;
  if (app.currentPage === 'accueil') {
    content = <Accueil />;
  } else if (app.currentPage === 'playGame' && app.currentGameId !== undefined) {
    content = <GamePage gameId={app.currentGameId} />;
  } else if (app.currentPage === 'editGame' && app.currentGameId !== undefined) {
    content = <Edit gameId={app.currentGameId} />;
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
