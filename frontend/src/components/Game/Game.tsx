import { Board } from "../Board/Board.tsx";
import * as styles from "./Game.css.ts";
import * as appStyles from "../../app.css.ts";

import { Mode } from "../Board/enums.ts";
import { EAppViews } from "../../enums.ts";
import Modal from "../Modal/Modal.tsx";
import Setup from "../Setup/Setup.tsx";
import Action from "../Action/Action.tsx";
import Button from "../Button/Button.tsx";

import { useGameState } from "./hooks/useGameState.ts";
import { useGameSocketEvents } from "./hooks/useGameSocketEvents.ts";
import { useGameAPI } from "./hooks/useGameAPI.ts";
import { EInTheQueue } from "./types.ts";
import SoundToggler from "../SoundToggler/SoundToggler.tsx";

const Game = () => {
  const game = useGameState();
  const { socket } = useGameSocketEvents(game);

  const {
    handleCreateGame,
    handleJoinGame,
    handleJoinRandomGame,
    handleResetGame,
  } = useGameAPI({
    socket,
    game,
  });

  const finishGame = async () => {
    game.finish();

    if (game.isFriendGame) {
      await handleResetGame();
    }
  };

  const handleModalClose = async () => {
    game.closeModal();
    await finishGame();
  };

  return (
    <main className={appStyles.container}>
      <div className={styles.app}>
        <div className={styles.view}>
          <div className={styles.title}>
            <h2>Battleship</h2>
          </div>

          <div className={styles.game}>
            <div className={styles.playerBox}>
              <div className={styles.boardWrapper}>
                <Board
                  state={game.myself.state}
                  setState={game.myself.setState}
                  roots={game.myself.roots}
                  mode={Mode.Myself}
                  isPlaying={game.isPlaying}
                  isInTheQueue={game.isInTheQueue}
                  turn={game.turn}
                  ships={game.ships}
                  setShips={game.setShips}
                  prevMove={game.myself.prevMove}
                />
              </div>
              <p className={styles.playerBoxTitle}>Your grid</p>
            </div>

            {game.view === EAppViews.Setup ? (
              <Setup
                ships={game.ships}
                state={game.myself.state}
                onReady={game.onReady}
              />
            ) : (
              <div className={styles.playerBox}>
                <div className={styles.boardWrapper}>
                  <Board
                    state={game.opponent.state}
                    setState={game.opponent.setState}
                    roots={game.opponent.roots}
                    mode={Mode.Opponent}
                    isPlaying={game.isPlaying}
                    isInTheQueue={game.isInTheQueue}
                    turn={game.turn}
                    changeTurn={game.changeTurn}
                    inActive={!game.isPlaying}
                    gameId={game.gameId}
                    playerId={game.playerId}
                    prevMove={game.opponent.prevMove}
                  />

                  {!game.isPlaying && (
                    <div className={styles.boardOverflow}>
                      <div className={styles.boardPreview}>
                        {!game.isFriendGame ? (
                          <div className={styles.boardChooseTheOpponent}>
                            Choose the mode
                          </div>
                        ) : null}

                        <div className={styles.playModes}>
                          {!game.isFriendGame && (
                            <>
                              <Button
                                size="medium"
                                text={
                                  game.isInTheQueue === EInTheQueue.Random
                                    ? "Waiting"
                                    : " Random"
                                }
                                disabled={
                                  game.isInTheQueue !== EInTheQueue.Unset
                                }
                                onClick={handleJoinRandomGame}
                              />

                              <Button
                                variant="green"
                                size="medium"
                                text="With a friend"
                                disabled={
                                  game.isInTheQueue !== EInTheQueue.Unset
                                }
                                onClick={handleCreateGame}
                              />
                            </>
                          )}

                          {game.isFriendGame && (
                            <Button
                              variant="green"
                              size="medium"
                              text={
                                game.isInTheQueue === EInTheQueue.WithFriend
                                  ? "Waiting"
                                  : game.hasPlayed
                                    ? "Rematch"
                                    : "Play"
                              }
                              disabled={game.isInTheQueue !== EInTheQueue.Unset}
                              onClick={handleJoinGame}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <p className={styles.playerBoxTitle}>Opponent's grid</p>
              </div>
            )}
          </div>

          <div className={styles.gameActions}>
            <div className={styles.gameActionsBox}>
              <Action
                text="Random position"
                isDisabled={
                  game.isRandomizeDisabled ||
                  game.isPlaying ||
                  game.isInTheQueue !== EInTheQueue.Unset
                }
                onClick={game.generateRandomPosition}
              />

              <Action
                text="Reset position"
                isDisabled={
                  game.isRandomizeDisabled ||
                  game.isPlaying ||
                  game.isInTheQueue !== EInTheQueue.Unset
                }
                onClick={game.resetPosition}
              />
            </div>

            <div className={styles.toggleSound}>
              <SoundToggler />
            </div>
          </div>
        </div>

        {game.modalType && (
          <Modal
            type={game.modalType}
            isOpen={game.isModalOpen}
            onClose={handleModalClose}
          />
        )}
      </div>
    </main>
  );
};

export default Game;
