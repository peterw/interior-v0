import { useState, useEffect } from 'react';
import { getPricingTableConfig } from '@/lib/api/pricing';
import { type PricingTableConfig } from '@/types/pricing';

export function usePricingTable() {
  const [data, setData] = useState<PricingTableConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPricing() {
      try {
        const data = await getPricingTableConfig();
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchPricing();
  }, []);

  return { data, isLoading, error };
}
