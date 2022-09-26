import { memo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Section } from "@/common/helpers";
import { Icon } from "@/components/common/Icon";
import slugify from "@sindresorhus/slugify";
import clsx from "clsx";
import { useRouter } from "next/router";

export const ExpandItem = memo(function ExpandItem(props: { item: Section }) {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={() => setOpened(!opened)}
        className={clsx(
          "flex outline-none justify-between text-606770 dark:text-ffffff items-center rounded-md w-full hover:bg-242526/10 dark:hover:bg-ffffff/20 px-2 py-0.5",
          {
            "bg-242526/10 dark:bg-ffffff/20 !text-4940e0 dark:text-8c8cf2":
              props.item.children.some(
                (article) => article.to === router.pathname
              ),
          }
        )}
      >
        <span className="font-medium">{props.item.name}</span>

        <Icon
          name="angle-down"
          className={clsx("w-4 h-4", { "-rotate-90": !opened })}
        />
      </Button>

      <div
        className={clsx("grid gap-y-2 pl-4", {
          "h-0 opacity-0 invisible pointer-events-none": !opened,
        })}
      >
        {props.item.children.map((article) => (
          <Button
            className={clsx(
              "first:mt-2 rounded-md text-606770 dark:text-ffffff font-medium px-2 py-0.5",
              {
                "bg-242526/10 dark:bg-ffffff/20 !text-4940e0 dark:text-8c8cf2":
                  article.to === router.pathname,
              }
            )}
            href={article.to}
            key={`${slugify(article.label)}`}
          >
            {article.label}
          </Button>
        ))}
      </div>
    </div>
  );
});
