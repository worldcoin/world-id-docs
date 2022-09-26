import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import slugify from "@sindresorhus/slugify";
import clsx from "clsx";
import { memo, useCallback } from "react";

type Link = { label: string } & (
  | {
      to: string;
      href?: never;
    }
  | {
      href: string;
      to?: never;
    }
);

export const Section = memo(function Section(props: {
  className?: string;
  title: string;
  items: Array<Link>;
}) {
  const isExternal = useCallback((item: Link) => {
    if (item.href && !item.to) {
      return true;
    }

    return false;
  }, []);

  return (
    <div className={clsx("grid gap-y-4 content-start", props.className)}>
      <h4 className="font-bold font-18">{props.title}</h4>

      <div className="grid gap-y-3 justify-items-start">
        {props.items.map((item, id) => (
          <Button
            className="font-semibold grid grid-cols-fr/auto items-center gap-x-1 transition-colors hover:text-4940e0 hover:underline"
            key={`${slugify(item.label)}-${id}`}
            href={item.to || item.href || "/"}
            external={isExternal(item)}
          >
            <span>{item.label}</span>
            {isExternal(item) && <Icon name="external" className="w-3 h-3" />}
          </Button>
        ))}
      </div>
    </div>
  );
});
