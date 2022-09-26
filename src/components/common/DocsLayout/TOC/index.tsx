import { useSpySection } from "@/common/hooks";
import { TOC as TOCType } from "@/types";
import slugify from "@sindresorhus/slugify";
import clsx from "clsx";
import { memo, MutableRefObject, useCallback, useMemo } from "react";
import { Button } from "../../Button";
import { scroller } from "react-scroll";

const commonStyles = {
  button: "font-medium text-14",
  selected: "text-4940e0 dark:text-8c8cf2",
};

export const TOC = memo(function TOC(props: {
  items: TOCType;
  docContainer: HTMLDivElement | null;
}) {
  const headings = useMemo(() => {
    if (!props.docContainer) {
      return null;
    }

    return Array.from(props.docContainer.children).filter(
      (heading) => heading.localName === "h2" || heading.localName === "h3"
    );
  }, [props.docContainer]);

  const { currentSection } = useSpySection({
    container: props.docContainer,
    initialSection: props.items[0].id,
    referenceElements: headings,
  });

  const scrollTo = useCallback((elementId: string) => {
    scroller.scrollTo(elementId, { duration: 150, smooth: "easeOutCubic" });
  }, []);

  const isSelected = useCallback(
    (id: string) => id === currentSection,
    [currentSection]
  );

  return (
    <aside className="pt-4">
      <div
        className={clsx(
          "sticky top-24 border-l border-dadde1 dark:border-444950 pl-4 pb-4 min-w-[200px]",
          "grid gap-y-4"
        )}
      >
        {props.items.map((heading, id) => (
          <div
            className="grid content-start justify-items-start gap-y-4"
            key={`${slugify(heading.title)}-${id}`}
          >
            <Button
              className={clsx(commonStyles.button, {
                [commonStyles.selected]: isSelected(heading.id),
              })}
              onClick={() => scrollTo(heading.id)}
            >
              {heading.title}
            </Button>

            {heading.children && heading.children.length > 0 && (
              <div className="grid justify-items-start gap-y-2 pl-4">
                {heading.children.map((subheading, id) => (
                  <Button
                    onClick={() => scrollTo(subheading.id)}
                    key={`${slugify(subheading.title)}-${id}`}
                    className={clsx(commonStyles.button, {
                      [commonStyles.selected]: isSelected(subheading.id),
                    })}
                  >
                    {subheading.title}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
});
