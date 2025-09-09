import * as React from "react";
import * as styles from "./Button.css.ts";
import type { CSSProperties } from "react";

interface ButtonProps {
  text: string;
  size?: keyof typeof sizeMap;
  variant?: keyof typeof variantMap;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const sizeMap = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

const variantMap = {
  main: styles.main,
  modal: styles.modal,
  green: styles.green,
};

const Button = ({
  text,
  size = "medium",
  variant = "main",
  className,
  style = {},
  disabled,
  onClick,
}: ButtonProps) => {
  const sizeClass = sizeMap[size];
  const variantClass = variantMap[variant];

  return (
    <button
      className={`${styles.button} ${sizeClass} ${variantClass} ${className ?? ""}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
