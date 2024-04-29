import React, { useState } from "react";

interface SortOption {
  label: string;
}

interface SortProps {
  onSortChange: (option: string) => void;
}

const Sort: React.FC<SortProps> = ({ onSortChange }) => {
  const sortOptions: SortOption[] = [
    { label: "Relevance" },
    { label: "Trending" },
    { label: "Latest arrivals" },
    { label: "Price: Low to high" },
    { label: "Price: High to low" },
  ];

  const [activeItem, setActiveItem] = useState<string | null>(
    sortOptions[0].label
  );

  const handleItemClick = (item: SortOption) => {
    setActiveItem(item.label);
    onSortChange(item.label);
  };

  return (
    <div className="order-none flex-none md:order-last md:w-[125px]">
      <nav>
        <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
          Sort by
        </h3>
        <ul className="hidden md:block">
          {sortOptions.map((option, index) => (
            <li
              key={index}
              className={`mt-2 flex text-sm text-black ${
                activeItem === option.label ? "font-bold" : ""
              }`}
            >
              <p
                className="w-full hover:underline hover:underline-offset-4 underline-offset-4"
                onClick={() => handleItemClick(option)}
              >
                {option.label}
              </p>
            </li>
          ))}
        </ul>
        <ul className="md:hidden">
          <div className="relative">
            <div className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30">
              <div>Relevance</div>
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

export default Sort;
