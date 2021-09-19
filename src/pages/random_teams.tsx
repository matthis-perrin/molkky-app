import React, {Fragment, useCallback, useState} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {setApp, setGame, useApp, useGames} from '../lib/stores';
import {
  borderRadius,
  buttonHeight,
  elevations,
  fontSizes,
  inputBackgroundColor,
  pastilleBackgroundColor,
  spacing,
  topBarBackgroundColor,
  topBarButtonWidth,
  topBarColor,
} from '../lib/theme';

interface RandomTeamsProps {
  gameId: number;
}

export const RandomTeams: React.FC<RandomTeamsProps> = (props) => {
  const {gameId} = props;

  const [app] = useApp();
  const [games] = useGames();
  const game = games.find((g) => g.id === gameId);

  const [players, setPlayers] = useState<string[]>([]);
  const [randomIndexes, setRandomIndexes] = useState<number[]>([]);
  const [teamCount, setTeamCount] = useState(2);

  const teamRepartition: number[][] = [...new Array(teamCount)].map(() => []);
  for (let i = 0; i < players.length; i++) {
    const currentTeam = teamRepartition[i % teamCount];
    currentTeam.push(randomIndexes[i]);
  }

  const handleCancelPress = useCallback(() => {
    setApp({...app, currentPage: 'editGame'});
  }, [app]);

  const handleAddPlayerPress = useCallback(() => {
    setPlayers([...players, `Joueur ${players.length + 1}`]);
    setRandomIndexes([...randomIndexes, players.length]);
  }, [players, randomIndexes]);

  const handlePlayerNameChange = (text: string, index: number): void => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1, text);
    setPlayers(newPlayers);
  };

  const handleDeletePlayerPress = (index: number): void => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
    setRandomIndexes(randomIndexes.filter((p) => p !== index).map((p) => (p > index ? p - 1 : p)));
  };

  const handleIncreaseTeamCount = useCallback(() => {
    setTeamCount(teamCount + 1);
  }, [teamCount]);
  const handleDecreaseTeamCount = useCallback(() => {
    setTeamCount(Math.max(2, teamCount - 1));
  }, [teamCount]);

  const handleShufflePress = useCallback(() => {
    const indexes = [...new Array(players.length)].map((val, i) => i);
    const random: number[] = [];
    while (indexes.length > 0) {
      const r = Math.floor(Math.random() * indexes.length);
      random.push(indexes.splice(r, 1)[0]);
    }
    setRandomIndexes(random);
  }, [players.length]);

  const handleConfirm = useCallback(() => {
    if (game === undefined) {
      return;
    }

    game.players = teamRepartition.map((team, i) => ({
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      id: Math.round(Math.random() * 1000000),
      name: team.length === 0 ? `Équipe ${i + 1}` : team.map((p) => players[p]).join(' + '),
      fail: 0,
      score: 0,
      failDesign: '💣',
    }));
    setGame(game);

    if (game.currentPlayerId === 0) {
      game.currentPlayerId = game.players[0].id;
      setGame(game);
    }
    setApp({...app, currentPage: 'editGame'});
  }, [app, game, players, teamRepartition]);

  return (
    <Fragment>
      <TopBar
        left={
          <CustomButton
            icon="arrow-left"
            text="Annuler"
            onPress={handleCancelPress}
            iconSizeRatio={1.2}
            width={topBarButtonWidth}
          />
        }
        middle={<Titre>{`Équipes`}</Titre>}
        right={<CustomButton text="Valider" onPress={handleConfirm} width={topBarButtonWidth} />}
      />
      <StyledScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TeamCountWrapper key="team-count">
          <TeamCountLabel>Nombre d'équipes</TeamCountLabel>
          <CustomButton icon="minus" onPress={handleDecreaseTeamCount} />
          <TeamCountValue>{teamCount}</TeamCountValue>
          <CustomButton icon="plus" onPress={handleIncreaseTeamCount} />
        </TeamCountWrapper>
        <TeamsWrapper>
          {teamRepartition.map((team, teamIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <TeamWrapper key={teamIndex}>
              <TeamName>{`ÉQUIPE ${teamIndex + 1}`}</TeamName>
              {team.map((playerIndex) => (
                <PlayerWrapper key={playerIndex}>
                  <TextInputPlayer
                    selectTextOnFocus
                    // eslint-disable-next-line react/jsx-no-bind
                    onChangeText={(text: string) => handlePlayerNameChange(text, playerIndex)}
                    defaultValue={players[playerIndex]}
                  />
                  <CustomButton
                    icon="trash-can-outline"
                    // eslint-disable-next-line react/jsx-no-bind
                    onPress={() => handleDeletePlayerPress(playerIndex)}
                  />
                </PlayerWrapper>
              ))}
            </TeamWrapper>
          ))}
        </TeamsWrapper>
      </StyledScrollView>
      <ButtonsWrapper
        style={{
          ...elevations.extraLarge,
        }}
      >
        <ButtonWrapper>
          <CustomButton
            icon="account-plus"
            text="Ajouter joueur"
            onPress={handleAddPlayerPress}
            size="large"
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <CustomButton text="Mélanger !" onPress={handleShufflePress} size="large" />
        </ButtonWrapper>
      </ButtonsWrapper>
      <BottomBar dark />
    </Fragment>
  );
};
RandomTeams.displayName = 'RandomTeams';

const TeamsWrapper = styled.View`
  display: flex;
`;

const TeamWrapper = styled.View`
  display: flex;
`;

const TeamName = styled.Text`
  font-weight: 500;
  padding: ${spacing}px;
`;

const TeamCountWrapper = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: ${pastilleBackgroundColor};
  margin-bottom: 8px;
  padding: ${spacing}px;
`;

const TeamCountLabel = styled.Text`
  font-size: ${fontSizes.large}px;
  flex-grow: 1;
`;

const TeamCountValue = styled.Text`
  font-size: ${fontSizes.large}px;
  width: 48px;
  text-align: center;
  font-weight: 500;
`;

const PlayerWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${spacing}px;
  margin: 0px ${spacing}px;
  border-radius: ${borderRadius * 2}px;
  background-color: ${pastilleBackgroundColor};
  margin-bottom: 10px;
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

const ButtonsWrapper = styled.View`
  display: flex;
  background-color: ${topBarBackgroundColor};
`;
