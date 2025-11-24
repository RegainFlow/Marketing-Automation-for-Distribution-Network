export interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Dormant' | 'New' | 'Queued' | 'Sending...' | 'Sent';
  lastOrderDate: string;
  totalVolume: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sku: string;
  description: string;
  imageUrl: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Email' | 'Social';
  status: 'Draft' | 'Scheduled' | 'Sent' | 'Completed';
  targetSegment?: string;
  platform?: 'Instagram' | 'TikTok' | 'YouTube';
  createdAt: string;
}

export interface ScraperLog {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

export interface KPIMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface SavedScript {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  topic: string;
  content: string;
  timestamp: string;
}