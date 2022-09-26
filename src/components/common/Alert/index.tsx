import clsx from "clsx";
import { memo, ReactNode, useMemo } from "react";
import { Icon, IconType } from "../Icon";

export const Alert = memo(function Alert(props: {
  children: ReactNode;
  icon?: IconType;
  heading?: string;
  type: "caution" | "note" | "tip" | "info";
}) {
  const theme: Record<typeof props.type, string> = {
    caution:
      "bg-fff8e6 dark:bg-4d3800 border-e6a700 text-4d3800 dark:text-fdfdfe",
    note: "bg-fdfdfe dark:bg-474748 border-d4d5d8 text-474748 dark:text-fdfdfe",
    tip: "bg-e6f6e6 dark:bg-003100 border-009400 text-003100 dark:text-e6f6e6",
    info: "bg-eef9fd dark:bg-193c47 text-193c47 dark:text-eef9fd border-4cb3d4",
  };

  const heading = useMemo(() => {
    if (props.heading) {
      return props.heading;
    }

    if (!props.heading && props.type === "caution") {
      return "Caution";
    }

    if (!props.heading && props.type === "note") {
      return "Note";
    }

    if (!props.heading && props.type === "tip") {
      return "Tip";
    }

    if (!props.heading && props.type === "info") {
      return "Info";
    }
  }, [props.heading, props.type]);

  const icon: IconType = useMemo(() => {
    if (props.icon) {
      return props.icon;
    }

    if (!props.icon && props.type === "caution") {
      return "warning";
    }

    if (!props.icon && props.type === "note") {
      return "note";
    }

    if (!props.icon && props.type === "tip") {
      return "lightbulb";
    }

    if (!props.icon && props.type === "info") {
      return "info";
    }

    return "note";
  }, [props.icon, props.type]);

  return (
    <div
      className={clsx(
        "rounded-md border-l-4 p-4 grid gap-y-4 shadow",
        theme[props.type]
      )}
    >
      <div className="grid grid-cols-auto/fr gap-x-2 items-center">
        <Icon name={icon} className="h-6 w-6" />

        <span className="text-14 font-bold uppercase">{heading}</span>
      </div>

      <span className="font-medium">{props.children}</span>
    </div>
  );
});
