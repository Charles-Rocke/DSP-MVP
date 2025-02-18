"use client";
import { useState, useEffect, useRef } from "react";

export default function DriverPlannerDemo() {
  const [step, setStep] = useState(1);
  const [routes, setRoutes] = useState({
    nursery: "",
    "Rivian Medium": "",
    XL: "",
    cdv14: "",
    cdv16: "",
    stv: "",
  });
  const [assignments, setAssignments] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    if (step === 2) {
      // Define AI-generated assignments inside useEffect
      const fakeAssignments = [
        { serviceType: "Nursery", driver: "Rashad", van: "S-1" },
        { serviceType: "Rivian Medium", driver: "Ozier P", van: "EDV1" },
        { serviceType: "Extra Large Van", driver: "Stoyan K", van: "1" },
        {
          serviceType: "Custom Delivery Van 14ft",
          driver: "Mariama K",
          van: "CDV 14",
        },
        {
          serviceType: "Custom Delivery Van 16ft",
          driver: "Luis B",
          van: "CDV 16",
        },
        { serviceType: "Step Van", driver: "Jeremy T", van: "DOT 1" },
      ];

      setTimeout(() => {
        setAssignments(fakeAssignments);
        setStep(3); // Move to success + editable plan screen
      }, 3000); // Simulate AI processing time
    }
  }, [step]);

  // Function to reset the form & go back to Step 1
  const resetForm = () => {
    setRoutes({
      nursery: "",
      medium: "",
      xl: "",
      cdv14: "",
      cdv16: "",
      stv: "",
    });
    setAssignments([]);
    setStep(1);
  };

  // Function to handle edits in the table
  const updateAssignment = (index, field, value) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index][field] = value;
    setAssignments(updatedAssignments);
  };

  // Function to copy table as plain text (ensures black text in Google Sheets)
  const copyTableToClipboard = () => {
    let textToCopy = "Driver\tVan\tService Type\n"; // Tab-separated for Google Sheets
    assignments.forEach(({ driver, van, serviceType }) => {
      textToCopy += `${driver}\t${van}\t${serviceType}\n`;
    });

    // Copy to clipboard as plain text
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Copied to clipboard! Paste into Google Sheets.");
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        {/* Screen 1: Enter Number of Routes */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-black">
              Enter Number of Routes
            </h1>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {Object.keys(routes).map((routeType) => (
                <div key={routeType}>
                  <label className="block text-black capitalize">
                    {routeType.replace("cdv", "CDV ")} Routes:
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-400 rounded text-black"
                    value={routes[routeType]}
                    onChange={(e) =>
                      setRoutes({ ...routes, [routeType]: e.target.value })
                    }
                  />
                </div>
              ))}
            </div>
            <button
              className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              onClick={() => setStep(2)}
            >
              Create Plan
            </button>
          </div>
        )}

        {/* Screen 2: Generating Plan (Wait for 3 seconds, then go to next step) */}
        {step === 2 && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-black">
              Generating Plan...
            </h1>
            <p className="text-gray-600">AI is calculating best matches.</p>
          </div>
        )}

        {/* Screen 3: Success + Editable Google Sheets-like Table */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-black text-center">
              ✅ Success! Plan Created.
            </h1>
            <p className="text-gray-600 mb-4 text-center">
              AI-generated driver assignments are ready. You can edit them
              before copying.
            </p>

            <h2 className="text-xl font-semibold mb-3 text-black">
              Copy & Paste into Google Sheets (Editable)
            </h2>

            <button
              className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              onClick={copyTableToClipboard}
            >
              Copy Table
            </button>

            {/* Editable Google Sheets-like table */}
            <div className="overflow-x-auto">
              <table
                ref={tableRef}
                className="w-full border-collapse border border-gray-400 text-left bg-white"
              >
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-400 text-black p-2">
                      Driver
                    </th>
                    <th className="border border-gray-400 text-black p-2">
                      Van
                    </th>
                    <th className="border border-gray-400 text-black p-2">
                      Service Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assign, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-100">
                      <td
                        className="border border-gray-400 text-black p-2"
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                        onBlur={(e) =>
                          updateAssignment(
                            index,
                            "driver",
                            e.target.textContent
                          )
                        }
                      >
                        {assign.driver}
                      </td>
                      <td
                        className="border border-gray-400 text-black p-2"
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                        onBlur={(e) =>
                          updateAssignment(index, "van", e.target.textContent)
                        }
                      >
                        {assign.van}
                      </td>
                      <td
                        className="border border-gray-400 text-black p-2"
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                        onBlur={(e) =>
                          updateAssignment(
                            index,
                            "serviceType",
                            e.target.textContent
                          )
                        }
                      >
                        {assign.serviceType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              onClick={resetForm}
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
