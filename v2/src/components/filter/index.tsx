"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
} from "../ui";
import { useState, useEffect } from "react";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [sortValue, setSortValue] = useState<string>("");
  const [availabilityValue, setAvailabilityValue] = useState<string>("");

  useEffect(() => {
    setSortValue(searchParams.get("sort") || "");
    setAvailabilityValue(searchParams.get("availability") || "");
  }, [searchParams]);

  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    setSortValue("");
    setAvailabilityValue("");
    replace(pathname);
  };

  return (
    <div className="mt-12 flex flex-wrap gap-4 items-center">
      <div>
        <Select
          name="sort"
          value={sortValue}
          onValueChange={(value: string) => {
            setSortValue(value);
            handleFilterChange("sort", value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sortare după" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sortby">Sortare după</SelectItem>
            <SelectItem value="asc price">Preț (crescător)</SelectItem>
            <SelectItem value="desc price">Preț (descrescător)</SelectItem>
            <SelectItem value="asc lastUpdated">Cele mai noi</SelectItem>
            <SelectItem value="desc lastUpdated">Cele mai vechi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-6 flex-wrap">
        <Select
          name="availability"
          value={availabilityValue}
          onValueChange={(value: string) => {
            setAvailabilityValue(value);
            handleFilterChange("availability", value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Disponibilitate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate produsele</SelectItem>
            <SelectItem value="inStock">În stoc</SelectItem>
            <SelectItem value="outOfStock">Indisponibile</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={resetFilters}
        variant="outline"
        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
      >
        Resetează filtrele
      </Button>
    </div>
  );
};

export default Filter;
