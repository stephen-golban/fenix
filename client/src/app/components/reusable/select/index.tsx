import {
  Field,
  Label,
  Select as HSelect,
  Description,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Product } from "../../../typings";
import { useState } from "react";

interface ISelect {
  label?: string;
  onSelect(value: string): void;
  options: {
    value: string;
    label: Omit<Product["dimensions_with_price"][number], "id">;
  }[];
}

const Select: React.FC<ISelect> = ({ label, options, onSelect }) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <Field>
      <Label className="uppercase font-bold">{label}</Label>
      <Description className="text-sm/6 text-black/50">
        Latimea (mm) x Lungimea (mm) x Inaltimea (mm) - Pret (MDL)
      </Description>
      <div className="relative">
        <HSelect
          onChange={(e) => onSelect(e.target.value)}
          className={clsx(
            "mt-1 block w-full appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25",
            // Make the text of each option black on Windows
            "*:text-black"
          )}
        >
          {options.map((item, idx) => {
            return (
              <option
                key={item.value + idx}
                value={item.value}
                onClick={() => setSelected(item)}
              >
                {item.label.width}mm x {item.label.length}mm x{" "}
                {item.label.height}mm
              </option>
            );
          })}
        </HSelect>
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
          aria-hidden="true"
        />
      </div>
      <Description className="text-sm/6 mt-4 font-bold uppercase tracking-wide">
        Pret: <span className="text-green-800">{selected.label.price} MDL</span>
      </Description>
    </Field>
  );
};
export { Select };
