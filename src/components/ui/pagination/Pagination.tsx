"use client";
import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}
export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? 1;
  const currentPage = isNaN(+pageString) ? 1 : +pageString;
  // console.log(pathname,searchParams,currentPage);

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  // console.log(allPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }
    if (+pageNumber <= 0) {
      return `${pathname}`;
    }
    if (+pageNumber > totalPages) {
      return `${pathname}`;
    }
    params.set("page", pageNumber.toLocaleString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center text-center mb-10">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          {/* previus */}
          <li className="page-item flex items-center">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={20} />
            </Link>
          </li>

          {allPages.map((page, index) => (
            <li key={index} className="page-item flex gap-2 ">
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3  border-0  outline-none transition-all duration-300 rounded text-gray-800 hover:text-white hover:bg-blue-700 focus:shadow-none",
                  {
                    "bg-blue-600 shadow-sm text-white":
                      page === currentPage,
                  }
                )}
                href={createPageUrl(page!)}
              >
                {page}
              </Link>
            </li>
          ))}

          {/* next */}
          <li className="page-item flex items-center">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
              
            >
              <IoChevronForwardOutline size={20} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
