import { useState, type ReactNode, type KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { type NewPage as NewPageType } from "@/interface/customType";
import NewPageModal from "./NewPageModal";

interface NewPageModalProps {
  handleNewPage: (newPageData: { content: string; isEnding: boolean }) => void;
  children: ReactNode;
  className?: string;
}

export default function NewPage({
  handleNewPage,
  children,
  className,
}: NewPageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const useFormProps = useForm<NewPageType>({
    defaultValues: {
      content: "",
      isEnding: false,
    },
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <>
      <div
        role="button"
        onClick={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className={`flex ${className}`}
        tabIndex={0}
      >
        {children}
      </div>

      <NewPageModal
        {...useFormProps}
        isOpen={isOpen}
        setOpen={setIsOpen}
        handleNewPage={handleNewPage}
      />
    </>
  );
}
