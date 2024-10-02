import { useNavigate, useSearchParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const debounceTimeout = useRef<any>(null);

  const handleInputChange = (e: any) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (query) {
        navigate(`/categories?q=${encodeURIComponent(query)}`);
      } else {
        navigate("/categories");
      }
    }, 300); // Adjust the delay as needed
  };

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  return (
    <div className="relative w-full md:min-w-[500px]">
      <div className="absolute left-0 top-0 ml-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-5" color="black" />
      </div>
      <input
        key={initialQuery}
        type="text"
        name="search"
        placeholder="Cauta produse..."
        autoComplete="off"
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full rounded-xs border-black/10 border bg-white pl-10 pr-8 py-3 text-sm outline-none"
      />
    </div>
  );
};

export { SearchBar };
