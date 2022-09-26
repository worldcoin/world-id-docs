import slugify from "@sindresorhus/slugify";
import Image from "next/image";
import { memo } from "react";

export const Card = memo(function Card(props: {
  image?: string;
  heading: string;
  description: string;
}) {
  return (
    <div className="grid gap-y-4 justify-items-center">
      {props.image && (
        <Image
          src={props.image}
          layout="fixed"
          width={160}
          height={160}
          alt={slugify(props.heading)}
        />
      )}

      <h3 className="text-20 font-bold">{props.heading}</h3>

      <p className="text-14 font-mono text-center text-7a8a95 dark:text-c6cdd2">
        {props.description}
      </p>
    </div>
  );
});
