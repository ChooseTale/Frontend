import { type ForwardedRef } from "react";
import {
  Editor as ToastUiEditor,
  type EditorProps as ToastUiEditorProps,
} from "@toast-ui/react-editor";
// eslint-disable-next-line import/no-unresolved -- @toast-ui/editor/dist/toastui-editor.css is correctly imported but ESLint can't resolve it
import "@toast-ui/editor/dist/toastui-editor.css";

interface CustomEditorProps extends ToastUiEditorProps {
  forwardedRef: ForwardedRef<ToastUiEditor>;
  onChange?: (content: string) => void; // onChange expecting a string as content
}

export default function Editor({
  forwardedRef,
  onChange,
  ...props
}: CustomEditorProps) {
  const getWysiwygContent = () => {
    if (forwardedRef && typeof forwardedRef !== "function") {
      const editorInstance = forwardedRef.current;
      if (editorInstance) {
        const instance = editorInstance.getInstance() as {
          getHTML: () => string;
        };
        const wysiwygContent = instance.getHTML();
        return wysiwygContent;
      }
    }
    return "";
  };

  const handleOnChange = () => {
    const content = getWysiwygContent();
    const cleanedContent = content.trim() === "<p></p>" ? "" : content;
    onChange && onChange(cleanedContent);
  };

  return (
    <ToastUiEditor {...props} onChange={handleOnChange} ref={forwardedRef} />
  );
}
