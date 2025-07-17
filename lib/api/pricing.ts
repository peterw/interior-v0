import axios from '@/lib/axios';
import { type PricingTableConfig } from '@/types/pricing';

export async function getPricingTableConfig(): Promise<PricingTableConfig> {
  const { data } = await axios.get<PricingTableConfig>('/users/pricing/config/');
  return data;
}
