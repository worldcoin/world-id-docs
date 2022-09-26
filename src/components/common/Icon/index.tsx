import clsx from "clsx";
import { CSSProperties, memo } from "react";
import styles from "./icon.module.css";

export const iconNames = [
  "angle-down",
  "burger",
  "close",
  "external",
  "info",
  "lightbulb",
  "logomark",
  "moon",
  "note",
  "sun",
  "system",
  "warning",
] as const;

export type IconType = typeof iconNames[number];

export const Icon = memo(function Icon(
  props: {
    className?: string;
    noMask?: boolean;
    testId?: string;
  } & (
    | {
        name: IconType;
        path?: never;
      }
    | {
        name?: never;
        path: string;
      }
  )
) {
  return (
    <span
      className={clsx(
        styles.icon,
        "pointer-events-none flex",

        {
          "bg-current": !props.noMask,
          "no-mask": props.noMask,
        },

        props.className
      )}
      {...(props.testId && { "data-testid": props.testId })}
      role="icon"
      style={
        {
          "--image": `url("${props.path ?? `/icons/${props.name}.svg`}")`,
        } as CSSProperties
      }
    />
  );
});
