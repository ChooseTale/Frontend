import { forwardRef } from "react";
import { useThemeStore } from "@/store/useTheme";
import { Input, InputProps } from "@repo/ui/components/ui/Input.tsx";
import ThemedLabel from "./ThemedLabel";
import FieldErrorMessage from "@/components/common/form/FieldErrorMessage";

interface ThemedInputFieldProps extends InputProps {
  labelText: string;
  className?: string;
  errMsg?: string;
}

const ThemedInputField = forwardRef<HTMLInputElement, ThemedInputFieldProps>(
  ({ labelText, className, errMsg, ...props }, ref) => {
    const { theme } = useThemeStore((state) => state);
    let themeClass;

    switch (theme) {
      case "old-game":
        themeClass = "nes-input";
        break;
      case "windows-98":
        themeClass = "rounded-none";
        break;
      default:
    }

    return (
      <div className="flex flex-col gap-2">
        <ThemedLabel htmlFor={props.name} labelText={labelText} />
        <Input
          ref={ref}
          className={`${className} ${themeClass} bg-white ${errMsg ? "border-red-500" : ""}`}
          {...props}
        />
        {errMsg && <FieldErrorMessage message={errMsg} />}
      </div>
    );
  }
);

ThemedInputField.displayName = "ThemedInputField";

export default ThemedInputField;
