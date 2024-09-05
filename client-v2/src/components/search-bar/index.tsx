/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter, usePathname } from "next/navigation";
import { Input } from "../ui";
import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitSearch();
  };

  const submitSearch = () => {
    let searchPath = "/categories";
    if (pathname.startsWith("/categories") || pathname === "/products") {
      searchPath = pathname;
    }
    router.push(
      `${searchPath}${searchTerm.trim() ? `?name=${encodeURIComponent(searchTerm.trim())}` : ""}`
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearInput = () => {
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (
      searchTerm === "" &&
      (pathname.startsWith("/categories") || pathname === "/products")
    ) {
      submitSearch();
    }
  }, [searchTerm, pathname]);

  return (
    <form className="relative flex-grow" onSubmit={handleSearch}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="search"
        name="name"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Caută produse..."
        className="pl-8 pr-8 w-full sm:w-[300px] md:w-[200px] lg:w-[300px] [&::-webkit-search-cancel-button]:hidden"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClearInput}
          className="absolute right-2.5 top-[12px]"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
