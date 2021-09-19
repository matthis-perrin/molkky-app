// import {StatusBar} from '@react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Fragment} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

// import {clearPersistentDataStore} from './lib/data_store';
import {useApp} from './lib/stores';
import {appBackgroundColor, topBarBackgroundColor} from './lib/theme';
import {Accueil} from './pages/accueil';
import {Edit} from './pages/edit';
import {GamePage} from './pages/game';

// clearPersistentDataStore('games');

export const App: React.FC = () => (
  <SafeAreaProvider>
    <AppWithProvider />
    {/* <StatusBar barStyle="light-content" /> */}
  </SafeAreaProvider>
);
App.displayName = 'App';

const AppWithProvider: React.FC = () => {
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
    <AppWrapper>
      <AppContainer>{content}</AppContainer>
    </AppWrapper>
  );
};
AppWithProvider.displayName = 'AppWithProvider';

const AppWrapper = styled.View`
  background-color: ${topBarBackgroundColor};
`;

const AppContainer = styled.View`
  height: 100%;
  background-color: ${appBackgroundColor};
`;
