import clsx from "clsx";
import { memo, ReactNode, useMemo } from "react";
import { Icon, IconType } from "../Icon";

export const Alert = memo(function Alert(props: {
  children: ReactNode;
  icon: IconType;
  heading: string;
  type: "caution" | "note";
}) {
  const theme: Record<typeof props.type, string> = {
    caution:
      "bg-fff8e6 dark:bg-4d3800 border-e6a700 text-4d3800 dark:text-fdfdfe",
    note: "bg-fdfdfe dark:bg-474748 border-d4d5d8 text-474748 dark:text-fdfdfe",
  };

  return (
    <div
      className={clsx(
        "rounded-md border-l-4 p-4 grid gap-y-4 shadow",
        theme[props.type]
      )}
    >
      <div className="grid grid-cols-auto/fr gap-x-2 items-center">
        <Icon name={props.icon} className="h-6 w-6" />

        <span className="text-14 font-bold uppercase">{props.heading}</span>
      </div>

      <span className="font-medium">{props.children}</span>
    </div>
  );
});
