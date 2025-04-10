import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { StudentData, Template } from "../types";

interface Props {
  student: StudentData;
  template: Template;
}

export default function IDCard({ student, template }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async () => {
    if (cardRef.current) {
      const dataUrl = await toPng(cardRef.current);
      const link = document.createElement("a");
      link.download = `${student.name}-id-card.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const qrCodeData = {
    name: student.name,
    rollNumber: student.rollNumber,
    class: student.class,
    division: student.division,
    rackNumber: student.rackNumber,
    busRoute: student.busRoute,
    allergies: student.allergies,
  };

  const ModernTemplate = () => (
    <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-xl w-full h-[autopx] flex flex-col border-4 border-indigo-500/20">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-white/20">
        <div>
          <h1 className="text-2xl font-bold text-white">UNITY SCHOOL</h1>
          <p className="text-sm text-blue-200 mt-1">
            Est. 1985 • Accredited by CBSE
          </p>
        </div>
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white/20 border-2 border-white/30">
          <span className="text-white font-bold text-2xl">US</span>
        </div>
      </div>

      {/* Main Content - Matches ClassicTemplate layout */}
      <div className="flex-1 flex flex-col sm:flex-row gap-6">
        {/* Photo Section */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-40 h-40 bg-white/10 rounded-lg border-4 border-white/20 flex items-center justify-center overflow-hidden shadow-md">
            <img
              src={student.photo}
              alt={student.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 text-center">
            <div className="text-sm bg-white/20 px-3 py-1.5 rounded-full">
              STUDENT ID
            </div>
            <p className="text-sm text-blue-100 mt-2">#{student.rollNumber}</p>
          </div>
        </div>

        {/* Info Section - Table layout like ClassicTemplate */}
        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">{student.name}</h2>
            <p className="text-lg text-blue-100">
              Roll No: {student.rollNumber}
            </p>
          </div>

          <table className="w-full border-collapse text-lg">
            <tbody>
              <tr>
                <td className="py-2 text-blue-200 font-medium">Class:</td>
                <td className="py-2 text-white">
                  {student.class}-{student.division}
                </td>
              </tr>
              <tr>
                <td className="py-2 text-blue-200 font-medium">Section:</td>
                <td className="py-2 text-white">{student.division}</td>
              </tr>
              <tr>
                <td className="py-2 text-blue-200 font-medium">Rack No:</td>
                <td className="py-2 text-white">
                  {student.rackNumber || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="py-2 text-blue-200 font-medium">Bus Route:</td>
                <td className="py-2 text-white">{student.busRoute}</td>
              </tr>
            </tbody>
          </table>

          {/* Allergies - Similar positioning */}
          {student.allergies.length > 0 && (
            <div className="mt-auto bg-red-400/20 p-3 rounded-lg border-l-4 border-red-500">
              <p className="text-sm font-bold text-white">MEDICAL ALERT:</p>
              <p className="text-base text-white">
                {student.allergies.join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Identical layout to ClassicTemplate */}
      <div className="mt-auto pt-6">
        <div className="flex justify-between items-center border-t-2 border-white/20 pt-4">
          <div className="text-sm text-blue-100">
            <p>Issued: {new Date().toLocaleDateString()}</p>
            <p className="mt-1">(123) 456-7890</p>
          </div>
          <div className="bg-white p-2.5 border-2 border-white/30 rounded-lg w-[130px] h-[130px] flex items-center justify-center">
            <QRCodeSVG
              value={JSON.stringify(qrCodeData)}
              size={120}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ClassicTemplate = () => (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full h-[850px] sm:h-[700px] flex flex-col border-4 border-gray-200">
      {/* School header with seal */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 pb-4 border-b-2 border-gray-300 gap-4 sm:gap-0">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            UNITY SCHOOL
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Affiliated with CBSE • Est. 1985
          </p>
        </div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-blue-50 border-4 border-blue-100">
          <span className="text-blue-800 font-bold text-xl sm:text-2xl">
            US
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
        {/* Photo with official frame */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-gray-100 rounded-lg border-4 border-gray-300 flex items-center justify-center overflow-hidden shadow-md">
            <img
              src={student.photo}
              alt={student.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-3 sm:mt-4 text-center">
            <div className="text-xs sm:text-sm bg-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded">
              OFFICIAL ID
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
              Valid 2023-2024
            </p>
          </div>
        </div>

        {/* Student details */}
        <div className="flex-1 flex flex-col">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {student.name}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Roll No: {student.rollNumber}
            </p>
          </div>

          <table className="w-full border-collapse text-base sm:text-lg">
            <tbody>
              <tr>
                <td className="py-1 sm:py-2 text-gray-600 font-medium">
                  Class:
                </td>
                <td className="py-1 sm:py-2 text-gray-800">
                  {student.class}-{student.division}
                </td>
              </tr>
              <tr>
                <td className="py-1 sm:py-2 text-gray-600 font-medium">
                  Section:
                </td>
                <td className="py-1 sm:py-2 text-gray-800">
                  {student.division}
                </td>
              </tr>
              <tr>
                <td className="py-1 sm:py-2 text-gray-600 font-medium">
                  Rack No:
                </td>
                <td className="py-1 sm:py-2 text-gray-800">
                  {student.rackNumber || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="py-1 sm:py-2 text-gray-600 font-medium">
                  Bus Route:
                </td>
                <td className="py-1 sm:py-2 text-gray-800">
                  {student.busRoute}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Allergies */}
          {student.allergies.length > 0 && (
            <div className="mt-8 bg-red-400/30 p-2 rounded-lg">
              <p className="text-xs sm:text-sm font-bold text-red-700">
                MEDICAL INFORMATION:
              </p>
              <p className="text-sm sm:text-base text-red-800">
                {student.allergies.join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer with QR */}
      <div className="mt-auto pt-4 sm:pt-6">
        <div className="flex justify-between items-center border-t-2 border-white/20 pt-3">
          <div className="text-xs sm:text-sm text-black-600">
            <p>Issued: {new Date().toLocaleDateString()}</p>
            <p className="mt-1">(123) 456-7890</p>
          </div>
          <div className="bg-white p-2 border-2 border-gray-300 rounded-lg w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] flex items-center justify-center">
            <QRCodeSVG
              value={JSON.stringify(qrCodeData)}
              size={90}
              level="H"
              includeMargin={true}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      <div
        ref={cardRef}
        className="transition-all duration-300 hover:scale-[1.01]"
      >
        {template.id === "modern" ? <ModernTemplate /> : <ClassicTemplate />}
      </div>
      <button
        onClick={downloadCard}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
      >
        <Download size={18} className="stroke-[2.5]" />
        <span className="font-medium">Download ID Card</span>
      </button>
    </div>
  );
}
