import React from "react";

interface StatCardProps {
  number: string;
  label: string;
  icon: React.ReactNode;
}

export default function StatCard({
  number,
  label,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition">
      <div className="text-3xl mb-2 text-blue-600 flex justify-center">
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {number}
      </div>
      <div className="text-gray-600">
        {label}
      </div>
    </div>
  );
}