import {
  Field,
  Label,
  Select as HSelect,
  Description,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

interface ISelect {
  label?: string;
  onSelect?(value: string): void;
  options: {
    value: string;
    label: {
      length?: number;
      width?: number;
      height?: number;
      diameter?: number;
      thickness?: number;
      external_width?: number;
      internal_width?: number;
      price: number;
      sleeping_space?: string;
    };
  }[];
}

const Select: React.FC<ISelect> = ({ label, options, onSelect }) => {
  const [selected, setSelected] = useState(options[0]);

  const handleChange = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      setSelected(selectedOption);
      onSelect && onSelect(selectedOption.value);
    }
  };

  const renderLabel = (item: any) => {
    return `
      ${item.label.width ? `Lățime: ${item.label.width} mm;\n\n ` : ""}
      ${item.label.length ? `Lungime: ${item.label.length} mm;\n\n ` : ""}
      ${item.label.height ? `Înălțime: ${item.label.height} mm;\n\n ` : ""}
      ${item.label.diameter ? `Diametru: ${item.label.diameter} mm;\n\n ` : ""}
      ${item.label.thickness ? `Grosime: ${item.label.thickness} mm;\n\n ` : ""}
      ${
        item.label.external_width
          ? `Lățime externă: ${item.label.external_width} mm;\n\n `
          : ""
      }
      ${
        item.label.internal_width
          ? `Lățime internă: ${item.label.internal_width} mm;\n\n `
          : ""
      }
      ${
        item.label.sleeping_space
          ? `Spațiu de dormit: ${item.label.sleeping_space}, `
          : ""
      }
    `
      .trim()
      .replace(/,\s*$/, ""); // Remove trailing comma
  };

  return (
    <Field>
      <Label className="uppercase font-bold">{label}</Label>
      <Description className="text-sm/6 text-black/50">
        {`Selectați dimensiunile disponibile`}
      </Description>
      <div className="relative">
        <HSelect
          value={selected.value}
          onChange={(e) => handleChange(e.target.value)}
          className={clsx(
            "mt-1 block w-full appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25",
            "*:text-black"
          )}
        >
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {renderLabel(item)}
            </option>
          ))}
        </HSelect>
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
          aria-hidden="true"
        />
      </div>
      <Description className="text-lg mt-5 font-bold uppercase tracking-wide">
        {`Preț: `}{" "}
        <span className="text-green-800">{selected.label.price} MDL</span>
      </Description>
    </Field>
  );
};

export { Select };
