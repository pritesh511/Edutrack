// pages/standards.js
import React from "react";

const standards = [
  {
    id: 1,
    standard: "Std 1",
    description: "Basic foundation for young learners.",
  },
  {
    id: 2,
    standard: "Std 2",
    description: "Introduction to fundamental concepts.",
  },
  {
    id: 3,
    standard: "Std 3",
    description: "Building on foundational knowledge.",
  },
];

export default function ClassesTabView() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Standards</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
            onClick={() => alert("Add Standard Button Clicked")}
          >
            + Add Standard
          </button>
        </div>

        {/* Standards List */}
        <div className="space-y-4">
          {standards.map((std) => (
            <div
              key={std.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {std.standard}
              </h2>
              <p className="text-gray-600">{std.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
