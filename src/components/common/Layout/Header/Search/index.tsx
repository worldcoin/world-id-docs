import { Button } from "@/components/common/Button";
import { DocSearchModal, useDocSearchKeyboardEvents } from "@docsearch/react";
import Link from "next/link";
import Router from "next/router";
import { ReactNode, SVGProps, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const docSearchConfig = {
  appId: process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID as string,
  apiKey: process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY as string,
  indexName: process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME as string,
};

type HitComponent = Exclude<
  Parameters<typeof DocSearchModal>[0]["hitComponent"],
  undefined
>;

function Hit(props: {
  hit: Parameters<HitComponent>[0]["hit"];
  children: ReactNode;
}) {
  return <Link href={props.hit?.url}>{props.children}</Link>;
}

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" {...props}>
      <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z" />
    </svg>
  );
}

export function Search() {
  let [isOpen, setIsOpen] = useState(false);
  let [modifierKey, setModifierKey] = useState("");

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useDocSearchKeyboardEvents({ isOpen, onOpen, onClose });

  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "⌘" : "Ctrl"
    );
  }, []);

  return (
    <>
      <Button
        type="button"
        className="group transition-colors bg-[#ebedf0] flex px-1 md:px-3 py-1 rounded-full gap-x-3 items-center border-2 border-transparent hover:border-4940e0"
        onClick={onOpen}
      >
        <SearchIcon className="h-5 w-5 flex-none fill-000000" />
        <span className="text-[#969faf] hidden md:inline transition-colors group-hover:text-000000">
          Search
        </span>

        {modifierKey && (
          <kbd className="ml-auto hidden font-medium text-slate-400 dark:text-slate-500 md:block">
            <kbd className="font-sans">{modifierKey}</kbd>
            <kbd className="font-sans">+K</kbd>
          </kbd>
        )}
      </Button>
      {isOpen &&
        createPortal(
          <DocSearchModal
            {...docSearchConfig}
            initialScrollY={window.scrollY}
            onClose={onClose}
            hitComponent={Hit}
            navigator={{
              navigate({ itemUrl }) {
                Router.push(itemUrl);
              },
            }}
          />,
          document.body
        )}
    </>
  );
}
