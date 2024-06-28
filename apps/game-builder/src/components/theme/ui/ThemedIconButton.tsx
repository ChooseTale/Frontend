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
    <div className={`relative ${className}`}>
      <button className="absolute w-full h-full min-w-0 left-0" {...props} />
      <div className="relative p-1 pointer-events-none">{children}</div>
    </div>
  );
}
