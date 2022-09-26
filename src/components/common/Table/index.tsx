import clsx from "clsx";
import { memo, ReactNode } from "react";

export const Table = memo(function Table(props: { children: ReactNode }) {
  return <table>{props.children}</table>;
});

export const Td = memo(function Td(props: {
  children: ReactNode;
  withBackground?: boolean;
}) {
  return (
    <td
      className={clsx("border border-dadde1 dark:border-ffffff/20 p-4", {
        "bg-f7f7f7 dark:bg-2b2b2d": props.withBackground,
      })}
    >
      {props.children}
    </td>
  );
});
