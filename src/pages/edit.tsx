import React, {Fragment, useCallback, useState} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {Categories, EmojiSelector} from '../components/emoji_picker';
import {TopBar} from '../components/top_bar';
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
  appBackgroundColor,
  borderRadius,
  buttonHeight,
  fontSizes,
  inputBackgroundColor,
  pastilleBackgroundColor,
  spacing,
  topBarBackgroundColor,
  topBarButtonWidth,
  topBarColor,
} from '../lib/theme';

interface EditProps {
  gameId: number;
}

const handlePlayerNameChange = (text: string, player: Player): void => {
  player.name = text;
};

export const Edit: React.FC<EditProps> = (props) => {
  const {gameId} = props;

  const [app] = useApp();
  const [games] = useGames();
  const game = games.find((g) => g.id === gameId);
  const [emojiPickerPlayer, setEmojiPickerPlayer] = useState<Player | undefined>();

  const handleDeletePress = useCallback(() => {
    if (game === undefined) {
      return;
    }
    Alert.alert('Confirmation', 'Voulez-vous supprimer la partie?', [
      {
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Supprimer',
        onPress: () => {
          setApp({...app, currentPage: 'accueil'});
          removeGame(gameId);
        },
        style: 'destructive',
      },
    ]);
  }, [app, game, gameId]);

  const handleAddPlayerPress = useCallback(() => {
    if (game === undefined) {
      return;
    }
    addPlayer(game);
  }, [game]);

  const handleRandomTeamPress = useCallback(() => {
    setApp({...app, currentPage: 'randomTeam'});
  }, [app]);

  const handleDeletePlayerPress = (player: Player): void => {
    if (game === undefined) {
      return;
    }
    delPlayer(game, player);
  };

  const handlePlayPress = useCallback(() => {
    if (game === undefined) {
      return;
    }
    if (game.currentPlayerId === 0) {
      game.currentPlayerId = game.players[0].id;
      setGame(game);
    }
    setApp({...app, currentPage: 'playGame'});
  }, [app, game]);

  const handleSwapPress = (player: Player): void => {
    if (game === undefined) {
      return;
    }
    movePlayerDown(player, game);
  };

  const handlePlayerEmojiSelected = (player: Player, emoji: string): void => {
    if (game === undefined) {
      return;
    }
    setPlayerFailDesign(emoji, player, game);
    setEmojiPickerPlayer(undefined);
  };

  const handlePlayerEmojiPress = (player: Player): void => {
    setEmojiPickerPlayer(player);
  };

  // const handleEmojiClick = useCallback((event: any, emojiObject: any) => {
  //   console.log(emojiObject);
  // }, []);

  const sortedPlayer = [...(game?.players ?? [])];
  sortedPlayer.sort((p1, p2) => p2.score - p1.score);
  if (game === undefined) {
    return <Fragment />;
  }

  const scrollViewContent: JSX.Element[] = [];
  for (const [index, p] of sortedPlayer.entries()) {
    scrollViewContent.push(
      <PlayerWrapper key={p.id}>
        <PlayerEmoji onPress={() => handlePlayerEmojiPress(p)}>{p.failDesign}</PlayerEmoji>
        <TextInputPlayer
          selectTextOnFocus
          onChangeText={(text: string) => handlePlayerNameChange(text, p)}
          defaultValue={p.name}
        />
        <CustomButton icon="trash-can-outline" onPress={() => handleDeletePlayerPress(p)} />
      </PlayerWrapper>,

      index === game.players.length - 1 ? (
        <Fragment key={index} />
      ) : (
        <WrapperSwap key={index}>
          <CustomButton
            icon="swap-vertical-bold"
            onPress={() => handleSwapPress(p)}
            iconSizeRatio={1.2}
          />
        </WrapperSwap>
      )
    );
  }

  return (
    <Fragment>
      <TopBar
        left={
          <CustomButton
            icon="trash-can-outline"
            text="Effacer"
            onPress={handleDeletePress}
            iconSizeRatio={1.2}
            width={topBarButtonWidth}
          />
        }
        middle={<Titre>{`Edition`}</Titre>}
        right={
          <CustomButton
            text="Jouer !"
            onPress={handlePlayPress}
            disabled={game.players.length === 0}
            width={topBarButtonWidth}
          />
        }
      />
      <StyledScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {scrollViewContent}
      </StyledScrollView>
      {emojiPickerPlayer ? (
        <EmojiWrapper>
          <EmojiSelector
            theme="#007AFF"
            columns={6}
            placeholder="Search..."
            showSearchBar={false}
            showHistory={false}
            showTabs={false}
            showSectionTitles={false}
            category={Categories.all}
            onEmojiSelected={(emoji) => handlePlayerEmojiSelected(emojiPickerPlayer, emoji)}
          />
        </EmojiWrapper>
      ) : (
        <Fragment />
      )}
      <ButtonsWrapper>
        <ButtonWrapper>
          <CustomButton
            icon="account-plus"
            text="Ajouter joueur"
            onPress={handleAddPlayerPress}
            size="large"
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <CustomButton
            icon="dice-3"
            text="Tirer les équipes au hasard"
            onPress={handleRandomTeamPress}
            size="large"
          />
        </ButtonWrapper>
      </ButtonsWrapper>
      <BottomBar dark />
    </Fragment>
  );
};
Edit.displayName = 'Edit';

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
  background-color: ${inputBackgroundColor};
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  border-radius: ${borderRadius}px;
  padding-left: ${spacing}px;
  margin: 0 ${spacing / 2}px;
`;

const PlayerEmoji = styled.Text`
  flex-shrink: 0;
  background-color: ${inputBackgroundColor};
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
  border-radius: ${borderRadius}px;
`;

const Titre = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
  color: ${topBarColor};
`;

const StyledScrollView = styled.ScrollView`
  flex-grow: 1;
`;

const ButtonWrapper = styled.View`
  margin: ${spacing}px;
  margin-bottom: 0;
  background-color: transparent;
`;

const WrapperSwap = styled.View`
  align-items: center;
  margin: ${-spacing / 2}px 0;
  z-index: 2;
`;

const ButtonsWrapper = styled.View`
  display: flex;
  background-color: ${topBarBackgroundColor};
`;

const EmojiWrapper = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${appBackgroundColor};
  padding: 40px 0 0 0;
`;
