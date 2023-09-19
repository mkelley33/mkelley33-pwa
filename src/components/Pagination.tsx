import Link from 'next/link';
import clsx from 'clsx';

interface IPaginationProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  page: number;
  prevPage: string;
  nextPage: string;
  totalPages: number;
  pagination: Array<string | number>;
}

export default function Pagination({
  pagination,
  isFirstPage,
  isLastPage,
  page,
  prevPage,
  nextPage,
  totalPages,
}: IPaginationProps) {
  return totalPages > 1 ? (
    <nav aria-label="pagination" className="border-t-2 pt-3 border-slate-500">
      <ul className="flex flex-row list-none m-0 p-0">
        {!isFirstPage && (
          <li className="mr-3">
            <Link href={prevPage}>Prev</Link>
          </li>
        )}
        {pagination.map((currentPage, idx) => {
          const aria = page === currentPage ? { 'aria-current': 'page' } : {};
          const ellipsisText = page < totalPages ? 'end' : 'beginning';
          return (
            <span key={idx}>
              {currentPage !== '...' && (
                <li className="mr-3">
                  {/* @ts-expect-error valid aria attribute */}
                  <Link
                    className={clsx({
                      'no-underline': page === currentPage,
                    })}
                    href={`/blog/?page=${currentPage}`}
                    {...aria}
                  >
                    <span className="hidden">page </span>
                    {currentPage}
                  </Link>
                </li>
              )}
              {currentPage === '...' && (
                <li className="mr-3">
                  <Link
                    href={`/blog/?page=${page < totalPages ? totalPages : 1}`}
                  >
                    <span className="hidden">go to {ellipsisText} pages</span>
                    <span aria-hidden>{currentPage}</span>
                  </Link>
                </li>
              )}
            </span>
          );
        })}
        {!isLastPage && (
          <li>
            <Link href={nextPage}>Next</Link>
          </li>
        )}
      </ul>
    </nav>
  ) : null;
}
