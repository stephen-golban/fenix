/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

const convertUnit = (value: number, unit: string) => {
  if (unit === "cm") {
    return (value / 10).toFixed(2);
  } else if (unit === "m") {
    return (value / 1000).toFixed(2);
  }
  return value.toFixed(2); // default to mm
};

const OptionTable: React.FC<{
  option: any;
  index: number;
  getAvailableColumns: (option: any) => any;
  formatPriceToMDL: (price: number) => string;
}> = ({ option, index, getAvailableColumns, formatPriceToMDL }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [unit, setUnit] = useState<string>("mm");

  const availableColumns = getAvailableColumns(option);

  const toggleAccordion = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) =>
      prevUnit === "mm" ? "cm" : prevUnit === "cm" ? "m" : "mm"
    );
  };

  return (
    <div className="border border-gray-100 rounded mb-4">
      <div
        className="cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 transition duration-300 flex justify-between items-center"
        onClick={toggleAccordion}
      >
        <h3 className="text-md font-semibold">Opțiune {index + 1}</h3>
        <span>{isActive ? "-" : "+"}</span>
      </div>
      {isActive && (
        <div className="relative p-4">
          <a
            onClick={toggleUnit}
            className="mb-4 text-primary font-semibold cursor-pointer absolute right-2 top-2 hover:text-primary/70"
          >
            Arată în {unit === "mm" ? "cm" : unit === "cm" ? "m" : "mm"}
          </a>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white text-sm text-gray-700">
              <tbody>
                {availableColumns.width && (
                  <tr>
                    <td className="py-2 px-2 border-b font-medium text-gray-600 text-[10px] xs:text-sm">
                      Lățime
                    </td>
                    <td className="py-2 px-2 border-b text-left text-[10px] xs:text-sm">
                      {convertUnit(Number(option.width), unit)} {unit}
                    </td>
                  </tr>
                )}
                {availableColumns.length && (
                  <tr>
                    <td className="py-2 px-2 border-b font-medium text-gray-600 text-[10px] xs:text-sm">
                      Lungime
                    </td>
                    <td className="py-2 px-2 border-b text-left text-[10px] xs:text-sm">
                      {convertUnit(Number(option.length), unit)} {unit}
                    </td>
                  </tr>
                )}
                {availableColumns.height && (
                  <tr>
                    <td className="py-2 px-2 border-b font-medium text-gray-600 text-[10px] xs:text-sm">
                      Înălțime
                    </td>
                    <td className="py-2 px-2 border-b text-left text-[10px] xs:text-sm">
                      {convertUnit(Number(option.height), unit)} {unit}
                    </td>
                  </tr>
                )}
                {availableColumns.diameter && (
                  <tr>
                    <td className="py-2 px-2 border-b font-medium text-gray-600 text-[10px] xs:text-sm">
                      Diametru
                    </td>
                    <td className="py-2 px-2 border-b text-left text-[10px] xs:text-sm">
                      {convertUnit(Number(option.diameter), unit)} {unit}
                    </td>
                  </tr>
                )}
                {availableColumns.thickness && (
                  <tr>
                    <td className="py-2 px-2 border-b font-medium text-gray-600 text-[10px] xs:text-sm">
                      Grosime
                    </td>
                    <td className="py-2 px-2 border-b text-left text-[10px] xs:text-sm">
                      {convertUnit(Number(option.thickness), unit)} {unit}
                    </td>
                  </tr>
                )}
                {availableColumns.external_width && (
                  <tr>
                    <td className="py-2 px-2 border-b font-medium text-gray-600 text-[10px] xs:text-sm">
                      Lățime Externă
                    </td>
                    <td className="py-2 px-2 border-b text-left text-[10px] xs:text-sm">
                      {convertUnit(Number(option.external_width), unit)} {unit}
                    </td>
                  </tr>
                )}
                {availableColumns.internal_width && (
                  <tr>
                    <td className="py-2 px-2 border-b font-medium text-gray-600 text-[10px] xs:text-sm">
                      Lățime Internă
                    </td>
                    <td className="py-2 px-2 border-b text-left text-[10px] xs:text-sm">
                      {convertUnit(Number(option.internal_width), unit)} {unit}
                    </td>
                  </tr>
                )}
                {availableColumns.sleeping_space && (
                  <tr>
                    <td className="py-2 px-2 border-b font-medium text-gray-600 text-[10px] xs:text-sm">
                      Spațiu de Dormit
                    </td>
                    <td className="py-2 px-2 border-b text-left text-[10px] xs:text-sm">
                      {option.sleeping_space}
                    </td>
                  </tr>
                )}
                {availableColumns.price && (
                  <tr>
                    <td className="py-2 px-2 border-b font-bold text-green-800 text-[10px] xs:text-sm">
                      Preț (MDL)
                    </td>
                    <td className="py-2 px-2 border-b text-left font-bold text-green-800 text-[10px] xs:text-sm">
                      {formatPriceToMDL(option.price)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionTable;
