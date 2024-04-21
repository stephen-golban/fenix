import React, { useState } from "react";
import db from "../../../lib/db.json";

interface MenuItem {
  id: string;
  title: string;
  description: string;
}

interface FilterProps {
  onCategoryChange: (option: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onCategoryChange }) => {
  const menu: MenuItem[] = db.collections;
  const [activeItem, setActiveItem] = useState<MenuItem | null>(menu[0]);

  const handleItemClick = (item: MenuItem) => {
    setActiveItem(item);
    onCategoryChange(item.id);
  };

  return (
    <div className="order-first w-full flex-none md:max-w-[125px]">
      <nav>
        <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
          Collections
        </h3>
        <ul className="hidden md:block">
          {menu.map((item) => (
            <li
              key={item.id}
              className={`mt-2 flex text-black dark:text-black ${
                activeItem === item ? "font-bold" : ""
              }`}
            >
              <p
                className="w-full text-sm underline-offset-4 hover:underline"
                onClick={() => handleItemClick(item)}
              >
                {item.title}
              </p>
            </li>
          ))}
        </ul>
        <ul className="md:hidden">
          <div className="relative">
            <div className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30">
              <div>All</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                ></path>
              </svg>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Filter;
