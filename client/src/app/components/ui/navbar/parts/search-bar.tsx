import { useNavigate, useSearchParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(
      `/categories/${encodeURIComponent(searchQuery.trim().toLowerCase())}`
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
    >
      <input
        key={searchParams[0].get("q")}
        type="text"
        name="search"
        placeholder="Cauta produse..."
        autoComplete="off"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border bg-white pl-4 pr-8 py-2 text-sm text-black placeholder:text-neutral-500"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
};
export { SearchBar };
