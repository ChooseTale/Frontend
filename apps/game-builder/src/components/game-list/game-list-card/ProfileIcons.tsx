export default function ProfileIcons({
  profileIcons,
}: {
  profileIcons: string[];
}) {
  return (
    <div>
      <ul className="flex mr-2">
        {profileIcons.slice(0, 3).map((icon) => (
          <li key={icon} className="w-2">
            <div className="bg-gray-200 w-4 h-4 rounded-full">{icon}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
