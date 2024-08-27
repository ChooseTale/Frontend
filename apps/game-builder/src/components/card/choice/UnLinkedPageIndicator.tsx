import { Link1Icon } from "@radix-ui/react-icons";

export default function UnLinkedPageIndicator() {
  return (
    <button
      className="w-full absolute -bottom-1 translate-y-full rounded-lg shadow-sm border border-red-400 text-card-foreground cursor-auto"
      type="button"
    >
      <div className="flex items-center px-2 py-1">
        <Link1Icon className="shrink-0 h-4 w-4" color="#ef4444" />
        <p className="px-1 text-xs text-red-400 overflow-hidden whitespace-nowrap overflow-ellipsis">
          연결되지 않은 페이지
        </p>
      </div>
    </button>
  );
}
