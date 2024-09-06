"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { type EditorProps, type Editor } from "@toast-ui/react-editor";
import { DynamicEditor } from "@/components/common/editor/DynamicEditor";
import FieldErrorMessage from "../form/FieldErrorMessage";

interface PageContentProps extends EditorProps {
  initialValue: string;
  onChange: (content: string) => void;
  errMsg?: string;
}
interface EditorInstance {
  getHTML: () => string;
  setHTML: (html: string) => void;
}

export default function PageContentEditor({
  initialValue,
  onChange,
  errMsg,
  height: heightProp,
  ...props
}: PageContentProps) {
  const ref = useRef<Editor>(null);
  const height = heightProp ? heightProp : "40vh";

  useEffect(() => {
    if (!ref.current) return;
    const instance = ref.current.getInstance() as EditorInstance;
    if (typeof instance.setHTML === "function") {
      instance.setHTML(initialValue);
    } else {
      throw new Error("Editor instance does not have setHTML method");
    }
  }, [initialValue]);

  const handleChange = useCallback(() => {
    if (!ref.current) return;
    const instance = ref.current.getInstance() as EditorInstance;
    if (typeof instance.getHTML === "function") {
      onChange(instance.getHTML());
    } else {
      throw new Error("Editor instance does not have setHTML method");
    }
  }, [onChange]);

  return (
    <div id="editor">
      <div
        className={`bg-gray-100 ${errMsg && "border rounded-sm border-red-500"}`}
        style={{ minHeight: height }}
      >
        <DynamicEditor
          forwardedRef={ref}
          initialValue={initialValue}
          onChange={handleChange}
          placeholder="페이지의 내용을 입력하세요"
          height={height}
          initialEditType="wysiwyg"
          hideModeSwitch
          toolbarItems={[
            ["heading", "bold", "italic", "strike", "hr", "quote"],
          ]}
          {...props}
        />
      </div>
      <div className="flex justify-end mt-2">
        {errMsg && <FieldErrorMessage message={errMsg} />}
      </div>
    </div>
  );
}
