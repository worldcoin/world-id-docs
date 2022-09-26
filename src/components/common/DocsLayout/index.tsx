import { TOC as TOCType } from "@/types";

import {
  JSXElementConstructor,
  memo,
  ReactElement,
  useEffect,
  useState,
} from "react";

import { Articles } from "./Articles";
import { TOC } from "./TOC";
import { renderToString } from "react-dom/server";
import { collectHeadings } from "@/common/helpers";

export const DocsLayout = memo(function DocsLayout(props: {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  title: string;
}) {
  const [docContainer, setDocContainer] = useState<HTMLDivElement | null>(null);
  const [key, setKey] = useState<number>(0);

  // @NOTE To make TOC updating correctly, updating key to force update children container ref
  useEffect(() => setKey(Math.random()), [props.children]);
  const contentString = renderToString(props.children);
  const headings = collectHeadings(contentString);

  return (
    <div className="grid grid-cols-auto/fr max-w-screen ">
      <Articles />

      <div className="grid grid-cols-fr/auto px-4 lg:px-8 2xl:px-[calc((100vw-1440px)/2)]">
        <div className="p-10 grid gap-y-6">
          <h1 className="text-48 font-bold">{props.title}</h1>

          <div
            key={key}
            ref={(ref) => setDocContainer(ref)}
            id="docs-container"
            className="grid gap-y-5"
          >
            {props.children}
          </div>
        </div>

        <TOC key={props.title} items={headings} docContainer={docContainer} />
      </div>
    </div>
  );
});
