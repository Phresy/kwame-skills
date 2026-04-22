"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  placeholder?: string;
};

export default function SearchBar({
  placeholder = "Search for plumbers, electricians, hairdressers...",
}: SearchBarProps) {
  return (
    <div className="relative mb-8">
      <input
        type="text"
        placeholder={placeholder}
        className="
          w-full
          px-6
          py-4
          pl-14
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <Search
        className="
          absolute
          left-5
          top-1/2
          transform
          -translate-y-1/2
          text-gray-400
        "
      />

      <button
        className="
          absolute
          right-2
          top-1/2
          transform
          -translate-y-1/2
          bg-gradient-to-r
          from-blue-600
          to-purple-600
          text-white
          px-6
          py-2
          rounded-xl
          font-medium
          hover:shadow-lg
          transition
        "
      >
        Search
      </button>
    </div>
  );
}