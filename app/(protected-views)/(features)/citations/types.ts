export interface Citation {
  id: string;
  name: string;
  url: string;
  status: string;
  created_at: string;
}

export interface CitationListResponse {
  citations: Citation[];
  total: number;
}

export interface SubscriptionStatus {
  is_active: boolean;
  plan: string;
}