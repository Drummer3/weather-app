import clsx from "clsx";

interface WeatherInfoTileProps {
  title: string;
  value: string;
  className?: string;
}

export default function WeatherInfoTile({
  title,
  value,
  className,
}: WeatherInfoTileProps) {
  return (
    <div
      className={clsx("rounded-md bg-gray-200 p-4 dark:bg-gray-600", className)}
    >
      <p className="font-semibold text-gray-800 dark:text-white">{title}</p>
      <p className="text-gray-600 dark:text-gray-300">{value}</p>
    </div>
  );
}
