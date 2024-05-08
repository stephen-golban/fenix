import React, { useState } from "react";
import db from "../../../lib/db.json";

interface MenuItem {
  id: string;
  title: string;
}

interface FilterProps {
  onCategoryChange: (option: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onCategoryChange }) => {
  const menu: MenuItem[] = db.collections;
  const [activeItem, setActiveItem] = useState<MenuItem | null>(menu[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleItemClick = (item: MenuItem) => {
    setActiveItem(item);
    onCategoryChange(item.id);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState); // Toggle dropdown visibility
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
            <div
              className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30 cursor-pointer"
              onClick={toggleDropdown}
            >
              <div>{activeItem ? activeItem.title : "All"}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className={`h-4 transform ${showDropdown ? "rotate-180" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                ></path>
              </svg>
            </div>
            {showDropdown && (
              <ul className="absolute z-10 top-full left-0 right-0 bg-white border border-black/30 rounded mt-1 text-sm">
                {menu.map((item) => (
                  <li
                    key={item.id}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      activeItem === item ? "font-bold" : ""
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Filter;
