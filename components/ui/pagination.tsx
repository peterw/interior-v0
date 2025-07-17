import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5
    const halfVisible = Math.floor(maxVisiblePages / 2)

    // Always show first page
    pages.push(1)

    if (currentPage > halfVisible + 2) {
      pages.push('...')
    }

    // Calculate range around current page
    let start = Math.max(2, currentPage - halfVisible)
    let end = Math.min(totalPages - 1, currentPage + halfVisible)

    // Adjust range if at the start or end
    if (currentPage <= halfVisible + 2) {
      end = Math.min(totalPages - 1, maxVisiblePages - 1)
    }
    if (currentPage >= totalPages - halfVisible - 1) {
      start = Math.max(2, totalPages - maxVisiblePages + 1)
    }

    // Add page numbers
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis and last page if needed
    if (currentPage < totalPages - halfVisible - 1) {
      pages.push('...')
    }
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <nav className="flex items-center space-x-1" aria-label="Pagination">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className="hidden size-8 sm:inline-flex"
      >
        <ChevronLeft className="size-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <Button
                key={`ellipsis-${index}`}
                variant="ghost"
                size="icon"
                disabled
                className="size-8"
              >
                <MoreHorizontal className="size-4" />
                <span className="sr-only">More pages</span>
              </Button>
            )
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="icon"
              onClick={() => onPageChange(page as number)}
              className="size-8"
            >
              {page}
              <span className="sr-only">Page {page}</span>
            </Button>
          )
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="hidden size-8 sm:inline-flex"
      >
        <ChevronRight className="size-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </nav>
  )
}
