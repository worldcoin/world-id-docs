import { Icon, IconType } from "@/components/common/Icon";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import {
  Fragment,
  memo,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ListItem } from "./ListItem";

export const ThemeSelector = memo(function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // @NOTE https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  useEffect(() => setMounted(true), []);

  const icon = useMemo((): IconType => {
    if (theme === "light") {
      return "sun";
    }

    if (theme === "dark") {
      return "moon";
    }

    return "system";
  }, [theme]);

  return (
    <div className="relative grid items-center">
      {mounted && (
        <Menu>
          <Menu.Button className="relative">
            <Icon name={icon} className="w-6 h-6" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={clsx(
                "absolute top-6 right-0 mt-2 origin-top-right grid divide-y divide-303846/20 dark:divide-ffffff/10",
                "rounded-md bg-ffffff dark:bg-303846 shadow-lg ring-1 ring-303846 ring-opacity-5 focus:outline-none overflow-hidden"
              )}
            >
              <Menu.Item>
                {() => (
                  <ListItem
                    onClick={() => setTheme("light")}
                    name="Light"
                    icon="sun"
                    active={theme === "light"}
                  />
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <ListItem
                    onClick={() => setTheme("dark")}
                    name="Dark"
                    icon="moon"
                    active={theme === "dark"}
                  />
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <ListItem
                    onClick={() => setTheme("system")}
                    name="System"
                    icon="system"
                    active={theme === "system"}
                  />
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
});
