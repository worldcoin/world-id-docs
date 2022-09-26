import { Button } from "@/components/common/Button";
import { NavItem } from "@/common/helpers";
import { Icon } from "@/components/common/Icon";
import clsx from "clsx";
import { useRouter } from "next/router";
import { memo } from "react";

export const NavLink = memo(function NavLink(props: NavItem) {
  const router = useRouter();

  return (
    <Button
      href={props.href}
      className={clsx(
        "px-3 flex gap-x-2 items-center text-242526/80 dark:text-ffffff/80 hover:bg-4940e0/40 dark:hover:bg-4940e0/40 rounded-sm font-semibold transition-colors",
        { "bg-4940e0/60": router.pathname === props.href }
      )}
      external={props.external}
    >
      <span>{props.label}</span>
      {props.external && <Icon name="external" className="h-3 w-3" />}
    </Button>
  );
});
