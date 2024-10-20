import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { usePaginationStore } from '@/store/paginationStore';
import React from 'react';

const PaginationLinkItem: React.FC = () => {
  const { paginateData, currentPage, fetchPaginateData, setCurrentPage } = usePaginationStore();

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchPaginateData(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSpecificPage = (pageNumber: number) => {
    fetchPaginateData(pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (paginateData && currentPage < paginateData.last_page) {
      fetchPaginateData(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  if (!paginateData) {
    return <div>データがありません</div>;
  }

  return (
    <Pagination>
      <PaginationContent>
        {paginateData.prev_page_url && (
          <PaginationItem
            onClick={handlePreviousPage}
            className={currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}
          >
            前へ
          </PaginationItem>
        )}

        {paginateData.links.map((link, index) => {
          const pageNumber = Number(link.label);

          if (isNaN(pageNumber)) {
            return null;
          }

          if (pageNumber < paginateData.current_page - 2 || pageNumber > paginateData.current_page + 2) {
            return null;
          }

          return (
            <PaginationItem
              key={index}
              onClick={() => handleSpecificPage(pageNumber)}
              className={`${
                link.active
                  ? 'bg-blue-500 text-white rounded-md'
                  : 'bg-white text-blue-500 hover:bg-blue-100 rounded-md'
              }`}
            >
              <PaginationLink className='rounded-md' href='#'>
                {link.label}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {paginateData.next_page_url && (
          <PaginationItem
            onClick={handleNextPage}
            className={currentPage === paginateData.last_page ? 'cursor-not-allowed' : 'cursor-pointer'}
          >
            次へ
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationLinkItem;
