import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { camelCase } from "lodash-es";

export function GET() {
  const iconDirectory = path.join(process.cwd(), "src/asset/icons");
  const iconFiles = fs
    .readdirSync(iconDirectory)
    .filter((file) => /\.(svg|png)$/.test(file));

  const icons: Record<string, string> = {};

  iconFiles.forEach((filepath) => {
    const iconName = path.basename(filepath, path.extname(filepath));
    const camelCaseName = `${camelCase(iconName)}Icon`;
    icons[camelCaseName] = `/asset/icons/${filepath}`;
  });

  fs.writeFileSync(
    path.join(process.cwd(), "src/asset/icons/generated-icons.json"),
    JSON.stringify(icons, null, 2)
  );

  return NextResponse.json(icons);
}
