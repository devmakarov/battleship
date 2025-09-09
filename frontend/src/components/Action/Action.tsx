import * as actionStyles from "./Action.css.ts";
import type { ActionProps } from "./types.ts";

const Action = ({ text, isDisabled, onClick }: ActionProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className={actionStyles.action}>
      <button
        className={actionStyles.actionButton}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {text}
      </button>
    </div>
  );
};

export default Action;
