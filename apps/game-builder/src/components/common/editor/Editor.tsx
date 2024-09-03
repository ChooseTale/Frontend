import { type ForwardedRef } from "react";
import {
  Editor as ToastUiEditor,
  type EditorProps,
} from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

interface ToastUiEditorProps {
  forwardedRef: ForwardedRef<ToastUiEditor>;
}

export default function Editor(props: EditorProps & ToastUiEditorProps) {
  return <ToastUiEditor {...props} ref={props.forwardedRef} />;
}
