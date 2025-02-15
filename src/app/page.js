"use client";
import { useState } from "react";

const initialData = [
  { driver: "Alexander", route: "CX283", van: "S1", quality: "Fantastic" },
  { driver: "Benjamin", route: "CX177", van: "M12", quality: "Great" },
  { driver: "Charlotte", route: "CX139", van: "L5", quality: "Fantastic" },
  { driver: "Daniel", route: "CX101", van: "XL8", quality: "Fantastic" },
  { driver: "Emily", route: "CX292", van: "S22", quality: "Great" },
];

export default function DriverAssignment() {
  const [data, setData] = useState(initialData);

  const updateAssignment = (index, key, value) => {
    const newData = [...data];
    newData[index][key] = value;
    setData(newData);
  };

  const generatePrediction = () => {
    const newData = data.map((item) => {
      return {
        ...item,
        route: item.route.includes("CX")
          ? item.route
          : `CX${Math.floor(Math.random() * 300) + 1}`, // Keep previous routes if available
        van:
          item.van ||
          ["S1", "M12", "L5", "XL8", "S22"][Math.floor(Math.random() * 5)], // Keep existing vans if possible
        quality:
          item.quality === "Fantastic"
            ? "Fantastic"
            : ["Good", "Great", "Fantastic"][Math.floor(Math.random() * 3)], // Reward high-performing drivers
      };
    });
    setData(newData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Driver Assignment
        </h1>
        <button
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
          onClick={generatePrediction}
        >
          Generate Prediction
        </button>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="border border-gray-400 p-3 text-left">Driver</th>
                <th className="border border-gray-400 p-3 text-left">Route</th>
                <th className="border border-gray-400 p-3 text-left">Van</th>
                <th className="border border-gray-400 p-3 text-left">
                  Quality
                </th>
                <th className="border border-gray-400 p-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="border border-gray-300 text-gray-800 bg-white hover:bg-gray-100"
                >
                  <td className="border border-gray-300 p-3">{item.driver}</td>
                  <td className="border border-gray-300 p-3">
                    <input
                      className="w-full p-2 border border-gray-400 rounded text-gray-800 bg-gray-100"
                      value={item.route}
                      onChange={(e) =>
                        updateAssignment(index, "route", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      className="w-full p-2 border border-gray-400 rounded text-gray-800 bg-gray-100"
                      value={item.van}
                      onChange={(e) =>
                        updateAssignment(index, "van", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      className="w-full p-2 border border-gray-400 rounded text-gray-800 bg-gray-100"
                      value={item.quality}
                      onChange={(e) =>
                        updateAssignment(index, "quality", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                      onClick={() => console.log("Saved!", item)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
