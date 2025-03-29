import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export const PAGE_SIZE = 20;

export const PageControls = ({ page, setPage, totalPages }) => {
  const [pageInputValue, setPageInputValue] = useState(page);
  const isPageValid = (page) => (page > 0 && page <= totalPages) || Infinity;

  return (
    <div className="paingation my-8 justify-around flex gap-4 flex-col md:flex-row">
      <Button
        variant="outline"
        onClick={() => {
          if (isPageValid(page - 1)) setPage(page - 1);
        }}
      >
        <ChevronLeft className="size-4" />
        Previous
      </Button>

      <form
        className="flex max-md:flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (isPageValid(pageInputValue)) setPage(Number(pageInputValue));
        }}
      >
        <Input
          type="number"
          placeholder="Enter Page"
          value={pageInputValue}
          onChange={(e) => {
            setPageInputValue(e.target.value);
          }}
        />
        <Button variant="outline" type="submit">
          Go to page
        </Button>
      </form>
      <Button
        variant="outline"
        onClick={() => {
          if (isPageValid(page + 1)) setPage(page + 1);
        }}
      >
        Next
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};
