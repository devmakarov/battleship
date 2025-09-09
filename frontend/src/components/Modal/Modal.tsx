import { Dialog } from "@headlessui/react";
import { useState } from "react";
import * as styles from "./Modal.css.ts";
import { EModalType } from "./enums.ts";
import Button from "../Button/Button.tsx";

interface ModalProps {
  type: EModalType;
  isOpen: boolean;
  onClose: () => void;
}

const locale: Record<
  EModalType,
  {
    title: string;
    text: string;
  }
> = {
  [EModalType.Win]: {
    title: "You Win!",
    text: "Congratulations! You sank all opponent's ships!",
  },
  [EModalType.Lose]: {
    title: "You Lost :(",
    text: "Better luck next time — your fleet has been destroyed.",
  },
  [EModalType.GameIsTerminated]: {
    title: "Game Terminated",
    text: "The opponent has left the game. This match is over.",
  },
};

const Modal = ({ type, isOpen: isOpenDefault, onClose }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const { text, title } = locale[type];

  const className = {
    [EModalType.Win]: styles.typeWin,
    [EModalType.Lose]: styles.typeLose,
    [EModalType.GameIsTerminated]: styles.GameIsTerminated,
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className={styles.modal}>
        <div className={`${styles.box} ${className[type]}`}>
          <p className={styles.title}>{title}</p>
          <p className={styles.text}>{text}</p>

          <Button
            className={styles.newGame}
            size="medium"
            text="New Game"
            onClick={handleClose}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
