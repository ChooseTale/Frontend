"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { type Editor } from "@toast-ui/react-editor";
import { DynamicEditor } from "@/components/common/editor/DynamicEditor";

interface PageContentProps {
  initialValue: string;
  onChange: (content: string) => void;
}
interface EditorInstance {
  getHTML: () => string;
  setHTML: (html: string) => void;
}

export default function PageContentEditor({
  initialValue,
  onChange,
}: PageContentProps) {
  const ref = useRef<Editor>(null);

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
    <DynamicEditor
      forwardedRef={ref}
      initialValue={initialValue}
      onChange={handleChange}
      placeholder="페이지의 내용을 입력하세요"
      height="400px"
      initialEditType="wysiwyg"
      hideModeSwitch
      toolbarItems={[["heading", "bold", "italic", "strike", "hr", "quote"]]}
    />
  );
}