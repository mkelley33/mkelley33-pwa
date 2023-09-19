import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  let page = 1;
  let pagination = [1, 2, 3, '...', 30];
  let isFirstPage = false;
  let isLastPage = false;
  let totalPages = 30;
  const nextPage = `/blog/?page=${page + 1}`;
  const prevPage = `/blog/?page=${page - 1}`;

  it('Should render the pagination', () => {
    isFirstPage = true;
    render(
      <Pagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
        pagination={pagination}
      />
    );

    const currentPage = screen.getByText('1');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
    expect(currentPage).toHaveClass('no-underline');

    const pageLabels = screen.getAllByText('page');
    pageLabels.forEach((pageLabel) => expect(pageLabel).toHaveClass('hidden'));

    screen.getByText('2');
    screen.getByText('3');

    const ellipsis = screen.getByText('...');
    expect(ellipsis.parentNode).toHaveAttribute('href', '/blog?page=30');
    expect(ellipsis).toHaveAttribute('aria-hidden', 'true');

    screen.getByText('30');
    screen.getByText('Next');

    screen.getByText('go to end pages');

    const prev = screen.queryByText('Prev');
    expect(prev).not.toBeInTheDocument();
  });

  it('Should show the previous page navigation', () => {
    isFirstPage = false;
    render(
      <Pagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
        pagination={pagination}
      />
    );
    screen.getByText('Prev');
  });

  it('Should not show the next page navigation', () => {
    isLastPage = true;
    render(
      <Pagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
        pagination={pagination}
      />
    );
  });

  it('Should show the next and last page navigation', () => {
    isLastPage = false;
    isFirstPage = false;
    render(
      <Pagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
        pagination={pagination}
      />
    );
  });

  it('Should make the ellipsis navigation take user to page 1', () => {
    page = 30;
    render(
      <Pagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
        pagination={pagination}
      />
    );
    const ellipsis = screen.getByText('...');
    expect(ellipsis.parentNode).toHaveAttribute('href', '/blog?page=1');
    screen.getByText('go to beginning pages');
  });

  it('Should show the ellipsis navigation to the left and right', () => {
    pagination = [1, '...', 23, 24, 25, 26, 27, '...', 30];
    render(
      <Pagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
        pagination={pagination}
      />
    );
    const ellipsis = screen.getAllByText('...');
    expect(ellipsis).toHaveLength(2);
  });

  it('Should not render any pagination when there is only one page', () => {
    totalPages = 1;
    const { container } = render(
      <Pagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
        pagination={pagination}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('Should not render any ellipsis navigation when there are five or fewer pages', () => {
    pagination = [1, 2, 3, 4, 5];
    render(
      <Pagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
        pagination={pagination}
      />
    );
    let ellipsis = screen.queryByText('...');
    expect(ellipsis).not.toBeInTheDocument();
    pagination = [1, 2, 3, 4];
    render(
      <Pagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
        pagination={pagination}
      />
    );
    ellipsis = screen.queryByText('...');
    expect(ellipsis).not.toBeInTheDocument();
  });
});
