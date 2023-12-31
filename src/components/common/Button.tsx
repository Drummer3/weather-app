import { clsx } from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "blue" | "purple";
  label?: string;
}

const buttonDefaultStyle =
  "rounded-md p-2 duration-75 focus:outline-none focus:ring";

const buttonColors = {
  blue: "bg-blue-500 text-white hover:bg-blue-600 focus:border-blue-300",
  purple:
    "bg-purple-500 text-white hover:bg-purple-600 focus:border-purple-300",
};

export default function Button({
  color,
  className,
  label,
  children,
  ...props
}: ButtonProps) {
  const colorClasses = buttonColors[color];

  return (
    <button
      className={clsx(buttonDefaultStyle, colorClasses, className)}
      {...props}
    >
      {label || children}
    </button>
  );
}
