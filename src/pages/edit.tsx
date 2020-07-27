import React, {Fragment} from 'react';
import {Alert, Keyboard, ScrollView, View} from 'react-native';
import styled from 'styled-components/native';

import {CustomButton} from '../components/custom_buttons';
import {
  addPlayer,
  delPlayer,
  movePlayerDown,
  Player,
  removeGame,
  setApp,
  setGame,
  setPlayerFailDesign,
  useApp,
  useGames,
} from '../lib/stores';
import {
  borderRadius,
  buttonHeight,
  fontSizes,
  inputBackgroundColor,
  pastilleBackgroundColor,
  spacing,
  topBarBackgroundColor,
  topBarButtonWidth,
} from '../lib/theme';

interface EditProps {
  gameId: number;
}

export const Edit: React.FC<EditProps> = (props) => {
  const [app] = useApp();
  const [games] = useGames();
  const game = games.filter((g) => g.id === props.gameId)[0];
  const onPressDelete = (): void => {
    Alert.alert('Confirmation', 'Voulez-vous supprimer la partie?', [
      {
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Supprimer',
        onPress: () => {
          setApp({...app, currentPage: 'accueil'});
          removeGame(props.gameId);
        },
        style: 'destructive',
      },
    ]);
  };

  const onPressAddPlayer = (): void => {
    addPlayer(game);
  };
  const onPressDeletePlayer = (player: Player): void => {
    delPlayer(game, player);
  };
  const onTextChange = (text: string, player: Player): void => {
    player.name = text;
  };
  const sortedPlayer = game.players.slice();
  sortedPlayer.sort((p1, p2) => p2.score - p1.score);
  if (game === undefined) {
    return <Fragment />;
  }
  const onPressPlay = (): void => {
    if (game.currentPlayerId === 0) {
      game.currentPlayerId = game.players[0].id;
      setGame(game);
    }
    setApp({...app, currentPage: 'playGame'});
  };
  const onPressSwap = (player: Player): void => {
    movePlayerDown(player, game);
  };
  const onFailDesignChange = (text: string, player: Player): void => {
    setPlayerFailDesign([...text].slice(-1)[0] ?? '💣', player, game);
    Keyboard.dismiss();
  };
  return (
    <Wrapper>
      <TopBar>
        <CustomButton
          icon="trash-can-outline"
          text="Effacer"
          onPress={onPressDelete}
          iconSizeRatio={1.2}
          width={topBarButtonWidth}
        />
        <Titre>{`Edition`}</Titre>
        <CustomButton
          text="Jouer !"
          onPress={onPressPlay}
          disabled={game.players.length === 0}
          width={topBarButtonWidth}
        />
      </TopBar>
      <ScrollView keyboardShouldPersistTaps="handled">
        {sortedPlayer.map((p, index) => (
          <Fragment key={p.id}>
            <PlayerWrapper>
              <TextInputFailDesign
                caretHidden
                selectTextOnFocus
                onChangeText={(text: string) => onFailDesignChange(text, p)}
                defaultValue={p.failDesign}
              />
              <TextInputPlayer
                selectTextOnFocus
                onChangeText={(text: string) => onTextChange(text, p)}
                defaultValue={p.name}
              />
              <CustomButton icon="backspace-outline" onPress={() => onPressDeletePlayer(p)} />
            </PlayerWrapper>
            <WrapperSwap>
              {index === game.players.length - 1 ? (
                <Fragment />
              ) : (
                <CustomButton
                  icon="swap-vertical-bold"
                  onPress={() => onPressSwap(p)}
                  iconSizeRatio={1.2}
                />
              )}
            </WrapperSwap>
          </Fragment>
        ))}
        <View style={{height: spacing}}></View>
      </ScrollView>
      <WrapperAdd>
        <CustomButton
          icon="account-plus"
          text="Ajouter joueur"
          onPress={onPressAddPlayer}
          size="large"
        />
      </WrapperAdd>
    </Wrapper>
  );
};
Edit.displayName = 'Edit';

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopBar = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  background-color: ${topBarBackgroundColor};
  padding: ${spacing / 2}px;
  margin-bottom: ${spacing}px;
`;

const PlayerWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${spacing}px;
  margin: 0px ${spacing}px;
  border-radius: ${borderRadius * 2}px;
  background-color: ${pastilleBackgroundColor};
`;

const TextInputPlayer = styled.TextInput`
  flex-grow: 1;
  margin: 0 ${spacing}px;
  background-color: ${inputBackgroundColor};
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  border-radius: ${borderRadius}px;
  padding-left: ${spacing}px;
`;

const TextInputFailDesign = styled.TextInput`
  text-align: center;
  flex-shrink: 0;
  background-color: ${inputBackgroundColor};
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  border-radius: ${borderRadius}px;
`;

const Titre = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
`;

const WrapperAdd = styled.View`
  margin: ${spacing}px;
  margin-bottom: 0px;
`;

const WrapperSwap = styled.View`
  align-items: center;
  margin: ${-spacing / 2}px 0;
  z-index: 2;
`;
