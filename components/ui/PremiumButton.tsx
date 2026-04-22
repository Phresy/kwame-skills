import React from "react";

type PremiumButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function PremiumButton({
  children,
  className = "",
  type = "button",
  onClick,
}: PremiumButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-8 py-3
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        text-white
        rounded-full
        font-semibold
        shadow-lg
        hover:shadow-xl
        hover:scale-[1.02]
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </button>
  );
}