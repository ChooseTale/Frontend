"use client";
import { useState, useEffect, type ReactNode } from "react";
import TypingText, { type TypingTextProps } from "../../text/TypingText";

interface HtmlViewerProps
  extends Pick<TypingTextProps, "initialDelay" | "speed" | "hasTypingCursor"> {
  htmlContent: string;
}

export default function HtmlViewer({
  htmlContent,
  initialDelay = 0,
  ...props
}: HtmlViewerProps) {
  const [content, setContent] = useState<ReactNode[]>([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const elements = Array.from(doc.body.childNodes);

    const contentArray = elements
      .filter((node) => node.textContent !== "")
      .map((node, index) => {
        const textContent = node.textContent || "";

        return (
          <div key={`${node.nodeName}.${node.textContent?.slice(0, 10)}`}>
            <TypingText
              text={textContent}
              initialDelay={
                index === 0
                  ? initialDelay + Number(index) * 1
                  : initialDelay + 2.5 + Number(index) * 1
              }
              hasTypingCursor={Number(index) === 0}
              speed={props.speed}
            />
          </div>
        );
      });

    setContent(contentArray);
  }, [htmlContent, initialDelay, props.speed]);

  return <div className="html-viewer">{content}</div>;
}
