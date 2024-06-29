import { useThemeStore } from "@/store/useTheme";
import { Switch } from "@repo/ui/components/ui/Switch.tsx";

interface SwitchProps {
  name: string;
  checked: boolean;
  onCheckedChange: () => void;
}

export default function ThemedSwitch({
  name,
  checked,
  onCheckedChange,
}: SwitchProps) {
  const { theme } = useThemeStore((state) => state);

  if (theme === "windows-98") {
    return (
      <>
        <div>
          <input type="radio" id={`${name}-yes`} name={name} />
          <label htmlFor={`${name}-yes`}>네</label>
        </div>

        <div>
          <input type="radio" id={`${name}-no`} name={name} />
          <label htmlFor={`${name}-no`}>아니오</label>
        </div>
      </>
    );
  }

  if (theme === "old-game") {
    return (
      <>
        <label className="text-sm font-bold mb-0">
          <input
            type="radio"
            className="nes-radio"
            name={name}
            defaultChecked={checked}
          />
          <span>네</span>
        </label>

        <label className="text-sm font-bold mb-0">
          <input
            type="radio"
            className="nes-radio"
            name={name}
            defaultChecked={!checked}
          />
          <span>아니오</span>
        </label>
      </>
    );
  }

  return (
    <Switch
      id={name}
      name={name}
      checked={checked}
      onCheckedChange={onCheckedChange}
    />
  );
}
