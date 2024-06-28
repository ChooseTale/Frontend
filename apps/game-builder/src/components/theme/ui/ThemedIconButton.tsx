import { ButtonHTMLAttributes, ReactNode } from "react";

interface ComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function ThemedIconButton({
  children,
  className,
  ...props
}: ComponentProps) {
  return (
    <div className={`relative w-10 h-10 ${className}`}>
      <button className="w-full h-full min-w-0" {...props} />
      {children}
    </div>
  );
}
