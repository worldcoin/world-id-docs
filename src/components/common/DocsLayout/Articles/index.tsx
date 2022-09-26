import clsx from "clsx";
import { useRouter } from "next/router";
import { Fragment, memo } from "react";
import { Button } from "../../Button";
import { docsNavigation } from "@/common/helpers";
import { ExpandItem } from "./ExpandItem";

export const Articles = memo(function Articles() {
  const router = useRouter();

  return (
    <aside className=" min-w-[300px] py-2 px-4 border-r border-000000/20  dark:border-ffffff/20">
      <div className="grid gap-y-2 content-start sticky top-20">
        {docsNavigation.map((item, id) => (
          <Fragment key={`doc-navigation-${id}`}>
            {item.label && (
              <Button
                className={clsx(
                  "font-medium px-2 py-0.5 rounded-md text-606770 dark:text-ffffff hover:bg-242526/10 dark:hover:bg-ffffff/20",
                  {
                    "bg-242526/10 dark:bg-ffffff/20 !text-4940e0 dark:!text-8c8cf2":
                      router.pathname === item.to,
                  }
                )}
                href={item.to}
              >
                {item.label}
              </Button>
            )}

            {item.name && <ExpandItem item={item} />}
          </Fragment>
        ))}
      </div>
    </aside>
  );
});
