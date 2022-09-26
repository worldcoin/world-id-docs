import slugify from "@sindresorhus/slugify";
import clsx from "clsx";
import { memo } from "react";
import { Section } from "./Section";

export const Footer = memo(function Footer(props: { className?: string }) {
  const footer = [
    {
      title: "Docs",
      items: [
        {
          label: "Introduction",
          to: "/docs",
        },
        {
          label: "Quick Start",
          to: "/docs/quick-start",
        },
        {
          label: "Javascript Integration",
          to: "/docs/js",
        },
        {
          label: "Examples",
          to: "/examples",
        },
      ],
    },
    {
      title: "Community",
      items: [
        {
          label: "Discord",
          href: "https://discord.gg/worldcoin",
        },
        {
          label: "Twitter",
          href: "https://twitter.com/worldcoin",
        },
        {
          label: "Hackathons",
          to: "/docs/hackathons",
        },
      ],
    },
    {
      title: "More",
      items: [
        {
          label: "GitHub",
          href: "https://github.com/worldcoin",
        },
        {
          label: "Worldcoin",
          href: "https://worldcoin.org",
        },
      ],
    },
  ];

  return (
    <footer
      className={clsx(
        "p-8 text-ffffff bg-303846 xl:px-[calc((100vw-1200px)/2)] grid gap-y-4",
        props.className
      )}
    >
      <div className="grid md:grid-flow-col justify-between gap-x-32 gap-y-10 max-w-4xl">
        {footer.map((section, id) => (
          <Section
            key={`${slugify(section.title)}-${id}`}
            title={section.title}
            items={section.items}
          />
        ))}
      </div>

      <span className="text-center text-18 font-semibold">{`Copyright © ${new Date().getFullYear()} Tools for Humanity Corporation.`}</span>
    </footer>
  );
});
