"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between w-full">
      <Button
        variant="outline"
        disabled={!hasPrev}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
      </Button>
      <Button
        variant="outline"
        disabled={!hasNext}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Următor <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
