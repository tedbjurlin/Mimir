import { useEditorState } from "@handlewithcare/react-prosemirror";
import { Schema } from "prosemirror-model";
import { forwardRef, Ref, useRef } from "react";
import { type NodeViewComponentProps } from "@handlewithcare/react-prosemirror";

export const Link = forwardRef<
  HTMLAnchorElement | null,
  NodeViewComponentProps
>(function CodeBlock({ children, nodeProps, ...props }, outerRef) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  return (
    <a
      {...props}
      ref={(el) => {
        ref.current = el;
        if (!outerRef) {
          return;
        }
        if (typeof outerRef === "function") {
          outerRef(el);
        } else {
          outerRef.current = el;
        }
      }}
      style={{
        color: "blue",
      }}
      href=""
    >
      {children}
    </a>
  );
});
