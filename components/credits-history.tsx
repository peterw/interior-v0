"use client"

import { useState, useEffect, useCallback } from "react"
import { ApiService } from "@/lib/api/generated"
import { CreditLog, PaginatedCreditLogList } from "@/lib/api/generated"
import { Pagination } from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getApiErrorMessage } from "@/lib/api"

const ITEMS_PER_PAGE = 10;

export function CreditsHistory({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [creditLogs, setCreditLogs] = useState<CreditLog[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCreditLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await ApiService.apiCreditLogsList(
        "-timestamp", // Order by most recent first
        currentPage,
        ITEMS_PER_PAGE
      );
      
      setCreditLogs(response.results || []);
      setTotalCount(response.count || 0);
    } catch (error) {
      console.error("Error fetching credit logs:", error);
      setError(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (open) {
      fetchCreditLogs();
    }
  }, [open, fetchCreditLogs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-blue-500" />
            <span>Credits History</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-2">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-2">{error}</p>
              <Button 
                onClick={fetchCreditLogs} 
                variant="outline" 
                size="sm" 
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          ) : creditLogs.length > 0 ? (
            <>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {creditLogs.map((log) => (
                    <Card key={log.id} className="overflow-hidden">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {log.change > 0 ? (
                              <ArrowUpRight className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-red-500" />
                            )}
                            <div>
                              <div className="font-medium">
                                {log.change > 0 ? "+" : ""}{log.change} credits
                              </div>
                              <div className="text-xs text-gray-500">
                                {log.reason || "Credit adjustment"}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              Balance: {log.balance_after}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(log.timestamp)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
              
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    hasNextPage={currentPage < totalPages}
                    hasPreviousPage={currentPage > 1}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No credit history found.</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
