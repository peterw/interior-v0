/**
 * Types for the LocalRank app
 */

export type Unit = "km" | "mi";

export interface Business {
  id: string;
  name: string;
  address: string;
  cid?: string;
  fid?: string;
  place_id?: string;
  mapsUrl?: string;
  latitude?: number;
  longitude?: number;
}

export interface Keyword {
  id: string;
  text: string;
}

export interface Pin {
  id: string;
  latitude: number;
  longitude: number;
  rank?: number;
  isCenter?: boolean;
}

export interface ScanConfig {
  id: string;
  businessId: string;
  keywords: Keyword[];
  pinCount: number;
  radius: number;
  unit: Unit;
  createdAt: Date;
}

export type ScanStatus = "pending" | "processing" | "paused" | "completed" | "cancelled" | "failed";

export interface ScanResult {
  id: string;
  scanConfigId: string;
  business: Business;
  pins: Pin[];
  keywords: Keyword[];
  completedAt?: Date;
  status: ScanStatus;
  progress?: number;
}

export interface RecurringScanConfig extends ScanConfig {
  frequency: "daily" | "weekly" | "monthly";
  dayOfWeek?: number; // 0-6, Sunday to Saturday
  dayOfMonth?: number; // 1-31
  nextRunAt: Date;
  isActive: boolean;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  description: string;
  createdAt: Date;
  scanId?: string;
}

export interface ShareConfig {
  id: string;
  scanResultId: string;
  type: "image" | "gif" | "dynamic";
  hideKeywords: boolean;
  expiresAt?: Date;
  createdAt: Date;
  url: string;
}  