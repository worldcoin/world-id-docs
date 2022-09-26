import { Button } from "@/components/common/Button";
import { navItems } from "@/common/helpers";
import { Icon } from "@/components/common/Icon";
import slugify from "@sindresorhus/slugify";
import { memo } from "react";
import { NavLink } from "./NavItem";
import { Search } from "./Search";
import { ThemeSelector } from "./ThemeSelector";

export const Header = memo(function Header(props: {
  isNavBarOpened: boolean;
  setIsNavBarOpened: (state: boolean) => void;
}) {
  return (
    <header className="sticky top-0 bg-ffffff z-10 grid grid-flow-col justify-between shadow-sm py-4 px-4 dark:bg-242526">
      <div className="grid grid-flow-col gap-x-6 items-center">
        <Button
          onClick={() => props.setIsNavBarOpened(true)}
          className="flex lg:hidden"
        >
          <Icon name="burger" className="h-8 w-8" />
        </Button>

        <Button
          href="/"
          className="grid grid-cols-auto/fr items-center gap-x-2"
        >
          <Icon name="logomark" className="h-8 w-8" noMask />
          <span className="font-bold transition group-hover:text-4940e0">
            World ID
          </span>
        </Button>

        <div className="hidden lg:grid grid-flow-col gap-x-4">
          {navItems.primary.map((item, id) => (
            <NavLink
              key={`${slugify(item.label)}-${id}`}
              href={item.href}
              external={item.external}
              label={item.label}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-flow-col gap-x-6 items-center">
        {navItems.secondary.map((item, id) => (
          <NavLink
            key={`${slugify(item.label)}-${id}`}
            href={item.href}
            external={item.external}
            label={item.label}
          />
        ))}

        <ThemeSelector />
        <Search />
      </div>
    </header>
  );
});
