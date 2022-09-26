import { Button } from "@/components/common/Button";
import { navItems } from "@/common/helpers";
import { Icon } from "@/components/common/Icon";
import slugify from "@sindresorhus/slugify";
import clsx from "clsx";
import { KeyboardEvent, memo, MouseEvent, useCallback } from "react";
import { NavLink } from "./NavLink";

export const NavBar = memo(function NavBar(props: {
  isOpened: boolean;
  setIsOpened: (state: boolean) => void;
}) {
  const close = useCallback(() => props.setIsOpened(false), [props]);

  const closeOnEscClick = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) =>
      event.key === "Esc" ? close() : null,
    [close]
  );

  const closeOnOverlayClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.currentTarget !== event.target) {
        return;
      }

      close();
    },
    [close]
  );

  return (
    <div
      className={clsx(
        "fixed bg-000000/70 w-full h-screen z-10 transition-visibility/opacity",
        {
          "invisible opacity-0 pointer-events-none": !props.isOpened,
        }
      )}
      onClick={closeOnOverlayClick}
    >
      <div
        className={clsx(
          "w-full sm:w-1/3 bg-ffffff relative dark:bg-242526 h-full shadow-md transition-all",
          { "-left-full": !props.isOpened },
          { "left-0": props.isOpened }
        )}
      >
        <div className="grid grid-flow-col justify-between px-4 py-2 border-b border-303846/20">
          <Button
            href="/"
            className="grid grid-cols-auto/fr items-center gap-x-2"
          >
            <Icon
              name="logomark"
              className="h-8 w-8 text-000000 dark:text-ffffff"
              noMask
            />
            <span className="font-bold transition group-hover:text-4940e0">
              World ID
            </span>
          </Button>

          <Button onClick={() => props.setIsOpened(false)}>
            <Icon
              name="close"
              className="w-5 h-5 text-000000 dark:text-ffffff"
            />
          </Button>
        </div>

        <nav className="grid gap-y-2 p-2">
          {navItems.primary.map((item, id) => (
            <NavLink
              key={`${slugify(item.label)}-${id}`}
              label={item.label}
              href={item.href}
              external={item.external}
            />
          ))}

          {navItems.secondary.map((item, id) => (
            <NavLink
              key={`${slugify(item.label)}-${id}`}
              label={item.label}
              href={item.href}
              external={item.external}
            />
          ))}
        </nav>
      </div>
    </div>
  );
});
