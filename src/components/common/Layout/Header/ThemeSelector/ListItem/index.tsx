import { Icon, IconType } from "@/components/common/Icon";
import clsx from "clsx";
import { forwardRef } from "react";

export const ListItem = forwardRef<
  HTMLDivElement,
  {
    icon: IconType;
    name: string;
    active?: boolean;
    className?: string;
    onClick: () => void;
  }
>(function ListItem(props, ref) {
  return (
    <div
      ref={ref}
      onClick={props.onClick}
      className={clsx(
        "px-2 py-2 cursor-pointer hover:bg-4940e0/20 dark:text-ffffff grid gap-x-1 items-center grid-cols-auto/fr transition-colors",
        props.className,
        { "bg-4940e0/40": props.active }
      )}
    >
      <Icon name={props.icon} className="h-6 w-6" />
      <span>{props.name}</span>
    </div>
  );
});
