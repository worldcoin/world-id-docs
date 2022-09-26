import clsx from "clsx";
import Link from "next/link";
import { ComponentProps, memo, ReactNode } from "react";

export const Button = memo(function Button(
  props: {
    className?: string;
    children: ReactNode;
  } & (
    | ({
        onClick: Exclude<ComponentProps<"button">["onClick"], undefined>;
        href?: never;
      } & ComponentProps<"button">)
    | {
        onClick?: never;
        href: string;
        external?: boolean;
      }
  )
) {
  if (!props.onClick && props.href && props.external) {
    return (
      <a href={props.href} className={clsx(props.className)}>
        {props.children}
      </a>
    );
  }

  if (!props.onClick && props.href && !props.external) {
    return (
      <Link href={props.href}>
        <a className={clsx(props.className)}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button {...props} className={clsx(props.className)}>
      {props.children}
    </button>
  );
});
