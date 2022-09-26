import { Button } from "@/components/common/Button";
import { NavItem } from "@/common/helpers";
import { Icon } from "@/components/common/Icon";
import clsx from "clsx";
import { memo } from "react";

export const NavLink = memo(function NavLink(props: NavItem) {
  return (
    <Button
      className={clsx(
        "hidden lg:flex gap-x-1 items-center",
        "font-medium hover:text-4940e0 transition-colors"
      )}
      href={props.href}
      external={props.external}
    >
      <span>{props.label}</span>
      {props.external && <Icon name="external" className="h-3 w-3" />}
    </Button>
  );
});
